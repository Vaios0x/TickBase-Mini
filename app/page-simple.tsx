'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet'
import { TicketList } from '@/components/tickets/TicketList'
import { AIEventDiscovery } from '@/components/advanced/AIEventDiscovery'

export default function Home() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<'tickets' | 'ai'>('tickets')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="p-4 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">🎫 TickBase Mini App</h1>
          
          <Wallet>
            <ConnectWallet>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Conectar Wallet
              </button>
            </ConnectWallet>
            <WalletDropdown>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto p-4">
        <div className="flex bg-white/10 rounded-lg p-1 mb-6">
          {[
            { id: 'tickets', label: '🎫 Tickets', icon: '🎫' },
            { id: 'ai', label: '🤖 AI Discovery', icon: '🤖' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
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
        <main>
          {!isConnected ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Bienvenido a TickBase
              </h2>
              <p className="text-white/70 mb-8">
                Conecta tu wallet para comenzar a comprar y vender boletos NFT
              </p>
              <div className="glass-morphism rounded-xl p-8 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">
                  🚀 Características Avanzadas
                </h3>
                <ul className="text-white/70 space-y-2 text-left">
                  <li>✅ AI-Powered Event Discovery</li>
                  <li>✅ Social Features con Farcaster</li>
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
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
