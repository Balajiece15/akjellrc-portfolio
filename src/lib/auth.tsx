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
const BACKUP_PASSWORD = 'admin123' // Backup password for testing

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
    console.log('Login attempt with password:', password)
    console.log('Expected password:', ADMIN_PASSWORD)
    console.log('Backup password:', BACKUP_PASSWORD)
    console.log('Password length:', password.length)
    console.log('Expected length:', ADMIN_PASSWORD.length)
    
    // Trim whitespace and check both passwords
    const cleanPassword = password.trim()
    const isValidPassword = cleanPassword === ADMIN_PASSWORD || cleanPassword === BACKUP_PASSWORD
    console.log('Password comparison result:', isValidPassword)
    
    if (isValidPassword) {
      setIsAdmin(true)
      localStorage.setItem('akjellrc_admin_logged_in', 'true')
      console.log('Login successful')
      return true
    }
    console.log('Login failed')
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