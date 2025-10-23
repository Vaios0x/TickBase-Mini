import { NextRequest, NextResponse } from 'next/server'

interface WebhookEvent {
  type: 'ticket_purchased' | 'ticket_sold' | 'ticket_validated' | 'user_saved' | 'user_unsaved'
  data: {
    userId?: string
    fid?: number
    ticketId?: string
    transactionHash?: string
    timestamp: string
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validar que el webhook viene de Base App
    const userAgent = req.headers.get('user-agent') || ''
    const isFromBase = userAgent.includes('Base') || 
                      req.headers.get('x-base-signature') ||
                      body.source === 'base'
    
    if (!isFromBase) {
      console.warn('Webhook no autorizado:', { userAgent, body })
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    console.log('✅ Webhook autorizado recibido:', body)
    
    // Procesar diferentes tipos de eventos
    const event: WebhookEvent = body
    
    switch (event.type) {
      case 'ticket_purchased':
        await handleTicketPurchased(event.data)
        break
      case 'ticket_sold':
        await handleTicketSold(event.data)
        break
      case 'ticket_validated':
        await handleTicketValidated(event.data)
        break
      case 'user_saved':
        await handleUserSaved(event.data)
        break
      case 'user_unsaved':
        await handleUserUnsaved(event.data)
        break
      default:
        console.log('Tipo de evento no reconocido:', event.type)
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook procesado correctamente',
      eventType: event.type,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error en webhook:', error)
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    )
  }
}

// Handlers para diferentes tipos de eventos
async function handleTicketPurchased(data: any) {
  console.log('🎫 Ticket comprado:', data)
  // Aquí puedes:
  // - Actualizar base de datos
  // - Enviar notificación al usuario
  // - Actualizar inventario
  // - Registrar transacción
}

async function handleTicketSold(data: any) {
  console.log('💰 Ticket vendido:', data)
  // Aquí puedes:
  // - Actualizar base de datos
  // - Procesar comisión
  // - Notificar al comprador
}

async function handleTicketValidated(data: any) {
  console.log('✅ Ticket validado:', data)
  // Aquí puedes:
  // - Marcar ticket como usado
  // - Actualizar estado en blockchain
  // - Generar reporte de validación
}

async function handleUserSaved(data: any) {
  console.log('💾 Usuario guardó la app:', data)
  // Aquí puedes:
  // - Registrar engagement
  // - Enviar notificaciones de bienvenida
  // - Actualizar métricas de retención
}

async function handleUserUnsaved(data: any) {
  console.log('🗑️ Usuario eliminó la app:', data)
  // Aquí puedes:
  // - Registrar motivo de abandono
  // - Actualizar métricas de retención
  // - Enviar encuesta de feedback
}

export async function GET() {
  return NextResponse.json({ 
    message: 'TickBase Webhook Endpoint',
    status: 'active'
  })
}
