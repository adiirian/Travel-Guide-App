import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Alert, Button, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { getWeatherByLocation, getWeatherByCity } from '../services/weatherService';

export default function WeatherScreen({ navigation }) {
  const route = useRoute();
  const spot = route.params?.spot;
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      let lat, lng;
      if (spot && spot.latitude && spot.longitude) {
        lat = spot.latitude;
        lng = spot.longitude;
      } else {
        // Default to Tagbilaran, Bohol, Philippines (capital city) for accurate location display~
        const weatherData = await getWeatherByCity('Tagbilaran,PH');
        setWeather(weatherData);
        return;
      }
      const weatherData = await getWeatherByLocation(lat, lng);
      setWeather(weatherData);
    } catch (err) {
      setError(err.message || 'Failed to load weather data. Please check your internet connection.');
      Alert.alert('Weather Error', err.message || 'Failed to load weather data. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToHome = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading weather...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button title="Retry" onPress={loadWeather} />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#87CEEB', '#4682B4']} style={styles.container}>
      <Text style={styles.title}>Current Weather</Text>
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
          <Text style={styles.details}>Humidity: {weather.main.humidity}%</Text>
          <Text style={styles.details}>Wind: {weather.wind.speed} m/s</Text>
        </View>
      )}
      <Button title="Refresh" onPress={loadWeather} />
      <Button title="Back to Home" onPress={navigateToHome} />
    </LinearGradient>
  );
}

WeatherScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  weatherContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
});
