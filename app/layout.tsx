// import type { Metadata } from 'next' // No disponible en Next.js 14.2.0
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { FarcasterSDK } from '@/components/FarcasterSDK'
import { FarcasterDebug } from '@/components/FarcasterDebug'
import { AuthorizationHelper } from '@/components/AuthorizationHelper'
import { FarcasterWalletConnector } from '@/components/FarcasterWalletConnector'
import { FarcasterAuthKit } from '@/components/FarcasterAuthKit'
import { ClientOnly } from '@/components/ClientOnly'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TickBase - NFT Tickets Marketplace',
  description: 'Marketplace seguro de boletos NFT en Base con transacciones gasless',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#0052FF',
  other: {
    'fc:miniapp': JSON.stringify({
      version: '1',
      imageUrl: 'https://tickbase-miniapp.vercel.app/api/og-image',
      button: {
        title: 'Launch TickBase',
        action: {
          type: 'launch_frame',
          url: 'https://tickbase-miniapp.vercel.app/',
          name: 'TickBase',
          splashImageUrl: 'https://tickbase-miniapp.vercel.app/images/grid-pattern.svg',
          splashBackgroundColor: '#000000'
        }
      }
    })
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ErrorBoundary>
          <ClientOnly>
            <FarcasterSDK />
            <FarcasterDebug />
            <AuthorizationHelper />
            <FarcasterWalletConnector />
            <FarcasterAuthKit />
          </ClientOnly>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}