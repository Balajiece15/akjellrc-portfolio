'use client'

import { useState, useEffect } from 'react'

interface BuildEntry {
  id: number
  date: string
  partBroken: string
  partUpgradedTo: string
  notes: string
  photos?: string[]
  videos?: string[]
  youtubeLinks?: string[]
}

export default function BuildLog() {
  const [entries, setEntries] = useState<BuildEntry[]>([])
  const [editingEntry, setEditingEntry] = useState<BuildEntry | null>(null)
  const [newEntry, setNewEntry] = useState({
    date: '',
    partBroken: '',
    partUpgradedTo: '',
    notes: '',
    youtubeLinks: [] as string[]
  })
  const [showForm, setShowForm] = useState(false)

  // Helper function to extract YouTube video ID
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const handleEdit = (entry: BuildEntry) => {
    setEditingEntry(entry)
    setNewEntry({
      date: entry.date,
      partBroken: entry.partBroken,
      partUpgradedTo: entry.partUpgradedTo,
      notes: entry.notes,
      youtubeLinks: entry.youtubeLinks || []
    })
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = entries.filter(entry => entry.id !== id)
      setEntries(updatedEntries)
      localStorage.setItem('buildEntries', JSON.stringify(updatedEntries))
    }
  }

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('buildEntries')
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    } else {
      // Default data if no saved data exists
      const defaultEntries = [
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
      ]
      setEntries(defaultEntries)
      localStorage.setItem('buildEntries', JSON.stringify(defaultEntries))
    }
  }, [])

  // Save to localStorage whenever entries change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('buildEntries', JSON.stringify(entries))
    }
  }, [entries])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newEntry.date && newEntry.partBroken) {
      if (editingEntry) {
        // Update existing entry
        const updatedEntries = entries.map(entry => 
          entry.id === editingEntry.id 
            ? { ...editingEntry, ...newEntry, youtubeLinks: newEntry.youtubeLinks }
            : entry
        )
        setEntries(updatedEntries)
        localStorage.setItem('buildEntries', JSON.stringify(updatedEntries))
        setEditingEntry(null)
      } else {
        // Create new entry
        const entry: BuildEntry = {
          id: Date.now(),
          date: newEntry.date,
          partBroken: newEntry.partBroken,
          partUpgradedTo: newEntry.partUpgradedTo,
          notes: newEntry.notes,
          youtubeLinks: newEntry.youtubeLinks
        }
        const updatedEntries = [entry, ...entries]
        setEntries(updatedEntries)
        localStorage.setItem('buildEntries', JSON.stringify(updatedEntries))
      }
      
      setNewEntry({ 
        date: '', 
        partBroken: '', 
        partUpgradedTo: '', 
        notes: '',
        youtubeLinks: []
      })
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
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {entry.partBroken} → {entry.partUpgradedTo || 'Repair'}
                </h4>
                <span className="text-garage-accent text-sm font-mono">
                  {entry.date}
                </span>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(entry)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
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
              <div className="mb-4">
                <span className="text-gray-400 text-sm">Notes:</span>
                <p className="text-gray-300 mt-1">{entry.notes}</p>
              </div>
            )}

            {/* YouTube Videos */}
            {entry.youtubeLinks && entry.youtubeLinks.length > 0 && (
              <div className="mt-4">
                <h5 className="text-garage-accent font-semibold mb-3">📹 Related Videos</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entry.youtubeLinks.map((link, index) => {
                    const videoId = extractYouTubeId(link)
                    if (!videoId) return null
                    
                    return (
                      <div key={index} className="bg-garage-medium rounded-lg p-3">
                        <div className="aspect-video mb-2">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={`Video ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded"
                          />
                        </div>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-garage-accent hover:text-garage-secondary text-xs"
                        >
                          Watch on YouTube →
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}