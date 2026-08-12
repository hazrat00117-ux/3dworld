import { create } from 'zustand';
import { Destination, DESTINATIONS_DATA } from '../config/destinationsData';
import confetti from 'canvas-confetti';

export type GameState = 'INTRO' | 'WORLD' | 'DESTINATION' | 'FINAL_REVEAL';

export interface SavedPhoto {
  id: string;
  locationId: string;
  locationName: string;
  filterName: string;
  timestamp: string;
}

interface GameStoreState {
  gameState: GameState;
  selectedDestination: Destination | null;
  visitedDestinationIds: string[];
  collectedItemIds: string[];
  savedPhotos: SavedPhoto[];
  isJournalOpen: boolean;
  isSettingsOpen: boolean;
  isPhotoModalOpen: boolean;
  activeMemoryModalId: string | null;
  activeContinentFilter: string;
  unlockedSecret: boolean;
  qualityMode: 'high' | 'low';
  moonClicks: number;

  // Actions
  enterWorld: () => void;
  selectDestination: (dest: Destination) => void;
  leaveDestination: () => void;
  collectItem: (itemId: string) => void;
  toggleJournal: (open?: boolean) => void;
  toggleSettings: (open?: boolean) => void;
  togglePhotoModal: (open?: boolean) => void;
  savePhoto: (filterName: string) => void;
  setActiveMemoryModal: (memoryId: string | null) => void;
  setContinentFilter: (continent: string) => void;
  setQualityMode: (mode: 'high' | 'low') => void;
  registerMoonClick: () => void;
  triggerFinalCinematic: () => void;
  unlockAll: () => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'the_world_is_yours_save_v1';

const loadSavedState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore load error
  }
  return null;
};

const savedData = loadSavedState();

export const useGameStore = create<GameStoreState>((set, get) => ({
  gameState: 'INTRO',
  selectedDestination: null,
  visitedDestinationIds: savedData?.visitedDestinationIds || [],
  collectedItemIds: savedData?.collectedItemIds || [],
  savedPhotos: savedData?.savedPhotos || [],
  isJournalOpen: false,
  isSettingsOpen: false,
  isPhotoModalOpen: false,
  activeMemoryModalId: null,
  activeContinentFilter: 'All',
  unlockedSecret: savedData?.unlockedSecret || false,
  qualityMode: 'high',
  moonClicks: 0,

  enterWorld: () => set({ gameState: 'WORLD', selectedDestination: null }),

  selectDestination: (dest) => {
    const visited = new Set(get().visitedDestinationIds);
    visited.add(dest.id);

    const newVisitedArr = Array.from(visited);

    set({
      gameState: 'DESTINATION',
      selectedDestination: dest,
      visitedDestinationIds: newVisitedArr
    });

    // Save
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          visitedDestinationIds: newVisitedArr,
          collectedItemIds: get().collectedItemIds,
          savedPhotos: get().savedPhotos,
          unlockedSecret: get().unlockedSecret
        })
      );
    } catch {
      // Ignore
    }

    if (dest.id === 'secret-birthday-isle') {
      get().triggerFinalCinematic();
    }
  },

  leaveDestination: () => set({ gameState: 'WORLD', selectedDestination: null }),

  collectItem: (itemId) => {
    const current = get().collectedItemIds;
    if (current.includes(itemId)) return;

    const next = [...current, itemId];
    const unlocked = next.length >= 6;

    set({
      collectedItemIds: next,
      unlockedSecret: unlocked || get().unlockedSecret
    });

    if (unlocked && !get().unlockedSecret) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          visitedDestinationIds: get().visitedDestinationIds,
          collectedItemIds: next,
          savedPhotos: get().savedPhotos,
          unlockedSecret: unlocked || get().unlockedSecret
        })
      );
    } catch {
      // Ignore
    }
  },

  toggleJournal: (open) => set((state) => ({ isJournalOpen: open ?? !state.isJournalOpen })),

  toggleSettings: (open) => set((state) => ({ isSettingsOpen: open ?? !state.isSettingsOpen })),

  togglePhotoModal: (open) => set((state) => ({ isPhotoModalOpen: open ?? !state.isPhotoModalOpen })),

  savePhoto: (filterName) => {
    const currentDest = get().selectedDestination;
    if (!currentDest) return;

    const newPhoto: SavedPhoto = {
      id: `photo-${Date.now()}`,
      locationId: currentDest.id,
      locationName: currentDest.name,
      filterName,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextPhotos = [newPhoto, ...get().savedPhotos];
    set({ savedPhotos: nextPhotos, isPhotoModalOpen: false });

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  },

  setActiveMemoryModal: (memoryId) => set({ activeMemoryModalId: memoryId }),

  setContinentFilter: (continent) => set({ activeContinentFilter: continent }),

  setQualityMode: (mode) => set({ qualityMode: mode }),

  registerMoonClick: () => {
    const clicks = get().moonClicks + 1;
    set({ moonClicks: clicks });
    if (clicks === 3) {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.3 }
      });
    }
  },

  triggerFinalCinematic: () => {
    set({ gameState: 'FINAL_REVEAL', selectedDestination: null });
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 }
    });
  },

  unlockAll: () => {
    const allIds = DESTINATIONS_DATA.map((d) => d.id);
    const allItems = DESTINATIONS_DATA.flatMap((d) => d.collectibles.map((c) => c.id));

    set({
      visitedDestinationIds: allIds,
      collectedItemIds: allItems,
      unlockedSecret: true
    });
  },

  resetProgress: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      visitedDestinationIds: [],
      collectedItemIds: [],
      savedPhotos: [],
      unlockedSecret: false,
      gameState: 'INTRO'
    });
  }
}));
