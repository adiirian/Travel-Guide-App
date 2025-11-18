import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';

import { fetchGuides } from '../services/guidesService';
import { theme } from '../styles/theme';

export default function HomeScreen({ navigation }) {
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

  // Generate random rating between 4.0 and 5.0
  const getRandomRating = () => {
    return (Math.random() * 1 + 4).toFixed(1);
  };

  // Team member names for recommendations
  const recommenderNames = ['Charl Hans Adrian Acuesta', 'Charm Rubion', 'Ashley Joy Besan', 'Ivy Jane Tura', 'Jeziel Ayag', 'Alfred Timothy Marbas', 'Jessamie Patron', 'Eugene Wahing', 'John Lee Ranque', 'Kent Audeemel Manayon'];

  const getRandomRecommender = () => {
    return recommenderNames[Math.floor(Math.random() * recommenderNames.length)];
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading Bohol spots...</Text>
      </View>
    );
  }

  // Spot images for visual appeal
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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.welcomeSection, theme.shadows.cardShadow]}>
          <Text style={[styles.appTitle, { color: theme.colors.primary }]}>🌴 Maglakbay sa Bohol: Ang Pulong-Pulong ng mga Hiwaga! 🌴</Text>
          <View style={styles.bulletsContainer}>
            <Text style={[styles.bullet, { color: theme.colors.secondary }]}>🌄 Iconic Chocolate Hills & Natural Wonders</Text>
            <Text style={[styles.bullet, { color: theme.colors.secondary }]}>🏖️ Pristine Beaches & Crystal Waters</Text>
            <Text style={[styles.bullet, { color: theme.colors.secondary }]}>🐒 Wildlife Adventures & Hidden Gems</Text>
          </View>
          <Text style={[styles.appDescription, { color: theme.colors.textSecondary }]}>Explore with real-time weather, interactive maps, and insider tips. Your Bohol story starts here! 🏖️</Text>
        </View>

        <View style={[styles.spotsSection, theme.shadows.cardShadow]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Popular Tourist Spots</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Tap any spot to explore details, maps, and weather</Text>

          <FlatList
            data={guides}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={[styles.spotItem, theme.shadows.cardShadow]}
                  onPress={() => navigateToDetails(item)}
                  activeOpacity={0.7}
                >
                  <Image source={spotImages[item.id]} style={styles.spotImage} />
                  <View style={styles.spotHeader}>
                    <Text style={[styles.spotTitle, { color: theme.colors.text }]}>{item.title}</Text>
                    <Text style={[styles.spotRating, { color: theme.colors.accent }]}>⭐ {getRandomRating()}/5</Text>
                  </View>
                  <Text style={[styles.spotHint, { color: theme.colors.textSecondary }]}>
                    {item.description.length > 50 ? `${item.description.substring(0, 50)}...` : item.description}
                  </Text>
                  <Text style={[styles.spotRecommender, { color: theme.colors.secondary }]}>Recommended by {getRandomRecommender()}</Text>
                  <Text style={[styles.spotTeaser, { color: theme.colors.textSecondary }]}>Tap to uncover the full adventure! 🌟</Text>
                </TouchableOpacity>
              );
            }}
            scrollEnabled={false}
            style={styles.list}
          />
        </View>
      </ScrollView>
    </View>
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
    paddingBottom: 20,
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
    backgroundColor: theme.colors.card,
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 15,
  },
  bulletsContainer: {
    marginBottom: 10,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
    textAlign: 'center',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  appDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  spotsSection: {
    backgroundColor: theme.colors.card,
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    marginTop: 0,
  },
  spotItem: {
    backgroundColor: theme.colors.background,
    padding: 15,
    marginVertical: 5,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
    overflow: 'hidden',
  },
  spotImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  spotTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  spotRating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  spotHint: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
  },
  spotRecommender: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  spotTeaser: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'right',
  },
});
