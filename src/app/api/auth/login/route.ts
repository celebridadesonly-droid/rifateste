import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Credenciais de administrador (em produção, usar banco de dados)
    const ADMIN_EMAIL = 'admin@rifa.com'
    const ADMIN_PASSWORD = 'password'

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Login bem-sucedido
      const user = {
        id: 1,
        email: ADMIN_EMAIL,
        name: 'Administrador',
        role: 'superadmin',
        permissions: ['all']
      }

      const token = `admin_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      return NextResponse.json({
        success: true,
        user,
        token,
        message: 'Login realizado com sucesso'
      })
    }

    // Credenciais inválidas
    return NextResponse.json(
      { success: false, error: 'Email ou senha incorretos' },
      { status: 401 }
    )

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}