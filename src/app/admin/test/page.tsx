export default function AdminTest() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Admin Test Page</h1>
        <p className="text-gray-400">Se você está vendo esta página, a rota /admin/test está funcionando!</p>
        <a href="/admin/login" className="text-green-400 hover:text-green-300 underline mt-4 block">
          Ir para Login Admin
        </a>
      </div>
    </div>
  )
}