import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load cached user data first for offline support
    const loadCachedUser = async () => {
      try {
        const cachedUser = await AsyncStorage.getItem('cachedUser');
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
        }
      } catch (error) {
        console.error('Error loading cached user:', error);
      }
    };

    loadCachedUser();

    // Set a timeout to handle offline mode: if Firebase doesn't respond within 3 seconds, assume offline and stop loading
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      clearTimeout(timeout); // Clear timeout if Firebase responds
      setUser(user);
      setLoading(false);
      // Cache user data for offline use
      try {
        if (user) {
          await AsyncStorage.setItem('cachedUser', JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem('cachedUser');
        }
      } catch (error) {
        console.error('Error caching user:', error);
      }
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
