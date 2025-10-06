'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@/hooks/useAuth'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900">
        {children}
      </div>
    </AuthProvider>
  )
}