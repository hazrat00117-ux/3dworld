export interface MemoryFragment {
  id: string;
  locationId: string;
  title: string;
  message: string;
  date?: string;
  icon?: string;
}

export interface BirthdayConfig {
  recipientName: string;
  senderName: string;
  subtitle: string;
  birthdayDate: string;
  birthdayMessageTitle: string;
  birthdayMessageBody: string;
  secretMessageTitle: string;
  secretMessageBody: string;
  personalMemories: MemoryFragment[];
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  recipientName: 'Alex',
  senderName: 'Your Favorite Travel Partner',
  subtitle: 'A LITTLE ADVENTURE MADE JUST FOR YOU',
  birthdayDate: 'HAPPY BIRTHDAY!',
  birthdayMessageTitle: 'Happy Birthday, Alex!',
  birthdayMessageBody: `To the most extraordinary person in the universe:

Today, the entire world is yours to explore! From the snow-capped peak of Mount Fuji to the glowing ancient wonders of Giza and the romantic lights of Paris, every corner of this Earth holds a tiny reminder of how special you are.

I built this 3D world just for you so you can journey across all 7 continents, uncover hidden memory notes, collect golden keepsakes, and ignite the golden constellation stars above the globe.

May this year bring you endless laughter, unforgettable journeys, limitless inspiration, and all the love in the world. Keep shining bright!`,
  secretMessageTitle: 'The Birthday Star Constellation',
  secretMessageBody: 'You found the secret island! Here is your special birthday gift: A coupon for an ALL-EXPENSES-PAID real-world weekend getaway trip of your choice! 🎟️✨✈️',
  personalMemories: [
    {
      id: 'mem-1',
      locationId: 'eiffel-tower',
      title: 'The Paris Starlight Dream',
      message: 'Remember when we talked about sitting by the Seine with fresh croissants watching the Eiffel Tower sparkle? That dream is coming true very soon!',
      date: 'Paris Memory',
      icon: '🥐'
    },
    {
      id: 'mem-2',
      locationId: 'statue-of-liberty',
      title: 'Midnight Coffee in New York',
      message: 'Nothing compares to laughing late at night over hot cocoa after exploring the city skyline.',
      date: 'NYC Memory',
      icon: '🗽'
    },
    {
      id: 'mem-3',
      locationId: 'mount-fuji',
      title: 'Cherry Blossom Dreams',
      message: 'One day we will walk under the spring sakura trees together with Mount Fuji in the background!',
      date: 'Tokyo Memory',
      icon: '🌸'
    },
    {
      id: 'mem-4',
      locationId: 'sydney-opera-house',
      title: 'Harbor Breezes & Sunshine',
      message: 'Wishing you sunny days, ocean waves, and endless joy for your birthday!',
      date: 'Sydney Memory',
      icon: '🌊'
    },
    {
      id: 'mem-5',
      locationId: 'colosseum',
      title: 'Eternal City Gelato',
      message: 'To endless bowls of authentic Italian gelato and ancient cobblestone streets.',
      date: 'Rome Memory',
      icon: '🍦'
    },
    {
      id: 'mem-6',
      locationId: 'giza-pyramids',
      title: 'Desert Sunset Wonders',
      message: 'You are an absolute legend. Never forget how truly incredible you are!',
      date: 'Giza Memory',
      icon: '🐫'
    }
  ]
};
