import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ScrollView, Image, Linking, Alert, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import { theme } from '../styles/theme';
import { spotCoordinates } from '../constants/spots';

// Mock images for Bohol spots (in a real app, these would be actual image URLs)
const spotImages = {
  '1': require('../../assets/images/tourist-spots/chocolate-hills.jpg'),
  '2': require('../../assets/images/tourist-spots/panglao.jpg'),
  '3': require('../../assets/images/tourist-spots/tarsier.jpg'),
  '4': require('../../assets/images/tourist-spots/loboc.jpg'),
  '5': require('../../assets/images/tourist-spots/baclayon.jpg'),
  '6': require('../../assets/images/tourist-spots/kawasan.jpg'),
  '7': require('../../assets/images/tourist-spots/bc.jpg'),
  '8': require('../../assets/images/tourist-spots/bbf.jpg'),
  '9': require('../../assets/images/tourist-spots/anda.jpg'),
};

export default function DetailsScreen({ navigation }) {
  const route = useRoute();
  const { spot } = route.params;
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        Alert.alert('Permission Required', 'Location permission needed for directions.');
      }
    } catch {
      Alert.alert('Error', 'Failed to get current location.');
    }
  };

  const getDirections = () => {
    if (!spot || !currentLocation) {
      Alert.alert('Directions', 'Spot or current location not available.');
      return;
    }
    const coord = spotCoordinates[spot.id] || { lat: spot.latitude, lng: spot.longitude };
    const destinationLat = coord.lat || spot.coords?.lat;
    const destinationLng = coord.lng || spot.coords?.lng;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destinationLat},${destinationLng}&travelmode=driving`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Could not open maps.'));
  };

  const navigateToMap = () => {
    const coord = spotCoordinates[spot.id] || { lat: spot.latitude, lng: spot.longitude };
    if (coord.lat && coord.lng) {
      const url = `https://www.google.com/maps/search/?api=1&query=${coord.lat},${coord.lng}`;
      Linking.openURL(url);
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=Bohol,Philippines`;
      Linking.openURL(url);
    }
  };

  const navigateToWeather = () => {
    navigation.navigate('MainTabs', { screen: 'Weather', params: { spot } });
  };

  const getRecommendations = (spot) => {
    const recommendations = {
      '1': ['Maglakbay sa dry season para sa pinakamagandang tanawin', 'Mag-hire ng local guide para sa hiking trails', 'Subukan ang sikat na Boholano cuisine sa paligid'],
      '2': ['Mag-book ng beachfront resorts nang maaga', 'Subukan ang water sports at diving', 'Bisitahin ang nearby Alona Beach para sa nightlife'],
      '3': ['Mag-book ng guided tours nang maaga', 'Bisitahin ng early morning kapag pinaka-active ang tarsiers', 'Suportahan ang conservation efforts'],
      '4': ['Mag-book ng cruise tickets online', 'Subukan ang floating restaurant experience', 'Mag-enjoy sa traditional music performances'],
      '5': ['Bisitahin ng early morning para iwas sa crowds', 'Galugarin ang museum sa loob', 'Alamin ang Philippine colonial history'],
      '6': ['Mag-suot ng comfortable hiking shoes', 'Bisitahin sa wet season para sa full flow', 'Lumangoy sa natural pools'],
      '7': ['Alamin ang Philippine-Spanish history', 'Bisitahin ang nearby museum', 'Perpekto para sa history enthusiasts'],
      '8': ['Subukan ang organic honey products', 'Bisitahin ang butterfly garden', 'Educational experience para sa lahat ng edad'],
      '9': ['Mag-relax sa pristine white sands', 'Galugarin ang nearby caves at coves', 'Mag-enjoy ng fresh seafood sa local eateries'],
    };
    return recommendations[spot.id] || ['Galugarin at mag-enjoy!', 'Kumuha ng photos', 'Alamin ang local culture'];
  };

  const getRandomRating = () => {
    return (Math.random() * 1 + 4).toFixed(1);
  };

  const recommenderNames = ['Chad', 'Charm', 'Ashley', 'Ivy', 'Jeziel', 'Alfred', 'Jessamie', 'Eugene', 'JohnLee ', 'Kent'];

  const getRandomRecommender = () => {
    return recommenderNames[Math.floor(Math.random() * recommenderNames.length)];
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image source={spotImages[spot.id]} style={styles.spotImage} />

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>{spot.title}</Text>
        <Text style={[styles.description, { color: theme.colors.text }]}>{spot.description}</Text>

        <View style={[styles.detailsContainer, theme.shadows.cardShadow]}>
          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Location:</Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>{spot.location}</Text>

          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Rating:</Text>
          <Text style={[styles.detailValue, { color: theme.colors.accent }]}>⭐ {spot.rating || getRandomRating()}/5</Text>

          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Entry Fee:</Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>{spot.entryFee || 'Free'}</Text>

          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Best Time to Visit:</Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>{spot.bestTime || 'Anytime'}</Text>
        </View>

        <View style={[styles.recommendationsSection, theme.shadows.cardShadow]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.secondary }]}>Travel Recommendations</Text>
          {getRecommendations(spot).map((rec, index) => (
            <Text key={index} style={[styles.recommendationText, { color: theme.colors.textSecondary }]}>• Recommended by {getRandomRecommender()}: {rec}</Text>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.mapButton, theme.shadows.buttonShadow]} onPress={navigateToMap}>
            <Text style={[styles.buttonText, { color: theme.colors.card }]}>View on Map</Text>
          </TouchableOpacity>
          <View style={styles.buttonSpacer} />
          <TouchableOpacity style={[styles.weatherButton, theme.shadows.buttonShadow]} onPress={navigateToWeather}>
            <Text style={[styles.buttonText, { color: theme.colors.card }]}>Full Weather Details</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.directionsButton, theme.shadows.buttonShadow]} onPress={getDirections}>
          <Text style={[styles.buttonText, { color: theme.colors.card }]}>Get Directions from Current Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.backButton, theme.shadows.buttonShadow]} onPress={() => navigation.goBack()}>
          <Text style={[styles.buttonText, { color: theme.colors.card }]}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

DetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spotImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: theme.colors.card,
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendationsSection: {
    backgroundColor: theme.colors.card,
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  recommendationText: {
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  mapButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  weatherButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  directionsButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: theme.colors.textSecondary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonSpacer: {
    width: 10,
  },
});
