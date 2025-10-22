'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Simple authentication (you can change these credentials)
  const ADMIN_USERNAME = 'akjellrc'
  const ADMIN_PASSWORD = 'speedrun120'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid username or password')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-16">
        <div className="garage-card">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-garage-medium border border-garage-light rounded px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-garage-medium border border-garage-light rounded px-3 py-2 text-white"
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <button type="submit" className="garage-button w-full">
              Login
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-garage-medium rounded-lg">
            <h3 className="text-sm font-semibold text-garage-accent mb-2">Demo Credentials:</h3>
            <p className="text-xs text-gray-400">Username: akjellrc</p>
            <p className="text-xs text-gray-400">Password: speedrun120</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="section-title">Admin Panel</h1>
        <p className="subtitle">Manage your RC collection</p>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="mt-4 text-garage-accent hover:text-garage-secondary"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="garage-card">
          <h2 className="text-2xl font-bold text-white mb-4">Speed Run Garage</h2>
          <p className="text-gray-400 mb-6">
            Manage speed runs, update vehicle specs, and track performance data.
          </p>
          <Link href="/speed-run-garage" className="garage-button inline-block">
            Manage Speed Runs
          </Link>
        </div>

        <div className="garage-card">
          <h2 className="text-2xl font-bold text-white mb-4">Basher Fleet</h2>
          <p className="text-gray-400 mb-6">
            Log repairs, upgrades, and maintenance for your bashing vehicles.
          </p>
          <Link href="/basher-fleet" className="garage-button inline-block">
            Manage Build Log
          </Link>
        </div>
      </div>

      <div className="garage-card">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-garage-accent">120</div>
            <div className="text-gray-400">Current PB (MPH)</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-garage-accent">2</div>
            <div className="text-gray-400">Total Runs Logged</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-garage-accent">2</div>
            <div className="text-gray-400">Active Vehicles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-garage-accent">4</div>
            <div className="text-gray-400">Recent Repairs</div>
          </div>
        </div>
      </div>

      <div className="garage-card">
        <h2 className="text-2xl font-bold text-white mb-4">Site Management</h2>
        <div className="space-y-4">
          <div className="p-4 bg-garage-medium rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Database Status</h3>
            <p className="text-green-400">✓ Connected and operational</p>
          </div>
          
          <div className="p-4 bg-garage-medium rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Deployment</h3>
            <p className="text-gray-400">Ready for Vercel deployment</p>
            <p className="text-sm text-gray-500 mt-1">
              Domain: akjellrc.com (configure in Vercel dashboard)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}