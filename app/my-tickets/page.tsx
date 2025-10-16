'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectWallet } from '@coinbase/onchainkit/wallet'
import { useUserTickets } from '@/hooks/useTicketStore'
import { Ticket, Calendar, MapPin, Users, Share2, ArrowRightLeft } from 'lucide-react'

export default function MyTicketsPage() {
  const { address, isConnected } = useAccount()
  const { userTickets, isLoading, error } = useUserTickets()
  const [selectedTicket, setSelectedTicket] = useState<any>(null)

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Mis Tickets</h1>
          <p className="text-white/70 mb-8">Conecta tu wallet para ver tus tickets NFT</p>
          <ConnectWallet />
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots mx-auto mb-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-white/70">Cargando tus tickets...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Error</h1>
          <p className="text-red-400 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <div className="neural-glass-bg fixed inset-0 -z-10"></div>
      {/* Header */}
      <header className="relative z-10 p-4 neural-glass-card border-b border-white/10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Ticket className="w-8 h-8 text-blue-400" />
            Mis Tickets
          </h1>
          <div className="text-white/70 text-sm">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4 relative z-10">
        {userTickets.length === 0 ? (
          <div className="text-center py-20">
            <div className="neural-glass-card rounded-xl p-8 max-w-md mx-auto">
              <Ticket className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">
                No tienes tickets aún
              </h2>
              <p className="text-white/70 mb-6">
                Compra tu primer ticket NFT y aparecerá aquí
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Explorar Eventos
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                🎫 Mis Tickets NFT
              </h2>
              <p className="text-white/70">
                Gestiona y transfiere tus tickets de forma segura
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userTickets.map((ticket) => (
                <div key={ticket.id} className="neural-glass-card rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group">
                  <div className="relative mb-4">
                    <img
                      src={ticket.image}
                      alt={ticket.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      NFT
                    </div>
                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {ticket.category}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {ticket.name}
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center text-white/70 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(ticket.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>

                      <div className="flex items-center text-white/70 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {ticket.venue}
                      </div>

                      <div className="flex items-center text-white/70 text-sm">
                        <Users className="w-4 h-4 mr-2" />
                        {ticket.organizer}
                      </div>
                    </div>

                    {ticket.description && (
                      <p className="text-white/70 text-sm line-clamp-2">
                        {ticket.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4">
                      <div className="text-2xl font-bold text-blue-400">
                        {ticket.price} ETH
                      </div>
                      <div className="text-sm text-white/70">
                        ID: #{ticket.id}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        Transferir
                      </button>
                      <button className="px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                        <ArrowRightLeft className="w-4 h-4" />
                        Vender
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="neural-glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Estadísticas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{userTickets.length}</div>
                  <div className="text-white/70 text-sm">Tickets Totales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {userTickets.reduce((sum, ticket) => sum + parseFloat(ticket.price), 0).toFixed(3)}
                  </div>
                  <div className="text-white/70 text-sm">ETH Invertido</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {new Set(userTickets.map(t => t.category)).size}
                  </div>
                  <div className="text-white/70 text-sm">Categorías</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transfer Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="neural-glass-card rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Transferir Ticket</h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={selectedTicket.image}
                    alt={selectedTicket.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{selectedTicket.name}</h3>
                    <p className="text-white/70 text-sm">{selectedTicket.venue}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Dirección del destinatario
                  </label>
                  <input
                    type="text"
                    placeholder="0x..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="flex-1 bg-white/20 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Transferir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
