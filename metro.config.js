const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  'react-native-maps': '@teovilla/react-native-web-maps',
};

// Optimize bundling for large apps
config.maxWorkers = 2; // Reduce workers to prevent memory issues
config.transformer.minifierConfig = {
  compress: {
    drop_console: true, // Remove console.logs in production
  },
};

module.exports = config;
