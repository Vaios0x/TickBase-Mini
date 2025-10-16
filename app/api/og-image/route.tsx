import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
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
          backgroundImage: 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%)',
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
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            🎫 TickBase
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#00d4aa',
              marginBottom: '20px',
            }}
          >
            NFT Ticket Marketplace
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#ffffff',
              maxWidth: '600px',
              lineHeight: '1.4',
            }}
          >
            Compra y vende boletos NFT con AI discovery, DeFi features y validación blockchain en Base
          </div>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '40px',
            }}
          >
            <div
              style={{
                fontSize: 20,
                color: '#00d4aa',
                backgroundColor: 'rgba(0, 212, 170, 0.1)',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #00d4aa',
              }}
            >
              🤖 AI Discovery
            </div>
            <div
              style={{
                fontSize: 20,
                color: '#00d4aa',
                backgroundColor: 'rgba(0, 212, 170, 0.1)',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #00d4aa',
              }}
            >
              💰 DeFi Features
            </div>
            <div
              style={{
                fontSize: 20,
                color: '#00d4aa',
                backgroundColor: 'rgba(0, 212, 170, 0.1)',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #00d4aa',
              }}
            >
              🔒 Blockchain
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
