// API simulada para o sistema de administração
// Em produção, substituir por chamadas reais para o backend

import { 
  ApiResponse, 
  PaginatedResponse, 
  Transaction, 
  Raffle, 
  PaymentGateway, 
  SiteSettings, 
  AuditLog, 
  DashboardStats,
  AuthResponse,
  LoginCredentials,
  CreateRaffleForm,
  UpdateTransactionForm,
  PaymentGatewayTestResult,
  FilterOptions
} from './types'

// Dados mock
const mockTransactions: Transaction[] = [
  { id: 1, user: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', amount: 50.00, tickets: 500, status: 'Pago', date: '2024-01-15 14:30', orderId: 'ORD001' },
  { id: 2, user: 'Maria Santos', email: 'maria@email.com', phone: '(11) 88888-8888', amount: 25.00, tickets: 250, status: 'Pendente', date: '2024-01-15 14:25', orderId: 'ORD002' },
  { id: 3, user: 'Carlos Lima', email: 'carlos@email.com', phone: '(11) 77777-7777', amount: 100.00, tickets: 1000, status: 'Pago', date: '2024-01-15 14:20', orderId: 'ORD003' },
  { id: 4, user: 'Ana Costa', email: 'ana@email.com', phone: '(11) 66666-6666', amount: 15.00, tickets: 150, status: 'Cancelado', date: '2024-01-15 14:15', orderId: 'ORD004' },
  { id: 5, user: 'Pedro Oliveira', email: 'pedro@email.com', phone: '(11) 55555-5555', amount: 75.00, tickets: 750, status: 'Pago', date: '2024-01-15 14:10', orderId: 'ORD005' }
]

const mockRaffles: Raffle[] = [
  { 
    id: 1, 
    title: 'R$ 100.000 no PIX', 
    description: 'Concorra a R$ 100.000 direto no seu PIX!',
    totalTickets: 100000, 
    soldTickets: 65680, 
    price: 0.10, 
    endDate: '2024-02-01T23:59:59', 
    status: 'Ativa',
    image: '/raffle1.jpg',
    createdAt: '2024-01-01T00:00:00',
    probability: 0.001,
    prizes: [
      { position: 1, description: 'R$ 100.000 no PIX', value: 100000 }
    ]
  },
  { 
    id: 2, 
    title: 'iPhone 15 Pro Max', 
    description: 'iPhone 15 Pro Max 256GB na cor que você escolher!',
    totalTickets: 50000, 
    soldTickets: 23400, 
    price: 0.20, 
    endDate: '2024-01-25T23:59:59', 
    status: 'Ativa',
    image: '/raffle2.jpg',
    createdAt: '2024-01-05T00:00:00',
    probability: 0.002,
    prizes: [
      { position: 1, description: 'iPhone 15 Pro Max 256GB', value: 8000 }
    ]
  }
]

const mockAuditLogs: AuditLog[] = [
  { id: 1, user: 'Admin', action: 'Criou nova rifa', details: 'iPhone 15 Pro Max', timestamp: '2024-01-15 10:30', type: 'create' },
  { id: 2, user: 'Admin', action: 'Alterou preço da rifa', details: 'R$ 100.000 no PIX: R$ 0.10 → R$ 0.12', timestamp: '2024-01-15 09:15', type: 'update' },
  { id: 3, user: 'Admin', action: 'Configurou gateway', details: 'MercadoPago ativado', timestamp: '2024-01-15 08:45', type: 'config' },
  { id: 4, user: 'Admin', action: 'Executou sorteio', details: 'Rifa #123 finalizada', timestamp: '2024-01-14 20:00', type: 'draw' },
  { id: 5, user: 'Admin', action: 'Alterou status de compra', details: 'Pedido #ORD002: Pendente → Pago', timestamp: '2024-01-14 16:30', type: 'payment' }
]

// Simulação de delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// APIs de Autenticação
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro na autenticação:', error)
      return {
        success: false,
        error: 'Erro de conexão com o servidor'
      }
    }
  },

  forgotPassword: async (email: string): Promise<ApiResponse> => {
    await delay(2000)
    
    return {
      success: true,
      message: 'Email de recuperação enviado com sucesso'
    }
  },

  resetPassword: async (token: string, newPassword: string): Promise<ApiResponse> => {
    await delay(1500)
    
    return {
      success: true,
      message: 'Senha alterada com sucesso'
    }
  },

  logout: async (): Promise<ApiResponse> => {
    await delay(500)
    
    return {
      success: true,
      message: 'Logout realizado com sucesso'
    }
  }
}

