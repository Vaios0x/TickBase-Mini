'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, ShoppingCart, Heart } from 'lucide-react'
import { PurchaseModal } from './PurchaseModal'
import { EventDetailsModal } from './EventDetailsModal'

interface Ticket {
  id: number
  name: string
  date: string
  price: string
  venue: string
  image: string
  available: number
}

interface TicketCardProps {
  ticket: Ticket
  onSelect: () => void
}

export function TicketCard({ ticket, onSelect }: TicketCardProps) {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // Verificar si el ticket está en favoritos
    const savedFavorites = localStorage.getItem('tickbase-favorites')
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites)
      setIsFavorite(favorites.some((fav: Ticket) => fav.id === ticket.id))
    }
  }, [ticket.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    const savedFavorites = localStorage.getItem('tickbase-favorites')
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : []
    
    if (isFavorite) {
      // Remover de favoritos
      favorites = favorites.filter((fav: Ticket) => fav.id !== ticket.id)
    } else {
      // Agregar a favoritos
      const favoriteTicket = {
        ...ticket,
        category: 'Evento',
        addedDate: new Date().toISOString()
      }
      favorites.push(favoriteTicket)
    }
    
    localStorage.setItem('tickbase-favorites', JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
    
    // Disparar evento personalizado para actualizar el contador
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <>
      <div className="neural-glass-card rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group">
        <div className="relative mb-4">
          <img
            src={ticket.image}
            alt={ticket.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {ticket.available} disponibles
          </div>
          <button
            onClick={toggleFavorite}
            className={`absolute top-2 left-2 p-2 rounded-full transition-all duration-300 ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-black/50 text-white hover:bg-red-500/80'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
            {ticket.name}
          </h3>

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

          <div className="flex items-center justify-between">
            <div className="flex items-center text-white/70 text-sm">
              <Users className="w-4 h-4 mr-2" />
              {ticket.available} tickets
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {ticket.price} ETH
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              onClick={() => setShowPurchaseModal(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Comprar
            </button>
            <button
              onClick={() => setShowDetailsModal(true)}
              className="px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Ver detalles
            </button>
          </div>
        </div>
      </div>

      {showPurchaseModal && (
        <PurchaseModal
          ticket={ticket}
          onClose={() => setShowPurchaseModal(false)}
        />
      )}

      {showDetailsModal && (
        <EventDetailsModal
          event={ticket}
          onClose={() => setShowDetailsModal(false)}
          onPurchase={(event) => {
            setShowDetailsModal(false)
            setShowPurchaseModal(true)
          }}
        />
      )}
    </>
  )
}