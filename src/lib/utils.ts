import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ApiResponse, FilterOptions, ExportOptions } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatação de valores
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value)
}

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

export const formatDateOnly = (date: string | Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date))
}

// Validações
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/
  return phoneRegex.test(phone)
}

export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, '')
  
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false
  }
  
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.charAt(9))) return false
  
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.charAt(10))) return false
  
  return true
}

// Utilitários de string
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

// Utilitários de array
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

// Utilitários de data
export const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000)
}

export const isExpired = (date: string | Date): boolean => {
  return new Date(date) < new Date()
}

export const getTimeRemaining = (endDate: string | Date): {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
} => {
  const total = new Date(endDate).getTime() - new Date().getTime()
  
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
  }
  
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  
  return { days, hours, minutes, seconds, total }
}

// Utilitários de arquivo
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || ''
}

export const isImageFile = (filename: string): boolean => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  return imageExtensions.includes(getFileExtension(filename))
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Utilitários de URL
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value))
    }
  })
  
  return searchParams.toString()
}

export const parseQueryString = (queryString: string): Record<string, string> => {
  const params = new URLSearchParams(queryString)
  const result: Record<string, string> = {}
  
  params.forEach((value, key) => {
    result[key] = value
  })
  
  return result
}

// Utilitários de criptografia (simulados - usar biblioteca real em produção)
export const hashPassword = async (password: string): Promise<string> => {
  // Em produção, usar bcrypt ou argon2
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'salt')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const hashedPassword = await hashPassword(password)
  return hashedPassword === hash
}

export const generateToken = (): string => {
  return crypto.randomUUID()
}

// Utilitários de validação de formulário
export const validateForm = (data: Record<string, any>, rules: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {}
  
  Object.entries(rules).forEach(([field, rule]) => {
    const value = data[field]
    
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = `${field} é obrigatório`
      return
    }
    
    if (value && rule.email && !validateEmail(value)) {
      errors[field] = 'Email inválido'
      return
    }
    
    if (value && rule.phone && !validatePhone(value)) {
      errors[field] = 'Telefone inválido'
      return
    }
    
    if (value && rule.minLength && value.toString().length < rule.minLength) {
      errors[field] = `Mínimo ${rule.minLength} caracteres`
      return
    }
    
    if (value && rule.maxLength && value.toString().length > rule.maxLength) {
      errors[field] = `Máximo ${rule.maxLength} caracteres`
      return
    }
    
    if (value && rule.min && parseFloat(value) < rule.min) {
      errors[field] = `Valor mínimo: ${rule.min}`
      return
    }
    
    if (value && rule.max && parseFloat(value) > rule.max) {
      errors[field] = `Valor máximo: ${rule.max}`
      return
    }
  })
  
  return errors
}

// Utilitários de exportação
export const exportToCSV = (data: any[], filename: string): void => {
  if (!data.length) return
  
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value
      }).join(',')
    )
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// Utilitários de notificação
export const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void => {
  // Implementar com biblioteca de toast (react-hot-toast, sonner, etc.)
  console.log(`[${type.toUpperCase()}] ${message}`)
}

// Utilitários de debounce
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Utilitários de throttle
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Utilitários de localStorage
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch {
      return defaultValue || null
    }
  },
  
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }
}

// Utilitários de API
export const apiRequest = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const token = storage.get('admin_token')
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      }
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erro na requisição')
    }
    
    return data
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}

// Utilitários de cores
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export const getContrastColor = (hex: string): string => {
  const rgb = hexToRgb(hex)
  if (!rgb) return '#000000'
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return brightness > 128 ? '#000000' : '#ffffff'
}

// Utilitários de performance
export const measurePerformance = (name: string, fn: () => any): any => {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  console.log(`${name} took ${end - start} milliseconds`)
  return result
}

// Utilitários de device
export const isMobile = (): boolean => {
  return window.innerWidth < 768
}

export const isTablet = (): boolean => {
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

export const isDesktop = (): boolean => {
  return window.innerWidth >= 1024
}