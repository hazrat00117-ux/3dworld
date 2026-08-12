import * as THREE from 'three';

export interface CollectibleItem {
  id: string;
  name: string;
  type: 'souvenir' | 'memory' | 'star';
  icon: string;
  description: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: 'Europe' | 'Asia' | 'Africa' | 'North America' | 'South America' | 'Oceania' | 'Antarctica' | 'Special';
  lat: number;
  lng: number;
  description: string;
  accentColor: string;
  collectibles: CollectibleItem[];
}

export const CONTINENTS = [
  'Europe',
  'Asia',
  'Africa',
  'North America',
  'South America',
  'Oceania',
  'Antarctica'
] as const;

export const CONTINENT_COLORS: Record<string, string> = {
  'Europe': '#38bdf8',
  'Asia': '#fbcb43',
  'Africa': '#f97316',
  'North America': '#4ade80',
  'South America': '#a855f7',
  'Oceania': '#ec4899',
  'Antarctica': '#94a3b8',
  'Special': '#fbbf24'
};

/**
 * Converts Latitude & Longitude on Earth sphere to 3D Cartesian coordinates
 */
export function latLngToVector3(lat: number, lng: number, radius: number = 4.0): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

export const DESTINATIONS_DATA: Destination[] = [
  // --- EUROPE ---
  {
    id: 'eiffel-tower',
    name: 'Eiffel Tower',
    country: 'France',
    continent: 'Europe',
    lat: 48.8584,
    lng: 2.2945,
    description: 'The iconic iron lattice tower standing proudly over Paris. At night, 20,000 golden lights glitter across the sky.',
    accentColor: '#38bdf8',
    collectibles: [
      { id: 'croissant-gold', name: 'Golden Croissant', type: 'souvenir', icon: '🥐', description: 'Freshly baked Parisian pastry.' },
      { id: 'paris-music-box', name: 'Vintage Accordion Key', type: 'memory', icon: '🎵', description: 'Plays a sweet song of the Seine.' }
    ]
  },
  {
    id: 'colosseum',
    name: 'The Colosseum',
    country: 'Italy',
    continent: 'Europe',
    lat: 41.8902,
    lng: 12.4922,
    description: 'The colossal ancient amphitheater in Rome, echoing with centuries of history, gladiators, and timeless architecture.',
    accentColor: '#38bdf8',
    collectibles: [
      { id: 'gelato-coin', name: 'Roman Gelato Coin', type: 'souvenir', icon: '🍦', description: 'Redeemable for double pistachio.' }
    ]
  },
  {
    id: 'sagrada-familia',
    name: 'Sagrada Família',
    country: 'Spain',
    continent: 'Europe',
    lat: 41.4036,
    lng: 2.1744,
    description: 'Gaudí’s breathtaking basilican masterpiece in Barcelona, filled with stained glass light filtering like forest canopy.',
    accentColor: '#38bdf8',
    collectibles: [
      { id: 'stained-glass', name: 'Prismatic Stained Glass Fragment', type: 'souvenir', icon: '💎', description: 'Shines with rainbow hues.' }
    ]
  },
  {
    id: 'big-ben',
    name: 'Big Ben & Parliament',
    country: 'United Kingdom',
    continent: 'Europe',
    lat: 51.5007,
    lng: -0.1246,
    description: 'The historic Elizabeth Tower ringing out over the River Thames in London.',
    accentColor: '#38bdf8',
    collectibles: [
      { id: 'tea-cup', name: 'Royal Tea Emblem', type: 'souvenir', icon: '🫖', description: 'Warm Earl Grey memory.' }
    ]
  },
  {
    id: 'parthenon',
    name: 'The Parthenon',
    country: 'Greece',
    continent: 'Europe',
    lat: 37.9715,
    lng: 23.7267,
    description: 'The ancient marble temple perched high on the Acropolis overlooking Athens.',
    accentColor: '#38bdf8',
    collectibles: [
      { id: 'olive-wreath', name: 'Golden Olive Wreath', type: 'star', icon: '🌿', description: 'Symbol of ancient victory.' }
    ]
  },

  // --- ASIA ---
  {
    id: 'mount-fuji',
    name: 'Mount Fuji',
    country: 'Japan',
    continent: 'Asia',
    lat: 35.3606,
    lng: 138.7274,
    description: 'Japan’s sacred snow-capped volcano, surrounded by serene lakes, torii gates, and cherry blossom blooms.',
    accentColor: '#fbcb43',
    collectibles: [
      { id: 'sakura-petal', name: 'Glowing Sakura Petal', type: 'memory', icon: '🌸', description: 'Brings peaceful luck.' },
      { id: 'matcha-tea', name: 'Kyoto Tea Set', type: 'souvenir', icon: '🍵', description: 'Traditional ceremony vessel.' }
    ]
  },
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    country: 'India',
    continent: 'Asia',
    lat: 27.1751,
    lng: 78.0421,
    description: 'An immense white marble mausoleum built out of eternal devotion on the bank of the Yamuna River.',
    accentColor: '#fbcb43',
    collectibles: [
      { id: 'lotus-gem', name: 'Carved Lotus Quartz', type: 'souvenir', icon: '🪷', description: 'Reflects golden sunlight.' }
    ]
  },
  {
    id: 'great-wall',
    name: 'Great Wall of China',
    country: 'China',
    continent: 'Asia',
    lat: 40.4319,
    lng: 116.5704,
    description: 'A winding dragon of stone stretching over thousands of miles across misty mountain ridges.',
    accentColor: '#fbcb43',
    collectibles: [
      { id: 'jade-pendant', name: 'Emperor Dragon Jade', type: 'souvenir', icon: '🐉', description: 'Carved with guardian strength.' }
    ]
  },
  {
    id: 'petronas-towers',
    name: 'Petronas Towers',
    country: 'Malaysia',
    continent: 'Asia',
    lat: 3.1578,
    lng: 101.712,
    description: 'Twin soaring chrome towers illuminating Kuala Lumpur’s vibrant skyline.',
    accentColor: '#fbcb43',
    collectibles: [
      { id: 'skybridge-key', name: 'Skybridge Pass', type: 'souvenir', icon: '🏙️', description: 'View above the clouds.' }
    ]
  },

  // --- AFRICA ---
  {
    id: 'giza-pyramids',
    name: 'Pyramids of Giza',
    country: 'Egypt',
    continent: 'Africa',
    lat: 29.9792,
    lng: 31.1342,
    description: 'The ancient wonder of the world guarded by the Great Sphinx under starry desert skies.',
    accentColor: '#f97316',
    collectibles: [
      { id: 'scarab-amulet', name: 'Golden Scarab Amulet', type: 'star', icon: '🪲', description: 'Unlocks ancient stargazing secret.' }
    ]
  },
  {
    id: 'table-mountain',
    name: 'Table Mountain',
    country: 'South Africa',
    continent: 'Africa',
    lat: -33.9628,
    lng: 18.4098,
    description: 'A flat-topped mountain landmark overlooking Cape Town where oceans collide.',
    accentColor: '#f97316',
    collectibles: [
      { id: 'protea-flower', name: 'King Protea Bloom', type: 'souvenir', icon: '🌺', description: 'National flower of South Africa.' }
    ]
  },
  {
    id: 'serengeti',
    name: 'Serengeti Plains',
    country: 'Tanzania',
    continent: 'Africa',
    lat: -2.3333,
    lng: 34.8333,
    description: 'Vast golden savanna stretching as far as the eye can see, home to lions and golden acacia trees.',
    accentColor: '#f97316',
    collectibles: [
      { id: 'safari-compass', name: 'Golden Explorer Compass', type: 'memory', icon: '🧭', description: 'Points toward grand adventure.' }
    ]
  },

  // --- NORTH AMERICA ---
  {
    id: 'statue-of-liberty',
    name: 'Statue of Liberty',
    country: 'United States',
    continent: 'North America',
    lat: 40.6892,
    lng: -74.0445,
    description: 'The copper beacon of freedom holding her glowing torch high in New York Harbor.',
    accentColor: '#4ade80',
    collectibles: [
      { id: 'torch-flame', name: 'Miniature Liberty Flame', type: 'souvenir', icon: '🗽', description: 'Lights up night walks.' }
    ]
  },
  {
    id: 'chichen-itza',
    name: 'Chichen Itza',
    country: 'Mexico',
    continent: 'North America',
    lat: 20.6843,
    lng: -88.5678,
    description: 'The monumental Mayan step-pyramid El Castillo aligned perfectly with solar equinoxes.',
    accentColor: '#4ade80',
    collectibles: [
      { id: 'mayan-sun', name: 'Mayan Sun Token', type: 'souvenir', icon: '☀️', description: 'Solar warmth fragment.' }
    ]
  },
  {
    id: 'banff-national-park',
    name: 'Lake Louise, Banff',
    country: 'Canada',
    continent: 'North America',
    lat: 51.4254,
    lng: -116.1773,
    description: 'Crystal turquoise glacial waters framed by dramatic snowpeaks in the Canadian Rockies.',
    accentColor: '#4ade80',
    collectibles: [
      { id: 'maple-leaf', name: 'Golden Maple Emblem', type: 'souvenir', icon: '🍁', description: 'Crisp mountain air.' }
    ]
  },

  // --- SOUTH AMERICA ---
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    country: 'Peru',
    continent: 'South America',
    lat: -13.1631,
    lng: -72.545,
    description: 'The lost citadel of the Incas perched amidst misty emerald Andean peaks.',
    accentColor: '#a855f7',
    collectibles: [
      { id: 'alpaca-wool', name: 'Golden Alpaca Keepsake', type: 'souvenir', icon: '🦙', description: 'Cozy memory of Peru.' }
    ]
  },
  {
    id: 'christ-redeemer',
    name: 'Christ the Redeemer',
    country: 'Brazil',
    continent: 'South America',
    lat: -22.9519,
    lng: -43.2105,
    description: 'The Art Deco statue standing atop Corcovado mountain embracing Rio de Janeiro.',
    accentColor: '#a855f7',
    collectibles: [
      { id: 'samba-drum', name: 'Golden Samba Bell', type: 'souvenir', icon: '🥁', description: 'Rhythm of Carnival.' }
    ]
  },

  // --- OCEANIA ---
  {
    id: 'sydney-opera-house',
    name: 'Sydney Opera House',
    country: 'Australia',
    continent: 'Oceania',
    lat: -33.8568,
    lng: 151.2153,
    description: 'The world-famous sail-like architecture glistening over Sydney Harbour.',
    accentColor: '#ec4899',
    collectibles: [
      { id: 'boomerang-gold', name: 'Golden Boomerang', type: 'souvenir', icon: '🪃', description: 'Always brings you back home.' }
    ]
  },
  {
    id: 'milford-sound',
    name: 'Milford Sound',
    country: 'New Zealand',
    continent: 'Oceania',
    lat: -44.6716,
    lng: 167.9258,
    description: 'Majestic fjord carved by glaciers with towering waterfalls plummeting into deep blue seas.',
    accentColor: '#ec4899',
    collectibles: [
      { id: 'kiwi-feather', name: 'Silver Fern Pin', type: 'souvenir', icon: '🌿', description: 'Emblem of Aotearoa.' }
    ]
  },

  // --- ANTARCTICA ---
  {
    id: 'south-pole-station',
    name: 'Amundsen-Scott South Pole',
    country: 'Antarctica',
    continent: 'Antarctica',
    lat: -90.0,
    lng: 0.0,
    description: 'The icy bottom of the world where aurora australis lights dance across frozen horizons.',
    accentColor: '#94a3b8',
    collectibles: [
      { id: 'aurora-crystal', name: 'Polar Aurora Crystal', type: 'star', icon: '❄️', description: 'Glows with Southern Lights.' }
    ]
  },

  // --- SPECIAL SECRET LOCATION ---
  {
    id: 'secret-birthday-isle',
    name: 'Constellation Isle (Alex\'s Birthday Haven)',
    country: 'Starlight Galaxy',
    continent: 'Special',
    lat: 0.0,
    lng: -160.0,
    description: 'A magical glowing island that appeared when you gathered memories across the world!',
    accentColor: '#fbcb43',
    collectibles: [
      { id: 'birthday-crown', name: 'Crown of Starlight', type: 'star', icon: '👑', description: 'For the birthday legend!' }
    ]
  }
];
