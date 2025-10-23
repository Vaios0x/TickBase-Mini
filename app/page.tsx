'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ConnectWallet } from '@coinbase/onchainkit/wallet'
import { SmartWalletConnector } from '@/components/SmartWalletConnector'
import Link from 'next/link'
import { TicketList } from '@/components/tickets/TicketList'
import { AIEventDiscovery } from '@/components/advanced/AIEventDiscovery'
import { DeFiFeatures } from '@/components/advanced/DeFiFeatures'
import { ValidationScanner } from '@/components/tickets/ValidationScanner'
import { NeuralBackground } from '@/components/ui/NeuralBackground'
import { NeuralEffects } from '@/components/ui/NeuralEffects'
import { NeuralFooter } from '@/components/ui/NeuralFooter'
import { Ticket, User, QrCode } from 'lucide-react'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [activeTab, setActiveTab] = useState<'tickets' | 'ai' | 'defi' | 'scanner'>('tickets')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="min-h-screen relative">
      <NeuralBackground />
      <NeuralEffects />
      {/* Header */}
      <header className="relative z-10 p-4 neural-glass-card border-b border-white/10 neural-interactive">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold neural-gradient-text flex items-center gap-2">
            <Ticket className="w-8 h-8 text-blue-400" />
            TickBase
          </h1>
          
          <div className="flex items-center gap-3" suppressHydrationWarning>
            {isMounted && isConnected && (
              <Link
                href="/my-tickets"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <User className="w-4 h-4" />
                Mis Tickets
              </Link>
            )}
            
            {isMounted && isConnected ? (
              <div className="flex items-center gap-3">
                <div className="text-white/70 text-sm">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
                <button 
                  onClick={() => disconnect()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Desconectar
                </button>
              </div>
            ) : (
              isMounted && (
                <div className="flex items-center gap-3">
                  <SmartWalletConnector 
                    onWalletConnected={(address) => {
                      console.log('Wallet conectado:', address)
                    }}
                  />
                  <ConnectWallet />
                </div>
              )
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto p-4 relative z-10">
        <div className="flex gap-2 neural-glass-card rounded-lg p-2 mb-6 neural-interactive">
          {[
            { id: 'tickets', label: 'Tickets', icon: '🎫' },
            { id: 'ai', label: 'AI Discovery', icon: '🤖' },
            { id: 'defi', label: 'DeFi', icon: '💰' },
            { id: 'scanner', label: 'Scanner', icon: '📱' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all neural-button ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="relative z-10" suppressHydrationWarning>
          {!isMounted ? (
            <div className="text-center py-20">
              <div className="neural-glass-card rounded-xl p-8 max-w-md mx-auto">
                <div className="animate-pulse">
                  <div className="h-8 bg-white/20 rounded mb-4"></div>
                  <div className="h-4 bg-white/10 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded"></div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Mostrar mensaje de bienvenida solo si no hay wallet conectado */}
              {!isConnected && (
                <div className="text-center py-12 mb-8">
                  <div className="neural-glass-card rounded-xl p-8 max-w-4xl mx-auto neural-interactive">
                    <h1 className="neon-text neon-glow mb-6">
                      TickBase
                    </h1>
                    <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
                      La plataforma NFT más avanzada para boletos de eventos. 
                      Explora todas las características sin límites.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center text-sm">
                      <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 neural-glow">🎫 Explorar Tickets</span>
                      <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 neural-glow">🤖 AI Discovery</span>
                      <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full border border-green-500/30 neural-glow">💰 DeFi Features</span>
                      <span className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30 neural-glow">📱 Scanner QR</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Contenido de las secciones - siempre visible */}
              <div>
                {activeTab === 'tickets' && <TicketList onSelectTicket={() => {}} />}
                {activeTab === 'ai' && <AIEventDiscovery />}
                {activeTab === 'defi' && <DeFiFeatures />}
                {activeTab === 'scanner' && <ValidationScanner />}
              </div>
            </div>
          )}
        </main>

        {/* Neural Footer */}
        <NeuralFooter />
      </div>
    </div>
  )
}
