'use client'

import { useState, useEffect } from 'react'
import { Heart, Star, Calendar, MapPin, DollarSign } from 'lucide-react'
import { NeuralBackground } from '@/components/ui/NeuralBackground'
import { NeuralEffects } from '@/components/ui/NeuralEffects'
import { NeuralFooter } from '@/components/ui/NeuralFooter'
import Link from 'next/link'

interface FavoriteTicket {
  id: number
  name: string
  date: string
  price: string
  venue: string
  image: string
  category: string
  addedDate: string
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteTicket[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Cargar favoritos desde localStorage
    const savedFavorites = localStorage.getItem('tickbase-favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
    setIsLoading(false)
  }, [])

  const removeFromFavorites = (ticketId: number) => {
    const updatedFavorites = favorites.filter(ticket => ticket.id !== ticketId)
    setFavorites(updatedFavorites)
    localStorage.setItem('tickbase-favorites', JSON.stringify(updatedFavorites))
  }

  const clearAllFavorites = () => {
    setFavorites([])
    localStorage.removeItem('tickbase-favorites')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <NeuralBackground />
        <NeuralEffects />
        <div className="flex items-center justify-center min-h-screen">
          <div className="neural-glass-card rounded-xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-white/70">Cargando favoritos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <NeuralBackground />
      <NeuralEffects />
      
      {/* Header */}
      <header className="relative z-10 p-4 neural-glass-card border-b border-white/10">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold neural-gradient-text">
            <Heart className="w-8 h-8 text-pink-400" />
            Mis Favoritos
          </Link>
          
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Volver
            </Link>
            
            {favorites.length > 0 && (
              <button
                onClick={clearAllFavorites}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Limpiar Todo
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto p-4 relative z-10">
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="neural-glass-card rounded-xl p-8 max-w-md mx-auto">
              <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold text-white mb-4">
                No tienes favoritos aún
              </h2>
              <p className="text-white/70 mb-6">
                Explora eventos y marca tus favoritos para verlos aquí
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300"
              >
                <Star className="w-5 h-5" />
                Explorar Eventos
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                ❤️ Mis Favoritos ({favorites.length})
              </h1>
              <p className="text-white/70">
                Eventos que has marcado como favoritos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((ticket) => (
                <div
                  key={ticket.id}
                  className="neural-glass-card rounded-xl overflow-hidden neural-interactive hover:scale-105 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={ticket.image}
                      alt={ticket.name}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => removeFromFavorites(ticket.id)}
                      className="absolute top-3 right-3 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-sm">
                      {ticket.category}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {ticket.name}
                    </h3>
                    
                    <div className="space-y-2 text-white/70 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(ticket.date).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{ticket.venue}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-bold text-green-400">{ticket.price} ETH</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Ver Detalles
                      </button>
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <NeuralFooter />
    </div>
  )
}
