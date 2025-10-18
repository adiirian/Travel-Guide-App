import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { fetchGuides } from '../services/guidesService';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    setLoading(true);
    try {
      const allGuides = await fetchGuides('');
      setGuides(allGuides);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load guides');
    } finally {
      setLoading(false);
    }
  };

  const navigateToDetails = (spot) => {
    navigation.navigate('Details', { spot });
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading Bohol spots...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.welcome}>Welcome to Bohol Travel Guide!</Text>
          <Text style={styles.userEmail}>Logged in as: {user?.email}</Text>
          <Button title="Logout" onPress={handleLogout} color="#ff4444" />
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.appTitle}>🌴 Discover Bohol&apos;s Hidden Gems 🌴</Text>
          <Text style={styles.appDescription}>
            Embark on an unforgettable journey through Bohol Island! Uncover iconic wonders like the Chocolate Hills,
            dive into crystal-clear waters, explore ancient churches, and meet the world&apos;s smallest primate.
          </Text>
          <Text style={styles.appDescription}>
            Get real-time weather updates, interactive maps, and insider guides for every adventure. Your Bohol story starts here! 🏖️
          </Text>
        </View>

        <View style={styles.spotsSection}>
          <Text style={styles.sectionTitle}>Popular Tourist Spots</Text>
          <Text style={styles.sectionSubtitle}>Tap any spot to explore details, maps, and weather</Text>

          <FlatList
            data={guides}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.spotItem} onPress={() => navigateToDetails(item)}>
                <Text style={styles.spotTitle}>{item.title}</Text>
                <Text style={styles.spotHint}>
                  {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
                </Text>
                <Text style={styles.spotTeaser}>Tap to uncover the full adventure! 🌟</Text>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
            style={styles.list}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  welcomeSection: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 15,
    textAlign: 'center',
  },
  appDescription: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  spotsSection: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    marginTop: 0,
  },
  spotItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  spotTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  spotHint: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginBottom: 5,
  },
  spotTeaser: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
    textAlign: 'right',
  },
});
