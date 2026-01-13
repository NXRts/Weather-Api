import { useState, useEffect } from 'react';
import { CurrentWeatherData, ForecastData } from '@/types';

const API_KEY = 'e53a57414b3e476583e132430261301';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherState {
  current: CurrentWeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
}

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherState>({
    current: null,
    forecast: null,
    loading: false,
    error: null,
  });

  const fetchWeather = async (city: string) => {
    setWeatherData(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Fetch Current Weather
      const currentRes = await fetch(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!currentRes.ok) {
        throw new Error(currentRes.status === 404 ? 'City not found' : 'Failed to fetch weather');
      }

      const currentData: CurrentWeatherData = await currentRes.json();

      // Fetch 5-Day Forecast
      const forecastRes = await fetch(
        `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!forecastRes.ok) {
        throw new Error('Failed to fetch forecast');
      }

      const forecastData: ForecastData = await forecastRes.json();

      setWeatherData({
        current: currentData,
        forecast: forecastData,
        loading: false,
        error: null,
      });

    } catch (err) {
      setWeatherData(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'An unknown error occurred',
        current: null,
        forecast: null
      }));
    }
  };

  // Initial fetch for a default city
  useEffect(() => {
    fetchWeather('Jakarta');
  }, []);

  return { ...weatherData, fetchWeather };
};
