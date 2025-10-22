'use client'

import { useState } from 'react'

interface BuildEntry {
  id: number
  date: string
  partBroken: string
  partUpgradedTo: string
  notes: string
}

export default function BuildLog() {
  const [entries, setEntries] = useState<BuildEntry[]>([
    {
      id: 1,
      date: '2024-10-10',
      partBroken: 'Stock Driveshafts',
      partUpgradedTo: 'Steel CVDs',
      notes: 'Massive backflip landed hard, snapped both front driveshafts'
    },
    {
      id: 2,
      date: '2024-09-25',
      partBroken: 'Rear A-Arms',
      partUpgradedTo: 'RPM A-Arms',
      notes: 'Rock impact during trail bashing'
    }
  ])

  const [newEntry, setNewEntry] = useState({
    date: '',
    partBroken: '',
    partUpgradedTo: '',
    notes: ''
  })

  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newEntry.date && newEntry.partBroken) {
      const entry: BuildEntry = {
        id: Date.now(),
        date: newEntry.date,
        partBroken: newEntry.partBroken,
        partUpgradedTo: newEntry.partUpgradedTo,
        notes: newEntry.notes
      }
      setEntries([entry, ...entries])
      setNewEntry({ date: '', partBroken: '', partUpgradedTo: '', notes: '' })
      setShowForm(false)
    }
  }

  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Build & Repair History</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="garage-button"
        >
          {showForm ? 'Cancel' : 'Add Entry'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="garage-card space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Date</label>
              <input
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                className="w-full bg-garage-medium border border-garage-light rounded px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Part Broken</label>
              <input
                type="text"
                value={newEntry.partBroken}
                onChange={(e) => setNewEntry({ ...newEntry, partBroken: e.target.value })}
                className="w-full bg-garage-medium border border-garage-light rounded px-3 py-2 text-white"
                placeholder="e.g., Rear A-Arms"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Upgraded To</label>
            <input
              type="text"
              value={newEntry.partUpgradedTo}
              onChange={(e) => setNewEntry({ ...newEntry, partUpgradedTo: e.target.value })}
              className="w-full bg-garage-medium border border-garage-light rounded px-3 py-2 text-white"
              placeholder="e.g., RPM A-Arms"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Notes</label>
            <textarea
              value={newEntry.notes}
              onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
              className="w-full bg-garage-medium border border-garage-light rounded px-3 py-2 text-white h-24"
              placeholder="What happened? How was the repair/upgrade?"
            />
          </div>
          <button type="submit" className="garage-button">
            Add Entry
          </button>
        </form>
      )}

      <div className="space-y-4">
        {sortedEntries.map((entry) => (
          <div key={entry.id} className="garage-card">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-white">
                {entry.partBroken} → {entry.partUpgradedTo || 'Repair'}
              </h4>
              <span className="text-garage-accent text-sm font-mono">
                {entry.date}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-gray-400 text-sm">Broken:</span>
                <p className="text-white">{entry.partBroken}</p>
              </div>
              {entry.partUpgradedTo && (
                <div>
                  <span className="text-gray-400 text-sm">Upgraded to:</span>
                  <p className="text-garage-accent">{entry.partUpgradedTo}</p>
                </div>
              )}
            </div>
            
            {entry.notes && (
              <div>
                <span className="text-gray-400 text-sm">Notes:</span>
                <p className="text-gray-300 mt-1">{entry.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}