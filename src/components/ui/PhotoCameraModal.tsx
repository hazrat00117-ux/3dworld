import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Camera, X, Check, Sparkles } from 'lucide-react';

const PHOTO_FILTERS = [
  { id: 'classic', name: 'Golden Hour' },
  { id: 'vintage', name: 'Vintage Sepia' },
  { id: 'cyan', name: 'Midnight Starlight' },
  { id: 'polaroid', name: 'Polaroid Memory' }
];

export const PhotoCameraModal: React.FC = () => {
  const {
    isPhotoModalOpen,
    togglePhotoModal,
    selectedDestination,
    savePhoto
  } = useGameStore();

  const [selectedFilter, setSelectedFilter] = useState('Golden Hour');

  if (!isPhotoModalOpen || !selectedDestination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif italic text-lg font-medium text-white">Postcard Photo Studio</h3>
          </div>
          <button
            onClick={() => togglePhotoModal(false)}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Postcard Frame Preview */}
        <div className="relative aspect-video rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 border-4 border-slate-800 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
          <div className="flex justify-between items-start font-mono text-[10px] text-amber-300 uppercase tracking-widest">
            <span>POSTCARD FROM {selectedDestination.country}</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>

          <div className="my-auto text-center">
            <p className="font-serif italic text-3xl text-amber-200 font-light drop-shadow-md">
              {selectedDestination.name}
            </p>
            <p className="font-mono text-xs text-sky-300 mt-1 uppercase tracking-widest">
              {selectedDestination.continent}
            </p>
          </div>

          <div className="flex justify-between items-end font-mono text-[10px] text-slate-400">
            <span>Wish you were here! ❤️</span>
            <span className="text-amber-400">{selectedFilter} Filter</span>
          </div>
        </div>

        {/* Filter Selection */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Select Style Filter:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PHOTO_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.name)}
                className={`p-2.5 rounded-xl border font-mono text-xs text-center transition-all cursor-pointer ${
                  selectedFilter === f.name
                    ? 'bg-amber-500/10 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={() => savePhoto(selectedFilter)}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Save Postcard To Passport Journal</span>
        </button>

      </div>
    </div>
  );
};
