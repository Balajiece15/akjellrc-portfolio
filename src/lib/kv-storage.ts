import { kv } from '@vercel/kv'

// Project-specific namespace to avoid conflicts with other projects
const PROJECT_NAMESPACE = 'akjellrc'

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
  private static readonly SPEED_RUNS_KEY = `${PROJECT_NAMESPACE}:speed_runs`

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
  private static readonly BUILD_ENTRIES_KEY = `${PROJECT_NAMESPACE}:build_entries`

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

// Database Management Utilities
export class DatabaseManager {
  /**
   * Get all keys for this project (useful for debugging/backup)
   */
  static async getProjectKeys(): Promise<string[]> {
    try {
      // Note: This requires scanning all keys - use sparingly in production
      const allKeys = await kv.keys(`${PROJECT_NAMESPACE}:*`)
      return allKeys
    } catch (error) {
      console.error('Error fetching project keys:', error)
      return []
    }
  }

  /**
   * Get database statistics for this project
   */
  static async getProjectStats(): Promise<{
    totalSpeedRuns: number
    totalBuildEntries: number
    totalCost: number
    personalBest: number
  }> {
    try {
      const [speedRuns, buildEntries] = await Promise.all([
        SpeedRunStorage.getAllSpeedRuns(),
        BuildLogStorage.getAllBuildEntries()
      ])

      return {
        totalSpeedRuns: speedRuns.length,
        totalBuildEntries: buildEntries.length,
        totalCost: buildEntries.reduce((sum, entry) => sum + entry.cost, 0),
        personalBest: speedRuns.length > 0 ? Math.max(...speedRuns.map(run => run.speed)) : 0
      }
    } catch (error) {
      console.error('Error fetching project stats:', error)
      return {
        totalSpeedRuns: 0,
        totalBuildEntries: 0,
        totalCost: 0,
        personalBest: 0
      }
    }
  }

  /**
   * Clear all project data (for testing/reset purposes)
   * Use with extreme caution!
   */
  static async clearProjectData(): Promise<boolean> {
    try {
      await Promise.all([
        kv.del(SpeedRunStorage['SPEED_RUNS_KEY']),
        kv.del(BuildLogStorage['BUILD_ENTRIES_KEY'])
      ])
      return true
    } catch (error) {
      console.error('Error clearing project data:', error)
      return false
    }
  }

  /**
   * Export all project data for backup
   */
  static async exportProjectData(): Promise<{
    speedRuns: SpeedRun[]
    buildEntries: BuildEntry[]
    exportDate: string
    projectNamespace: string
  }> {
    try {
      const [speedRuns, buildEntries] = await Promise.all([
        SpeedRunStorage.getAllSpeedRuns(),
        BuildLogStorage.getAllBuildEntries()
      ])

      return {
        speedRuns,
        buildEntries,
        exportDate: new Date().toISOString(),
        projectNamespace: PROJECT_NAMESPACE
      }
    } catch (error) {
      console.error('Error exporting project data:', error)
      throw error
    }
  }
}