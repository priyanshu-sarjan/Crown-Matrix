// Campaign Levels & Region Configurations for Crown Matrix

export const REGION_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.25)', border: 'rgba(59, 130, 246, 0.6)', name: 'Electric Blue' },
  { bg: 'rgba(16, 185, 129, 0.25)', border: 'rgba(16, 185, 129, 0.6)', name: 'Neon Emerald' },
  { bg: 'rgba(139, 92, 246, 0.25)', border: 'rgba(139, 92, 246, 0.6)', name: 'Cyber Violet' },
  { bg: 'rgba(245, 158, 11, 0.25)', border: 'rgba(245, 158, 11, 0.6)', name: 'Amber Gold' },
  { bg: 'rgba(236, 72, 153, 0.25)', border: 'rgba(236, 72, 153, 0.6)', name: 'Neon Pink' },
  { bg: 'rgba(6, 182, 212, 0.25)', border: 'rgba(6, 182, 212, 0.6)', name: 'Cyan Glow' },
  { bg: 'rgba(132, 204, 22, 0.25)', border: 'rgba(132, 204, 22, 0.6)', name: 'Laser Lime' },
  { bg: 'rgba(249, 115, 22, 0.25)', border: 'rgba(249, 115, 22, 0.6)', name: 'Solar Orange' },
];

export const CAMPAIGN_LEVELS = [
  {
    id: 1,
    name: 'Genesis 4x4',
    size: 4,
    difficulty: 'Easy',
    description: 'Learn the basic spatial rules. Place 4 Crowns such that no two attack each other or share a color region.',
    regions: [
      [0, 0, 1, 1],
      [0, 0, 1, 1],
      [2, 2, 3, 3],
      [2, 2, 3, 3]
    ]
  },
  {
    id: 2,
    name: 'Quadrant Nexus 4x4',
    size: 4,
    difficulty: 'Easy',
    description: 'Interlocking L-shaped regions test your diagonal awareness.',
    regions: [
      [0, 0, 0, 1],
      [2, 0, 1, 1],
      [2, 2, 3, 1],
      [2, 3, 3, 3]
    ]
  },
  {
    id: 3,
    name: 'Hexa Sector 6x6',
    size: 6,
    difficulty: 'Medium',
    description: 'Step up to a 6x6 matrix with 6 distinct color zones.',
    regions: [
      [0, 0, 0, 1, 1, 1],
      [0, 2, 2, 2, 1, 3],
      [0, 2, 4, 2, 3, 3],
      [5, 2, 4, 4, 3, 3],
      [5, 5, 4, 4, 3, 3],
      [5, 5, 5, 4, 3, 3]
    ]
  },
  {
    id: 4,
    name: 'Neon Labyrinth 6x6',
    size: 6,
    difficulty: 'Medium',
    description: 'Asymmetrical region patterns require precise constraint satisfaction.',
    regions: [
      [0, 1, 1, 1, 2, 2],
      [0, 0, 1, 2, 2, 2],
      [3, 0, 4, 4, 2, 5],
      [3, 3, 4, 4, 5, 5],
      [3, 3, 4, 5, 5, 5],
      [3, 4, 4, 5, 5, 5]
    ]
  },
  {
    id: 5,
    name: 'The Grand Finale 8x8',
    size: 8,
    difficulty: 'Hard',
    description: 'Official Hackathon 8x8 Crown Matrix Challenge! Place 8 royal crowns on this 8x8 grid.',
    regions: [
      [0, 0, 0, 1, 1, 1, 1, 2],
      [0, 3, 0, 1, 4, 1, 2, 2],
      [0, 3, 3, 1, 4, 4, 2, 2],
      [3, 3, 3, 4, 4, 4, 2, 5],
      [6, 3, 4, 4, 7, 4, 5, 5],
      [6, 6, 4, 7, 7, 7, 5, 5],
      [6, 6, 7, 7, 7, 5, 5, 5],
      [6, 7, 7, 7, 5, 5, 5, 5]
    ]
  },
  {
    id: 6,
    name: 'Cyber Lattice 8x8',
    size: 8,
    difficulty: 'Hard',
    description: 'Interspersed diagonal color belts demanding advanced strategic foresight.',
    regions: [
      [0, 0, 1, 1, 2, 2, 3, 3],
      [0, 0, 1, 1, 2, 2, 3, 3],
      [4, 0, 1, 5, 2, 6, 3, 7],
      [4, 4, 5, 5, 6, 6, 7, 7],
      [4, 4, 5, 5, 6, 6, 7, 7],
      [4, 4, 5, 5, 6, 6, 7, 7],
      [0, 4, 1, 5, 2, 6, 3, 7],
      [0, 0, 1, 1, 2, 2, 3, 3]
    ]
  },
  {
    id: 7,
    name: 'Vortex Citadel 8x8',
    size: 8,
    difficulty: 'Expert',
    description: 'Concentric spiraling territory zones for elite logic masters.',
    regions: [
      [0, 0, 0, 0, 0, 0, 0, 1],
      [2, 2, 2, 2, 2, 2, 0, 1],
      [2, 3, 3, 3, 3, 2, 0, 1],
      [2, 3, 4, 4, 3, 2, 0, 1],
      [2, 3, 5, 4, 3, 2, 0, 1],
      [2, 3, 5, 5, 3, 2, 0, 1],
      [2, 6, 6, 6, 6, 2, 0, 1],
      [7, 7, 7, 7, 7, 7, 7, 1]
    ]
  },
  {
    id: 8,
    name: 'Quantum Zenith 8x8',
    size: 8,
    difficulty: 'Grandmaster',
    description: 'The ultimate 8-Queens constraint satisfaction matrix test.',
    regions: [
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 0, 1, 2, 3, 4, 5, 6],
      [7, 0, 0, 1, 2, 3, 4, 5],
      [6, 7, 0, 0, 1, 2, 3, 4],
      [5, 6, 7, 0, 0, 1, 2, 3],
      [4, 5, 6, 7, 0, 0, 1, 2],
      [3, 4, 5, 6, 7, 0, 0, 1],
      [2, 3, 4, 5, 6, 7, 0, 0]
    ]
  }
];

export function getDailyPuzzle(dateString = new Date().toISOString().slice(0, 10)) {
  // Generate deterministic seed from date
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = (hash << 5) - hash + dateString.charCodeAt(i);
    hash |= 0;
  }
  const levelIdx = Math.abs(hash) % CAMPAIGN_LEVELS.length;
  const baseLevel = CAMPAIGN_LEVELS[levelIdx];
  return {
    ...baseLevel,
    name: `Daily Challenge (${dateString})`,
    date: dateString
  };
}
