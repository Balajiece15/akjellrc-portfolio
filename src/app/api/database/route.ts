import { NextRequest, NextResponse } from 'next/server'
import { DatabaseManager } from '@/lib/redis-storage'
import { DATABASE_CONFIG, validateDatabaseConfig } from '@/lib/database-config'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    switch (action) {
      case 'stats':
        const stats = await DatabaseManager.getProjectStats()
        return NextResponse.json({
          success: true,
          data: {
            ...stats,
            projectInfo: {
              namespace: DATABASE_CONFIG.PROJECT_NAMESPACE,
              database: DATABASE_CONFIG.DATABASE_NAME
            }
          }
        })

      case 'keys':
        // Only allow in development or with admin authentication
        if (process.env.NODE_ENV === 'production') {
          return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
        }
        const keys = await DatabaseManager.getProjectKeys()
        return NextResponse.json({
          success: true,
          data: { keys }
        })

      case 'config':
        const configValidation = validateDatabaseConfig()
        return NextResponse.json({
          success: true,
          data: {
            config: DATABASE_CONFIG,
            validation: configValidation
          }
        })

      case 'export':
        const exportData = await DatabaseManager.exportProjectData()
        return NextResponse.json({
          success: true,
          data: exportData
        })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Database management error:', error)
    return NextResponse.json({ error: 'Database operation failed' }, { status: 500 })
  }
}

// Admin-only operations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, adminPassword } = body

    // Simple admin check - in production, implement proper authentication
    if (adminPassword !== 'akjellrc2025' && adminPassword !== 'admin123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    switch (action) {
      case 'clear':
        // Extremely dangerous operation - only for testing
        if (process.env.NODE_ENV === 'production') {
          return NextResponse.json({ error: 'Clear operation not allowed in production' }, { status: 403 })
        }
        const cleared = await DatabaseManager.clearProjectData()
        return NextResponse.json({
          success: cleared,
          message: cleared ? 'Project data cleared' : 'Failed to clear data'
        })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Database management error:', error)
    return NextResponse.json({ error: 'Database operation failed' }, { status: 500 })
  }
}