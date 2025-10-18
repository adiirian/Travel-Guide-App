import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Button, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getWeatherByLocation } from '../services/weatherService';

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
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    setLoadingWeather(true);
    try {
      const weatherData = await getWeatherByLocation(spot.latitude, spot.longitude);
      setWeather(weatherData);
    } catch (error) {
      console.error('Error loading weather:', error);
      setWeatherError('Failed to load weather data. Please check your internet connection.');
    } finally {
      setLoadingWeather(false);
    }
  };

  const navigateToMap = () => {
    navigation.navigate('MainTabs', { screen: 'Map', params: { spot } });
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

        <View style={styles.weatherSection}>
          <Text style={styles.sectionTitle}>Current Weather</Text>
          {loadingWeather ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : weatherError ? (
            <Text style={styles.weatherError}>{weatherError}</Text>
          ) : weather ? (
            <View style={styles.weatherContainer}>
              <Text style={styles.weatherTemp}>{Math.round(weather.main.temp)}°C</Text>
              <Text style={styles.weatherDesc}>{weather.weather[0].description}</Text>
              <Text style={styles.weatherDetails}>
                Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s
              </Text>
            </View>
          ) : null}
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
  weatherSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 10,
  },
  weatherContainer: {
    alignItems: 'center',
  },
  weatherTemp: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  weatherDesc: {
    fontSize: 16,
    color: '#34495e',
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  weatherDetails: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  weatherError: {
    fontSize: 14,
    color: '#e74c3c',
    textAlign: 'center',
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
