import { NextRequest, NextResponse } from 'next/server'
import { createClient, Errors } from '@farcaster/quick-auth'

const domain = 'tickbase-miniapp.vercel.app' // Debe coincidir con el dominio de tu mini app
const client = createClient()

// Este endpoint retorna el FID del usuario autenticado
export async function GET(request: NextRequest) {
  const authorization = request.headers.get('Authorization')
  
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authorization.split(' ')[1]

  try {
    const payload = await client.verifyJwt({ token, domain })
    
    return NextResponse.json({
      fid: payload.sub,
      authenticated: true,
      timestamp: new Date().toISOString()
    })
  } catch (e) {
    if (e instanceof Errors.InvalidTokenError) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    
    console.error('Error verificando JWT:', e)
    return NextResponse.json({ error: 'Token verification failed' }, { status: 500 })
  }
}

// Endpoint para obtener información del usuario autenticado
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fid } = body

    if (!fid) {
      return NextResponse.json({ error: 'FID required' }, { status: 400 })
    }

    // Aquí puedes obtener información adicional del usuario desde tu base de datos
    // Por ahora retornamos información básica
    return NextResponse.json({
      fid,
      username: `user_${fid}`,
      profile: {
        displayName: `Usuario ${fid}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fid}`,
        bio: 'Usuario de TickBase'
      },
      preferences: {
        notifications: true,
        theme: 'dark'
      }
    })
  } catch (error) {
    console.error('Error obteniendo información del usuario:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
