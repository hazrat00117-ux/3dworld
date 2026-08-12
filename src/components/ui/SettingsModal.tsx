import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { X, Settings, RotateCcw, Unlock, ShieldCheck } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    toggleSettings,
    qualityMode,
    setQualityMode,
    resetProgress,
    unlockAll
  } = useGameStore();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-400" />
            <h3 className="font-serif italic text-lg font-medium text-white">Adventure Settings</h3>
          </div>
          <button
            onClick={() => toggleSettings(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quality Controls */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Graphics Quality
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setQualityMode('high')}
              className={`p-3 rounded-xl border font-mono text-xs transition-all cursor-pointer ${
                qualityMode === 'high'
                  ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              High (Shaders & Stars)
            </button>
            <button
              onClick={() => setQualityMode('low')}
              className={`p-3 rounded-xl border font-mono text-xs transition-all cursor-pointer ${
                qualityMode === 'low'
                  ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              Performance Mode
            </button>
          </div>
        </div>

        {/* Debug / Cheats */}
        <div className="pt-2 border-t border-slate-800 space-y-3">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Developer / Secret Actions
          </label>

          <button
            onClick={() => {
              unlockAll();
              toggleSettings(false);
            }}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 font-mono text-xs uppercase tracking-wider hover:bg-amber-500/20 transition-all cursor-pointer"
          >
            <Unlock className="w-4 h-4" />
            <span>Unlock All 70 Destinations & Secret</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset your travel passport progress?')) {
                resetProgress();
              }
            }}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs uppercase tracking-wider hover:bg-rose-500/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Save File</span>
          </button>
        </div>

      </div>
    </div>
  );
};
