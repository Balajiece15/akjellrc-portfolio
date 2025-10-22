'use client'

import { useState, useEffect } from 'react'

interface SpeedRun {
  id: number
  date: string
  speed: number
  gearing: string
  battery: string
  notes: string
}

export default function SpeedLog() {
  const [runs, setRuns] = useState<SpeedRun[]>([])
  const [newRun, setNewRun] = useState({
    date: '',
    speed: '',
    gearing: '',
    battery: '',
    notes: ''
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
      const run: SpeedRun = {
        id: Date.now(),
        date: newRun.date,
        speed: parseFloat(newRun.speed),
        gearing: newRun.gearing,
        battery: newRun.battery,
        notes: newRun.notes
      }
      const updatedRuns = [run, ...runs]
      setRuns(updatedRuns)
      setNewRun({ date: '', speed: '', gearing: '', battery: '', notes: '' })
      setShowForm(false)
    }
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
          <button type="submit" className="garage-button">
            Add Run
          </button>
        </form>
      )}

      <div className="garage-card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-garage-medium">
              <th className="text-left py-3 text-gray-400">Date</th>
              <th className="text-left py-3 text-gray-400">Speed (MPH)</th>
              <th className="text-left py-3 text-gray-400">Gearing</th>
              <th className="text-left py-3 text-gray-400">Battery</th>
              <th className="text-left py-3 text-gray-400">Notes</th>
            </tr>
          </thead>
          <tbody>
            {sortedRuns.map((run) => (
              <tr key={run.id} className="border-b border-garage-medium">
                <td className="py-3 text-white">{run.date}</td>
                <td className="py-3 text-garage-accent font-semibold">{run.speed}</td>
                <td className="py-3 text-white">{run.gearing}</td>
                <td className="py-3 text-white">{run.battery}</td>
                <td className="py-3 text-gray-300 max-w-xs truncate">{run.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}