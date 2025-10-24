'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'

interface DatabaseStats {
  totalSpeedRuns: number
  totalBuildEntries: number
  totalCost: number
  personalBest: number
  projectInfo: {
    namespace: string
    database: string
  }
}

export default function DatabaseManager() {
  const { isAdmin } = useAuth()
  const [stats, setStats] = useState<DatabaseStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [exportData, setExportData] = useState<any>(null)

  const fetchStats = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/database?action=stats')
      if (response.ok) {
        const result = await response.json()
        setStats(result.data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportDatabase = async () => {
    if (!isAdmin) {
      alert('Admin access required')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/database?action=export')
      if (response.ok) {
        const result = await response.json()
        setExportData(result.data)
        
        // Download as JSON file
        const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `akjellrc-backup-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Error exporting data:', error)
      alert('Export failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (!isAdmin) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Database Manager</h3>
        <p className="text-gray-400">Admin access required to view database management tools.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Database Manager</h3>
        <button
          onClick={fetchStats}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-700 p-4 rounded">
            <div className="text-2xl font-bold text-orange-400">{stats.totalSpeedRuns}</div>
            <div className="text-sm text-gray-300">Speed Runs</div>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <div className="text-2xl font-bold text-green-400">{stats.totalBuildEntries}</div>
            <div className="text-sm text-gray-300">Build Entries</div>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <div className="text-2xl font-bold text-blue-400">${stats.totalCost.toFixed(2)}</div>
            <div className="text-sm text-gray-300">Total Spent</div>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <div className="text-2xl font-bold text-purple-400">{stats.personalBest} MPH</div>
            <div className="text-sm text-gray-300">Personal Best</div>
          </div>
        </div>
      )}

      <div className="border-t border-gray-600 pt-4">
        <h4 className="text-md font-semibold text-white mb-3">Database Information</h4>
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Database:</span>
              <span className="text-green-400 ml-2 font-mono">{stats.projectInfo.database}</span>
            </div>
            <div>
              <span className="text-gray-400">Namespace:</span>
              <span className="text-blue-400 ml-2 font-mono">{stats.projectInfo.namespace}:</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-600 pt-4">
        <h4 className="text-md font-semibold text-white mb-3">Data Management</h4>
        <div className="flex space-x-3">
          <button
            onClick={exportDatabase}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            Export Backup
          </button>
        </div>
      </div>

      <div className="bg-gray-900 p-4 rounded border border-gray-600">
        <h5 className="text-sm font-semibold text-yellow-400 mb-2">💡 Multi-Project Setup</h5>
        <p className="text-xs text-gray-300">
          This project uses the <span className="text-green-400 font-mono">redis-green-island</span> database 
          with namespace <span className="text-blue-400 font-mono">akjellrc:</span> for safe multi-project usage.
          Your data is isolated from other projects sharing the same database.
        </p>
      </div>
    </div>
  )
}