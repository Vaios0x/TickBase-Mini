import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Procesar notificaciones de Base App
    console.log('Webhook recibido:', body)
    
    // Aquí puedes procesar diferentes tipos de notificaciones
    // como compras, ventas, validaciones, etc.
    
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook procesado correctamente' 
    })
  } catch (error) {
    console.error('Error en webhook:', error)
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'TickBase Webhook Endpoint',
    status: 'active'
  })
}
