export interface WorldDefinition {
  id: string;
  title: string;
  subtitle: string;
  status: 'available' | 'coming-soon';
  color: number;
  levelIds: string[];
}

export const worlds: WorldDefinition[] = [
  {
    id: 'forest',
    title: 'Forest Trails',
    subtitle: 'Tutorial ramps, coins, and first checkpoint.',
    status: 'available',
    color: 0x3f8f59,
    levelIds: ['forest-01-basics'],
  },
  {
    id: 'warehouse',
    title: 'Warehouse Blast',
    subtitle: 'Loops, barrels, smoke, and containers.',
    status: 'coming-soon',
    color: 0xb45309,
    levelIds: [],
  },
  {
    id: 'mine',
    title: 'Underground Mine',
    subtitle: 'Low ceilings, tunnels, and rolling barrels.',
    status: 'coming-soon',
    color: 0x64748b,
    levelIds: [],
  },
];
