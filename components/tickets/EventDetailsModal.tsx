'use client'

import { useState } from 'react'
import { X, Calendar, MapPin, Clock, Users, Star, Share2, Heart, Ticket, Shield, Zap, Globe } from 'lucide-react'
import { TicketLoaderFullScreen } from '@/components/ui/TicketLoader'

interface Event {
  id: number
  name: string
  date: string
  price: string
  venue: string
  image: string
  available: number
  description?: string
  category?: string
  duration?: string
  ageRestriction?: string
  organizer?: string
  features?: string[]
}

interface EventDetailsModalProps {
  event: Event
  onClose: () => void
  onPurchase?: (event: Event) => void
}

export function EventDetailsModal({ event, onClose, onPurchase }: EventDetailsModalProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isShared, setIsShared] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.name,
          text: `¡Mira este evento increíble: ${event.name}!`,
          url: window.location.href,
        })
        setIsShared(true)
        setTimeout(() => setIsShared(false), 2000)
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  const handlePurchase = () => {
    if (onPurchase) {
      setIsLoading(true)
      // Simular un pequeño delay para mostrar el loader
      setTimeout(() => {
        onPurchase(event)
        setIsLoading(false)
      }, 500)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.toLocaleDateString('es-ES', { day: 'numeric' }),
      month: date.toLocaleDateString('es-ES', { month: 'long' }),
      year: date.getFullYear(),
      time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }
  }

  const dateInfo = formatDate(event.date)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="neural-glass-card rounded-xl max-w-sm sm:max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-2 sm:p-3">
          {/* Header */}
          <div className="flex justify-between items-start mb-1">
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1 neural-text-effect">
                {event.name}
              </h2>
              <div className="flex items-center gap-3 text-white/70 text-xs">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span>4.8</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{event.available} disponibles</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-1.5 rounded-lg transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className={`p-1.5 rounded-lg transition-all duration-300 ${
                  isShared 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mb-0 rounded-lg overflow-hidden">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-16 sm:h-20 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-1 left-2 right-2">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <p className="text-xs opacity-80">{event.venue}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-0.5">
                  <span className="text-white font-semibold text-xs">{event.price} ETH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-1">
            {/* Event Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white/70 text-xs">
                <Calendar className="w-3 h-3" />
                <span>{dateInfo.day} de {dateInfo.month} {dateInfo.year} - {dateInfo.time}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-xs">
                <MapPin className="w-3 h-3" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-xs">
                <Users className="w-3 h-3" />
                <span>{event.available} tickets disponibles</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/5 rounded-lg p-1">
              <h3 className="font-semibold text-white mb-0.5 text-xs">Descripción</h3>
              <p className="text-white/80 text-xs leading-relaxed">
                {event.description || `¡No te pierdas este increíble evento! ${event.name} promete ser una experiencia única e inolvidable.`}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white/5 rounded-lg p-1">
              <h3 className="font-semibold text-white mb-1 text-xs">Características</h3>
              <div className="space-y-0.5">
                {[
                  'Acceso VIP incluido',
                  'Parking gratuito',
                  'Barra libre (2 horas)',
                  'Merchandise exclusivo'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/80 text-xs">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-white/5 rounded-lg p-1">
              <div className="text-center mb-0.5">
                <div className="text-base font-bold text-white mb-0">{event.price} ETH</div>
                <div className="text-white/70 text-xs">Precio por ticket</div>
              </div>
              
              <div className="space-y-0.5 mb-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70">Precio base:</span>
                  <span className="text-white">{event.price} ETH</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70">Gas fee (Base):</span>
                  <span className="text-white">0.0001 ETH</span>
                </div>
                <div className="border-t border-white/20 pt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold text-sm">Total:</span>
                    <span className="text-cyan-400 font-bold text-sm">
                      {(parseFloat(event.price) + 0.0001).toFixed(4)} ETH
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handlePurchase}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-1.5 px-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-1.5 text-xs"
              >
                <Ticket className="w-3 h-3" />
                Comprar Ticket
              </button>
            </div>

            {/* Security Features */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-green-400 text-xs">
                <Shield className="w-3 h-3" />
                Transacción segura en Base
              </div>
              <div className="flex items-center gap-2 text-green-400 text-xs">
                <Zap className="w-3 h-3" />
                Gas fees bajos en Base
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      {isLoading && (
        <TicketLoaderFullScreen text="Preparando compra..." />
      )}
    </div>
  )
}
