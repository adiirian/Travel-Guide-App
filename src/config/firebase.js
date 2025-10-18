import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDehev3owKiUHOFFRIQN1YrqvAtRVodn9g",
  authDomain: "travel-guide-app-b48df.firebaseapp.com",
  projectId: "travel-guide-app-b48df",
  storageBucket: "travel-guide-app-b48df.firebasestorage.app",
  messagingSenderId: "489381169493",
  appId: "1:489381169493:web:c962f424387a6e4ed2c7dc",
  measurementId: "G-107T42F6CP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported (prevents warnings in React Native)
isSupported().then(supported => {
  if (supported) {
    getAnalytics(app);
  }
});

// Initialize Auth with AsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
