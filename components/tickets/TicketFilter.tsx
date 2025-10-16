'use client'

import { useState } from 'react'
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react'
import { TICKET_CATEGORIES } from '@/lib/constants'

interface TicketFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function TicketFilter({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange
}: TicketFilterProps) {
  const [showFilters, setShowFilters] = useState(false)

  const sortOptions = [
    { value: 'date', label: 'Fecha', icon: SortAsc },
    { value: 'price', label: 'Precio', icon: SortDesc },
    { value: 'name', label: 'Nombre', icon: SortAsc },
  ]

  return (
    <div className="glass-morphism rounded-xl p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        <input
          type="text"
          placeholder="Buscar eventos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-base-blue focus:ring-2 focus:ring-base-blue/20 transition-all duration-200"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200"
        >
          <Filter className="w-4 h-4" />
          <span className="text-white">Filtros</span>
        </button>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-white/10 border border-white/20 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:border-base-blue focus:ring-2 focus:ring-base-blue/20 transition-all duration-200"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-base-dark">
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <SortAsc className="w-4 h-4 text-white/50" />
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="space-y-4 animate-slide-down">
          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-3">Categorías</h4>
            <div className="flex flex-wrap gap-2">
              {TICKET_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-base-blue text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-white font-semibold mb-3">Rango de Precio</h4>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                className="input-base"
              />
              <input
                type="number"
                placeholder="Max"
                className="input-base"
              />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h4 className="text-white font-semibold mb-3">Fecha</h4>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                className="input-base"
              />
              <input
                type="date"
                className="input-base"
              />
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              onCategoryChange('Todos')
              onSearchChange('')
              setShowFilters(false)
            }}
            className="w-full btn-ghost text-sm"
          >
            Limpiar Filtros
          </button>
        </div>
      )}
    </div>
  )
}
