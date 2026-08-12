import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { DESTINATIONS_DATA, CONTINENTS } from '../../config/destinationsData';
import { soundService } from '../../services/soundService';
import { BookOpen, Volume2, VolumeX, Settings, Globe, Filter, Sparkles, Navigation } from 'lucide-react';

export const HudHeader: React.FC = () => {
  const {
    gameState,
    visitedDestinationIds,
    collectedItemIds,
    unlockedSecret,
    toggleJournal,
    toggleSettings,
    activeContinentFilter,
    setContinentFilter,
    triggerFinalCinematic
  } = useGameStore();

  const [isMuted, setIsMuted] = useState(soundService.getMuted());

  // Calculate stats
  const totalVisited = visitedDestinationIds.length;
  const visitedContinentsCount = new Set(
    DESTINATIONS_DATA.filter((d) => visitedDestinationIds.includes(d.id)).map((d) => d.continent)
  ).size;

  const handleToggleMute = () => {
    const muted = soundService.toggleMute();
    setIsMuted(muted);
  };

  if (gameState === 'INTRO' || gameState === 'FINAL_REVEAL') {
    return null;
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex flex-wrap items-center justify-between px-6 py-4 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent pointer-events-auto select-none">
      {/* Left: Journey Status & Globe Indicator */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900/80 border border-slate-700/50 text-slate-200">
          <Globe className="w-4 h-4 text-emerald-400 animate-spin-slow" />
          <span className="font-mono text-xs font-semibold tracking-wider text-emerald-400">
            {gameState === 'DESTINATION' ? 'VISITING_LANDMARK' : 'ORBIT_MODE'}
          </span>
        </div>

        {/* Continent Filter Selector */}
        {gameState === 'WORLD' && (
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
            <select
              value={activeContinentFilter}
              onChange={(e) => setContinentFilter(e.target.value)}
              className="bg-transparent text-xs font-mono text-slate-300 focus:outline-none cursor-pointer pr-2"
            >
              <option value="All" className="bg-slate-900 text-white">All Continents</option>
              {CONTINENTS.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Center / Right Metrics */}
      <div className="flex items-center gap-6 font-mono text-xs">
        {/* Discovered Continents */}
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Continents</span>
          <span className="font-bold text-emerald-400">{visitedContinentsCount} / 07</span>
        </div>

        {/* Collected Items */}
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Memories</span>
          <span className="font-bold text-amber-400">{collectedItemIds.length} Collected</span>
        </div>

        {/* Final Secret Quest Banner Button if Secret unlocked */}
        {unlockedSecret && gameState === 'WORLD' && (
          <button
            onClick={triggerFinalCinematic}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-rose-500/20 to-amber-500/20 border border-amber-400/60 text-amber-300 font-mono text-xs tracking-wider uppercase animate-pulse hover:scale-105 transition-all shadow-lg cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Final Quest Unlocked ✨</span>
          </button>
        )}

        {/* Journal Button */}
        <button
          onClick={() => toggleJournal(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-white transition-all shadow-md cursor-pointer font-mono text-xs"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span className="hidden md:inline">Journal</span>
        </button>

        {/* Mute Button */}
        <button
          onClick={handleToggleMute}
          className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-all cursor-pointer"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        {/* Settings Button */}
        <button
          onClick={() => toggleSettings(true)}
          className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-all cursor-pointer"
          title="Game Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
