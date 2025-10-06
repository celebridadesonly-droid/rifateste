'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  Settings, 
  CreditCard, 
  Trophy, 
  TrendingUp, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  Menu,
  X,
  Home,
  ShoppingCart,
  Star,
  UserCheck,
  Wallet,
  Bell,
  LogOut,
  Search,
  Filter,
  Download,
  Upload,
  Save,
  TestTube,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  FileText,
  Image as ImageIcon,
  Palette,
  Globe,
  Lock,
  Unlock,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Activity
} from 'lucide-react'

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter()

  // Estados para configurações
  const [siteSettings, setSiteSettings] = useState({
    title: 'Raspadinha Premium',
    subtitle: 'Sua chance de ganhar prêmios incríveis!',
    description: 'Participe das nossas raspadinhas e concorra a prêmios fantásticos.',
    logo: '/logo.png',
    banner: '/banner.jpg',
    primaryColor: '#10B981',
    secondaryColor: '#059669',
    reservationTime: 10, // minutos
    termsOfService: 'Termos e condições...',
    privacyPolicy: 'Política de privacidade...',
    refundPolicy: 'Política de reembolso...'
  })
  
  const [paymentGateway, setPaymentGateway] = useState({
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
  })

  const [newRaffle, setNewRaffle] = useState({
    title: '',
    description: '',
    image: '',
    price: 0.10,
    totalTickets: 10000,
    endDate: '',
    status: 'active',
    prizes: [{ position: 1, description: 'Prêmio Principal', value: 0 }]
  })

  // Verificar autenticação
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const user = localStorage.getItem('admin_user')
    
    if (!token || !user) {
      router.push('/admin/login')
      return
    }
    
    try {
      setCurrentUser(JSON.parse(user))
      setIsAuthenticated(true)
    } catch (err) {
      router.push('/admin/login')
    }
  }, [router])

  // Dados mock do dashboard
  const dashboardStats = {
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

  const recentTransactions = [
    { id: 1, user: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', amount: 50.00, tickets: 500, status: 'Pago', date: '2024-01-15 14:30', orderId: 'ORD001' },
    { id: 2, user: 'Maria Santos', email: 'maria@email.com', phone: '(11) 88888-8888', amount: 25.00, tickets: 250, status: 'Pendente', date: '2024-01-15 14:25', orderId: 'ORD002' },
    { id: 3, user: 'Carlos Lima', email: 'carlos@email.com', phone: '(11) 77777-7777', amount: 100.00, tickets: 1000, status: 'Pago', date: '2024-01-15 14:20', orderId: 'ORD003' },
    { id: 4, user: 'Ana Costa', email: 'ana@email.com', phone: '(11) 66666-6666', amount: 15.00, tickets: 150, status: 'Cancelado', date: '2024-01-15 14:15', orderId: 'ORD004' },
    { id: 5, user: 'Pedro Oliveira', email: 'pedro@email.com', phone: '(11) 55555-5555', amount: 75.00, tickets: 750, status: 'Pago', date: '2024-01-15 14:10', orderId: 'ORD005' }
  ]

  const activeRaffles = [
    { 
      id: 1, 
      title: 'R$ 100.000 no PIX', 
      description: 'Concorra a R$ 100.000 direto no seu PIX!',
      totalTickets: 100000, 
      soldTickets: 65680, 
      price: 0.10, 
      endDate: '2024-02-01', 
      status: 'Ativa',
      image: '/raffle1.jpg',
      createdAt: '2024-01-01',
      probability: 0.001
    },
    { 
      id: 2, 
      title: 'iPhone 15 Pro Max', 
      description: 'iPhone 15 Pro Max 256GB na cor que você escolher!',
      totalTickets: 50000, 
      soldTickets: 23400, 
      price: 0.20, 
      endDate: '2024-01-25', 
      status: 'Ativa',
      image: '/raffle2.jpg',
      createdAt: '2024-01-05',
      probability: 0.002
    },
    { 
      id: 3, 
      title: 'Moto Honda CB 600F', 
      description: 'Honda CB 600F Hornet 2024 0KM!',
      totalTickets: 75000, 
      soldTickets: 12300, 
      price: 0.15, 
      endDate: '2024-02-10', 
      status: 'Pausada',
      image: '/raffle3.jpg',
      createdAt: '2024-01-10',
      probability: 0.0013
    }
  ]

  const auditLogs = [
    { id: 1, user: 'Admin', action: 'Criou nova rifa', details: 'iPhone 15 Pro Max', timestamp: '2024-01-15 10:30', type: 'create' },
    { id: 2, user: 'Admin', action: 'Alterou preço da rifa', details: 'R$ 100.000 no PIX: R$ 0.10 → R$ 0.12', timestamp: '2024-01-15 09:15', type: 'update' },
    { id: 3, user: 'Admin', action: 'Configurou gateway', details: 'MercadoPago ativado', timestamp: '2024-01-15 08:45', type: 'config' },
    { id: 4, user: 'Admin', action: 'Executou sorteio', details: 'Rifa #123 finalizada', timestamp: '2024-01-14 20:00', type: 'draw' },
    { id: 5, user: 'Admin', action: 'Alterou status de compra', details: 'Pedido #ORD002: Pendente → Pago', timestamp: '2024-01-14 16:30', type: 'payment' }
  ]

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'buyers', label: 'Compradores', icon: Users },
    { id: 'raffles', label: 'Raspadinhas & Prêmios', icon: Trophy },
    { id: 'payments', label: 'Pagamentos', icon: CreditCard },
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'logs', label: 'Logs', icon: FileText }
  ]

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    router.push('/admin/login')
  }

  const handleSaveSiteSettings = async () => {
    setIsLoading(true)
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('Configurações do site salvas com sucesso!')
    } catch (err) {
      alert('Erro ao salvar configurações')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestPaymentGateway = async () => {
    setIsLoading(true)
    try {
      // Simular teste do gateway
      await new Promise(resolve => setTimeout(resolve, 3000))
      setPaymentGateway(prev => ({
        ...prev,
        lastTest: new Date().toISOString(),
        testStatus: 'success'
      }))
      alert('Gateway testado com sucesso! Conexão estabelecida.')
    } catch (err) {
      setPaymentGateway(prev => ({
        ...prev,
        lastTest: new Date().toISOString(),
        testStatus: 'error'
      }))
      alert('Erro ao testar gateway. Verifique as credenciais.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSavePaymentGateway = async () => {
    setIsLoading(true)
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('Configurações do gateway salvas com sucesso!')
    } catch (err) {
      alert('Erro ao salvar configurações do gateway')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateRaffle = async () => {
    setIsLoading(true)
    try {
      // Simular criação
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Raspadinha criada com sucesso!')
      setNewRaffle({
        title: '',
        description: '',
        image: '',
        price: 0.10,
        totalTickets: 10000,
        endDate: '',
        status: 'active',
        prizes: [{ position: 1, description: 'Prêmio Principal', value: 0 }]
      })
    } catch (err) {
      alert('Erro ao criar raspadinha')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = (type: string) => {
    // Simular exportação
    const data = type === 'buyers' ? recentTransactions : activeRaffles
    const csv = data.map(item => Object.values(item).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${type}_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredTransactions = recentTransactions.filter(transaction => {
    const matchesSearch = transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || transaction.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
    </div>
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Bem-vindo de volta, {currentUser?.name}</p>
        </div>
        <div className="text-sm text-gray-400">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Receita Total</p>
              <p className="text-2xl font-bold text-green-400">R$ {dashboardStats.totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              <p className="text-xs text-green-400 mt-1">+12.5% este mês</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Bilhetes Vendidos</p>
              <p className="text-2xl font-bold text-blue-400">{dashboardStats.totalTickets.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-blue-400 mt-1">{dashboardStats.todayTickets} hoje</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Raspadinhas Ativas</p>
              <p className="text-2xl font-bold text-yellow-400">{dashboardStats.activeRaffles}</p>
              <p className="text-xs text-yellow-400 mt-1">2 finalizando hoje</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Usuários</p>
              <p className="text-2xl font-bold text-purple-400">{dashboardStats.totalUsers.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-purple-400 mt-1">Taxa conversão: {dashboardStats.conversionRate}%</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Métricas Adicionais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Receita Hoje</h3>
          <p className="text-3xl font-bold text-green-400">R$ {dashboardStats.todayRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+8.2% vs ontem</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Pagamentos</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Confirmados</span>
              <span className="text-green-400">{dashboardStats.completedPayments}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Pendentes</span>
              <span className="text-yellow-400">{dashboardStats.pendingPayments}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Top Raspadinha</h3>
          <p className="text-lg font-semibold text-white">{dashboardStats.topSellingRaffle}</p>
          <p className="text-sm text-gray-400 mt-1">65.680 bilhetes vendidos</p>
        </div>
      </div>

      {/* Transações Recentes */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Últimas Transações</h2>
          <button 
            onClick={() => setActiveSection('buyers')}
            className="text-green-400 hover:text-green-300 text-sm font-medium"
          >
            Ver todas →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Usuário</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Valor</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Bilhetes</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.slice(0, 5).map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white font-medium">{transaction.user}</p>
                      <p className="text-gray-400 text-sm">{transaction.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-green-400 font-semibold">R$ {transaction.amount.toFixed(2)}</td>
                  <td className="py-3 px-4 text-gray-300">{transaction.tickets.toLocaleString('pt-BR')}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === 'Pago' 
                        ? 'bg-green-500/20 text-green-400' 
                        : transaction.status === 'Pendente'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderBuyers = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Compradores</h1>
          <p className="text-gray-400 mt-1">Gerencie todos os compradores e suas transações</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleExportData('buyers')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Todos os Status</option>
              <option value="pago">Pago</option>
              <option value="pendente">Pendente</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabela de Compradores */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Comprador</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Contato</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Quantidade</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Valor Total</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Data</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-500/20 w-10 h-10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{transaction.user}</p>
                        <p className="text-gray-400 text-sm">ID: #{transaction.orderId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">{transaction.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">{transaction.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white font-semibold">{transaction.tickets.toLocaleString('pt-BR')}</span>
                    <span className="text-gray-400 text-sm block">bilhetes</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-green-400 font-bold text-lg">R$ {transaction.amount.toFixed(2)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === 'Pago' 
                        ? 'bg-green-500/20 text-green-400' 
                        : transaction.status === 'Pendente'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-400">{transaction.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderRaffles = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Raspadinhas & Prêmios</h1>
          <p className="text-gray-400 mt-1">Gerencie todas as raspadinhas e seus prêmios</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nova Raspadinha</span>
        </button>
      </div>

      {/* Formulário Nova Raspadinha */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Criar Nova Raspadinha</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
            <input
              type="text"
              value={newRaffle.title}
              onChange={(e) => setNewRaffle(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: R$ 50.000 no PIX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Preço por Bilhete</label>
            <input
              type="number"
              step="0.01"
              value={newRaffle.price}
              onChange={(e) => setNewRaffle(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Total de Bilhetes</label>
            <input
              type="number"
              value={newRaffle.totalTickets}
              onChange={(e) => setNewRaffle(prev => ({ ...prev, totalTickets: parseInt(e.target.value) }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Data de Encerramento</label>
            <input
              type="datetime-local"
              value={newRaffle.endDate}
              onChange={(e) => setNewRaffle(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
            <textarea
              value={newRaffle.description}
              onChange={(e) => setNewRaffle(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Descreva os detalhes da raspadinha..."
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Imagem</label>
            <div className="flex items-center space-x-4">
              <input
                type="url"
                value={newRaffle.image}
                onChange={(e) => setNewRaffle(prev => ({ ...prev, image: e.target.value }))}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="URL da imagem"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleCreateRaffle}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Criar Raspadinha</span>
          </button>
        </div>
      </div>

      {/* Lista de Raspadinhas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {activeRaffles.map((raffle) => (
          <div key={raffle.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-green-500/50 transition-colors">
            <div className="aspect-video bg-gray-700 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-500" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-white">{raffle.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  raffle.status === 'Ativa' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {raffle.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{raffle.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progresso</span>
                  <span className="text-white">{Math.round((raffle.soldTickets / raffle.totalTickets) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(raffle.soldTickets / raffle.totalTickets) * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400 block">Vendidos</span>
                    <span className="text-white font-semibold">{raffle.soldTickets.toLocaleString('pt-BR')}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Preço</span>
                    <span className="text-green-400 font-semibold">R$ {raffle.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400 block">Encerra em</span>
                  <span className="text-white">{new Date(raffle.endDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1">
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>Ver</span>
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Gateway de Pagamentos</h1>
          <p className="text-gray-400 mt-1">Configure e gerencie os métodos de pagamento</p>
        </div>
      </div>

      {/* Configuração do Gateway */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Configuração PIX</h2>
          <div className="flex items-center space-x-2">
            {paymentGateway.testStatus === 'success' && (
              <div className="flex items-center space-x-1 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Testado com sucesso</span>
              </div>
            )}
            {paymentGateway.testStatus === 'error' && (
              <div className="flex items-center space-x-1 text-red-400">
                <XCircle className="w-4 h-4" />
                <span className="text-sm">Erro no teste</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Provedor</label>
            <select
              value={paymentGateway.provider}
              onChange={(e) => setPaymentGateway(prev => ({ ...prev, provider: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="mercadopago">MercadoPago</option>
              <option value="pagseguro">PagSeguro</option>
              <option value="asaas">Asaas</option>
              <option value="gerencianet">Gerencianet</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Modo</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={paymentGateway.sandboxMode}
                  onChange={() => setPaymentGateway(prev => ({ ...prev, sandboxMode: true }))}
                  className="mr-2"
                />
                <span className="text-white">Sandbox</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!paymentGateway.sandboxMode}
                  onChange={() => setPaymentGateway(prev => ({ ...prev, sandboxMode: false }))}
                  className="mr-2"
                />
                <span className="text-white">Produção</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Client ID</label>
            <input
              type="text"
              value={paymentGateway.clientId}
              onChange={(e) => setPaymentGateway(prev => ({ ...prev, clientId: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Seu Client ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Client Secret</label>
            <input
              type="password"
              value={paymentGateway.clientSecret}
              onChange={(e) => setPaymentGateway(prev => ({ ...prev, clientSecret: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Seu Client Secret"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Access Token</label>
            <input
              type="password"
              value={paymentGateway.accessToken}
              onChange={(e) => setPaymentGateway(prev => ({ ...prev, accessToken: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Seu Access Token"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Public Key</label>
            <input
              type="text"
              value={paymentGateway.publicKey}
              onChange={(e) => setPaymentGateway(prev => ({ ...prev, publicKey: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Sua Public Key"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Webhook URL</label>
            <input
              type="url"
              value={paymentGateway.webhookUrl}
              onChange={(e) => setPaymentGateway(prev => ({ ...prev, webhookUrl: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="https://seusite.com/api/webhook/payments"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={paymentGateway.isActive}
              onChange={(e) => setPaymentGateway(prev => ({ ...prev, isActive: e.target.checked }))}
              className="rounded"
            />
            <label className="text-white">Gateway Ativo</label>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handleTestPaymentGateway}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <TestTube className="w-4 h-4" />
              )}
              <span>Testar Gateway</span>
            </button>
            <button 
              onClick={handleSavePaymentGateway}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Salvar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transações */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Transações Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">ID Transação</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Comprador</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Valor</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Gateway</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Data</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-3 px-4">
                    <span className="text-white font-mono text-sm">{transaction.orderId}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white font-medium">{transaction.user}</p>
                      <p className="text-gray-400 text-sm">{transaction.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-green-400 font-semibold">R$ {transaction.amount.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === 'Pago' 
                        ? 'bg-green-500/20 text-green-400' 
                        : transaction.status === 'Pendente'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">PIX</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{transaction.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Configurações Gerais</h1>
          <p className="text-gray-400 mt-1">Personalize a aparência e comportamento do site</p>
        </div>
      </div>

      {/* Configurações do Site */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Informações do Site</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Título do Site</label>
            <input
              type="text"
              value={siteSettings.title}
              onChange={(e) => setSiteSettings(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Subtítulo</label>
            <input
              type="text"
              value={siteSettings.subtitle}
              onChange={(e) => setSiteSettings(prev => ({ ...prev, subtitle: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
            <textarea
              value={siteSettings.description}
              onChange={(e) => setSiteSettings(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Configurações Visuais */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Aparência</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Cor Primária</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={siteSettings.primaryColor}
                onChange={(e) => setSiteSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                className="w-12 h-10 rounded-lg border border-gray-600"
              />
              <input
                type="text"
                value={siteSettings.primaryColor}
                onChange={(e) => setSiteSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Cor Secundária</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={siteSettings.secondaryColor}
                onChange={(e) => setSiteSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                className="w-12 h-10 rounded-lg border border-gray-600"
              />
              <input
                type="text"
                value={siteSettings.secondaryColor}
                onChange={(e) => setSiteSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Logo</label>
            <div className="flex items-center space-x-4">
              <input
                type="url"
                value={siteSettings.logo}
                onChange={(e) => setSiteSettings(prev => ({ ...prev, logo: e.target.value }))}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="URL do logo"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Banner</label>
            <div className="flex items-center space-x-4">
              <input
                type="url"
                value={siteSettings.banner}
                onChange={(e) => setSiteSettings(prev => ({ ...prev, banner: e.target.value }))}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="URL do banner"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Configurações de Comportamento */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Comportamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tempo de Reserva (minutos)</label>
            <input
              type="number"
              value={siteSettings.reservationTime}
              onChange={(e) => setSiteSettings(prev => ({ ...prev, reservationTime: parseInt(e.target.value) }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-gray-400 text-sm mt-1">Tempo que os bilhetes ficam reservados durante o checkout</p>
          </div>
        </div>
      </div>

      {/* Políticas */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Políticas e Termos</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Termos de Serviço</label>
            <textarea
              value={siteSettings.termsOfService}
              onChange={(e) => setSiteSettings(prev => ({ ...prev, termsOfService: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Política de Privacidade</label>
            <textarea
              value={siteSettings.privacyPolicy}
              onChange={(e) => setSiteSettings(prev => ({ ...prev, privacyPolicy: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Política de Reembolso</label>
            <textarea
              value={siteSettings.refundPolicy}
              onChange={(e) => setSiteSettings(prev => ({ ...prev, refundPolicy: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSaveSiteSettings}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Salvar Configurações</span>
        </button>
      </div>
    </div>
  )

  const renderLogs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Logs e Auditoria</h1>
          <p className="text-gray-400 mt-1">Acompanhe todas as ações realizadas no sistema</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Trash2 className="w-4 h-4" />
          <span>Limpar Logs</span>
        </button>
      </div>

      {/* Filtros de Log */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar nos logs..."
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="sm:w-48">
            <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="all">Todos os Tipos</option>
              <option value="create">Criação</option>
              <option value="update">Atualização</option>
              <option value="delete">Exclusão</option>
              <option value="config">Configuração</option>
              <option value="payment">Pagamento</option>
            </select>
          </div>
          <div className="sm:w-48">
            <input
              type="date"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Lista de Logs */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Timestamp</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Usuário</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Ação</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Detalhes</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Tipo</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm font-mono">{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-500/20 w-8 h-8 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-white font-medium">{log.user}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white">{log.action}</td>
                  <td className="py-4 px-6 text-gray-300">{log.details}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      log.type === 'create' ? 'bg-green-500/20 text-green-400' :
                      log.type === 'update' ? 'bg-blue-500/20 text-blue-400' :
                      log.type === 'delete' ? 'bg-red-500/20 text-red-400' :
                      log.type === 'config' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard()
      case 'buyers':
        return renderBuyers()
      case 'raffles':
        return renderRaffles()
      case 'payments':
        return renderPayments()
      case 'settings':
        return renderSettings()
      case 'logs':
        return renderLogs()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setIsSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors mb-1 ${
                  activeSection === item.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-500/20 w-10 h-10 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white font-medium">{currentUser?.name}</p>
              <p className="text-gray-400 text-sm">{currentUser?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-green-500/20 w-8 h-8 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-white font-medium hidden sm:block">{currentUser?.name}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          {renderContent()}
        </main>
      </div>

      {/* Overlay para mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}