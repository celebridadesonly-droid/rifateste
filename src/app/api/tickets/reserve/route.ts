import { NextRequest, NextResponse } from 'next/server'

// Simulação de armazenamento de reservas (usar banco real em produção)
const reservations = new Map<string, {
  raffleId: number
  ticketNumbers: number[]
  sessionId: string
  reservedAt: Date
  expiresAt: Date
}>()

// Reservar bilhetes temporariamente
export async function POST(request: NextRequest) {
  try {
    const { raffleId, ticketNumbers, sessionId } = await request.json()
    
    if (!raffleId || !ticketNumbers || !sessionId) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    // Verificar se os bilhetes já estão reservados ou vendidos
    const unavailableTickets = await checkTicketAvailability(raffleId, ticketNumbers)
    
    if (unavailableTickets.length > 0) {
      return NextResponse.json(
        { 
          error: 'Alguns bilhetes não estão disponíveis',
          unavailableTickets 
        },
        { status: 409 }
      )
    }

    // Criar reserva temporária (10 minutos por padrão)
    const reservationTime = 10 * 60 * 1000 // 10 minutos em ms
    const now = new Date()
    const expiresAt = new Date(now.getTime() + reservationTime)
    
    const reservationId = `${raffleId}_${sessionId}_${Date.now()}`
    
    reservations.set(reservationId, {
      raffleId,
      ticketNumbers,
      sessionId,
      reservedAt: now,
      expiresAt
    })

    // Agendar liberação automática
    setTimeout(() => {
      releaseReservation(reservationId)
    }, reservationTime)

    return NextResponse.json({
      success: true,
      reservationId,
      expiresAt: expiresAt.toISOString(),
      message: 'Bilhetes reservados com sucesso'
    })
  } catch (error) {
    console.error('Erro ao reservar bilhetes:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Confirmar reserva (após pagamento)
export async function PUT(request: NextRequest) {
  try {
    const { reservationId, orderId } = await request.json()
    
    const reservation = reservations.get(reservationId)
    
    if (!reservation) {
      return NextResponse.json(
        { error: 'Reserva não encontrada' },
        { status: 404 }
      )
    }

    // Verificar se a reserva não expirou
    if (new Date() > reservation.expiresAt) {
      reservations.delete(reservationId)
      return NextResponse.json(
        { error: 'Reserva expirada' },
        { status: 410 }
      )
    }

    // Confirmar bilhetes como vendidos
    await confirmTicketSale(reservation.raffleId, reservation.ticketNumbers, orderId)
    
    // Remover reserva
    reservations.delete(reservationId)

    return NextResponse.json({
      success: true,
      message: 'Reserva confirmada com sucesso'
    })
  } catch (error) {
    console.error('Erro ao confirmar reserva:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Cancelar reserva
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reservationId = searchParams.get('reservationId')
    
    if (!reservationId) {
      return NextResponse.json(
        { error: 'ID da reserva não fornecido' },
        { status: 400 }
      )
    }

    const reservation = reservations.get(reservationId)
    
    if (!reservation) {
      return NextResponse.json(
        { error: 'Reserva não encontrada' },
        { status: 404 }
      )
    }

    // Remover reserva
    reservations.delete(reservationId)

    return NextResponse.json({
      success: true,
      message: 'Reserva cancelada com sucesso'
    })
  } catch (error) {
    console.error('Erro ao cancelar reserva:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Verificar disponibilidade dos bilhetes
async function checkTicketAvailability(raffleId: number, ticketNumbers: number[]): Promise<number[]> {
  // Implementar: verificar no banco se os bilhetes estão disponíveis
  // Por enquanto, simular que todos estão disponíveis
  return []
}

// Confirmar venda dos bilhetes
async function confirmTicketSale(raffleId: number, ticketNumbers: number[], orderId: string): Promise<void> {
  // Implementar: marcar bilhetes como vendidos no banco
  console.log(`Confirmando venda dos bilhetes ${ticketNumbers.join(', ')} da rifa ${raffleId} para o pedido ${orderId}`)
}

// Liberar reserva expirada
function releaseReservation(reservationId: string): void {
  const reservation = reservations.get(reservationId)
  
  if (reservation) {
    console.log(`Liberando reserva expirada: ${reservationId}`)
    reservations.delete(reservationId)
  }
}

// Limpar reservas expiradas (executar periodicamente)
export function cleanupExpiredReservations(): void {
  const now = new Date()
  
  for (const [id, reservation] of reservations.entries()) {
    if (now > reservation.expiresAt) {
      console.log(`Limpando reserva expirada: ${id}`)
      reservations.delete(id)
    }
  }
}

// Executar limpeza a cada 5 minutos
setInterval(cleanupExpiredReservations, 5 * 60 * 1000)