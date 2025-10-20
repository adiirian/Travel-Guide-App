import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Button, ScrollView, Image, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';

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

  const navigateToMap = () => {
    const coordinates = {
      '1': { lat: 9.8297, lng: 124.1397 }, // Chocolate Hills
      '2': { lat: 9.6268, lng: 123.8056 }, // Panglao Beach
      '3': { lat: 9.6912, lng: 123.9529 }, // Tarsier Conservation Area
      '4': { lat: 9.6348, lng: 124.0298 }, // Loboc River Cruise
      '5': { lat: 9.6229, lng: 123.9125 }, // Baclayon Church
      '6': { lat: 10.0623, lng: 124.3421 }, // Trinidad Kawasan Falls
      '7': { lat: 9.6273, lng: 123.8788 }, // Blood Compact Shrine
      '8': { lat: 9.5757, lng: 123.8271 }, // Bohol Bee Farm
      '9': { lat: 9.7417, lng: 124.5758 }, // Anda White Long Beach
    };

    const coord = coordinates[spot.id];
    if (coord) {
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
      '1': ['Visit during dry season for best views', 'Hire a local guide for hiking trails', 'Try the famous Boholano cuisine nearby'],
      '2': ['Book beachfront resorts in advance', 'Try water sports and diving', 'Visit nearby Alona Beach for nightlife'],
      '3': ['Book guided tours in advance', 'Visit early morning when tarsiers are most active', 'Support conservation efforts'],
      '4': ['Book cruise tickets online', 'Try the floating restaurant experience', 'Enjoy traditional music performances'],
      '5': ['Visit early morning to avoid crowds', 'Explore the museum inside', 'Learn about Philippine colonial history'],
      '6': ['Wear comfortable hiking shoes', 'Visit during wet season for full flow', 'Swim in the natural pools'],
      '7': ['Learn about Philippine-Spanish history', 'Visit the nearby museum', 'Perfect for history enthusiasts'],
      '8': ['Try the organic honey products', 'Visit the butterfly garden', 'Educational experience for all ages'],
      '9': ['Relax on the pristine white sands', 'Explore nearby caves and coves', 'Enjoy fresh seafood at local eateries'],
    };
    return recommendations[spot.id] || ['Explore and enjoy!', 'Take photos', 'Learn about local culture'];
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={spotImages[spot.id]} style={styles.spotImage} />

      <View style={styles.content}>
        <Text style={styles.title}>{spot.title}</Text>
        <Text style={styles.description}>{spot.description}</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{spot.location}</Text>

          <Text style={styles.detailLabel}>Rating:</Text>
          <Text style={styles.detailValue}>⭐ {spot.rating || 'N/A'}/5</Text>

          <Text style={styles.detailLabel}>Entry Fee:</Text>
          <Text style={styles.detailValue}>{spot.entryFee || 'Free'}</Text>

          <Text style={styles.detailLabel}>Best Time to Visit:</Text>
          <Text style={styles.detailValue}>{spot.bestTime || 'Anytime'}</Text>
        </View>



        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Travel Recommendations</Text>
          {getRecommendations(spot).map((rec, index) => (
            <Text key={index} style={styles.recommendationText}>• {rec}</Text>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="View on Map" onPress={navigateToMap} />
          <View style={styles.buttonSpacer} />
          <Button title="Full Weather Details" onPress={navigateToWeather} />
        </View>

        <Button title="Back" onPress={() => navigation.goBack()} />
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
    backgroundColor: '#f8f9fa',
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
    color: '#2c3e50',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginTop: 5,
  },
  detailValue: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 10,
  },
  recommendationsSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recommendationText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
    lineHeight: 20,
  },
  buttonContainer: {
    marginBottom: 15,
  },
  buttonSpacer: {
    height: 10,
  },
});
