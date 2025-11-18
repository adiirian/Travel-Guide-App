import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Image } from 'react-native';
import { theme } from '../styles/theme';

const members = [
  { id: '1', name: 'Charl Hans Adrian Acuesta', role: 'Leader', image: require('../../assets/images/members/chad.jpg') },
  { id: '2', name: 'Charm Davalan Rubion', role: 'Member', image: require('../../assets/images/members/charm.jpg') },
  { id: '3', name: 'Ashley Joy Besan', role: 'Member', image: require('../../assets/images/members/ashley.jpg') },
  { id: '4', name: 'Ivy Jane Tura', role: 'Member', image: require('../../assets/images/members/ivy.jpg') },
  { id: '5', name: 'Jeziel Ayag', role: 'Member', image: require('../../assets/images/members/jeziel.jpg') },
  { id: '6', name: 'Alfred Timothy Marbas', role: 'Member', image: require('../../assets/images/members/alfred.jpg') },
  { id: '7', name: 'Jessamie Patron', role: 'Member', image: require('../../assets/images/members/jessamie.jpg') },
  { id: '8', name: 'Eugene Wahing', role: 'Member', image: require('../../assets/images/members/eugene.jpg') },
  { id: '9', name: 'John Lee Ranque', role: 'Member', image: require('../../assets/images/members/ranque.jpg') },
  { id: '10', name: 'Kent Audeemel Manayon', role: 'Member', image: require('../../assets/images/members/kent.jpg') },
];

export default function AboutScreen() {
  const renderMember = ({ item }) => (
    <View style={[styles.memberCard, theme.shadows.cardShadow]}>
      <Image source={item.image} style={styles.memberImage} />
      <Text style={[styles.memberName, { color: theme.colors.text }]}>{item.name}</Text>
      <Text style={[styles.memberRole, { color: theme.colors.secondary }]}>{item.role}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.headerSection, theme.shadows.cardShadow]}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>About Maglakbay sa Bohol</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Your Ultimate Travel Companion for Bohol Adventures
        </Text>
      </View>

      <View style={[styles.purposeSection, theme.shadows.cardShadow]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Our Purpose</Text>
        <Text style={[styles.purposeText, { color: theme.colors.text }]}>
          Maglakbay sa Bohol is designed to be your comprehensive guide to exploring the beautiful island of Bohol, Philippines.
          Our app provides travelers with essential information about tourist spots, real-time weather updates, interactive maps,
          and insider travel tips to make your Bohol experience unforgettable.
        </Text>
        <Text style={[styles.purposeText, { color: theme.colors.text }]}>
          Whether you&apos;re planning a day trip to the iconic Chocolate Hills, seeking adventure at pristine beaches, or discovering
          hidden gems like tarsier sanctuaries, our app ensures you have all the tools needed for a seamless and enjoyable journey.
        </Text>
        <Text style={[styles.purposeText, { color: theme.colors.text }]}>
          Join us in celebrating Bohol&apos;s natural wonders, rich culture, and warm hospitality. Your Bohol story starts here! 🌴🏖️
        </Text>
      </View>

      <View style={[styles.teamSection, theme.shadows.cardShadow]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Meet Our Team</Text>
        <Text style={[styles.teamSubtitle, { color: theme.colors.textSecondary }]}>
          The passionate creators behind Maglakbay sa Bohol&apos;s
        </Text>
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={renderMember}
          numColumns={2}
          contentContainerStyle={styles.membersList}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    backgroundColor: theme.colors.card,
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  purposeSection: {
    backgroundColor: theme.colors.card,
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  purposeText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  teamSection: {
    backgroundColor: theme.colors.card,
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  teamSubtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  membersList: {
    paddingVertical: 10,
  },
  memberCard: {
    backgroundColor: theme.colors.background,
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  memberImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  memberName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  memberRole: {
    fontSize: 12,
    textAlign: 'center',
  },
});
