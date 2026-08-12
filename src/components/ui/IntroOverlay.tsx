import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { BIRTHDAY_CONFIG } from '../../config/birthday';
import { Sparkles, Globe, Compass } from 'lucide-react';

export const IntroOverlay: React.FC = () => {
  const { enterWorld, moonClicks } = useGameStore();

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-between p-8 bg-slate-950/80 backdrop-blur-md select-none text-white overflow-hidden">
      {/* Background Subtle Star Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950/60 to-slate-950 pointer-events-none" />

      {/* Top HUD Status */}
      <div className="w-full flex justify-between items-center z-10 text-xs font-mono text-slate-400 tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-400 animate-spin-slow" />
          <span>STATUS: INIT_WORLD</span>
        </div>
        <div className="text-emerald-400 font-semibold tracking-wider">
          SECTOR: 04-B
        </div>
      </div>

      {/* Main Title & Invitation */}
      <div className="flex flex-col items-center text-center z-10 my-auto max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>A SPECIAL DISCOVERY</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif italic text-slate-100 font-light tracking-wide leading-tight mb-4">
          "Someone left you a world."
        </h1>

        <p className="font-mono text-xs text-slate-400 tracking-[0.25em] uppercase mb-10 max-w-md">
          {BIRTHDAY_CONFIG.subtitle}
        </p>

        {/* Enter Button */}
        <button
          onClick={enterWorld}
          className="group relative px-10 py-4 border border-slate-300/30 hover:border-emerald-400 rounded bg-slate-900/40 hover:bg-emerald-500/10 text-white font-mono text-xs tracking-[0.3em] uppercase transition-all duration-300 transform hover:scale-105 shadow-2xl active:scale-95 cursor-pointer flex items-center gap-3"
        >
          <Compass className="w-4 h-4 text-emerald-400 group-hover:rotate-180 transition-transform duration-700" />
          <span>[ ENTER WORLD ]</span>
        </button>

        {moonClicks >= 3 && (
          <div className="mt-8 px-4 py-2 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono animate-bounce">
            🌙 Moon Easter Egg Discovered! "+1 Curiosity Token"
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="w-full flex justify-center z-10 font-mono text-[11px] text-slate-500 tracking-[0.2em] uppercase">
        <span>DRAG TO ROTATE &bull; SCROLL TO ZOOM &bull; CLICK LOCATIONS TO EXPLORE</span>
      </div>
    </div>
  );
};
