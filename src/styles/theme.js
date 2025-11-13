export const theme = {
  colors: {
    primary: '#1E40AF', // Deep ocean blue for headers and maps
    secondary: '#059669', // Lush green for accents and buttons
    accent: '#F97316', // Warm amber for highlights and ratings
    background: '#F9FAFB', // Light neutral for overall background
    card: 'white', // Card backgrounds
    text: '#1F2937', // Primary text color (dark gray)
    textSecondary: '#6B7280', // Secondary text (medium gray)
    shadow: '#000', // Shadow color
    error: '#EF4444', // For errors
  },
  shadows: {
    cardShadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    smallShadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonShadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
  },
  typography: {
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    subtitle: {
      fontSize: 14,
      fontWeight: '500',
    },
    small: {
      fontSize: 12,
    },
  },
  gradients: {
    default: ['#1E40AF', '#059669'], // Fallback gradient
    sunny: ['#FFD700', '#FFA500'], // Clear/sunny
    cloudy: ['#A9A9A9', '#696969'], // Clouds
    rainy: ['#4682B4', '#1E3A8A'], // Rain
  },
};
