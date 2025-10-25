'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import AdminLogin from '@/components/AdminLogin'
import { SpeedRun } from '@/lib/redis-storage'

export default function SpeedLogKV() {
  const { isAdmin } = useAuth()
  const [runs, setRuns] = useState<SpeedRun[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingRun, setEditingRun] = useState<SpeedRun | null>(null)
  const [saving, setSaving] = useState(false)
  const [newRun, setNewRun] = useState<Omit<SpeedRun, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    speed: 0,
    gearing: '',
    battery: '',
    notes: '',
    conditions: '',
    youtubeLinks: []
  })

  // Fetch speed runs from KV storage
  useEffect(() => {
    fetchSpeedRuns()
  }, [])

  const fetchSpeedRuns = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/speed-runs')
      if (response.ok) {
        const data = await response.json()
        setRuns(data)
      } else {
        console.error('Failed to fetch speed runs')
      }
    } catch (error) {
      console.error('Error fetching speed runs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAdmin) {
      alert('Admin authentication required to add or edit speed runs')
      return
    }

    // Validate inputs
    if (!newRun.date || !newRun.speed || !newRun.gearing || !newRun.battery || !newRun.notes) {
      alert('Please fill in all required fields')
      return
    }

    if (newRun.speed <= 0) {
      alert('Please enter a valid speed greater than 0')
      return
    }

    try {
      setSaving(true)
      
      if (editingRun) {
        // Update existing run
        const response = await fetch('/api/speed-runs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingRun.id, ...newRun })
        })
        
        if (response.ok) {
          await fetchSpeedRuns()
          setEditingRun(null)
          alert('Speed run updated successfully!')
        } else {
          const error = await response.json()
          alert(`Error updating speed run: ${error.error}`)
        }
      } else {
        // Add new run
        const response = await fetch('/api/speed-runs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRun)
        })
        
        if (response.ok) {
          await fetchSpeedRuns()
          alert('Speed run added successfully!')
        } else {
          const error = await response.json()
          alert(`Error adding speed run: ${error.error}`)
        }
      }
      
      resetForm()
      setShowForm(false)
    } catch (error) {
      console.error('Error saving speed run:', error)
      alert('Error saving speed run. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (run: SpeedRun) => {
    if (!isAdmin) return
    
    setEditingRun(run)
    setNewRun({
      date: run.date,
      speed: run.speed,
      gearing: run.gearing,
      battery: run.battery,
      notes: run.notes,
      conditions: run.conditions || '',
      youtubeLinks: run.youtubeLinks || []
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!isAdmin) return
    
    if (confirm('Are you sure you want to delete this speed run?')) {
      try {
        const response = await fetch(`/api/speed-runs?id=${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          await fetchSpeedRuns()
          alert('Speed run deleted successfully!')
        } else {
          const error = await response.json()
          alert(`Error deleting speed run: ${error.error}`)
        }
      } catch (error) {
        console.error('Error deleting speed run:', error)
        alert('Error deleting speed run. Please try again.')
      }
    }
  }

  const resetForm = () => {
    setNewRun({
      date: new Date().toISOString().split('T')[0],
      speed: 0,
      gearing: '',
      battery: '',
      notes: '',
      conditions: '',
      youtubeLinks: []
    })
    setEditingRun(null)
  }

  const sortedRuns = runs.sort((a, b) => b.speed - a.speed)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Speed Log</h3>
          <div className="animate-pulse bg-gray-600 h-10 w-32 rounded"></div>
        </div>
        <div className="animate-pulse bg-gray-700 h-64 rounded"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Speed Log (Redis DB)</h3>
        <div className="flex items-center gap-4">
          {!isAdmin && <AdminLogin />}
          {isAdmin && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              disabled={saving}
            >
              {showForm ? 'Cancel' : 'Add New Run'}
            </button>
          )}
        </div>
      </div>

      {showForm && isAdmin && (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date *</label>
              <input
                type="date"
                value={newRun.date}
                onChange={(e) => setNewRun({ ...newRun, date: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                min="2020-01-01"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-orange-500"
                required
                disabled={saving}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Speed (MPH) *</label>
              <input
                type="number"
                value={newRun.speed || ''}
                onChange={(e) => setNewRun({ ...newRun, speed: Number(e.target.value) })}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-orange-500"
                required
                min="0"
                max="200"
                disabled={saving}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Gearing *</label>
              <input
                type="text"
                value={newRun.gearing}
                onChange={(e) => setNewRun({ ...newRun, gearing: e.target.value })}
                placeholder="e.g., 23T/64T"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-orange-500"
                required
                disabled={saving}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Battery *</label>
              <input
                type="text"
                value={newRun.battery}
                onChange={(e) => setNewRun({ ...newRun, battery: e.target.value })}
                placeholder="e.g., 6S 5000mAh"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-orange-500"
                required
                disabled={saving}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Conditions</label>
            <input
              type="text"
              value={newRun.conditions || ''}
              onChange={(e) => setNewRun({ ...newRun, conditions: e.target.value })}
              placeholder="Weather, track conditions, etc."
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-orange-500"
              disabled={saving}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Notes *</label>
            <textarea
              value={newRun.notes}
              onChange={(e) => setNewRun({ ...newRun, notes: e.target.value })}
              placeholder="Modifications, setup details, observations, etc."
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-orange-500"
              rows={3}
              required
              disabled={saving}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                resetForm()
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors flex items-center"
              disabled={saving}
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                editingRun ? 'Update Run' : 'Save Run'
              )}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {sortedRuns.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No speed runs recorded yet.</p>
            {isAdmin && (
              <p className="mt-2">Click "Add New Run" to log your first speed run!</p>
            )}
          </div>
        ) : (
          sortedRuns.map((run) => (
            <div key={run.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-orange-500">{run.speed} MPH</span>
                  <span className="text-gray-400">{run.date}</span>
                </div>
                {isAdmin && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(run)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(run.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Gearing:</span> {run.gearing}
                </div>
                <div>
                  <span className="text-gray-400">Battery:</span> {run.battery}
                </div>
                {run.conditions && (
                  <div className="md:col-span-2">
                    <span className="text-gray-400">Conditions:</span> {run.conditions}
                  </div>
                )}
                <div className="md:col-span-2">
                  <span className="text-gray-400">Notes:</span> {run.notes}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}