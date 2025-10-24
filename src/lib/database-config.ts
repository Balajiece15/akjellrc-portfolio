/**
 * Database Configuration for AkjellRC Portfolio
 * 
 * This configuration ensures that the project uses namespaced keys
 * in the shared "redis-green-island" Vercel KV database.
 */

export const DATABASE_CONFIG = {
  // Project namespace - ensures data isolation from other projects
  PROJECT_NAMESPACE: 'akjellrc',
  
  // Database name for reference (set in Vercel Dashboard)
  DATABASE_NAME: 'redis-green-island',
  
  // Key prefixes for different data types
  KEYS: {
    SPEED_RUNS: 'akjellrc:speed_runs',
    BUILD_ENTRIES: 'akjellrc:build_entries',
    USER_SESSIONS: 'akjellrc:sessions',  // For future use
    SETTINGS: 'akjellrc:settings'        // For future use
  },
  
  // Default settings
  DEFAULTS: {
    MAX_ENTRIES_PER_TYPE: 1000,  // Soft limit for performance
    CACHE_TTL: 3600,             // 1 hour cache TTL if needed
    BACKUP_INTERVAL: 86400       // 24 hours for automated backups
  }
} as const

/**
 * Helper function to generate namespaced keys
 */
export function getNamespacedKey(keyType: keyof typeof DATABASE_CONFIG.KEYS): string {
  return DATABASE_CONFIG.KEYS[keyType]
}

/**
 * Helper function to check if a key belongs to this project
 */
export function isProjectKey(key: string): boolean {
  return key.startsWith(DATABASE_CONFIG.PROJECT_NAMESPACE + ':')
}

/**
 * Environment validation
 */
export function validateDatabaseConfig(): {
  isValid: boolean
  missingVars: string[]
  warnings: string[]
} {
  const requiredVars = [
    'KV_REST_API_URL',
    'KV_REST_API_TOKEN'
  ]
  
  const missingVars = requiredVars.filter(varName => !process.env[varName])
  const warnings: string[] = []
  
  // Check for optional but recommended variables
  if (!process.env.KV_REST_API_READ_ONLY_TOKEN) {
    warnings.push('KV_REST_API_READ_ONLY_TOKEN not set - using main token for read operations')
  }
  
  return {
    isValid: missingVars.length === 0,
    missingVars,
    warnings
  }
}

/**
 * Project information for debugging
 */
export const PROJECT_INFO = {
  name: 'AkjellRC Portfolio',
  version: '1.0.0',
  description: 'RC car enthusiast portfolio with speed runs and build logs',
  namespace: DATABASE_CONFIG.PROJECT_NAMESPACE,
  database: DATABASE_CONFIG.DATABASE_NAME
} as const