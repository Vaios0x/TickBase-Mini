'use client'

import { useState } from 'react'
import { TicketPurchaseModal } from './TicketPurchaseModal'
import { formatPrice, formatDate } from '@/lib/contract-utils'
import { Heart, Calendar, MapPin, Users, ShoppingCart } from 'lucide-react'

interface EventCardProps {
  event: {
    id: number
    name: string
    venue: string
    date: string
    price: string
    image: string
    available: number
    category: string
  }
}

export function EventCard({ event }: EventCardProps) {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const handleBuyClick = () => {
    setIsPurchaseModalOpen(true)
  }

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited)
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Event Image */}
        <div className="relative">
          <img 
            src={event.image} 
            alt={event.name}
            className="w-full h-48 object-cover"
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 left-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200"
          >
            <Heart 
              className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
            />
          </button>
          
          {/* Available Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
              {event.available} disponibles
            </span>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
            {event.name}
          </h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{formatDate(new Date(event.date).getTime() / 1000)}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.venue}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.available} tickets</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-blue-600">
              {formatPrice(event.price)}
            </div>
            <div className="text-sm text-gray-500">
              por ticket
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleBuyClick}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Comprar
            </button>
            
            <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Ver detalles
            </button>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      <TicketPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        event={event}
      />
    </>
  )
}
