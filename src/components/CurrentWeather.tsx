import { CurrentWeatherData } from '@/types';
import { Droplets, Wind, Gauge, MapPin } from 'lucide-react';
import Image from 'next/image';

interface CurrentWeatherProps {
  data: CurrentWeatherData;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const { main, weather, wind, name, sys } = data;
  const current = weather[0];

  // Glass panel styles replaced inline
  const glassPanelClass = "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl";
  const glassCardClass = "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]";

  return (
    <div className={`${glassPanelClass} rounded-3xl p-8 mb-8 text-white relative overflow-hidden animate-fade-in`}>
      {/* Decorative Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-2 opacity-80">
        <MapPin className="w-5 h-5" />
        <h2 className="text-2xl font-medium tracking-wide">
          {name}, {sys.country}
        </h2>
      </div>
      <p className="text-center text-white/60 text-sm mb-6">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </p>

      {/* Main Temp & Icon */}
      <div className="flex flex-col items-center justify-center mb-8 relative z-10">
        <div className="relative w-32 h-32 md:w-40 md:h-40 filter drop-shadow-2xl">
          <Image
            src={`https://openweathermap.org/img/wn/${current.icon}@4x.png`}
            alt={current.description}
            fill
            className="object-contain"
            priority 
            unoptimized
          />
        </div>
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 pb-2">
            {Math.round(main.temp)}°
          </h1>
          <p className="text-xl md:text-2xl capitalize font-light tracking-wider text-white/90">
            {current.description}
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-8">
        <div className={`${glassCardClass} p-4 flex flex-col items-center justify-center gap-2 text-center`}>
          <Droplets className="w-6 h-6 text-blue-300" />
          <div>
            <span className="text-sm text-white/60">Humidity</span>
            <p className="text-lg font-semibold">{main.humidity}%</p>
          </div>
        </div>
        <div className={`${glassCardClass} p-4 flex flex-col items-center justify-center gap-2 text-center`}>
          <Wind className="w-6 h-6 text-gray-300" />
          <div>
            <span className="text-sm text-white/60">Wind</span>
            <p className="text-lg font-semibold">{Math.round(wind.speed)} m/s</p>
          </div>
        </div>
        <div className={`${glassCardClass} p-4 flex flex-col items-center justify-center gap-2 text-center`}>
          <Gauge className="w-6 h-6 text-purple-300" />
          <div>
            <span className="text-sm text-white/60">Pressure</span>
            <p className="text-lg font-semibold">{main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
}
