'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import Link from 'next/link'

interface FavoritesButtonProps {
  className?: string
}

export function FavoritesButton({ className = '' }: FavoritesButtonProps) {
  const [favoritesCount, setFavoritesCount] = useState(0)

  useEffect(() => {
    // Cargar favoritos desde localStorage
    const savedFavorites = localStorage.getItem('tickbase-favorites')
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites)
      setFavoritesCount(favorites.length)
    }
    
    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      const savedFavorites = localStorage.getItem('tickbase-favorites')
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites)
        setFavoritesCount(favorites.length)
      } else {
        setFavoritesCount(0)
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <Link
      href="/favorites"
      className={`relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 ${className}`}
    >
      <div className="relative">
        <Heart className="w-5 h-5 transition-all duration-300" />
        {favoritesCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
            {favoritesCount > 99 ? '99+' : favoritesCount}
          </div>
        )}
      </div>
      <span className="font-medium">Favoritos</span>
      
      {/* Efecto de brillo al hacer hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </Link>
  )
}