// APIs do Dashboard
export const dashboardAPI = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    await delay(1000)
    
    return {
      success: true,
      data: {
        totalSales: 125680.50,
        totalTickets: 1256805,
        activeRaffles: 8,
        totalUsers: 15847,
        pendingPayments: 43,
        completedPayments: 2305,
        todayRevenue: 5340.80,
        monthRevenue: 125680.50,
        todayTickets: 534,
        conversionRate: 12.5,
        avgTicketValue: 25.50,
        topSellingRaffle: 'R$ 100.000 no PIX'
      }
    }
  },

  getRecentTransactions: async (limit: number = 10): Promise<ApiResponse<Transaction[]>> => {
    await delay(800)
    
    return {
      success: true,
      data: mockTransactions.slice(0, limit)
    }
  }
}

// APIs de Transações
export const transactionsAPI = {
  getAll: async (filters: FilterOptions = {}): Promise<PaginatedResponse<Transaction>> => {
    await delay(1000)
    
    let filteredTransactions = [...mockTransactions]
    
    // Aplicar filtros
    if (filters.search) {
      const search = filters.search.toLowerCase()
      filteredTransactions = filteredTransactions.filter(t => 
        t.user.toLowerCase().includes(search) || 
        t.email.toLowerCase().includes(search) ||
        t.orderId.toLowerCase().includes(search)
      )
    }
    
    if (filters.status && filters.status !== 'all') {
      filteredTransactions = filteredTransactions.filter(t => 
        t.status.toLowerCase() === filters.status?.toLowerCase()
      )
    }
    
    // Paginação
    const page = filters.page || 1
    const limit = filters.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    return {
      success: true,
      data: filteredTransactions.slice(startIndex, endIndex),
      pagination: {
        page,
        limit,
        total: filteredTransactions.length,
        totalPages: Math.ceil(filteredTransactions.length / limit)
      }
    }
  },

  getById: async (id: number): Promise<ApiResponse<Transaction>> => {
    await delay(500)
    
    const transaction = mockTransactions.find(t => t.id === id)
    
    if (!transaction) {
      return {
        success: false,
        error: 'Transação não encontrada'
      }
    }
    
    return {
      success: true,
      data: transaction
    }
  },

  update: async (id: number, data: UpdateTransactionForm): Promise<ApiResponse<Transaction>> => {
    await delay(1000)
    
    const transactionIndex = mockTransactions.findIndex(t => t.id === id)
    
    if (transactionIndex === -1) {
      return {
        success: false,
        error: 'Transação não encontrada'
      }
    }
    
    mockTransactions[transactionIndex] = {
      ...mockTransactions[transactionIndex],
      status: data.status
    }
    
    return {
      success: true,
      data: mockTransactions[transactionIndex],
      message: 'Transação atualizada com sucesso'
    }
  },

  delete: async (id: number): Promise<ApiResponse> => {
    await delay(800)
    
    const transactionIndex = mockTransactions.findIndex(t => t.id === id)
    
    if (transactionIndex === -1) {
      return {
        success: false,
        error: 'Transação não encontrada'
      }
    }
    
    mockTransactions.splice(transactionIndex, 1)
    
    return {
      success: true,
      message: 'Transação excluída com sucesso'
    }
  },

  export: async (filters: FilterOptions = {}): Promise<ApiResponse<string>> => {
    await delay(2000)
    
    // Simular geração de arquivo
    return {
      success: true,
      data: 'https://example.com/export/transactions.csv',
      message: 'Exportação gerada com sucesso'
    }
  }
}

