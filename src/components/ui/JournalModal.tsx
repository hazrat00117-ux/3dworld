import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { DESTINATIONS_DATA, CONTINENTS, CONTINENT_COLORS, Destination } from '../../config/destinationsData';
import { BIRTHDAY_CONFIG } from '../../config/birthday';
import { X, Globe, Bookmark, Camera, Sparkles, CheckCircle2, Navigation, Heart, Lock } from 'lucide-react';

export const JournalModal: React.FC = () => {
  const {
    isJournalOpen,
    toggleJournal,
    visitedDestinationIds,
    collectedItemIds,
    unlockedSecret,
    savedPhotos,
    selectDestination,
    setActiveMemoryModal,
    triggerFinalCinematic
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'continents' | 'memories' | 'photos' | 'quest'>('continents');

  if (!isJournalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-xl animate-fade-in select-none">
      {/* Journal Modal Window */}
      <div className="relative w-full max-w-4xl max-h-[85vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-400/30">
              <Globe className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-serif italic text-white">Alex's World Passport & Journal</h3>
              <p className="text-xs font-mono text-slate-400">
                {visitedDestinationIds.length} Destinations Visited &bull; {collectedItemIds.length} Memories Collected
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleJournal(false)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('continents')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'continents'
                ? 'border-emerald-400 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Continents & Map</span>
          </button>

          <button
            onClick={() => setActiveTab('memories')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'memories'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Personal Notes ({BIRTHDAY_CONFIG.personalMemories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'photos'
                ? 'border-sky-400 text-sky-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Postcards ({savedPhotos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quest')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'quest'
                ? 'border-rose-400 text-rose-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Secret Quest</span>
          </button>
        </div>

        {/* Modal Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: CONTINENTS & DESTINATIONS */}
          {activeTab === 'continents' && (
            <div className="space-y-6">
              {CONTINENTS.map((continent) => {
                const continentDests = DESTINATIONS_DATA.filter((d) => d.continent === continent);
                const visitedCount = continentDests.filter((d) => visitedDestinationIds.includes(d.id)).length;
                const percent = Math.round((visitedCount / continentDests.length) * 100);

                return (
                  <div key={continent} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: CONTINENT_COLORS[continent] }}
                        />
                        <h4 className="font-serif italic text-lg font-medium text-white">{continent}</h4>
                      </div>
                      <span className="font-mono text-xs text-slate-400">
                        {visitedCount} / {continentDests.length} ({percent}%)
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full transition-all duration-500 rounded-full"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: CONTINENT_COLORS[continent]
                        }}
                      />
                    </div>

                    {/* Destination List Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {continentDests.map((dest) => {
                        const isVisited = visitedDestinationIds.includes(dest.id);
                        return (
                          <div
                            key={dest.id}
                            onClick={() => {
                              toggleJournal(false);
                              selectDestination(dest);
                            }}
                            className={`p-3 rounded-lg border text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                              isVisited
                                ? 'bg-slate-900 border-amber-400/40 text-amber-200 hover:border-amber-300'
                                : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              {isVisited ? (
                                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                              ) : (
                                <Navigation className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              )}
                              <span className="truncate">{dest.name}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 shrink-0 ml-1">Fly ✈️</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: PERSONAL MEMORIES */}
          {activeTab === 'memories' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BIRTHDAY_CONFIG.personalMemories.map((mem) => {
                const targetDest = DESTINATIONS_DATA.find((d) => d.id === mem.locationId);
                const isVisited = visitedDestinationIds.includes(mem.locationId);

                return (
                  <div
                    key={mem.id}
                    onClick={() => isVisited && setActiveMemoryModal(mem.id)}
                    className={`p-5 rounded-xl border transition-all ${
                      isVisited
                        ? 'bg-slate-950 border-amber-400/50 hover:border-amber-300 cursor-pointer shadow-lg'
                        : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{mem.icon || '💌'}</span>
                      <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest px-2 py-0.5 rounded bg-amber-400/10">
                        {mem.date || 'Memory Fragment'}
                      </span>
                    </div>

                    <h4 className="font-serif italic text-base text-slate-100 mb-1">{mem.title}</h4>
                    <p className="font-mono text-xs text-slate-400 mb-3">Location: {targetDest?.name || 'World'}</p>

                    {isVisited ? (
                      <p className="text-xs text-slate-300 line-clamp-2 italic">"{mem.message}"</p>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Visit {targetDest?.name} to unlock this note</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: POSTCARD GALLERY */}
          {activeTab === 'photos' && (
            <div>
              {savedPhotos.length === 0 ? (
                <div className="text-center py-12 text-slate-500 font-mono text-xs">
                  <Camera className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>No postcard photos captured yet.</p>
                  <p className="text-[10px] mt-1">Visit any landmark and click "Capture Postcard Photo"!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {savedPhotos.map((photo) => (
                    <div key={photo.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <div className="aspect-video rounded-lg bg-gradient-to-tr from-sky-900 to-indigo-900 flex items-center justify-center p-4 text-center">
                        <div>
                          <p className="font-serif italic text-lg text-amber-200">{photo.locationName}</p>
                          <p className="font-mono text-[10px] text-sky-200/70">{photo.filterName} Style</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center font-mono text-[10px] text-slate-400">
                        <span>{photo.locationName}</span>
                        <span>{photo.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SECRET QUEST */}
          {activeTab === 'quest' && (
            <div className="max-w-xl mx-auto text-center py-6 space-y-6">
              <div className="p-4 rounded-full bg-rose-500/10 border border-rose-400/30 w-16 h-16 mx-auto flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-rose-400 animate-pulse" />
              </div>

              <h3 className="text-2xl font-serif italic text-slate-100">The Constellation Quest</h3>
              
              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                Collect memories across the 7 continents to ignite the golden constellation beams over the Earth! Once ignited, a hidden secret destination will appear.
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Collected Items Needed:</span>
                  <span className="font-bold text-amber-400">{collectedItemIds.length} / 6</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (collectedItemIds.length / 6) * 100)}%` }}
                  />
                </div>
              </div>

              {unlockedSecret ? (
                <button
                  onClick={() => {
                    toggleJournal(false);
                    triggerFinalCinematic();
                  }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-2xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-slate-950" />
                  <span>Ignite Birthday Constellation & Reveal Secret 🌟</span>
                </button>
              ) : (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 font-mono text-xs">
                  🔒 Collect at least 6 items across the globe to unlock the final birthday message!
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
