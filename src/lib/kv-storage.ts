import { kv } from '@vercel/kv'

export interface SpeedRun {
  id: number
  date: string
  speed: number
  gearing: string
  battery: string
  notes: string
  conditions?: string
  youtubeLinks?: string[]
}

export interface BuildEntry {
  id: number
  date: string
  brokenPart: string
  upgradedTo: string
  cost: number
  category: 'repair' | 'upgrade' | 'maintenance'
  notes: string
  youtubeLinks?: string[]
}

// Speed Run Database Operations
export class SpeedRunStorage {
  private static readonly SPEED_RUNS_KEY = 'speed_runs'

  static async getAllSpeedRuns(): Promise<SpeedRun[]> {
    try {
      const runs = await kv.get<SpeedRun[]>(this.SPEED_RUNS_KEY)
      return runs || []
    } catch (error) {
      console.error('Error fetching speed runs:', error)
      return []
    }
  }

  static async addSpeedRun(run: Omit<SpeedRun, 'id'>): Promise<SpeedRun> {
    try {
      const runs = await this.getAllSpeedRuns()
      const newRun: SpeedRun = {
        ...run,
        id: Date.now()
      }
      runs.push(newRun)
      await kv.set(this.SPEED_RUNS_KEY, runs)
      return newRun
    } catch (error) {
      console.error('Error adding speed run:', error)
      throw error
    }
  }

  static async updateSpeedRun(id: number, updatedRun: Partial<SpeedRun>): Promise<SpeedRun | null> {
    try {
      const runs = await this.getAllSpeedRuns()
      const runIndex = runs.findIndex(run => run.id === id)
      
      if (runIndex === -1) return null
      
      runs[runIndex] = { ...runs[runIndex], ...updatedRun }
      await kv.set(this.SPEED_RUNS_KEY, runs)
      return runs[runIndex]
    } catch (error) {
      console.error('Error updating speed run:', error)
      throw error
    }
  }

  static async deleteSpeedRun(id: number): Promise<boolean> {
    try {
      const runs = await this.getAllSpeedRuns()
      const filteredRuns = runs.filter(run => run.id !== id)
      
      if (filteredRuns.length === runs.length) return false
      
      await kv.set(this.SPEED_RUNS_KEY, filteredRuns)
      return true
    } catch (error) {
      console.error('Error deleting speed run:', error)
      throw error
    }
  }

  static async getPersonalBest(): Promise<number> {
    try {
      const runs = await this.getAllSpeedRuns()
      if (runs.length === 0) return 0
      return Math.max(...runs.map(run => run.speed))
    } catch (error) {
      console.error('Error getting personal best:', error)
      return 0
    }
  }
}

// Build Log Database Operations
export class BuildLogStorage {
  private static readonly BUILD_ENTRIES_KEY = 'build_entries'

  static async getAllBuildEntries(): Promise<BuildEntry[]> {
    try {
      const entries = await kv.get<BuildEntry[]>(this.BUILD_ENTRIES_KEY)
      return entries || []
    } catch (error) {
      console.error('Error fetching build entries:', error)
      return []
    }
  }

  static async addBuildEntry(entry: Omit<BuildEntry, 'id'>): Promise<BuildEntry> {
    try {
      const entries = await this.getAllBuildEntries()
      const newEntry: BuildEntry = {
        ...entry,
        id: Date.now()
      }
      entries.push(newEntry)
      await kv.set(this.BUILD_ENTRIES_KEY, entries)
      return newEntry
    } catch (error) {
      console.error('Error adding build entry:', error)
      throw error
    }
  }

  static async updateBuildEntry(id: number, updatedEntry: Partial<BuildEntry>): Promise<BuildEntry | null> {
    try {
      const entries = await this.getAllBuildEntries()
      const entryIndex = entries.findIndex(entry => entry.id === id)
      
      if (entryIndex === -1) return null
      
      entries[entryIndex] = { ...entries[entryIndex], ...updatedEntry }
      await kv.set(this.BUILD_ENTRIES_KEY, entries)
      return entries[entryIndex]
    } catch (error) {
      console.error('Error updating build entry:', error)
      throw error
    }
  }

  static async deleteBuildEntry(id: number): Promise<boolean> {
    try {
      const entries = await this.getAllBuildEntries()
      const filteredEntries = entries.filter(entry => entry.id !== id)
      
      if (filteredEntries.length === entries.length) return false
      
      await kv.set(this.BUILD_ENTRIES_KEY, filteredEntries)
      return true
    } catch (error) {
      console.error('Error deleting build entry:', error)
      throw error
    }
  }

  static async getTotalCost(): Promise<number> {
    try {
      const entries = await this.getAllBuildEntries()
      return entries.reduce((total, entry) => total + entry.cost, 0)
    } catch (error) {
      console.error('Error calculating total cost:', error)
      return 0
    }
  }

  static async getEntriesByCategory(category: BuildEntry['category']): Promise<BuildEntry[]> {
    try {
      const entries = await this.getAllBuildEntries()
      return entries.filter(entry => entry.category === category)
    } catch (error) {
      console.error('Error fetching entries by category:', error)
      return []
    }
  }
}