'use client'

import { useState, useEffect } from 'react'
import { Search, Sparkles, TrendingUp, Star, Filter } from 'lucide-react'
import { EventDetailsModal } from '@/components/tickets/EventDetailsModal'

interface EventRecommendation {
  id: number
  name: string
  date: string
  price: string
  venue: string
  image: string
  category: string
  available: number
  aiScore: number
  reason: string
  trending: boolean
}

export function AIEventDiscovery() {
  const [recommendations, setRecommendations] = useState<EventRecommendation[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventRecommendation | null>(null)

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
    // Simular carga de recomendaciones IA con personalización
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Todos los eventos disponibles (mismos que en TicketList)
    const allEvents = [
      {
        id: 1,
        name: "Concierto de Rock",
        date: "2025-11-15",
        price: "0.05",
        venue: "Estadio Nacional",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
        available: 50,
        category: "music"
      },
      {
        id: 2,
        name: "Festival de Música Electrónica",
        date: "2025-12-20",
        price: "0.08",
        venue: "Centro de Convenciones",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        available: 100,
        category: "music"
      },
      {
        id: 3,
        name: "Conferencia de Blockchain",
        date: "2026-01-10",
        price: "0.03",
        venue: "Centro de Convenciones",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
        available: 200,
        category: "tech"
      },
      {
        id: 4,
        name: "Partido de Fútbol - Clásico",
        date: "2025-11-25",
        price: "0.12",
        venue: "Estadio Monumental",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400",
        available: 25,
        category: "sports"
      },
      {
        id: 5,
        name: "Festival de Jazz",
        date: "2025-12-14",
        price: "0.07",
        venue: "Teatro Municipal",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        available: 80,
        category: "music"
      },
      {
        id: 6,
        name: "Exposición de Arte Digital",
        date: "2026-01-05",
        price: "0.04",
        venue: "Museo de Arte Moderno",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
        available: 150,
        category: "art"
      },
      {
        id: 7,
        name: "Conferencia de IA y Machine Learning",
        date: "2025-12-28",
        price: "0.06",
        venue: "Centro de Innovación",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
        available: 120,
        category: "tech"
      },
      {
        id: 8,
        name: "Festival de Cine Independiente",
        date: "2026-01-15",
        price: "0.09",
        venue: "Cine Paradiso",
        image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400",
        available: 60,
        category: "art"
      },
      {
        id: 9,
        name: "Concierto de Música Clásica",
        date: "2025-11-30",
        price: "0.11",
        venue: "Auditorio Nacional",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        available: 90,
        category: "music"
      },
      {
        id: 10,
        name: "Workshop de NFT y Arte Digital",
        date: "2025-12-05",
        price: "0.05",
        venue: "Galería Digital",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
        available: 40,
        category: "tech"
      },
      {
        id: 11,
        name: "Torneo de Esports",
        date: "2026-01-20",
        price: "0.08",
        venue: "Arena Gaming",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400",
        available: 200,
        category: "sports"
      },
       {
         id: 12,
         name: "Festival de Comedia Stand-up",
         date: "2025-12-10",
         price: "0.06",
         venue: "Teatro de la Risa",
         image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
         available: 75,
         category: "art"
       },
       {
         id: 13,
         name: "Conferencia de DeFi y Finanzas Descentralizadas",
         date: "2026-02-15",
         price: "0.09",
         venue: "Centro Financiero Digital",
         image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
         available: 85,
         category: "tech"
       },
       {
         id: 14,
         name: "Festival de Danza Contemporánea",
         date: "2026-01-25",
         price: "0.08",
         venue: "Teatro de Danza Moderna",
         image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400",
         available: 65,
         category: "art"
       }
    ]

    // Generar recomendaciones con IA simulada - ALGORITMO REALISTA
    const generateAIRecommendations = (events: any[]) => {
      // Simular perfil de usuario consistente
      const userProfile = {
        favoriteCategories: ['music', 'tech'], // Categorías favoritas del usuario
        preferredPriceRange: [0.03, 0.08], // Rango de precio preferido
        alwaysRecommend: [1, 3, 5], // IDs de eventos que SIEMPRE se recomiendan
        trendingBonus: [2, 7, 11] // IDs que reciben bonus por trending
      }

      return events.map(event => {
        let aiScore = 50 // Score base
        let reason = ""
        let trending = false

        // ALGORITMO CONSISTENTE: Eventos que SIEMPRE se recomiendan
        if (userProfile.alwaysRecommend.includes(event.id)) {
          aiScore = Math.floor(Math.random() * 15) + 85 // 85-100 para eventos favoritos
          reason = "Basado en tu perfil y preferencias históricas"
          trending = true
        }
        // ALGORITMO CONSISTENTE: Categorías favoritas del usuario
        else if (userProfile.favoriteCategories.includes(event.category)) {
          aiScore = Math.floor(Math.random() * 20) + 75 // 75-95 para categorías favoritas
          reason = `Coincide con tu interés en ${event.category === 'music' ? 'música' : 'tecnología'}`
        }
        // ALGORITMO CONSISTENTE: Rango de precio preferido
        else if (parseFloat(event.price) >= userProfile.preferredPriceRange[0] && 
                 parseFloat(event.price) <= userProfile.preferredPriceRange[1]) {
          aiScore = Math.floor(Math.random() * 25) + 70 // 70-95 para precio ideal
          reason = "Dentro de tu rango de precio preferido"
        }
        // ALGORITMO CONSISTENTE: Eventos trending
        else if (userProfile.trendingBonus.includes(event.id)) {
          aiScore = Math.floor(Math.random() * 20) + 70 // 70-90 para trending
          reason = "Evento trending que podría interesarte"
          trending = true
        }
        // ALGORITMO CONSISTENTE: Otros eventos con score más bajo
        else {
          aiScore = Math.floor(Math.random() * 30) + 50 // 50-80 para otros
          reason = "Evento que podría interesarte"
        }

        // Ajustes consistentes basados en disponibilidad
        if (event.available < 50) {
          aiScore += 8 // Bonus consistente por poca disponibilidad
          reason += " - ¡Pocos tickets disponibles!"
        }

        // Ajustes consistentes basados en precio económico
        if (parseFloat(event.price) <= 0.05) {
          aiScore += 5 // Bonus consistente por precio económico
        }

        // Bonus ocasional por "descubrimiento"
        if (Math.random() > 0.8) {
          aiScore += 10
          reason += " - ¡Nuevo descubrimiento para ti!"
        }

        return {
          ...event,
          aiScore: Math.min(aiScore, 100),
          reason,
          trending
        }
      })
    }

    // Filtrar eventos basado en búsqueda y categoría
    let filteredEvents = allEvents

    if (searchQuery) {
      filteredEvents = filteredEvents.filter(event => 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.category === selectedCategory)
    }

    // Generar recomendaciones y ordenar por score
    const recommendations = generateAIRecommendations(filteredEvents)
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, 7) // Mostrar solo 7 recomendaciones

    setRecommendations(recommendations)
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
        <div className="text-xs text-purple-400 mt-2 animate-pulse">
          🤖 Analizando tus preferencias y generando recomendaciones únicas...
        </div>
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
             <div className="text-purple-400 font-medium">Preferencias Detectadas</div>
             <div className="text-white/70">Música (45%), Tech (35%), Otros (20%)</div>
           </div>
           <div className="bg-white/10 rounded-lg p-3">
             <div className="text-purple-400 font-medium">Tendencia Actual</div>
             <div className="text-white/70">Eventos blockchain y música en alza</div>
           </div>
           <div className="bg-white/10 rounded-lg p-3">
             <div className="text-purple-400 font-medium">Rango de Precio Óptimo</div>
             <div className="text-white/70">0.03 - 0.08 ETH</div>
           </div>
         </div>
        
        {/* Estadísticas adicionales */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-3">
            <div className="text-blue-400 font-medium text-xs">Eventos Disponibles</div>
            <div className="text-white font-bold text-lg">{recommendations.length}</div>
          </div>
          <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-lg p-3">
            <div className="text-green-400 font-medium text-xs">Score Promedio IA</div>
            <div className="text-white font-bold text-lg">
              {recommendations.length > 0 
                ? Math.round(recommendations.reduce((acc, rec) => acc + rec.aiScore, 0) / recommendations.length)
                : 0}%
            </div>
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
                    <button 
                      onClick={() => setSelectedEvent(event)}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onPurchase={(event) => {
            setSelectedEvent(null)
            // Aquí podrías agregar lógica para abrir el modal de compra
            console.log('Comprar evento:', event)
          }}
        />
      )}
    </div>
  )
}