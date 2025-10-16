'use client'

import { useState, useEffect } from 'react'
import { Search, Sparkles, TrendingUp, Star, Filter } from 'lucide-react'

interface EventRecommendation {
  id: number
  name: string
  date: string
  price: string
  venue: string
  image: string
  category: string
  aiScore: number
  reason: string
  trending: boolean
}

export function AIEventDiscovery() {
  const [recommendations, setRecommendations] = useState<EventRecommendation[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    { id: 'all', label: 'Todos', icon: '🎯' },
    { id: 'music', label: 'Música', icon: '🎵' },
    { id: 'sports', label: 'Deportes', icon: '⚽' },
    { id: 'tech', label: 'Tecnología', icon: '💻' },
    { id: 'art', label: 'Arte', icon: '🎨' }
  ]

  useEffect(() => {
    loadRecommendations()
  }, [searchQuery, selectedCategory])

  const loadRecommendations = async () => {
    setIsLoading(true)
    // Simular carga de recomendaciones IA
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockRecommendations: EventRecommendation[] = [
      {
        id: 1,
        name: "Concierto de Jazz Intimate",
        date: "2025-01-20",
        price: "0.04",
        venue: "Blue Note Club",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        category: "music",
        aiScore: 95,
        reason: "Basado en tu historial de jazz y eventos íntimos",
        trending: true
      },
      {
        id: 2,
        name: "Tech Conference 2025",
        date: "2025-02-15",
        price: "0.06",
        venue: "Convention Center",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
        category: "tech",
        aiScore: 88,
        reason: "Coincide con tu interés en blockchain y Web3",
        trending: false
      },
      {
        id: 3,
        name: "Fútbol Clásico",
        date: "2025-01-25",
        price: "0.12",
        venue: "Estadio Monumental",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400",
        category: "sports",
        aiScore: 82,
        reason: "Evento trending en tu región",
        trending: true
      }
    ]

    setRecommendations(mockRecommendations)
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          AI Event Discovery
        </h2>
        <p className="text-white/70">
          Descubre eventos personalizados con inteligencia artificial
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar eventos..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="neural-glass-card rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          Insights de IA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-purple-400 font-medium">Preferencias</div>
            <div className="text-white/70">Jazz, Tech, Deportes</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-purple-400 font-medium">Tendencia</div>
            <div className="text-white/70">Eventos íntimos en alza</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-purple-400 font-medium">Precio Óptimo</div>
            <div className="text-white/70">0.04 - 0.08 ETH</div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Recomendaciones para ti
        </h3>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 rounded-xl p-6 animate-pulse">
                <div className="h-32 bg-white/20 rounded-lg mb-4"></div>
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((event) => (
              <div key={event.id} className="neural-glass-card rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="relative mb-4">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    AI Score: {event.aiScore}%
                  </div>
                  {event.trending && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">{event.name}</h4>
                  
                  <div className="text-sm text-white/70">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      {new Date(event.date).toLocaleDateString('es-ES')}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      {event.venue}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-purple-400 font-medium mb-1">¿Por qué te recomendamos esto?</div>
                    <div className="text-sm text-white/70">{event.reason}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-400">{event.price} ETH</div>
                    <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}