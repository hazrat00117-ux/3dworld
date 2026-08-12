import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { BIRTHDAY_CONFIG } from '../../config/birthday';
import { DESTINATIONS_DATA } from '../../config/destinationsData';
import { X, Heart, MapPin, Sparkles } from 'lucide-react';

export const PersonalMemoryModal: React.FC = () => {
  const { activeMemoryModalId, setActiveMemoryModal } = useGameStore();

  if (!activeMemoryModalId) return null;

  const memory = BIRTHDAY_CONFIG.personalMemories.find((m) => m.id === activeMemoryModalId);
  if (!memory) return null;

  const dest = DESTINATIONS_DATA.find((d) => d.id === memory.locationId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-400/40 rounded-3xl p-8 shadow-2xl text-slate-100 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{memory.icon || '💌'}</span>
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                {memory.date || 'Memory Fragment'}
              </span>
              <h3 className="font-serif italic text-xl font-light text-white">{memory.title}</h3>
            </div>
          </div>
          <button
            onClick={() => setActiveMemoryModal(null)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location Tag */}
        {dest && (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg w-fit border border-emerald-500/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>Discovered at {dest.name}, {dest.country}</span>
          </div>
        )}

        {/* Note Content */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-serif italic text-base text-slate-200 leading-relaxed">
          "{memory.message}"
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2 font-mono text-xs text-slate-400">
          <span>Saved to your World Journal</span>
          <button
            onClick={() => setActiveMemoryModal(null)}
            className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold uppercase hover:bg-amber-300 transition-colors cursor-pointer"
          >
            Close Note
          </button>
        </div>

      </div>
    </div>
  );
};
