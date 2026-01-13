import { ForecastData } from '@/types';
import Image from 'next/image';

interface ForecastRowProps {
  data: ForecastData;
}

export default function ForecastRow({ data }: ForecastRowProps) {
  const dailyForecasts = data.list.filter((item) => item.dt_txt.includes('12:00:00'));
  const displayForecasts = dailyForecasts.slice(0, 5);
  
  const glassCardClass = "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]";

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in-up">
      <h3 className="text-xl font-medium text-white/80 mb-6 pl-2">5-Day Forecast</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {displayForecasts.map((forecast) => {
          const date = new Date(forecast.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          
          return (
            <div 
              key={forecast.dt}
              className={`${glassCardClass} flex flex-col items-center justify-between p-4 py-6 text-white`}
            >
              <div className="text-center mb-2">
                <p className="font-semibold text-lg">{dayName}</p>
                <p className="text-xs text-white/60">{dateStr}</p>
              </div>
              
              <div className="relative w-16 h-16 my-2">
                 <Image
                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                  alt={forecast.weather[0].description}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold">{Math.round(forecast.main.temp)}°</p>
                <p className="text-xs text-white/70 capitalize truncate w-full px-2">
                  {forecast.weather[0].description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
