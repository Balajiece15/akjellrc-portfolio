'use client'

import { useState, useEffect } from 'react'

interface SpeedRun {
  id: number
  date: string
  speed: number
  gearing: string
  battery: string
  notes: string
  photos?: string[]
  videos?: string[]
  youtubeLinks?: string[]
}

export default function SpeedLog() {
  const [runs, setRuns] = useState<SpeedRun[]>([])
  const [editingRun, setEditingRun] = useState<SpeedRun | null>(null)
  const [newRun, setNewRun] = useState({
    date: '',
    speed: '',
    gearing: '',
    battery: '',
    notes: '',
    youtubeLinks: ''
  })
  const [showForm, setShowForm] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedRuns = localStorage.getItem('speedRuns')
    if (savedRuns) {
      setRuns(JSON.parse(savedRuns))
    } else {
      // Default data if no saved data exists
      const defaultRuns = [
        {
          id: 1,
          date: '2024-10-15',
          speed: 120,
          gearing: '23T/64T',
          battery: '6S 5000mAh',
          notes: 'Perfect conditions, new aerodynamics package'
        },
        {
          id: 2,
          date: '2024-10-01',
          speed: 115,
          gearing: '22T/64T',
          battery: '6S 5000mAh',
          notes: 'Slight headwind, good stability'
        }
      ]
      setRuns(defaultRuns)
      localStorage.setItem('speedRuns', JSON.stringify(defaultRuns))
    }
  }, [])

  // Save to localStorage whenever runs change
  useEffect(() => {
    if (runs.length > 0) {
      localStorage.setItem('speedRuns', JSON.stringify(runs))
    }
  }, [runs])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newRun.date && newRun.speed) {
      const youtubeLinks = newRun.youtubeLinks 
        ? newRun.youtubeLinks.split(',').map(link => link.trim()).filter(link => link)
        : []

      if (editingRun) {
        // Update existing run
        const updatedRuns = runs.map(run => 
          run.id === editingRun.id 
            ? {
                ...run,
                date: newRun.date,
                speed: parseFloat(newRun.speed),
                gearing: newRun.gearing,
                battery: newRun.battery,
                notes: newRun.notes,
                youtubeLinks
              }
            : run
        )
        setRuns(updatedRuns)
        setEditingRun(null)
      } else {
        // Create new run
        const run: SpeedRun = {
          id: Date.now(),
          date: newRun.date,
          speed: parseFloat(newRun.speed),
          gearing: newRun.gearing,
          battery: newRun.battery,
          notes: newRun.notes,
          youtubeLinks
        }
        const updatedRuns = [run, ...runs]
        setRuns(updatedRuns)
      }
      setNewRun({ date: '', speed: '', gearing: '', battery: '', notes: '', youtubeLinks: '' })
      setShowForm(false)
    }
  }

  const handleEdit = (run: SpeedRun) => {
    setEditingRun(run)
    setNewRun({
      date: run.date,
      speed: run.speed.toString(),
      gearing: run.gearing,
      battery: run.battery,
      notes: run.notes,
      youtubeLinks: run.youtubeLinks?.join(', ') || ''
    })
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this speed run?')) {
      const updatedRuns = runs.filter(run => run.id !== id)
      setRuns(updatedRuns)
    }
  }

  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  const sortedRuns = [...runs].sort((a, b) => b.speed - a.speed)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Speed Runs</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="garage-button"
        >
          {showForm ? 'Cancel' : 'Add New Run'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="garage-card space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Date</label>
              <input
                type="date"
                value={newRun.date}
                onChange={(e) => setNewRun({ ...newRun, date: e.target.value })}
                className="w-full bg-garage-medium border border-garage-light rounded px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Speed (MPH)</label>
              <input
                type="number"
                value={newRun.speed}
                onChange={(e) => setNewRun({ ...newRun, speed: e.target.value })}
                className="w-full bg-garage-medium border border-garage-light rounded px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Gearing</label>
              <input
                type="text"
                value={newRun.gearing}
                onChange={(e) => setNewRun({ ...newRun, gearing: e.target.value })}
                className="w-full bg-garage-medium border border-garage-light rounded px-3 py-2 text-white"
                placeholder="e.g., 23T/64T"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Battery</label>
              <input
                type="text"
                value={newRun.battery}
                onChange={(e) => setNewRun({ ...newRun, battery: e.target.value })}
                className="w-full bg-garage-medium border border-garage-light rounded px-3 py-2 text-white"
                placeholder="e.g., 6S 5000mAh"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Notes</label>
            <textarea
              value={newRun.notes}
              onChange={(e) => setNewRun({ ...newRun, notes: e.target.value })}
              className="w-full bg-garage-medium border border-garage-light rounded px-3 py-2 text-white h-24"
              placeholder="Conditions, modifications, observations..."
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">YouTube Links</label>
            <input
              type="text"
              value={newRun.youtubeLinks}
              onChange={(e) => setNewRun({ ...newRun, youtubeLinks: e.target.value })}
              className="w-full bg-garage-medium border border-garage-light rounded px-3 py-2 text-white"
              placeholder="Enter YouTube URLs separated by commas"
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste YouTube URLs (including shorts) separated by commas
            </p>
          </div>
          <button type="submit" className="garage-button">
            {editingRun ? 'Update Run' : 'Add Run'}
          </button>
          {editingRun && (
            <button 
              type="button" 
              onClick={() => {
                setEditingRun(null)
                setNewRun({ date: '', speed: '', gearing: '', battery: '', notes: '', youtubeLinks: '' })
                setShowForm(false)
              }}
              className="ml-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
              Cancel Edit
            </button>
          )}
        </form>
      )}

      <div className="space-y-4">
        {sortedRuns.map((run) => (
          <div key={run.id} className="garage-card relative overflow-hidden">
            {/* HD Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-garage-dark/90 via-garage-dark/95 to-garage-dark/85" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-white font-semibold">{run.date}</span>
                    <span className="speed-display text-3xl">{run.speed} MPH</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-400">Gearing:</span> <span className="text-white">{run.gearing}</span></div>
                    <div><span className="text-gray-400">Battery:</span> <span className="text-white">{run.battery}</span></div>
                  </div>
                  {run.notes && (
                    <div className="mt-2">
                      <span className="text-gray-400 text-sm">Notes:</span>
                      <p className="text-gray-300">{run.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(run)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(run.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>

              {/* YouTube Videos */}
              {run.youtubeLinks && run.youtubeLinks.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-garage-accent font-semibold mb-3">📹 Related Videos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {run.youtubeLinks.map((link, index) => {
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
          </div>
        ))}
      </div>
    </div>
  )
}