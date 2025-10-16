'use client'

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ConnectWallet } from '@coinbase/onchainkit/wallet'
import Link from 'next/link'
import { TicketList } from '@/components/tickets/TicketList'
import { AIEventDiscovery } from '@/components/advanced/AIEventDiscovery'
import { DeFiFeatures } from '@/components/advanced/DeFiFeatures'
import { ValidationScanner } from '@/components/tickets/ValidationScanner'
import { NeuralBackground } from '@/components/ui/NeuralBackground'
import { Ticket, User, QrCode } from 'lucide-react'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [activeTab, setActiveTab] = useState<'tickets' | 'ai' | 'defi' | 'scanner'>('tickets')

  return (
    <div className="min-h-screen relative">
      <NeuralBackground />
      {/* Header */}
      <header className="relative z-10 p-4 neural-glass-card border-b border-white/10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold neural-gradient-text flex items-center gap-2">
            <Ticket className="w-8 h-8 text-blue-400" />
            TickBase Mini App
          </h1>
          
          <div className="flex items-center gap-3">
            {isConnected && (
              <Link
                href="/my-tickets"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <User className="w-4 h-4" />
                Mis Tickets
              </Link>
            )}
            
            {isConnected ? (
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
              <ConnectWallet />
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto p-4 relative z-10">
        <div className="flex neural-glass-card rounded-lg p-1 mb-6">
          {[
            { id: 'tickets', label: '🎫 Tickets', icon: '🎫' },
            { id: 'ai', label: '🤖 AI Discovery', icon: '🤖' },
            { id: 'defi', label: '💰 DeFi', icon: '💰' },
            { id: 'scanner', label: '📱 Scanner', icon: '📱' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all neural-button ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="relative z-10">
          {!isConnected ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold neural-gradient-text mb-4">
                Bienvenido a TickBase
              </h2>
              <p className="text-white/70 mb-8">
                Conecta tu wallet para comenzar a comprar y vender boletos NFT
              </p>
              <div className="neural-glass-card rounded-xl p-8 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">
                  🚀 Características Avanzadas
                </h3>
                <ul className="text-white/70 space-y-2 text-left">
                  <li>✅ AI-Powered Event Discovery</li>
                  <li>✅ Social Features con Farcaster</li>
                  <li>✅ DeFi Integration (Staking, Liquidity)</li>
                  <li>✅ One-Click Purchase Gasless</li>
                  <li>✅ Dynamic Pricing Engine</li>
                  <li>✅ Base Mini App Framework</li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              {activeTab === 'tickets' && <TicketList onSelectTicket={() => {}} />}
              {activeTab === 'ai' && <AIEventDiscovery />}
              {activeTab === 'defi' && <DeFiFeatures />}
              {activeTab === 'scanner' && <ValidationScanner />}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
