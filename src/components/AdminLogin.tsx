'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const { isAdmin, login, logout } = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with password:', password)
    console.log('Password length:', password.length)
    console.log('Auth context available:', !!login)
    
    const success = login(password)
    console.log('Login result:', success)
    if (success) {
      setPassword('')
      setError('')
      setShowLogin(false)
    } else {
      setError('Invalid admin password. Try "akjellrc2025" or "admin123"')
      setPassword('')
    }
  }

  if (isAdmin) {
    return (
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">Admin Mode</span>
        </div>
        <button
          onClick={logout}
          className="text-red-400 hover:text-red-300 text-sm px-3 py-1 border border-red-400 rounded hover:bg-red-400/10 transition-colors"
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <div className="mb-4">
      {!showLogin ? (
        <button
          onClick={() => setShowLogin(true)}
          className="text-orange-400 hover:text-orange-300 text-sm px-4 py-2 border border-orange-400 rounded hover:bg-orange-400/10 transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Admin Login</span>
        </button>
      ) : (
        <form onSubmit={handleLogin} className="garage-card bg-garage-medium/50 border border-orange-500/30">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Admin Authentication Required</span>
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-garage-dark border border-garage-light rounded px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
                placeholder="Enter admin password"
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="garage-button bg-orange-600 hover:bg-orange-700"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogin(false)
                  setPassword('')
                  setError('')
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}