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
                   Compra y vende boletos NFT con AI discovery y validación blockchain en Base
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
