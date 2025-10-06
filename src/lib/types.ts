// Tipos para o sistema de administração

export interface User {
  id: number
  name: string
  email: string
  role: 'superadmin' | 'editor'
  createdAt: string
  lastLogin?: string
}

export interface Transaction {
  id: number
  user: string
  email: string
  phone: string
  amount: number
  tickets: number
  status: 'Pago' | 'Pendente' | 'Cancelado' | 'Estornado'
  date: string
  orderId: string
  paymentMethod?: string
  gatewayTransactionId?: string
}

export interface Raffle {
  id: number
  title: string
  description: string
  image: string
  price: number
  totalTickets: number
  soldTickets: number
  endDate: string
  status: 'Ativa' | 'Pausada' | 'Encerrada' | 'Finalizada'
  createdAt: string
  probability?: number
  prizes: Prize[]
  reservedTickets?: number
}

export interface Prize {
  position: number
  description: string
  value: number
  image?: string
}

export interface PaymentGateway {
  provider: 'mercadopago' | 'pagseguro' | 'asaas' | 'gerencianet'
  clientId: string
  clientSecret: string
  accessToken: string
  publicKey: string
  webhookUrl: string
  sandboxMode: boolean
  isActive: boolean
  lastTest?: string
  testStatus?: 'success' | 'error' | null
}

export interface SiteSettings {
  title: string
  subtitle: string
  description: string
  logo: string
  banner: string
  primaryColor: string
  secondaryColor: string
  reservationTime: number // em minutos
  termsOfService: string
  privacyPolicy: string
  refundPolicy: string
  contactEmail?: string
  supportPhone?: string
  socialMedia?: {
    facebook?: string
    instagram?: string
    whatsapp?: string
  }
}

export interface AuditLog {
  id: number
  user: string
  action: string
  details: string
  timestamp: string
  type: 'create' | 'update' | 'delete' | 'config' | 'payment' | 'draw'
  entityType?: string
  entityId?: number
  ipAddress?: string
  userAgent?: string
}

export interface DashboardStats {
  totalSales: number
  totalTickets: number
  activeRaffles: number
  totalUsers: number
  pendingPayments: number
  completedPayments: number
  todayRevenue: number
  monthRevenue: number
  todayTickets: number
  conversionRate: number
  avgTicketValue: number
  topSellingRaffle: string
}

export interface TicketReservation {
  id: number
  raffleId: number
  userId?: number
  sessionId: string
  ticketNumbers: number[]
  reservedAt: string
  expiresAt: string
  status: 'reserved' | 'confirmed' | 'expired'
}

export interface WebhookPayload {
  id: string
  type: string
  data: {
    id: string
    status: string
    amount: number
    currency: string
    orderId: string
    paymentMethod: string
    paidAt?: string
    failureReason?: string
  }
  createdAt: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface FilterOptions {
  search?: string
  status?: string
  dateFrom?: string
  dateTo?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Tipos para formulários
export interface CreateRaffleForm {
  title: string
  description: string
  image: string
  price: number
  totalTickets: number
  endDate: string
  status: 'active' | 'paused'
  prizes: Prize[]
}

export interface UpdateTransactionForm {
  status: 'Pago' | 'Pendente' | 'Cancelado' | 'Estornado'
  notes?: string
}

export interface PaymentGatewayTestResult {
  success: boolean
  message: string
  details?: any
  testedAt: string
}

// Tipos para autenticação
export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthUser {
  id: number
  email: string
  name: string
  role: 'superadmin' | 'editor'
  permissions: string[]
}

export interface AuthResponse {
  success: boolean
  user?: AuthUser
  token?: string
  error?: string
}

// Tipos para uploads
export interface UploadResponse {
  success: boolean
  url?: string
  filename?: string
  error?: string
}

// Tipos para exportação
export interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf'
  dateFrom?: string
  dateTo?: string
  filters?: FilterOptions
}

// Tipos para notificações
export interface Notification {
  id: number
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string
}

// Tipos para configurações de segurança
export interface SecuritySettings {
  maxLoginAttempts: number
  lockoutDuration: number // em minutos
  sessionTimeout: number // em minutos
  requireTwoFactor: boolean
  allowedIpRanges?: string[]
  rateLimiting: {
    enabled: boolean
    requestsPerMinute: number
  }
}

// Tipos para relatórios
export interface ReportData {
  period: string
  revenue: number
  tickets: number
  users: number
  conversions: number
  topRaffles: Array<{
    id: number
    title: string
    revenue: number
    tickets: number
  }>
}

export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string
    borderColor?: string
  }>
}