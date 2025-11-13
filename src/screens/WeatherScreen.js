import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { getWeatherByLocation } from '../services/weatherService';

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
        // Default to Tagbilaran, Bohol, Philippines (capital city) for accurate location display
        lat = 9.6538;
        lng = 123.8535;
      }
      const weatherData = await getWeatherByLocation(lat, lng);
      setWeather(weatherData);
    } catch (err) {
      setError(err.message || 'Failed to load weather data. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToGuides = () => {
    navigation.navigate('MainTabs', { screen: 'Guides' });
  };

  if (loading) {
    return (
      <LinearGradient colors={['#2E8B57', '#3CB371']} style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading weather...</Text>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={['#2E8B57', '#3CB371']} style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button title="Retry" onPress={loadWeather} />
        <Button title="Back to Guides" onPress={navigateToGuides} />
      </LinearGradient>
    );
  }

  const getWeatherIcon = (description) => {
    const icons = {
      'clear sky': '☀️',
      'mainly clear': '🌤️',
      'partly cloudy': '⛅',
      'overcast': '☁️',
      'fog': '🌫️',
      'depositing rime fog': '🌫️',
      'light drizzle': '🌦️',
      'moderate drizzle': '🌦️',
      'dense drizzle': '🌦️',
      'light freezing drizzle': '🌨️',
      'dense freezing drizzle': '🌨️',
      'slight rain': '🌧️',
      'moderate rain': '🌧️',
      'heavy rain': '🌧️',
      'light freezing rain': '🌨️',
      'heavy freezing rain': '🌨️',
      'slight snow fall': '❄️',
      'moderate snow fall': '❄️',
      'heavy snow fall': '❄️',
      'snow grains': '❄️',
      'slight rain showers': '🌦️',
      'moderate rain showers': '🌦️',
      'heavy rain showers': '🌦️',
      'slight snow showers': '❄️',
      'heavy snow showers': '❄️',
      'thunderstorm': '⛈️',
      'thunderstorm with slight hail': '⛈️',
      'thunderstorm with heavy hail': '⛈️',
    };
    return icons[description] || '🌤️';
  };

  const getWeatherGradient = (description) => {
    const gradients = {
      'clear sky': ['#FFD700', '#FFA500'], // Sunny: gold to orange
      'mainly clear': ['#FFD700', '#FFA500'],
      'partly cloudy': ['#87CEEB', '#4682B4'], // Light blue to steel blue
      'overcast': ['#708090', '#2F4F4F'], // Slate gray to dark slate gray
      'fog': ['#D3D3D3', '#A9A9A9'], // Light gray to dark gray
      'depositing rime fog': ['#D3D3D3', '#A9A9A9'],
      'light drizzle': ['#87CEEB', '#4682B4'],
      'moderate drizzle': ['#87CEEB', '#4682B4'],
      'dense drizzle': ['#87CEEB', '#4682B4'],
      'light freezing drizzle': ['#B0E0E6', '#4682B4'], // Powder blue to steel blue
      'dense freezing drizzle': ['#B0E0E6', '#4682B4'],
      'slight rain': ['#4682B4', '#2E8B57'], // Steel blue to sea green
      'moderate rain': ['#4682B4', '#2E8B57'],
      'heavy rain': ['#4682B4', '#2E8B57'],
      'light freezing rain': ['#B0E0E6', '#4682B4'],
      'heavy freezing rain': ['#B0E0E6', '#4682B4'],
      'slight snow fall': ['#FFFFFF', '#E0FFFF'], // White to light cyan
      'moderate snow fall': ['#FFFFFF', '#E0FFFF'],
      'heavy snow fall': ['#FFFFFF', '#E0FFFF'],
      'snow grains': ['#FFFFFF', '#E0FFFF'],
      'slight rain showers': ['#4682B4', '#2E8B57'],
      'moderate rain showers': ['#4682B4', '#2E8B57'],
      'heavy rain showers': ['#4682B4', '#2E8B57'],
      'slight snow showers': ['#FFFFFF', '#E0FFFF'],
      'heavy snow showers': ['#FFFFFF', '#E0FFFF'],
      'thunderstorm': ['#2F4F4F', '#000000'], // Dark slate gray to black
      'thunderstorm with slight hail': ['#2F4F4F', '#000000'],
      'thunderstorm with heavy hail': ['#2F4F4F', '#000000'],
    };
    return gradients[description] || ['#2E8B57', '#3CB371']; // Default green gradient
  };

  const gradientColors = weather ? getWeatherGradient(weather.weather[0].description) : ['#2E8B57', '#3CB371'];

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <Text style={styles.title}>🌤️ Current Weather</Text>
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{spot ? spot.title : 'Tagbilaran, Bohol'}</Text>
          <Text style={styles.weatherIcon}>{getWeatherIcon(weather.weather[0].description)}</Text>
          <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.details}>💧 Humidity: {weather.main.humidity}%</Text>
            <Text style={styles.details}>💨 Wind: {weather.wind.speed} m/s</Text>
            <Text style={styles.details}>🌡️ Feels like: {Math.round(weather.main.temp)}°C</Text>
            <Text style={styles.details}>🌀 Pressure: {weather.main.pressure ? Math.round(weather.main.pressure) + ' hPa' : 'N/A'}</Text>
            <Text style={styles.details}>👁️ Visibility: {weather.visibility ? (weather.visibility / 1000).toFixed(1) + ' km' : 'Good'}</Text>
          </View>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="🔄 Refresh" onPress={loadWeather} />
        <View style={styles.buttonSpacer} />
        <Button title="📚 Back to Guides" onPress={navigateToGuides} />
      </View>
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
    width: '90%',
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherIcon: {
    fontSize: 60,
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
    marginBottom: 15,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  buttonSpacer: {
    width: 20,
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
