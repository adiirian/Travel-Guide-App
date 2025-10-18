import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Fallback mock data in case Firebase is not available
const mockGuides = [
  {
    id: '1',
    title: 'Chocolate Hills',
    description: 'Unique geological formations of over 1,200 hills that turn brown during dry season. Perfect for hiking and panoramic views.',
    location: 'Bohol',
    latitude: 9.8297,
    longitude: 124.1397,
  },
  {
    id: '2',
    title: 'Panglao Beach',
    description: 'Beautiful white sand beach with crystal clear waters. Ideal for swimming, snorkeling, and relaxation.',
    location: 'Bohol',
    latitude: 9.6268,
    longitude: 123.8056,
  },
  {
    id: '3',
    title: 'Tarsier Conservation Area',
    description: 'Home to the world\'s smallest primate. Learn about conservation efforts and observe these tiny creatures in their natural habitat.',
    location: 'Bohol',
    latitude: 9.6912,
    longitude: 123.9529,
  },
  {
    id: '4',
    title: 'Loboc River Cruise',
    description: 'Scenic river cruise with floating restaurants serving local delicacies. Enjoy the lush scenery and traditional music.',
    location: 'Bohol',
    latitude: 9.6348,
    longitude: 124.0298,
  },
  {
    id: '5',
    title: 'Baclayon Church',
    description: 'Historic church built in 1595, one of the oldest stone churches in the Philippines. Features intricate carvings and colonial architecture.',
    location: 'Bohol',
    latitude: 9.6229,
    longitude: 123.9125,
  },
  {
    id: '6',
    title: 'Trinidad Kawasan Falls',
    description: 'Multi-tiered waterfall with natural pools. Requires a short hike through lush forest trails.',
    location: 'Bohol',
    latitude: 10.0623,
    longitude: 124.3421,
  },
  {
    id: '7',
    title: 'Blood Compact Shrine',
    description: 'Historic site commemorating the first blood compact between Spaniards and Filipinos in 1565.',
    location: 'Bohol',
    latitude: 9.6273,
    longitude: 123.8788,
  },
  {
    id: '8',
    title: 'Bohol Bee Farm',
    description: 'Learn about stingless bees and taste organic honey products. Includes butterfly garden and mini zoo.',
    location: 'Bohol',
    latitude: 9.5757,
    longitude: 123.8271,
  },
  {
    id: '9',
    title: 'Anda White Long Beach',
    description: 'This is a soulful place where the everyday stresses of life are left behind, and you can reconnect with nature, we call it luxury comfort.',
    location: 'Bohol',
    latitude: 9.7417,
    longitude: 124.5758,
  },

];

export async function fetchGuides(searchQuery) {
  try {
    // Try to fetch from Firebase first
    const guidesRef = collection(db, 'guides');
    let q = guidesRef;
    if (searchQuery) {
      q = query(guidesRef, where('location', '==', searchQuery));
    }
    const snapshot = await getDocs(q);
    const guides = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // If Firebase has data, return it
    if (guides.length > 0) {
      return guides;
    }

    // Fallback to mock data if no Firebase data
    console.log('No guides found in Firebase, using mock data');
    if (!searchQuery) {
      return mockGuides;
    }
    return mockGuides.filter(guide => guide.location.toLowerCase().includes(searchQuery.toLowerCase()));
  } catch (error) {
    console.error('Error fetching guides from Firebase:', error);
    // Fallback to mock data on error
    console.log('Firebase error, using mock data as fallback');
    if (!searchQuery) {
      return mockGuides;
    }
    return mockGuides.filter(guide => guide.location.toLowerCase().includes(searchQuery.toLowerCase()));
  }
}
