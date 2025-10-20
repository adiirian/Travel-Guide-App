import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export async function getWeatherByLocation(lat, lng) {
  try {
    const response = await axios.get(`${BASE_URL}?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,windspeed_10m&timezone=auto`);
    const data = response.data;
    // Transform to match OpenWeather format for compatibility
    return {
      main: {
        temp: data.current_weather.temperature,
        humidity: data.hourly.relative_humidity_2m ? data.hourly.relative_humidity_2m[0] : null,
      },
      weather: [{
        description: data.current_weather.weathercode ? getWeatherDescription(data.current_weather.weathercode) : 'Unknown',
      }],
      wind: {
        speed: data.current_weather.windspeed,
      },
    };
  } catch (error) {
    throw new Error('Failed to fetch weather: ' + error.message);
  }
}

function getWeatherDescription(code) {
  const descriptions = {
    0: 'clear sky',
    1: 'mainly clear',
    2: 'partly cloudy',
    3: 'overcast',
    45: 'fog',
    48: 'depositing rime fog',
    51: 'light drizzle',
    53: 'moderate drizzle',
    55: 'dense drizzle',
    56: 'light freezing drizzle',
    57: 'dense freezing drizzle',
    61: 'slight rain',
    63: 'moderate rain',
    65: 'heavy rain',
    66: 'light freezing rain',
    67: 'heavy freezing rain',
    71: 'slight snow fall',
    73: 'moderate snow fall',
    75: 'heavy snow fall',
    77: 'snow grains',
    80: 'slight rain showers',
    81: 'moderate rain showers',
    82: 'heavy rain showers',
    85: 'slight snow showers',
    86: 'heavy snow showers',
    95: 'thunderstorm',
    96: 'thunderstorm with slight hail',
    99: 'thunderstorm with heavy hail',
  };
  return descriptions[code] || 'unknown weather';
}
