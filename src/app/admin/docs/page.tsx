'use client'

import { useState } from 'react'
import { 
  Book, 
  Code, 
  Settings, 
  CreditCard, 
  Shield, 
  Users, 
  FileText,
  ChevronRight,
  ChevronDown,
  Copy,
  CheckCircle,
  ExternalLink
} from 'lucide-react'

export default function AdminDocumentation() {
  const [activeSection, setActiveSection] = useState('getting-started')
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started'])
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const sections = [
    {
      id: 'getting-started',
      title: 'Primeiros Passos',
      icon: Book,
      subsections: [
        { id: 'overview', title: 'Visão Geral' },
        { id: 'login', title: 'Como Fazer Login' },
        { id: 'dashboard', title: 'Navegando no Dashboard' }
      ]
    },
    {
      id: 'raffles',
      title: 'Gerenciar Raspadinhas',
      icon: Settings,
      subsections: [
        { id: 'create-raffle', title: 'Criar Nova Raspadinha' },
        { id: 'edit-raffle', title: 'Editar Raspadinha' },
        { id: 'raffle-status', title: 'Status das Raspadinhas' }
      ]
    },
    {
      id: 'payments',
      title: 'Gateway PIX',
      icon: CreditCard,
      subsections: [
        { id: 'setup-gateway', title: 'Configurar Gateway' },
        { id: 'test-gateway', title: 'Testar Conexão' },
        { id: 'webhooks', title: 'Configurar Webhooks' }
      ]
    },
    {
      id: 'users',
      title: 'Gerenciar Usuários',
      icon: Users,
      subsections: [
        { id: 'view-buyers', title: 'Visualizar Compradores' },
        { id: 'edit-orders', title: 'Editar Pedidos' },
        { id: 'export-data', title: 'Exportar Dados' }
      ]
    },
    {
      id: 'security',
      title: 'Segurança',
      icon: Shield,
      subsections: [
        { id: 'admin-accounts', title: 'Contas de Admin' },
        { id: 'rate-limiting', title: 'Rate Limiting' },
        { id: 'audit-logs', title: 'Logs de Auditoria' }
      ]
    },
    {
      id: 'api',
      title: 'API & Webhooks',
      icon: Code,
      subsections: [
        { id: 'webhook-endpoints', title: 'Endpoints de Webhook' },
        { id: 'api-authentication', title: 'Autenticação da API' },
        { id: 'testing', title: 'Testes' }
      ]
    }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Visão Geral do Sistema</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">
                O painel administrativo permite controle total sobre o site de raspadinhas, incluindo:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Criação e gerenciamento de raspadinhas</li>
                <li>• Configuração de gateway PIX para pagamentos</li>
                <li>• Monitoramento de vendas e usuários</li>
                <li>• Controle de reservas de bilhetes</li>
                <li>• Logs de auditoria e segurança</li>
              </ul>
            </div>
          </div>
        )

      case 'login':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Como Fazer Login</h2>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Credenciais Padrão</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-sm">Email:</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="bg-gray-700 px-3 py-1 rounded text-green-400">admin@raspadinha.com</code>
                    <button 
                      onClick={() => copyToClipboard('admin@raspadinha.com', 'email')}
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedCode === 'email' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Senha:</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="bg-gray-700 px-3 py-1 rounded text-green-400">admin123</code>
                    <button 
                      onClick={() => copyToClipboard('admin123', 'password')}
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedCode === 'password' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  ⚠️ <strong>Importante:</strong> Altere essas credenciais em produção!
                </p>
              </div>
            </div>
          </div>
        )

      case 'setup-gateway':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Configurar Gateway PIX</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">1. Obter Credenciais</h3>
                <p className="text-gray-300 mb-4">
                  Primeiro, obtenha suas credenciais do provedor de pagamento escolhido:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• <strong>MercadoPago:</strong> Client ID, Client Secret, Access Token</li>
                  <li>• <strong>PagSeguro:</strong> Email, Token</li>
                  <li>• <strong>Asaas:</strong> API Key</li>
                  <li>• <strong>Gerencianet:</strong> Client ID, Client Secret</li>
                </ul>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">2. Configurar no Painel</h3>
                <ol className="text-gray-300 space-y-2">
                  <li>1. Acesse <strong>Pagamentos</strong> no menu lateral</li>
                  <li>2. Selecione o provedor desejado</li>
                  <li>3. Preencha as credenciais</li>
                  <li>4. Configure a URL do webhook</li>
                  <li>5. Teste a conexão</li>
                  <li>6. Ative o gateway</li>
                </ol>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">3. URL do Webhook</h3>
                <p className="text-gray-300 mb-3">Configure esta URL no seu provedor de pagamento:</p>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-700 px-3 py-2 rounded text-green-400 flex-1">
                    https://seudominio.com/api/webhook/payments
                  </code>
                  <button 
                    onClick={() => copyToClipboard('https://seudominio.com/api/webhook/payments', 'webhook')}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedCode === 'webhook' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'webhooks':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Configurar Webhooks</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Eventos Suportados</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">payment.approved</span>
                    <span className="text-gray-300">Pagamento aprovado</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">payment.cancelled</span>
                    <span className="text-gray-300">Pagamento cancelado</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-sm">payment.refunded</span>
                    <span className="text-gray-300">Pagamento estornado</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Exemplo de Payload</h3>
                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <code className="text-green-400 text-sm">
{`{
  "type": "payment.approved",
  "data": {
    "id": "12345",
    "orderId": "ORD001",
    "status": "approved",
    "amount": 50.00,
    "currency": "BRL",
    "paymentMethod": "pix",
    "paidAt": "2024-01-15T14:30:00Z"
  },
  "createdAt": "2024-01-15T14:30:00Z"
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )

      case 'create-raffle':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Criar Nova Raspadinha</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Passo a Passo</h3>
                <ol className="text-gray-300 space-y-3">
                  <li>1. Acesse <strong>Raspadinhas & Prêmios</strong> no menu</li>
                  <li>2. Clique em <strong>Nova Raspadinha</strong></li>
                  <li>3. Preencha os campos obrigatórios:
                    <ul className="ml-4 mt-2 space-y-1">
                      <li>• Título atrativo</li>
                      <li>• Descrição detalhada</li>
                      <li>• Preço por bilhete</li>
                      <li>• Quantidade total de bilhetes</li>
                      <li>• Data de encerramento</li>
                    </ul>
                  </li>
                  <li>4. Faça upload da imagem</li>
                  <li>5. Configure os prêmios</li>
                  <li>6. Defina o status inicial</li>
                  <li>7. Clique em <strong>Criar Raspadinha</strong></li>
                </ol>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Dicas Importantes</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Use títulos chamativos que destaquem o prêmio principal</li>
                  <li>• Imagens de alta qualidade aumentam as conversões</li>
                  <li>• Preços baixos (R$ 0,10 - R$ 1,00) geram mais vendas</li>
                  <li>• Configure prazos realistas para o sorteio</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'admin-accounts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Gerenciar Contas de Admin</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Tipos de Conta</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">superadmin</span>
                    <span className="text-gray-300">Acesso total ao sistema</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">editor</span>
                    <span className="text-gray-300">Pode gerenciar raspadinhas e usuários</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Segurança</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Senhas são criptografadas com bcrypt</li>
                  <li>• Rate limiting: máximo 5 tentativas por 15 minutos</li>
                  <li>• Sessões expiram automaticamente</li>
                  <li>• Todas as ações são registradas nos logs</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'testing':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Testes do Sistema</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Testar Gateway PIX</h3>
                <ol className="text-gray-300 space-y-2">
                  <li>1. Configure o gateway em modo <strong>Sandbox</strong></li>
                  <li>2. Clique em <strong>Testar Gateway</strong></li>
                  <li>3. Verifique se a conexão foi estabelecida</li>
                  <li>4. Teste um pagamento completo</li>
                  <li>5. Verifique se o webhook foi recebido</li>
                </ol>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Testar Webhook Manualmente</h3>
                <p className="text-gray-300 mb-3">Use curl para testar o webhook:</p>
                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <code className="text-green-400 text-sm">
{`curl -X POST https://seudominio.com/api/webhook/payments \\
  -H "Content-Type: application/json" \\
  -H "x-signature: test-signature" \\
  -d '{
    "type": "payment.approved",
    "data": {
      "id": "test-123",
      "orderId": "ORD-TEST",
      "status": "approved",
      "amount": 10.00
    }
  }'`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Documentação do Sistema Admin</h2>
            <p className="text-gray-300">
              Selecione uma seção no menu lateral para ver a documentação específica.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <FileText className="w-6 h-6" />
            <span>Documentação</span>
          </h1>
        </div>
        
        <nav className="p-4">
          {sections.map((section) => {
            const Icon = section.icon
            const isExpanded = expandedSections.includes(section.id)
            
            return (
              <div key={section.id} className="mb-2">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors hover:bg-gray-700"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-400" />
                    <span className="text-white font-medium">{section.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="ml-8 mt-2 space-y-1">
                    {section.subsections.map((subsection) => (
                      <button
                        key={subsection.id}
                        onClick={() => setActiveSection(subsection.id)}
                        className={`w-full text-left p-2 rounded text-sm transition-colors ${
                          activeSection === subsection.id
                            ? 'bg-green-600 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {subsection.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}