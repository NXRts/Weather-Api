export default function WeatherSkeleton() {
  const glassPanelClass = "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl";
  const glassCardClass = "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl";

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-8 animate-pulse">
      {/* Search Bar Skeleton */}
      <div className="h-12 bg-white/10 rounded-xl w-full backdrop-blur-sm" />

      {/* Current Weather Skeleton */}
      <div className={`${glassPanelClass} rounded-3xl p-8 text-center space-y-6 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        <div className="h-8 w-48 bg-white/10 rounded-lg mx-auto" />
        <div className="h-24 w-24 bg-white/10 rounded-full mx-auto" />
        <div className="h-20 w-32 bg-white/10 rounded-lg mx-auto" />
        
        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="h-16 bg-white/10 rounded-xl" />
          <div className="h-16 bg-white/10 rounded-xl" />
          <div className="h-16 bg-white/10 rounded-xl" />
        </div>
      </div>

      {/* Forecast Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`${glassCardClass} h-40 rounded-xl relative overflow-hidden`}>
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
