'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronLeft, ChevronRight, ShoppingCart, Users, Trophy, Clock, Star, Facebook, Instagram, MessageCircle, Plus, Minus, Gift } from 'lucide-react'

export default function RifaApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedTickets, setSelectedTickets] = useState(50)
  const [customQuantity, setCustomQuantity] = useState(50)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showCheckout, setShowCheckout] = useState(false)
  const [currentView, setCurrentView] = useState('home') // 'home', 'tickets', 'winners', 'participants', 'scratch'
  const [userTickets, setUserTickets] = useState([]) // Simulando bilhetes do usuário
  const [totalTicketsPurchased, setTotalTicketsPurchased] = useState(150) // Simulando bilhetes comprados pelo usuário
  const [scratchesUsed, setScratchesUsed] = useState(2) // Simulando raspadas já utilizadas
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 45,
    seconds: 30
  })

  // Configurações da rifa
  const totalTicketsAvailable = 10000 // Total de bilhetes disponíveis na rifa
  const ticketsSold = 3750 // Bilhetes já vendidos
  const progressPercentage = Math.round((ticketsSold / totalTicketsAvailable) * 100)

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Atualizar participantes automaticamente
  useEffect(() => {
    const updateParticipants = setInterval(() => {
      setParticipants(prev => {
        const newParticipant = generateRandomParticipant()
        return [newParticipant, ...prev.slice(0, 9)]
      })
    }, 10000) // Atualiza a cada 10 segundos

    return () => clearInterval(updateParticipants)
  }, [])

  const generateRandomParticipant = () => {
    const names = [
      'Ana Silva', 'Carlos Santos', 'Maria Oliveira', 'João Pereira', 'Fernanda Costa',
      'Ricardo Lima', 'Juliana Alves', 'Pedro Rodrigues', 'Camila Ferreira', 'Lucas Martins',
      'Beatriz Souza', 'Rafael Mendes', 'Larissa Barbosa', 'Thiago Rocha', 'Gabriela Dias'
    ]
    const randomName = names[Math.floor(Math.random() * names.length)]
    const randomTickets = Math.floor(Math.random() * 300) + 50
    const today = new Date().toISOString().split('T')[0]
    
    return {
      name: randomName,
      tickets: randomTickets,
      date: today
    }
  }

  const prizeImages = [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop'
  ]

  const ticketOptions = [
    { quantity: 50, price: 5.00, popular: false },
    { quantity: 100, price: 10.00, popular: true },
    { quantity: 200, price: 20.00, popular: false },
    { quantity: 500, price: 50.00, popular: false }
  ]

  // Prêmios da raspadinha com quantidades específicas
  const scratchPrizes = {
    'R$ 100': { total: 100, won: 25 },
    'R$ 1.000': { total: 10, won: 3 },
    'R$ 5.000': { total: 4, won: 1 },
    'R$ 10.000': { total: 2, won: 0 },
    'iPhone 17 Pro Max': { total: 20, won: 5 }
  }

  const scratchCards = [
    { number: '001', prize: 'iPhone 17 Pro Max', status: 'Disponível', winner: null },
    { number: '002', prize: 'R$ 1.000', status: 'Ganhou', winner: 'João S.' },
    { number: '003', prize: 'R$ 5.000', status: 'Disponível', winner: null },
    { number: '004', prize: 'R$ 100', status: 'Ganhou', winner: 'Maria L.' },
    { number: '005', prize: 'R$ 10.000', status: 'Disponível', winner: null },
    { number: '006', prize: 'R$ 1.000', status: 'Disponível', winner: null }
  ]

  const [participants, setParticipants] = useState([
    { name: 'Ana Silva', tickets: 150, date: '2024-01-15' },
    { name: 'Carlos Santos', tickets: 75, date: '2024-01-15' },
    { name: 'Maria Oliveira', tickets: 200, date: '2024-01-14' },
    { name: 'João Pereira', tickets: 100, date: '2024-01-14' },
    { name: 'Fernanda Costa', tickets: 300, date: '2024-01-13' },
    { name: 'Ricardo Lima', tickets: 50, date: '2024-01-13' },
    { name: 'Juliana Alves', tickets: 125, date: '2024-01-12' },
    { name: 'Pedro Rodrigues', tickets: 80, date: '2024-01-12' },
    { name: 'Camila Ferreira', tickets: 250, date: '2024-01-11' },
    { name: 'Lucas Martins', tickets: 175, date: '2024-01-11' }
  ])

  const winners = [
    { 
      name: 'João Silva', 
      prize: 'iPhone 17 Pro Max', 
      value: 'R$ 12.000', 
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop'
    },
    { 
      name: 'Maria Santos', 
      prize: 'R$ 10.000', 
      value: 'R$ 10.000', 
      date: '2024-01-09',
      image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=100&h=100&fit=crop'
    },
    { 
      name: 'Carlos Oliveira', 
      prize: 'R$ 5.000', 
      value: 'R$ 5.000', 
      date: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop'
    },
    { 
      name: 'Ana Costa', 
      prize: 'iPhone 17 Pro Max', 
      value: 'R$ 12.000', 
      date: '2024-01-07',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop'
    },
    { 
      name: 'Pedro Lima', 
      prize: 'R$ 1.000', 
      value: 'R$ 1.000', 
      date: '2024-01-06',
      image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=100&h=100&fit=crop'
    },
    { 
      name: 'Fernanda Rocha', 
      prize: 'R$ 100', 
      value: 'R$ 100', 
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop'
    },
    { 
      name: 'Ricardo Mendes', 
      prize: 'iPhone 17 Pro Max', 
      value: 'R$ 12.000', 
      date: '2024-01-04',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop'
    },
    { 
      name: 'Juliana Dias', 
      prize: 'R$ 5.000', 
      value: 'R$ 5.000', 
      date: '2024-01-03',
      image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=100&h=100&fit=crop'
    }
  ]

  // Calcular raspadas disponíveis (1 raspada a cada 50 bilhetes)
  const availableScratches = Math.floor(totalTicketsPurchased / 50)
  const remainingScratches = availableScratches - scratchesUsed

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % prizeImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + prizeImages.length) % prizeImages.length)
  }

  const handleQuantityChange = (value) => {
    const newValue = Math.max(50, Math.min(10000, value))
    setCustomQuantity(newValue)
    setSelectedTickets(newValue)
  }

  const handleBuyTickets = () => {
    setShowCheckout(true)
  }

  const handleMenuClick = (view) => {
    setCurrentView(view)
    setIsMenuOpen(false)
  }

  const handleBottomNavClick = (view) => {
    setCurrentView(view)
  }

  if (showCheckout) {
    return <CheckoutPage 
      tickets={selectedTickets} 
      totalPrice={selectedTickets * 0.10} 
      onBack={() => setShowCheckout(false)} 
    />
  }

  // Renderizar vista de Raspadinha
  if (currentView === 'scratch') {
    return <ScratchPage 
      availableScratches={remainingScratches}
      totalTickets={totalTicketsPurchased}
      scratchPrizes={scratchPrizes}
      onBack={() => setCurrentView('home')}
      onScratchUsed={() => setScratchesUsed(prev => prev + 1)}
    />
  }

  // Renderizar vista de Meus Bilhetes
  if (currentView === 'tickets') {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-black border-b border-gray-800">
          <button 
            onClick={() => setCurrentView('home')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-yellow-400" />
          </button>
          <h1 className="text-xl font-bold">Meus Bilhetes</h1>
          <div></div>
        </header>

        <main className="p-4 pb-20">
          {userTickets.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Você ainda não tem bilhetes</h2>
              <p className="text-gray-400 mb-8">Compre seus bilhetes e concorra a prêmios incríveis!</p>
              <button 
                onClick={() => setCurrentView('home')}
                className="bg-gradient-to-r from-yellow-400 to-green-500 text-black py-3 px-8 rounded-xl font-bold hover:from-yellow-500 hover:to-green-600 transition-all"
              >
                Comprar Bilhetes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {userTickets.map((ticket, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-yellow-400 font-bold">Bilhete #{ticket.number}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      ticket.status === 'Ativo' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Rifa: {ticket.raffle}</p>
                    <p>Data: {ticket.date}</p>
                    <p>Valor: R$ {ticket.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-2">
          <div className="flex justify-around items-center">
            <button 
              onClick={() => handleBottomNavClick('home')}
              className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Trophy className="w-5 h-5" />
              <span className="text-xs">Início</span>
            </button>
            <button className="flex flex-col items-center space-y-1 py-2 px-3 text-yellow-400">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs">Bilhetes</span>
            </button>
            <button 
              onClick={() => handleBottomNavClick('scratch')}
              className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Gift className="w-5 h-5" />
              <span className="text-xs">Raspadinha</span>
            </button>
            <button 
              onClick={() => handleBottomNavClick('winners')}
              className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Star className="w-5 h-5" />
              <span className="text-xs">Ganhadores</span>
            </button>
            <button 
              onClick={() => handleBottomNavClick('participants')}
              className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span className="text-xs">Participantes</span>
            </button>
          </div>
        </nav>
      </div>
    )
  }

  // Renderizar vista de Ganhadores
  if (currentView === 'winners') {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-black border-b border-gray-800">
          <button 
            onClick={() => setCurrentView('home')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-yellow-400" />
          </button>
          <h1 className="text-xl font-bold">Ganhadores</h1>
          <div></div>
        </header>

        <main className="p-4 pb-20">
          {/* Prêmios Restantes */}
          <div className="bg-gradient-to-r from-yellow-400/10 to-green-500/10 border border-yellow-400/30 rounded-xl p-4 mb-6">
            <h2 className="text-lg font-bold text-yellow-400 mb-4 text-center">🎁 Prêmios Restantes na Raspadinha</h2>
            <div className="space-y-3">
              {Object.entries(scratchPrizes).map(([prize, data]) => (
                <div key={prize} className="flex justify-between items-center bg-black/20 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{prize}</p>
                      <p className="text-xs text-gray-400">
                        {data.total - data.won} de {data.total} restantes
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      data.total - data.won > 0 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {data.total - data.won > 0 ? 'Disponível' : 'Esgotado'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">🏆 Últimos Ganhadores</h2>
            <div className="space-y-4">
              {winners.map((winner, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-green-500 flex items-center justify-center">
                      <img 
                        src={winner.image} 
                        alt={winner.prize}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-yellow-400">{winner.name}</span>
                        <Trophy className="w-4 h-4 text-yellow-400" />
                      </div>
                      <p className="text-white font-semibold">{winner.prize}</p>
                      <p className="text-green-400 font-bold">{winner.value}</p>
                      <p className="text-gray-400 text-sm">{winner.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400/10 to-green-500/10 border border-yellow-400/30 rounded-xl p-4">
            <div className="text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="font-bold text-yellow-400 mb-2">Próximo Sorteio Principal</h3>
              <p className="text-white font-semibold">R$ 100.000 no PIX</p>
              <p className="text-gray-400 text-sm mt-1">Participe agora e concorra!</p>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-2">
          <div className="flex justify-around items-center">
            <button 
              onClick={() => handleBottomNavClick('home')}
              className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Trophy className="w-5 h-5" />
              <span className="text-xs">Início</span>
            </button>
            <button 
              onClick={() => handleBottomNavClick('tickets')}
              className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs">Bilhetes</span>
            </button>
            <button 
              onClick={() => handleBottomNavClick('scratch')}
              className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Gift className="w-5 h-5" />
              <span className="text-xs">Raspadinha</span>
            </button>
            <button className="flex flex-col items-center space-y-1 py-2 px-3 text-yellow-400">
              <Star className="w-5 h-5" />
              <span className="text-xs">Ganhadores</span>
            </button>
            <button 
              onClick={() => handleBottomNavClick('participants')}
              className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span className="text-xs">Participantes</span>
            </button>
          </div>
        </nav>
      </div>
    )
  }

  // Renderizar vista de Participantes
  if (currentView === 'participants') {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-black border-b border-gray-800">
          <button 
            onClick={() => setCurrentView('home')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-yellow-400" />
          </button>
          <h1 className="text-xl font-bold">Participantes</h1>
          <div></div>
        </header>

        <main className="p-4 pb-20">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">👥 Últimos Compradores</h2>
            <div className="space-y-3">
              {participants.map((participant, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-lg">{participant.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-white">{participant.name}</p>
                        <p className="text-gray-400 text-sm">{participant.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-yellow-400">{participant.tickets} bilhetes</p>
                      <p className="text-green-400 text-sm">R$ {(participant.tickets * 0.10).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
            <div className="text-center">
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="font-bold mb-2">Total de Participantes</h3>
              <p className="text-2xl font-bold text-yellow-400">1.247</p>
              <p className="text-gray-400 text-sm">pessoas já estão participando</p>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-2">
          <div className="flex justify-around items-center">
            <button 
              onClick={() => handleBottomNavClick('home')}
              className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Trophy className="w-5 h-5" />
              <span className="text-xs">Início</span>
            </button>
            <button 
              onClick={() => handleBottomNavClick('tickets')}
              className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs">Bilhetes</span>
            </button>
            <button 
              onClick={() => handleBottomNavClick('scratch')}
              className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Gift className="w-5 h-5" />
              <span className="text-xs">Raspadinha</span>
            </button>
            <button 
              onClick={() => handleBottomNavClick('winners')}
              className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Star className="w-5 h-5" />
              <span className="text-xs">Ganhadores</span>
            </button>
            <button className="flex flex-col items-center space-y-1 py-2 px-3 text-yellow-400">
              <Users className="w-5 h-5" />
              <span className="text-xs">Participantes</span>
            </button>
          </div>
        </nav>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-black border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full flex items-center justify-center">
            <Trophy className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold text-yellow-400">RIFA</span>
          <span className="text-xl font-bold text-green-500">PIX</span>
        </div>
        
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-yellow-400" />
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-yellow-400">RIFA</span>
              <span className="text-xl font-bold text-green-500">PIX</span>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          
          <nav className="flex-1 p-4">
            <div className="space-y-4">
              <button 
                onClick={() => handleMenuClick('home')}
                className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors w-full text-left"
              >
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>Início</span>
              </button>
              <button 
                onClick={() => handleMenuClick('tickets')}
                className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors w-full text-left"
              >
                <ShoppingCart className="w-5 h-5 text-yellow-400" />
                <span>Meus Bilhetes</span>
              </button>
              <button 
                onClick={() => handleMenuClick('scratch')}
                className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors w-full text-left"
              >
                <Gift className="w-5 h-5 text-yellow-400" />
                <span>Raspadinha</span>
              </button>
              <button 
                onClick={() => handleMenuClick('winners')}
                className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors w-full text-left"
              >
                <Star className="w-5 h-5 text-yellow-400" />
                <span>Ganhadores</span>
              </button>
              <button 
                onClick={() => handleMenuClick('participants')}
                className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors w-full text-left"
              >
                <Users className="w-5 h-5 text-yellow-400" />
                <span>Participantes</span>
              </button>
            </div>
          </nav>
          
          <div className="p-4">
            <button className="w-full bg-yellow-400 text-black py-3 px-6 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
              Entrar
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-20">
        {/* Prize Section */}
        <section className="p-4">
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={prizeImages[currentImageIndex]} 
                alt="Prêmio" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-2xl font-bold text-yellow-400 mb-2">
                  CONCORRA A R$ 100.000 NO PIX
                </h1>
                <p className="text-gray-300 text-sm">
                  Sorteio ao vivo • Pagamento instantâneo • 100% seguro
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Bar Section */}
        <section className="px-4 mb-6">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-yellow-400">Progresso da Rifa</h3>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-4 mb-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-green-500 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-green-500/20 animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-yellow-400">{progressPercentage}%</span>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-400">
                🔥 Apenas {100 - progressPercentage}% restantes para encerrar a promoção!
              </p>
            </div>
          </div>
        </section>

        {/* Timer */}
        <section className="px-4 mb-6">
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Tempo restante</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-black rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-400">{timeLeft.days}</div>
                <div className="text-xs text-gray-400">DIAS</div>
              </div>
              <div className="bg-black rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-400">{timeLeft.hours}</div>
                <div className="text-xs text-gray-400">HORAS</div>
              </div>
              <div className="bg-black rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-400">{timeLeft.minutes}</div>
                <div className="text-xs text-gray-400">MIN</div>
              </div>
              <div className="bg-black rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-400">{timeLeft.seconds}</div>
                <div className="text-xs text-gray-400">SEG</div>
              </div>
            </div>
          </div>
        </section>

        {/* Ticket Options */}
        <section className="px-4 mb-6">
          <h2 className="text-xl font-bold mb-4 text-center">Escolha seus bilhetes</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {ticketOptions.map((option, index) => (
              <div 
                key={index}
                className={`relative bg-gray-900 rounded-xl p-4 border-2 transition-all cursor-pointer ${
                  option.popular 
                    ? 'border-yellow-400 bg-gradient-to-br from-yellow-400/10 to-green-500/10' 
                    : 'border-gray-700 hover:border-gray-600'
                } ${selectedTickets === option.quantity ? 'ring-2 ring-yellow-400' : ''}`}
                onClick={() => {
                  setSelectedTickets(option.quantity)
                  setCustomQuantity(option.quantity)
                }}
              >
                {option.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                      POPULAR
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">
                    {option.quantity}
                  </div>
                  <div className="text-sm text-gray-400 mb-2">bilhetes</div>
                  <div className="text-lg font-bold text-green-400 mb-3">
                    R$ {option.price.toFixed(2)}
                  </div>
                  <div className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                    selectedTickets === option.quantity
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-800 text-white'
                  }`}>
                    {selectedTickets === option.quantity ? 'Selecionado' : 'Selecionar'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Quantity */}
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
            <h3 className="text-lg font-bold text-center mb-4">Ou escolha a quantidade</h3>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <button
                onClick={() => handleQuantityChange(customQuantity - 50)}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                disabled={customQuantity <= 50}
              >
                <Minus className="w-5 h-5 text-yellow-400" />
              </button>
              
              <div className="flex-1 max-w-xs">
                <input
                  type="number"
                  min="50"
                  max="10000"
                  value={customQuantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 50)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-center text-xl font-bold text-yellow-400 focus:outline-none focus:border-yellow-400"
                />
              </div>
              
              <button
                onClick={() => handleQuantityChange(customQuantity + 50)}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                disabled={customQuantity >= 10000}
              >
                <Plus className="w-5 h-5 text-yellow-400" />
              </button>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-gray-400 text-sm">Mínimo: 50 bilhetes • Máximo: 10.000 bilhetes</p>
              <p className="text-lg font-bold text-green-400 mt-2">
                Total: R$ {(customQuantity * 0.10).toFixed(2)}
              </p>
            </div>
          </div>
        </section>

        {/* Buy Button */}
        <section className="px-4 mb-6">
          <button 
            onClick={handleBuyTickets}
            className="w-full bg-gradient-to-r from-yellow-400 to-green-500 text-black py-4 px-6 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-green-600 transition-all transform hover:scale-105"
          >
            <div className="flex items-center justify-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Comprar {selectedTickets} Bilhetes</span>
            </div>
          </button>
        </section>

        {/* My Tickets Button */}
        <section className="px-4 mb-6">
          <button 
            onClick={() => setCurrentView('tickets')}
            className="w-full bg-gray-800 border border-gray-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center justify-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>Meus Bilhetes</span>
            </div>
          </button>
        </section>

        {/* Scratch Cards */}
        <section className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Raspadinhas</h2>
            <button 
              onClick={() => setCurrentView('scratch')}
              className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
            >
              Ver todas
            </button>
          </div>
          
          {/* Scratch Status */}
          <div className="bg-gradient-to-r from-yellow-400/10 to-green-500/10 border border-yellow-400/30 rounded-xl p-4 mb-4">
            <div className="text-center">
              <Gift className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="font-bold text-yellow-400 mb-2">Suas Raspadas</h3>
              <p className="text-2xl font-bold text-white">{remainingScratches}</p>
              <p className="text-gray-400 text-sm">raspadas disponíveis</p>
              <p className="text-gray-400 text-xs mt-1">
                {totalTicketsPurchased} bilhetes comprados • 1 raspada a cada 50 bilhetes
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {scratchCards.slice(0, 3).map((card, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-black text-sm">{card.number}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-yellow-400">{card.prize}</div>
                    <div className="text-sm text-gray-400">
                      {card.status === 'Disponível' ? 'Disponível' : `Ganhou: ${card.winner}`}
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  card.status === 'Disponível' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-400/20 text-yellow-400'
                }`}>
                  {card.status}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Participants */}
        <section className="px-4 mb-6">
          <h2 className="text-xl font-bold mb-4">Últimos participantes</h2>
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="space-y-2">
              {participants.slice(0, 5).map((participant, index) => (
                <div key={index} className="flex items-center space-x-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">{participant.name.charAt(0)}</span>
                  </div>
                  <span className="text-gray-300">{participant.name}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setCurrentView('participants')}
              className="w-full mt-4 text-yellow-400 font-semibold py-2 hover:text-yellow-300 transition-colors"
            >
              Ver todos os participantes
            </button>
          </div>
        </section>

        {/* Social Media */}
        <section className="px-4 mb-6">
          <h2 className="text-xl font-bold mb-4 text-center">Siga-nos</h2>
          <div className="flex justify-center space-x-6">
            <a href="#" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors">
              <Facebook className="w-6 h-6 text-white" />
            </a>
            <a href="#" className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors">
              <Instagram className="w-6 h-6 text-white" />
            </a>
            <a href="#" className="bg-green-500 p-3 rounded-full hover:bg-green-600 transition-colors">
              <MessageCircle className="w-6 h-6 text-white" />
            </a>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-2">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => handleBottomNavClick('home')}
            className="flex flex-col items-center space-y-1 py-2 px-3 text-yellow-400"
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Início</span>
          </button>
          <button 
            onClick={() => handleBottomNavClick('tickets')}
            className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Bilhetes</span>
          </button>
          <button 
            onClick={() => handleBottomNavClick('scratch')}
            className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <Gift className="w-5 h-5" />
            <span className="text-xs">Raspadinha</span>
          </button>
          <button 
            onClick={() => handleBottomNavClick('winners')}
            className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <Star className="w-5 h-5" />
            <span className="text-xs">Ganhadores</span>
          </button>
          <button 
            onClick={() => handleBottomNavClick('participants')}
            className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Participantes</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

// Componente de Raspadinha
function ScratchPage({ availableScratches, totalTickets, scratchPrizes, onBack, onScratchUsed }) {
  const [scratchCards, setScratchCards] = useState([
    { id: 1, isScratched: false, prize: 'iPhone 17 Pro Max', value: 'R$ 12.000', isWinner: true },
    { id: 2, isScratched: false, prize: 'Tente novamente', value: '', isWinner: false },
    { id: 3, isScratched: false, prize: 'R$ 1.000', value: 'R$ 1.000', isWinner: true },
    { id: 4, isScratched: false, prize: 'Tente novamente', value: '', isWinner: false },
    { id: 5, isScratched: false, prize: 'R$ 5.000', value: 'R$ 5.000', isWinner: true },
    { id: 6, isScratched: false, prize: 'R$ 100', value: 'R$ 100', isWinner: true }
  ])

  const handleScratch = (cardId) => {
    if (availableScratches <= 0) {
      alert('Você não tem raspadas disponíveis! Compre mais bilhetes para ganhar raspadas.')
      return
    }

    setScratchCards(prev => 
      prev.map(card => 
        card.id === cardId ? { ...card, isScratched: true } : card
      )
    )
    onScratchUsed()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-black border-b border-gray-800">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-yellow-400" />
        </button>
        <h1 className="text-xl font-bold">Raspadinha</h1>
        <div></div>
      </header>

      <main className="p-4 pb-20">
        {/* Status */}
        <div className="bg-gradient-to-r from-yellow-400/10 to-green-500/10 border border-yellow-400/30 rounded-xl p-6 mb-6">
          <div className="text-center">
            <Gift className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">Suas Raspadas</h2>
            <div className="text-4xl font-bold text-white mb-2">{availableScratches}</div>
            <p className="text-gray-400 mb-4">raspadas disponíveis</p>
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-sm text-gray-300">
                📊 {totalTickets} bilhetes comprados
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Ganhe 1 raspada a cada 50 bilhetes comprados
              </p>
            </div>
          </div>
        </div>

        {/* Prêmios Disponíveis */}
        <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-700">
          <h3 className="font-bold text-yellow-400 mb-4 text-center">🎁 Prêmios Disponíveis</h3>
          <div className="space-y-3">
            {Object.entries(scratchPrizes).map(([prize, data]) => (
              <div key={prize} className="flex justify-between items-center bg-black/30 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-green-500 rounded-lg flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{prize}</p>
                    <p className="text-xs text-gray-400">
                      {data.total - data.won} de {data.total} restantes
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  data.total - data.won > 0 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {data.total - data.won > 0 ? 'Disponível' : 'Esgotado'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-700">
          <h3 className="font-bold text-yellow-400 mb-3">🎯 Como funciona:</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Cada 50 bilhetes comprados = 1 raspada grátis</li>
            <li>• Raspe para descobrir se ganhou um prêmio</li>
            <li>• Prêmios são entregues imediatamente após confirmação</li>
            <li>• Compre mais bilhetes para ganhar mais raspadas</li>
          </ul>
        </div>

        {/* Scratch Cards Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {scratchCards.map((card) => (
            <div key={card.id} className="relative">
              <div 
                className={`bg-gradient-to-br from-yellow-400 to-green-500 rounded-xl p-6 h-40 flex flex-col items-center justify-center cursor-pointer transition-all transform hover:scale-105 ${
                  card.isScratched ? 'opacity-90' : 'hover:shadow-2xl'
                }`}
                onClick={() => !card.isScratched && handleScratch(card.id)}
              >
                {!card.isScratched ? (
                  <div className="text-center">
                    <Gift className="w-8 h-8 text-black mx-auto mb-2" />
                    <p className="text-black font-bold text-lg">RASPE AQUI</p>
                    <p className="text-black/70 text-sm">Toque para raspar</p>
                  </div>
                ) : (
                  <div className="text-center">
                    {card.isWinner ? (
                      <>
                        <Trophy className="w-8 h-8 text-black mx-auto mb-2" />
                        <p className="text-black font-bold text-sm">{card.prize}</p>
                        <p className="text-black/70 text-xs">{card.value}</p>
                        <div className="mt-2 bg-black/20 rounded-full px-3 py-1">
                          <span className="text-black text-xs font-bold">PARABÉNS!</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <X className="w-8 h-8 text-black/60 mx-auto mb-2" />
                        <p className="text-black/70 font-bold text-sm">{card.prize}</p>
                        <p className="text-black/50 text-xs">Mais sorte na próxima!</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Scratches Available */}
        {availableScratches === 0 && (
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Sem raspadas disponíveis</h3>
            <p className="text-gray-400 mb-6">Compre mais bilhetes para ganhar raspadas grátis!</p>
            <button 
              onClick={onBack}
              className="bg-gradient-to-r from-yellow-400 to-green-500 text-black py-3 px-8 rounded-xl font-bold hover:from-yellow-500 hover:to-green-600 transition-all"
            >
              Comprar Bilhetes
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-2">
        <div className="flex justify-around items-center">
          <button 
            onClick={onBack}
            className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Início</span>
          </button>
          <button 
            onClick={onBack}
            className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Bilhetes</span>
          </button>
          <button className="flex flex-col items-center space-y-1 py-2 px-3 text-yellow-400">
            <Gift className="w-5 h-5" />
            <span className="text-xs">Raspadinha</span>
          </button>
          <button 
            onClick={onBack}
            className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <Star className="w-5 h-5" />
            <span className="text-xs">Ganhadores</span>
          </button>
          <button 
            onClick={onBack}
            className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Participantes</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

// Componente de Checkout
function CheckoutPage({ tickets, totalPrice, onBack }) {
  const [step, setStep] = useState(1) // 1: Cadastro, 2: Pagamento
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: ''
  })
  const [pixCode, setPixCode] = useState('00020126580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-426614174000520400005303986540510.005802BR5925RIFA PIX LTDA6009SAO PAULO62070503***6304ABCD')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode)
    alert('Código PIX copiado!')
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-yellow-400" />
            </button>
            <h1 className="text-xl font-bold">Finalizar Compra</h1>
            <div></div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-700">
            <h2 className="text-lg font-bold mb-3">Resumo do Pedido</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Bilhetes:</span>
              <span className="font-semibold">{tickets}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Preço unitário:</span>
              <span className="font-semibold">R$ 0,10</span>
            </div>
            <div className="border-t border-gray-700 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold text-green-400">R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Nome Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">CPF</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
                placeholder="000.000.000-00"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-green-500 text-black py-4 px-6 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-green-600 transition-all transform hover:scale-105"
            >
              Continuar para Pagamento
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setStep(1)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-yellow-400" />
          </button>
          <h1 className="text-xl font-bold">Pagamento PIX</h1>
          <div></div>
        </div>

        {/* Payment Info */}
        <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-700">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold mb-2">Escaneie o QR Code</h2>
            <p className="text-gray-400 text-sm">Ou copie o código PIX abaixo</p>
          </div>

          {/* QR Code Placeholder */}
          <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-center">
            <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm text-center">QR Code PIX<br/>R$ {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* PIX Code */}
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Código PIX (Copia e Cola)</label>
            <div className="flex">
              <input
                type="text"
                value={pixCode}
                readOnly
                className="flex-1 bg-gray-800 border border-gray-600 rounded-l-lg px-4 py-3 text-white text-sm"
              />
              <button
                onClick={copyPixCode}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-3 rounded-r-lg font-semibold transition-colors"
              >
                Copiar
              </button>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-bold mb-2">Como pagar:</h3>
            <ol className="text-sm text-gray-400 space-y-1">
              <li>1. Abra o app do seu banco</li>
              <li>2. Escolha a opção PIX</li>
              <li>3. Escaneie o QR Code ou cole o código</li>
              <li>4. Confirme o pagamento</li>
              <li>5. Seus bilhetes serão liberados automaticamente</li>
            </ol>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-700">
          <h3 className="font-bold mb-3">Detalhes do Pedido</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Nome:</span>
              <span>{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">E-mail:</span>
              <span>{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Bilhetes:</span>
              <span>{tickets}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span className="text-green-400">R$ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>Aguardando confirmação do pagamento...</p>
          <p className="mt-2">O pagamento pode levar até 5 minutos para ser processado</p>
        </div>
      </div>
    </div>
  )
}