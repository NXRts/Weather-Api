'use client';

import Head from 'next/head';
import { useWeather } from '@/hooks/useWeather';
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastRow from '@/components/ForecastRow';
import WeatherSkeleton from '@/components/WeatherSkeleton';
import { CloudRain } from 'lucide-react';

export default function Home() {
  const { current, forecast, loading, error, fetchWeather } = useWeather();

  const handleSearch = (city: string) => {
    fetchWeather(city);
  };

  const glassPanelClass = "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl";

  return (
    <main className="min-h-screen py-8 px-4 md:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Header/Brand */}
        <header className="flex items-center justify-center gap-2 mb-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md border border-white/20">
            <CloudRain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Weather<span className="font-light">Scope</span>
          </h1>
        </header>

        <SearchBar onSearch={handleSearch} />

        {error && (
          <div className={`${glassPanelClass} p-4 mb-8 text-center border-red-400/30 bg-red-400/10 rounded-xl animate-fade-in`}>
            <p className="text-red-100 font-medium">
              {error === 'City not found' ? 'City not found. Please try again.' : error}
            </p>
          </div>
        )}

        {loading ? (
          <WeatherSkeleton />
        ) : (
          <>
            {current && <CurrentWeather data={current} />}
            {forecast && <ForecastRow data={forecast} />}
            
            {/* Empty state hint */}
            {!current && !forecast && !error && (
              <div className="text-center text-white/50 mt-20">
                <p>Enter a city name to see the weather.</p>
              </div>
            )}
          </>
        )}
        
        <footer className="mt-16 text-center text-white/30 text-xs">
          <p>© {new Date().getFullYear()} WeatherScope. Powered by OpenWeatherMap.</p>
        </footer>
      </div>
    </main>
  );
}
