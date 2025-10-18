import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen({ navigation }) {
  const route = useRoute();
  const spot = route.params?.spot;
  const [region, setRegion] = useState({
    latitude: 10.05, // Default to Trinidad, Bohol
    longitude: 124.35,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });
  const [userLocation, setUserLocation] = useState(null);
  const [pois, setPois] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [titleOpacity] = useState(new Animated.Value(1));
  const [subtitleOpacity] = useState(new Animated.Value(1));

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (permissionGranted) {
      loadLocationAndPois();
    }
  }, [spot, permissionGranted]);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setPermissionGranted(true);
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        let lat = location.coords.latitude;
        let lng = location.coords.longitude;
        // If location is not in Bohol (approx 9.5-10.5 lat, 123.5-125 lng), default to Trinidad, Bohol
        if (!(lat >= 9.5 && lat <= 10.5 && lng >= 123.5 && lng <= 125)) {
          lat = 10.05; // Trinidad, Bohol
          lng = 124.35;
        }
        setUserLocation({
          latitude: lat,
          longitude: lng,
        });
      } else {
        Alert.alert(
          'Location Permission Required',
          'Please enable location permissions to see your current location on the map.',
          [{ text: 'OK' }]
        );
        // Still load POIs even without location permission
        loadPois();
      }
    } catch {
      Alert.alert('Error', 'Failed to request location permission');
      loadPois(); // Load POIs anyway
    }
  };

  const loadLocationAndPois = async () => {
    try {
      // If a specific spot is passed, center on it
      if (spot && spot.latitude && spot.longitude) {
        setRegion({
          latitude: spot.latitude,
          longitude: spot.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else if (userLocation) {
        // Center on user location if no specific spot
        setRegion({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }

      loadPois();
    } catch {
      Alert.alert('Error', 'Failed to load location and POIs');
      loadPois(); // Load POIs anyway
    }
  };

  const loadPois = () => {
    // Bohol tourist spots with enhanced data
    setPois([
      {
        id: '1',
        title: 'Chocolate Hills',
        latitude: 9.8297,
        longitude: 124.1397,
        description: 'Over 1,200 unique geological formations that turn brown during dry season. UNESCO tentative site.',
        category: 'Natural Wonder',
        rating: 4.8,
        bestTime: 'Dry season (March-May)',
        entryFee: '₱150',
      },
      {
        id: '2',
        title: 'Panglao Beach',
        latitude: 9.6268,
        longitude: 123.8056,
        description: 'Pristine white sand beach with crystal-clear waters. Perfect for swimming, snorkeling, and relaxation.',
        category: 'Beach',
        rating: 4.6,
        bestTime: 'November-April',
        entryFee: 'Free',
      },
      {
        id: '3',
        title: 'Tarsier Conservation Area',
        latitude: 9.6912,
        longitude: 123.9529,
        description: 'Home to the world\'s smallest primate. Guided tours available to observe these endangered creatures.',
        category: 'Wildlife',
        rating: 4.4,
        bestTime: 'Early morning',
        entryFee: '₱80',
      },
      {
        id: '4',
        title: 'Loboc River Cruise',
        latitude: 9.6348,
        longitude: 124.0298,
        description: 'Scenic river cruise with floating restaurants serving local delicacies and traditional music performances.',
        category: 'Adventure',
        rating: 4.5,
        bestTime: 'Lunch time',
        entryFee: '₱1,200 (cruise)',
      },
      {
        id: '5',
        title: 'Baclayon Church',
        latitude: 9.6229,
        longitude: 123.912,
        description: 'Historic stone church built in 1595, one of the oldest in the Philippines with intricate carvings.',
        category: 'Historical',
        rating: 4.3,
        bestTime: 'Morning',
        entryFee: 'Free',
      },
      {
        id: '6',
        title: 'Trinidad Kawasan Falls',
        latitude: 10.0623,
        longitude: 124.3421,
        description: 'Multi-tiered waterfall with natural pools. Requires a short hike through lush forest trails.',
        category: 'Waterfall',
        rating: 4.7,
        bestTime: 'Wet season',
        entryFee: '₱20',
      },
      {
        id: '7',
        title: 'Blood Compact Shrine',
        latitude: 9.6273,
        longitude: 123.8788,
        description: 'Historic site commemorating the first blood compact between Spaniards and Filipinos in 1565.',
        category: 'Historical',
        rating: 4.2,
        bestTime: 'Morning',
        entryFee: 'Free',
      },
      {
        id: '8',
        title: 'Bohol Bee Farm',
        latitude: 9.5757,
        longitude: 123.8271,
        description: 'Learn about stingless bees and taste organic honey products. Includes butterfly garden and mini zoo.',
        category: 'Educational',
        rating: 4.1,
        bestTime: 'Morning',
        entryFee: '₱150',
      },
      {
        id: '9',
      title: 'Anda White Long Beach',
      latitude: 9.7417,
      longitude: 124.5758,
      description: 'This is a soulful place where the everyday stresses of life are left behind, and you can reconnect with nature, we call it luxury comfort.',
      category: 'Beach',
      rating: 4.5,
      bestTime: 'November-April',
      entryFee: 'Free',
      }
    ]);
  };

  const navigateToHome = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
        showsMyLocationButton
      >
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            coordinate={{
              latitude: poi.latitude,
              longitude: poi.longitude,
            }}
            title={poi.title}
            description={`${poi.category} • ⭐ ${poi.rating} • ${poi.entryFee}`}
            onPress={() => {
              setRegion({
                latitude: poi.latitude,
                longitude: poi.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              });
              Alert.alert(
                poi.title,
                `${poi.description}\n\n⭐ Rating: ${poi.rating}/5\n⏰ Best Time: ${poi.bestTime}\n💰 Entry Fee: ${poi.entryFee}\n🏷️ Category: ${poi.category}`,
                [{ text: 'OK' }]
              );
            }}
          />
        ))}
      </MapView>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backButton} onPress={navigateToHome}>
          <Ionicons name="home" size={20} color="#4A90E2" />
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.floatingText}>
        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>Maps & Navigation</Animated.Text>
        <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>Tap markers for POI details. Use navigation for directions.</Animated.Text>
      </View>
    </View>
  );
}

MapScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
  },
  floatingText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
