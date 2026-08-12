import React, { useEffect } from 'react';
import { SpaceCanvas } from './components/3d/SpaceCanvas';
import { IntroOverlay } from './components/ui/IntroOverlay';
import { HudHeader } from './components/ui/HudHeader';
import { DestinationOverlay } from './components/ui/DestinationOverlay';
import { JournalModal } from './components/ui/JournalModal';
import { FinalRevealModal } from './components/ui/FinalRevealModal';
import { SettingsModal } from './components/ui/SettingsModal';
import { PhotoCameraModal } from './components/ui/PhotoCameraModal';
import { PersonalMemoryModal } from './components/ui/PersonalMemoryModal';
import { useGameStore } from './store/gameStore';
import { soundService } from './services/soundService';

export default function App() {
  const { gameState } = useGameStore();

  useEffect(() => {
    // Initialize ambient audio on first user interaction
    const handleFirstClick = () => {
      soundService.initAudio();
      window.removeEventListener('pointerdown', handleFirstClick);
    };
    window.addEventListener('pointerdown', handleFirstClick);

    return () => {
      window.removeEventListener('pointerdown', handleFirstClick);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050508] font-sans text-white select-none">
      {/* 3D Space & Earth Scene */}
      <SpaceCanvas />

      {/* Intro Screen */}
      {gameState === 'INTRO' && <IntroOverlay />}

      {/* Main HUD Bar */}
      <HudHeader />

      {/* Landmark Close-Up Overlay */}
      <DestinationOverlay />

      {/* Journal & World Passport Modal */}
      <JournalModal />

      {/* Final Birthday Reveal Sequence */}
      <FinalRevealModal />

      {/* Postcard Camera Modal */}
      <PhotoCameraModal />

      {/* Settings Modal */}
      <SettingsModal />

      {/* Personal Memory Note Modal */}
      <PersonalMemoryModal />

      {/* Bottom Subtle Watermark / Theme Label */}
      <div className="absolute bottom-4 right-6 pointer-events-none z-10 flex flex-col items-end opacity-40 hover:opacity-100 transition-opacity">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-slate-400">Sector: 04-B</span>
        <div className="w-20 h-[1px] bg-slate-600 my-1" />
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-emerald-400">Earth_Engine_v2.0</span>
      </div>
    </div>
  );
}
