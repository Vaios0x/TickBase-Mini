import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'tickets'
  const index = searchParams.get('index') || '1'

  const getScreenshotContent = (type: string, index: string) => {
    switch (type) {
      case 'tickets':
        return {
          title: '🎫 Explorar Tickets NFT',
          description: 'Descubre y compra boletos NFT de eventos únicos',
          features: ['Compra segura', 'Validación blockchain', 'Transferencia fácil'],
          color: '#3B82F6'
        }
      case 'ai':
        return {
          title: '🤖 AI Discovery',
          description: 'Encuentra eventos perfectos con inteligencia artificial',
          features: ['Recomendaciones personalizadas', 'Análisis de preferencias', 'Eventos trending'],
          color: '#8B5CF6'
        }
      case 'scanner':
        return {
          title: '📱 Scanner QR',
          description: 'Valida tickets con tecnología blockchain',
          features: ['Validación instantánea', 'Verificación segura', 'Historial completo'],
          color: '#F59E0B'
        }
      default:
        return {
          title: '🎫 TickBase',
          description: 'Marketplace de boletos NFT en Base',
          features: ['NFT Tickets', 'AI Discovery', 'Scanner QR'],
          color: '#3B82F6'
        }
    }
  }

  const content = getScreenshotContent(type, index)

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            {content.title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: content.color,
              marginBottom: '30px',
              textAlign: 'center',
            }}
          >
            {content.description}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '30px',
            }}
          >
            {content.features.map((feature, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '20px',
                  color: '#ffffff',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: content.color,
                    borderRadius: '50%',
                  }}
                />
                {feature}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#ffffff',
              opacity: 0.7,
              marginTop: '20px',
            }}
          >
            Powered by Base • Built with Next.js
          </div>
        </div>
      </div>
    ),
    {
      width: 1284,
      height: 2778,
    }
  )
}
