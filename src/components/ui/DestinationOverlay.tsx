import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { BIRTHDAY_CONFIG } from '../../config/birthday';
import { Camera, ArrowLeft, Star, MapPin, Sparkles, CheckCircle2, Bookmark } from 'lucide-react';

export const DestinationOverlay: React.FC = () => {
  const {
    gameState,
    selectedDestination,
    collectedItemIds,
    collectItem,
    leaveDestination,
    togglePhotoModal,
    setActiveMemoryModal
  } = useGameStore();

  if (gameState !== 'DESTINATION' || !selectedDestination) {
    return null;
  }

  // Find if there is a personal birthday memory fragment hidden at this location
  const matchingMemory = BIRTHDAY_CONFIG.personalMemories.find(
    (m) => m.locationId === selectedDestination.id
  );

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-10 select-none">
      {/* Top Left: Destination Title & Continent Tag */}
      <div className="pointer-events-auto max-w-md bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-2xl transition-all animate-fade-in">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-semibold text-white"
            style={{ backgroundColor: selectedDestination.accentColor }}
          >
            {selectedDestination.continent}
          </span>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            {selectedDestination.country}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-serif italic font-light text-slate-100 mb-2">
          {selectedDestination.name}
        </h2>

        <p className="text-xs font-sans text-slate-300 leading-relaxed mb-4">
          {selectedDestination.description}
        </p>

        {/* Personal Memory Fragment Alert */}
        {matchingMemory && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{matchingMemory.icon || '✉️'}</span>
              <div>
                <p className="text-xs font-bold text-amber-200">{matchingMemory.title}</p>
                <p className="text-[10px] text-amber-300/80">Memory Fragment Found!</p>
              </div>
            </div>
            <button
              onClick={() => setActiveMemoryModal(matchingMemory.id)}
              className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-mono text-[10px] font-bold uppercase hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Read Note
            </button>
          </div>
        )}

        {/* Collectibles Checklist */}
        <div className="border-t border-slate-800 pt-3">
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Discovered Treasures (Click in 3D scene):
          </p>
          <div className="space-y-1.5">
            {selectedDestination.collectibles.map((item) => {
              const isCollected = collectedItemIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => !isCollected && collectItem(item.id)}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono transition-all ${
                    isCollected
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:border-slate-700 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCollected ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Star className="w-4 h-4 text-amber-400 animate-pulse" />
                    )}
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {isCollected ? 'COLLECTED' : 'CLICK TO PICK UP'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="pointer-events-auto flex items-center justify-between w-full max-w-4xl mx-auto">
        <button
          onClick={leaveDestination}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-emerald-400 text-slate-200 hover:text-emerald-300 font-mono text-xs uppercase tracking-wider transition-all shadow-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Earth Orbit</span>
        </button>

        <button
          onClick={() => togglePhotoModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-400/50 hover:border-amber-300 text-amber-200 font-mono text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 cursor-pointer"
        >
          <Camera className="w-4 h-4 text-amber-400" />
          <span>Capture Postcard Photo</span>
        </button>
      </div>
    </div>
  );
};
