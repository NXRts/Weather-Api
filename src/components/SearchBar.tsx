import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  const glassInputClass = "bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 outline-none focus:border-white/50 focus:bg-white/10 transition-all placeholder:text-white/50 text-white w-full";
  const glassButtonClass = "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-6 py-2 rounded-xl transition-all active:scale-95 border border-white/20 hover:border-white/40";

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto mb-8 group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-white/60 group-focus-within:text-white transition-colors" />
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for a city..."
        className={`${glassInputClass} pl-12 pr-4 py-3 placeholder:text-white/40 focus:ring-2 focus:ring-white/20 transition-all text-lg`}
      />
      <button 
        type="submit" 
        className={`absolute right-2 top-1.5 bottom-1.5 ${glassButtonClass} px-4 py-1 !rounded-lg text-sm font-medium opacity-0 group-focus-within:opacity-100 transition-opacity`}
      >
        Search
      </button>
    </form>
  );
}
