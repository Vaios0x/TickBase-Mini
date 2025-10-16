import { NextRequest, NextResponse } from 'next/server'
import { getFrameMetadata } from '@coinbase/onchainkit/frame'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const eventId = searchParams.get('eventId')
  const action = searchParams.get('action') || 'view'

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tickbase-miniapp.vercel.app'

  let frameMetadata

  if (action === 'purchase' && eventId) {
    // Frame para comprar ticket específico
    frameMetadata = getFrameMetadata({
      buttons: [
        {
          label: 'Comprar Ticket',
          action: 'tx',
          target: `${baseUrl}/api/tx/purchase?eventId=${eventId}`
        },
        {
          label: 'Ver Detalles',
          action: 'link',
          target: `${baseUrl}/tickets/${eventId}`
        }
      ],
      image: {
        src: `${baseUrl}/og-image.png`,
        aspectRatio: '1.91:1'
      },
      postUrl: `${baseUrl}/api/frame`,
      input: {
        text: 'Cantidad de tickets (opcional)'
      }
    })
  } else {
    // Frame principal para compartir
    frameMetadata = getFrameMetadata({
      buttons: [
        {
          label: 'Ver Eventos',
          action: 'link',
          target: `${baseUrl}/tickets`
        },
        {
          label: 'Comprar Ticket',
          action: 'tx',
          target: `${baseUrl}/api/tx/purchase`
        }
      ],
      image: {
        src: `${baseUrl}/og-image.png`,
        aspectRatio: '1.91:1'
      },
      postUrl: `${baseUrl}/api/frame`
    })
  }

  return new NextResponse(frameMetadata.toString(), {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { untrustedData } = body

    if (!untrustedData) {
      return new NextResponse('Invalid frame data', { status: 400 })
    }

    const { buttonIndex, inputText } = untrustedData
    const eventId = new URL(req.url).searchParams.get('eventId')

    // Procesar la acción del usuario
    if (buttonIndex === 1) {
      // Botón de compra
      const quantity = inputText ? parseInt(inputText) : 1
      
      return NextResponse.json({
        type: 'frame',
        frame: {
          image: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
          buttons: [
            {
              label: 'Confirmar Compra',
              action: 'tx',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/tx/purchase?eventId=${eventId}&quantity=${quantity}`
            }
          ]
        }
      })
    }

    // Respuesta por defecto
    return NextResponse.json({
      type: 'frame',
      frame: {
        image: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
        buttons: [
          {
            label: 'Ver Eventos',
            action: 'link',
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/tickets`
          }
        ]
      }
    })

  } catch (error) {
    console.error('Frame POST error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
