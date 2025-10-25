'use client'

import { useState } from 'react'
import { EventCard } from '@/components/contracts/EventCard'
import { ContractProvider } from '@/components/contracts/ContractProvider'
import { Search, Filter, Plus } from 'lucide-react'

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Datos de ejemplo de eventos
  const events = [
    {
      id: 1,
      name: 'Festival de Música Electrónica',
      venue: 'Centro de Convenciones',
      date: '2025-12-19T20:00:00Z',
      price: '0.08',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
      available: 100,
      category: 'music'
    },
    {
      id: 2,
      name: 'Conferencia de Tecnología',
      venue: 'Centro de Convenciones',
      date: '2025-01-09T09:00:00Z',
      price: '0.05',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      available: 200,
      category: 'technology'
    },
    {
      id: 3,
      name: 'Partido de Fútbol',
      venue: 'Estadio Nacional',
      date: '2025-02-15T15:00:00Z',
      price: '0.12',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop',
      available: 50,
      category: 'sports'
    },
    {
      id: 4,
      name: 'Obra de Teatro',
      venue: 'Teatro Municipal',
      date: '2025-01-25T19:30:00Z',
      price: '0.06',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      available: 80,
      category: 'theater'
    }
  ]

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'music', name: 'Música' },
    { id: 'sports', name: 'Deportes' },
    { id: 'theater', name: 'Teatro' },
    { id: 'technology', name: 'Tecnología' },
    { id: 'conferences', name: 'Conferencias' }
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <ContractProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
                <p className="text-gray-600 mt-1">Descubre y compra tickets para los mejores eventos</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Crear Evento
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar eventos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* No Results */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron eventos</h3>
              <p className="text-gray-600">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </ContractProvider>
  )
}
