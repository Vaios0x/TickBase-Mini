'use client'

import React from 'react'
import { TicketList } from '@/components/tickets/TicketList'
import { ValidationScanner } from '@/components/tickets/ValidationScanner'
import { useAccount } from 'wagmi'
// import { useMiniKit } from '@coinbase/minikit' // Comentado temporalmente
import { useState } from 'react'
import { Ticket, QrCode } from 'lucide-react'

export default function TicketsPage() {
  const { isConnected } = useAccount()
  // const { safeAreaInsets } = useMiniKit() // Comentado temporalmente
  const safeAreaInsets = { top: 0, bottom: 0 } // Valor por defecto
  const [activeTab, setActiveTab] = useState<'events' | 'validate'>('events')

  if (!isConnected) {
    return (
      <div 
        className="min-h-screen bg-gradient-dark flex items-center justify-center p-4"
        style={{ 
          paddingTop: safeAreaInsets?.top || 0,
          paddingBottom: safeAreaInsets?.bottom || 0,
        }}
      >
        <div className="glass-morphism rounded-xl p-8 max-w-md w-full text-center">
          <Ticket className="w-16 h-16 text-base-blue mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Conecta tu Wallet
          </h2>
          <p className="text-white/70 mb-6">
            Necesitas conectar tu wallet para acceder a los eventos
          </p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen bg-gradient-dark"
      style={{ 
        paddingTop: safeAreaInsets?.top || 0,
        paddingBottom: safeAreaInsets?.bottom || 0,
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Eventos</h1>
            
            {/* Tab Navigation */}
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('events')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'events'
                    ? 'bg-base-blue text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Ticket className="w-4 h-4 inline mr-2" />
                Eventos
              </button>
              <button
                onClick={() => setActiveTab('validate')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'validate'
                    ? 'bg-base-blue text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <QrCode className="w-4 h-4 inline mr-2" />
                Validar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {activeTab === 'events' ? (
          <TicketList onSelectTicket={() => {}} />
        ) : (
          <ValidationScanner />
        )}
      </div>
    </div>
  )
}
