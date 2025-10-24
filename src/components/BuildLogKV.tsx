'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import AdminLogin from '@/components/AdminLogin'
import { BuildEntry } from '@/lib/kv-storage'

export default function BuildLogKV() {
  const { isAdmin } = useAuth()
  const [entries, setEntries] = useState<BuildEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEntry, setEditingEntry] = useState<BuildEntry | null>(null)
  const [saving, setSaving] = useState(false)
  const [newEntry, setNewEntry] = useState<Omit<BuildEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    brokenPart: '',
    upgradedTo: '',
    cost: 0,
    category: 'repair',
    notes: '',
    youtubeLinks: []
  })

  // Fetch build entries from KV storage
  useEffect(() => {
    fetchBuildEntries()
  }, [])

  const fetchBuildEntries = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/build-logs')
      if (response.ok) {
        const data = await response.json()
        setEntries(data)
      } else {
        console.error('Failed to fetch build entries')
      }
    } catch (error) {
      console.error('Error fetching build entries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAdmin) {
      alert('Admin authentication required to add or edit build entries')
      return
    }

    // Validate inputs
    if (!newEntry.date || !newEntry.brokenPart || !newEntry.upgradedTo || !newEntry.notes) {
      alert('Please fill in all required fields')
      return
    }

    if (newEntry.cost < 0) {
      alert('Cost cannot be negative')
      return
    }

    try {
      setSaving(true)
      
      if (editingEntry) {
        // Update existing entry
        const response = await fetch('/api/build-logs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingEntry.id, ...newEntry })
        })
        
        if (response.ok) {
          await fetchBuildEntries()
          setEditingEntry(null)
          alert('Build entry updated successfully!')
        } else {
          const error = await response.json()
          alert(`Error updating build entry: ${error.error}`)
        }
      } else {
        // Add new entry
        const response = await fetch('/api/build-logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEntry)
        })
        
        if (response.ok) {
          await fetchBuildEntries()
          alert('Build entry added successfully!')
        } else {
          const error = await response.json()
          alert(`Error adding build entry: ${error.error}`)
        }
      }
      
      resetForm()
      setShowForm(false)
    } catch (error) {
      console.error('Error saving build entry:', error)
      alert('Error saving build entry. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (entry: BuildEntry) => {
    if (!isAdmin) return
    
    setEditingEntry(entry)
    setNewEntry({
      date: entry.date,
      brokenPart: entry.brokenPart,
      upgradedTo: entry.upgradedTo,
      cost: entry.cost,
      category: entry.category,
      notes: entry.notes,
      youtubeLinks: entry.youtubeLinks || []
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!isAdmin) return
    
    if (confirm('Are you sure you want to delete this build entry?')) {
      try {
        const response = await fetch(`/api/build-logs?id=${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          await fetchBuildEntries()
          alert('Build entry deleted successfully!')
        } else {
          const error = await response.json()
          alert(`Error deleting build entry: ${error.error}`)
        }
      } catch (error) {
        console.error('Error deleting build entry:', error)
        alert('Error deleting build entry. Please try again.')
      }
    }
  }

  const resetForm = () => {
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      brokenPart: '',
      upgradedTo: '',
      cost: 0,
      category: 'repair',
      notes: '',
      youtubeLinks: []
    })
    setEditingEntry(null)
  }

  const getCategoryColor = (category: BuildEntry['category']) => {
    switch (category) {
      case 'repair': return 'text-red-400'
      case 'upgrade': return 'text-green-400'
      case 'maintenance': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  const getCategoryIcon = (category: BuildEntry['category']) => {
    switch (category) {
      case 'repair':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        )
      case 'upgrade':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        )
      case 'maintenance':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
    }
  }

  const sortedEntries = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const totalCost = entries.reduce((sum, entry) => sum + entry.cost, 0)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Build Log</h3>
          <div className="animate-pulse bg-gray-600 h-10 w-32 rounded"></div>
        </div>
        <div className="animate-pulse bg-gray-700 h-64 rounded"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-white">Build Log (Vercel KV)</h3>
          <p className="text-gray-400 text-sm">Total spent: ${totalCost.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-4">
          {!isAdmin && <AdminLogin />}
          {isAdmin && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              disabled={saving}
            >
              {showForm ? 'Cancel' : 'Add Entry'}
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
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-orange-500"
                required
                disabled={saving}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Category *</label>
              <select
                value={newEntry.category}
                onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value as BuildEntry['category'] })}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-orange-500"
                required
                disabled={saving}
              >
                <option value="repair">Repair</option>
                <option value="upgrade">Upgrade</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Broken/Old Part *</label>
              <input
                type="text"
                value={newEntry.brokenPart}
                onChange={(e) => setNewEntry({ ...newEntry, brokenPart: e.target.value })}
                placeholder="What broke or needs replacing?"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-orange-500"
                required
                disabled={saving}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">New/Upgraded Part *</label>
              <input
                type="text"
                value={newEntry.upgradedTo}
                onChange={(e) => setNewEntry({ ...newEntry, upgradedTo: e.target.value })}
                placeholder="What did you install/upgrade to?"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-orange-500"
                required
                disabled={saving}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Cost ($) *</label>
              <input
                type="number"
                value={newEntry.cost || ''}
                onChange={(e) => setNewEntry({ ...newEntry, cost: Number(e.target.value) })}
                step="0.01"
                min="0"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-orange-500"
                required
                disabled={saving}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Notes *</label>
            <textarea
              value={newEntry.notes}
              onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
              placeholder="Installation details, issues encountered, performance improvements, etc."
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
                editingEntry ? 'Update Entry' : 'Save Entry'
              )}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {sortedEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No build entries recorded yet.</p>
            {isAdmin && (
              <p className="mt-2">Click "Add Entry" to log your first build entry!</p>
            )}
          </div>
        ) : (
          sortedEntries.map((entry) => (
            <div key={entry.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-1 ${getCategoryColor(entry.category)}`}>
                    {getCategoryIcon(entry.category)}
                    <span className="text-sm font-medium capitalize">{entry.category}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{entry.date}</span>
                  <span className="text-orange-500 font-semibold">${entry.cost.toFixed(2)}</span>
                </div>
                {isAdmin && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
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
              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">From:</span> {entry.brokenPart}
                  </div>
                  <div>
                    <span className="text-gray-400">To:</span> {entry.upgradedTo}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Notes:</span>
                  <p className="text-white mt-1">{entry.notes}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}