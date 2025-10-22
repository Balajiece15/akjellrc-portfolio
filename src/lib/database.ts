// Database schema and types for the RC portfolio

export interface SpeedRun {
  id: number
  date: string
  speed: number
  gearing: string
  battery: string
  notes: string
  vehicle?: string
  conditions?: string
  temperature?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface BuildEntry {
  id: number
  date: string
  partBroken: string
  partUpgradedTo: string
  notes: string
  vehicle?: string
  cost?: number
  category?: 'repair' | 'upgrade' | 'maintenance'
  createdAt?: Date
  updatedAt?: Date
}

export interface Vehicle {
  id: number
  name: string
  brand: string
  model: string
  type: 'speed' | 'basher'
  personalBest?: number
  specs: Record<string, string>
  imageUrl?: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

// Database setup functions for different providers

// SQLite schema (for local development)
export const sqliteSchema = `
  CREATE TABLE IF NOT EXISTS speed_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    speed REAL NOT NULL,
    gearing TEXT,
    battery TEXT,
    notes TEXT,
    vehicle TEXT DEFAULT 'Arrma Limitless V1',
    conditions TEXT,
    temperature INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS build_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    part_broken TEXT NOT NULL,
    part_upgraded_to TEXT,
    notes TEXT,
    vehicle TEXT DEFAULT 'Traxxas X-Maxx',
    cost REAL,
    category TEXT DEFAULT 'repair',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('speed', 'basher')),
    personal_best REAL,
    specs TEXT, -- JSON string
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`

// Vercel KV (Redis) helpers
export const kv = {
  speedRuns: {
    key: 'speed_runs',
    add: async (run: Omit<SpeedRun, 'id'>) => {
      // Implementation for Vercel KV
      // Example: await kv.lpush('speed_runs', JSON.stringify(run))
    },
    getAll: async (): Promise<SpeedRun[]> => {
      // Implementation for Vercel KV
      // Example: return await kv.lrange('speed_runs', 0, -1)
      return []
    }
  },
  buildEntries: {
    key: 'build_entries',
    add: async (entry: Omit<BuildEntry, 'id'>) => {
      // Implementation for Vercel KV
    },
    getAll: async (): Promise<BuildEntry[]> => {
      return []
    }
  }
}

// Sample data for development
export const sampleSpeedRuns: SpeedRun[] = [
  {
    id: 1,
    date: '2024-10-15',
    speed: 120,
    gearing: '23T/64T',
    battery: '6S 5000mAh',
    notes: 'Perfect conditions, new aerodynamics package',
    vehicle: 'Arrma Limitless V1',
    conditions: 'Clear, no wind',
    temperature: 72
  },
  {
    id: 2,
    date: '2024-10-01',
    speed: 115,
    gearing: '22T/64T',
    battery: '6S 5000mAh',
    notes: 'Slight headwind, good stability',
    vehicle: 'Arrma Limitless V1',
    conditions: 'Light wind',
    temperature: 68
  }
]

export const sampleBuildEntries: BuildEntry[] = [
  {
    id: 1,
    date: '2024-10-10',
    partBroken: 'Stock Driveshafts',
    partUpgradedTo: 'Steel CVDs',
    notes: 'Massive backflip landed hard, snapped both front driveshafts',
    vehicle: 'Traxxas X-Maxx',
    cost: 89.99,
    category: 'upgrade'
  },
  {
    id: 2,
    date: '2024-09-25',
    partBroken: 'Rear A-Arms',
    partUpgradedTo: 'RPM A-Arms',
    notes: 'Rock impact during trail bashing',
    vehicle: 'Traxxas X-Maxx',
    cost: 24.99,
    category: 'repair'
  }
]

export const sampleVehicles: Vehicle[] = [
  {
    id: 1,
    name: 'The Speed Demon',
    brand: 'Arrma',
    model: 'Limitless V1',
    type: 'speed',
    personalBest: 120,
    specs: {
      chassis: 'Arrma Limitless V1',
      personalBest: '120 mph',
      gyro: 'Futaba GYC441',
      aerodynamics: 'RAZ1',
      motor: '[User to fill in]',
      esc: '[User to fill in]',
      gearing: '[User to fill in]'
    },
    isActive: true
  },
  {
    id: 2,
    name: 'The Destroyer',
    brand: 'Traxxas',
    model: 'X-Maxx',
    type: 'basher',
    specs: {
      chassis: 'Traxxas X-Maxx',
      power: '8S LiPo',
      keyUpgrades: '[User to fill in]'
    },
    isActive: true
  }
]