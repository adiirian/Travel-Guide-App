import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
import { fetchGuides } from '../services/guidesService';

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

export default function GuidesScreen({ navigation }) {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    setLoading(true);
    try {
      const allGuides = await fetchGuides(); // Fetch all guides
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

  const navigateToHome = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
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

  const renderGuide = ({ item }) => (
    <TouchableOpacity style={styles.spotCard} onPress={() => navigateToDetails(item)}>
      <Image source={spotImages[item.id]} style={styles.spotImage} />
      <View style={styles.spotContent}>
        <Text style={styles.spotTitle}>{item.title}</Text>
        <Text style={styles.spotDescription}>{item.description}</Text>

        <View style={styles.spotDetails}>
          <Text style={styles.detailText}>⭐ Rating: {item.rating || 'N/A'}/5</Text>
          <Text style={styles.detailText}>💰 Entry: {item.entryFee || 'Free'}</Text>
          <Text style={styles.detailText}>⏰ Best Time: {item.bestTime || 'Anytime'}</Text>
        </View>

        <View style={styles.recommendations}>
          <Text style={styles.recommendationsTitle}>💡 Recommendations:</Text>
          {getRecommendations(item).map((rec, index) => (
            <Text key={index} style={styles.recommendationText}>• {rec}</Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading guides...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Travel Guides</Text>
        <Text style={styles.subtitle}>Discover Bohol&apos;s hidden gems with detailed information</Text>
      </View>

      <FlatList
        data={guides}
        keyExtractor={(item) => item.id}
        renderItem={renderGuide}
        scrollEnabled={false}
        style={styles.list}
      />

      <View style={styles.footer}>
        <Button title="Back to Home" onPress={navigateToHome} />
      </View>
    </ScrollView>
  );
}

GuidesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7f8c8d',
  },
  list: {
    padding: 20,
  },
  spotCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  spotImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  spotContent: {
    padding: 15,
  },
  spotTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  spotDescription: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 15,
  },
  spotDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  detailText: {
    fontSize: 14,
    color: '#7f8c8d',
    flex: 1,
    marginRight: 10,
  },
  recommendations: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    paddingTop: 0,
  },
});