// APIs de Raspadinhas
export const rafflesAPI = {
  getAll: async (filters: FilterOptions = {}): Promise<PaginatedResponse<Raffle>> => {
    await delay(1000)
    
    let filteredRaffles = [...mockRaffles]
    
    if (filters.search) {
      const search = filters.search.toLowerCase()
      filteredRaffles = filteredRaffles.filter(r => 
        r.title.toLowerCase().includes(search) || 
        r.description.toLowerCase().includes(search)
      )
    }
    
    if (filters.status && filters.status !== 'all') {
      filteredRaffles = filteredRaffles.filter(r => 
        r.status.toLowerCase() === filters.status?.toLowerCase()
      )
    }
    
    const page = filters.page || 1
    const limit = filters.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    return {
      success: true,
      data: filteredRaffles.slice(startIndex, endIndex),
      pagination: {
        page,
        limit,
        total: filteredRaffles.length,
        totalPages: Math.ceil(filteredRaffles.length / limit)
      }
    }
  },

  getById: async (id: number): Promise<ApiResponse<Raffle>> => {
    await delay(500)
    
    const raffle = mockRaffles.find(r => r.id === id)
    
    if (!raffle) {
      return {
        success: false,
        error: 'Raspadinha não encontrada'
      }
    }
    
    return {
      success: true,
      data: raffle
    }
  },

  create: async (data: CreateRaffleForm): Promise<ApiResponse<Raffle>> => {
    await delay(2000)
    
    const newRaffle: Raffle = {
      id: mockRaffles.length + 1,
      ...data,
      soldTickets: 0,
      createdAt: new Date().toISOString(),
      status: data.status === 'active' ? 'Ativa' : 'Pausada'
    }
    
    mockRaffles.push(newRaffle)
    
    return {
      success: true,
      data: newRaffle,
      message: 'Raspadinha criada com sucesso'
    }
  },

  update: async (id: number, data: Partial<CreateRaffleForm>): Promise<ApiResponse<Raffle>> => {
    await delay(1500)
    
    const raffleIndex = mockRaffles.findIndex(r => r.id === id)
    
    if (raffleIndex === -1) {
      return {
        success: false,
        error: 'Raspadinha não encontrada'
      }
    }
    
    mockRaffles[raffleIndex] = {
      ...mockRaffles[raffleIndex],
      ...data,
      status: data.status === 'active' ? 'Ativa' : data.status === 'paused' ? 'Pausada' : mockRaffles[raffleIndex].status
    }
    
    return {
      success: true,
      data: mockRaffles[raffleIndex],
      message: 'Raspadinha atualizada com sucesso'
    }
  },

  delete: async (id: number): Promise<ApiResponse> => {
    await delay(1000)
    
    const raffleIndex = mockRaffles.findIndex(r => r.id === id)
    
    if (raffleIndex === -1) {
      return {
        success: false,
        error: 'Raspadinha não encontrada'
      }
    }
    
    mockRaffles.splice(raffleIndex, 1)
    
    return {
      success: true,
      message: 'Raspadinha excluída com sucesso'
    }
  }
}

// APIs de Gateway de Pagamento
export const paymentGatewayAPI = {
  getConfig: async (): Promise<ApiResponse<PaymentGateway>> => {
    await delay(800)
    
    return {
      success: true,
      data: {
        provider: 'mercadopago',
        clientId: '',
        clientSecret: '',
        accessToken: '',
        publicKey: '',
        webhookUrl: '',
        sandboxMode: true,
        isActive: false,
        lastTest: null,
        testStatus: null
      }
    }
  },

  updateConfig: async (config: Partial<PaymentGateway>): Promise<ApiResponse<PaymentGateway>> => {
    await delay(1500)
    
    // Simular salvamento criptografado
    return {
      success: true,
      data: {
        provider: 'mercadopago',
        clientId: config.clientId || '',
        clientSecret: '***encrypted***',
        accessToken: '***encrypted***',
        publicKey: config.publicKey || '',
        webhookUrl: config.webhookUrl || '',
        sandboxMode: config.sandboxMode ?? true,
        isActive: config.isActive ?? false,
        lastTest: null,
        testStatus: null
      },
      message: 'Configurações do gateway salvas com sucesso'
    }
  },

  test: async (): Promise<ApiResponse<PaymentGatewayTestResult>> => {
    await delay(3000)
    
    // Simular teste do gateway
    const success = Math.random() > 0.3 // 70% de chance de sucesso
    
    return {
      success: true,
      data: {
        success,
        message: success 
          ? 'Conexão com o gateway estabelecida com sucesso' 
          : 'Erro ao conectar com o gateway. Verifique as credenciais.',
        testedAt: new Date().toISOString(),
        details: success ? { status: 'connected' } : { error: 'invalid_credentials' }
      }
    }
  },

  processWebhook: async (payload: any): Promise<ApiResponse> => {
    await delay(500)
    
    // Simular processamento do webhook
    return {
      success: true,
      message: 'Webhook processado com sucesso'
    }
  }
}

