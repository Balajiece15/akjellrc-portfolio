'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAdmin: boolean
  login: (password: string) => boolean
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Admin password - in production, this should be environment variable
const ADMIN_PASSWORD = 'akjellrc2025'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in on component mount
  useEffect(() => {
    const adminStatus = localStorage.getItem('akjellrc_admin_logged_in')
    if (adminStatus === 'true') {
      setIsAdmin(true)
    }
    setIsLoading(false)
  }, [])

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      localStorage.setItem('akjellrc_admin_logged_in', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    localStorage.removeItem('akjellrc_admin_logged_in')
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}