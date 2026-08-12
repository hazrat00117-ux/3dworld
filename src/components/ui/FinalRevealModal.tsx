import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { BIRTHDAY_CONFIG } from '../../config/birthday';
import { Sparkles, Heart, Globe, RefreshCw, X, Gift } from 'lucide-react';

export const FinalRevealModal: React.FC = () => {
  const { gameState, leaveDestination, enterWorld, toggleJournal } = useGameStore();

  if (gameState !== 'FINAL_REVEAL') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-2xl animate-fade-in select-none overflow-y-auto">
      {/* Confetti Glow Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-rose-500/10 to-transparent pointer-events-none" />

      {/* Main Birthday Letter Card */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-400/50 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-6 text-slate-100 z-10">
        
        {/* Crown Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center p-1 shadow-lg animate-bounce">
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
            <Gift className="w-8 h-8 text-amber-300" />
          </div>
        </div>

        {/* Title */}
        <div>
          <span className="font-mono text-xs text-amber-400 uppercase tracking-[0.25em] block mb-1">
            {BIRTHDAY_CONFIG.birthdayDate}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif italic text-white font-light">
            {BIRTHDAY_CONFIG.birthdayMessageTitle}
          </h1>
        </div>

        {/* Divider */}
        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {/* Message Body */}
        <div className="text-sm md:text-base font-sans text-slate-200 leading-relaxed space-y-4 text-left bg-slate-950/60 p-6 rounded-2xl border border-slate-800 font-light">
          {BIRTHDAY_CONFIG.birthdayMessageBody.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Secret Note Box */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-left space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>{BIRTHDAY_CONFIG.secretMessageTitle}</span>
          </div>
          <p className="text-xs font-serif italic text-amber-100/90 leading-relaxed">
            "{BIRTHDAY_CONFIG.secretMessageBody}"
          </p>
        </div>

        {/* Sender Sign-off */}
        <div className="pt-2 font-serif italic text-slate-400 text-sm">
          {BIRTHDAY_CONFIG.senderName}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              enterWorld();
              toggleJournal(true);
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span>View Passport Journal</span>
          </button>

          <button
            onClick={() => {
              enterWorld();
            }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-xl hover:scale-105 transition-all cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-slate-950" />
            <span>Keep Exploring The World</span>
          </button>
        </div>

      </div>
    </div>
  );
};