// APIs de Configurações do Site
export const settingsAPI = {
  get: async (): Promise<ApiResponse<SiteSettings>> => {
    await delay(800)
    
    return {
      success: true,
      data: {
        title: 'Raspadinha Premium',
        subtitle: 'Sua chance de ganhar prêmios incríveis!',
        description: 'Participe das nossas raspadinhas e concorra a prêmios fantásticos.',
        logo: '/logo.png',
        banner: '/banner.jpg',
        primaryColor: '#10B981',
        secondaryColor: '#059669',
        reservationTime: 10,
        termsOfService: 'Termos e condições...',
        privacyPolicy: 'Política de privacidade...',
        refundPolicy: 'Política de reembolso...'
      }
    }
  },

  update: async (settings: Partial<SiteSettings>): Promise<ApiResponse<SiteSettings>> => {
    await delay(1500)
    
    return {
      success: true,
      data: {
        title: 'Raspadinha Premium',
        subtitle: 'Sua chance de ganhar prêmios incríveis!',
        description: 'Participe das nossas raspadinhas e concorra a prêmios fantásticos.',
        logo: '/logo.png',
        banner: '/banner.jpg',
        primaryColor: '#10B981',
        secondaryColor: '#059669',
        reservationTime: 10,
        termsOfService: 'Termos e condições...',
        privacyPolicy: 'Política de privacidade...',
        refundPolicy: 'Política de reembolso...',
        ...settings
      },
      message: 'Configurações salvas com sucesso'
    }
  }
}

// APIs de Logs de Auditoria
export const auditLogsAPI = {
  getAll: async (filters: FilterOptions = {}): Promise<PaginatedResponse<AuditLog>> => {
    await delay(1000)
    
    let filteredLogs = [...mockAuditLogs]
    
    if (filters.search) {
      const search = filters.search.toLowerCase()
      filteredLogs = filteredLogs.filter(log => 
        log.action.toLowerCase().includes(search) || 
        log.details.toLowerCase().includes(search) ||
        log.user.toLowerCase().includes(search)
      )
    }
    
    const page = filters.page || 1
    const limit = filters.limit || 20
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    return {
      success: true,
      data: filteredLogs.slice(startIndex, endIndex),
      pagination: {
        page,
        limit,
        total: filteredLogs.length,
        totalPages: Math.ceil(filteredLogs.length / limit)
      }
    }
  },

  create: async (log: Omit<AuditLog, 'id' | 'timestamp'>): Promise<ApiResponse<AuditLog>> => {
    await delay(300)
    
    const newLog: AuditLog = {
      id: mockAuditLogs.length + 1,
      timestamp: new Date().toISOString(),
      ...log
    }
    
    mockAuditLogs.unshift(newLog)
    
    return {
      success: true,
      data: newLog
    }
  },

  clear: async (): Promise<ApiResponse> => {
    await delay(1000)
    
    mockAuditLogs.length = 0
    
    return {
      success: true,
      message: 'Logs limpos com sucesso'
    }
  }
}

// APIs de Upload
export const uploadAPI = {
  uploadImage: async (file: File): Promise<ApiResponse<{ url: string; filename: string }>> => {
    await delay(2000)
    
    // Simular upload
    const filename = `${Date.now()}_${file.name}`
    const url = `https://example.com/uploads/${filename}`
    
    return {
      success: true,
      data: { url, filename },
      message: 'Imagem enviada com sucesso'
    }
  },

  deleteImage: async (filename: string): Promise<ApiResponse> => {
    await delay(1000)
    
    return {
      success: true,
      message: 'Imagem excluída com sucesso'
    }
  }
}

// APIs de Relatórios
export const reportsAPI = {
  getSalesReport: async (period: string): Promise<ApiResponse<any>> => {
    await delay(2000)
    
    return {
      success: true,
      data: {
        period,
        totalSales: 125680.50,
        totalTickets: 1256805,
        averageTicketValue: 25.50,
        conversionRate: 12.5,
        chartData: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
          datasets: [{
            label: 'Vendas',
            data: [12000, 19000, 15000, 25000, 22000],
            backgroundColor: '#10B981'
          }]
        }
      }
    }
  },

  getUsersReport: async (period: string): Promise<ApiResponse<any>> => {
    await delay(1500)
    
    return {
      success: true,
      data: {
        period,
        totalUsers: 15847,
        newUsers: 1234,
        activeUsers: 8765,
        chartData: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
          datasets: [{
            label: 'Novos Usuários',
            data: [300, 450, 320, 580, 490],
            backgroundColor: '#3B82F6'
          }]
        }
      }
    }
  }
}