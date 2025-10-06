'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { AuthUser, LoginCredentials, AuthResponse } from '@/lib/types'
import { authAPI } from '@/lib/api'
import { storage } from '@/lib/utils'

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<AuthResponse>
  logout: () => void
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  const checkAuth = () => {
    try {
      const token = storage.get('admin_token')
      const userData = storage.get('admin_user')
      
      if (token && userData) {
        setUser(userData)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await authAPI.login(credentials)
      
      if (response.success && response.user && response.token) {
        storage.set('admin_token', response.token)
        storage.set('admin_user', response.user)
        setUser(response.user)
      }
      
      return response
    } catch (error) {
      return {
        success: false,
        error: 'Erro interno do servidor'
      }
    }
  }

  const logout = () => {
    storage.remove('admin_token')
    storage.remove('admin_user')
    setUser(null)
    router.push('/admin/login')
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para proteger rotas
export const useRequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, isLoading, router])

  return { isAuthenticated, isLoading }
}