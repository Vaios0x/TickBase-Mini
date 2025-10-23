'use client'

import { useState, useEffect } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'

interface UserData {
  fid: number
  username?: string
  profile?: {
    displayName: string
    avatar: string
    bio: string
  }
}

interface AuthenticationProps {
  onUserAuthenticated?: (userData: UserData) => void
  onUserSignedOut?: () => void
}

export function Authentication({ onUserAuthenticated, onUserSignedOut }: AuthenticationProps) {
  const [token, setToken] = useState<string | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Verificar si ya hay un token almacenado
  useEffect(() => {
    const storedToken = localStorage.getItem('farcaster_token')
    if (storedToken) {
      setToken(storedToken)
      // Verificar si el token sigue siendo válido
      verifyToken(storedToken)
    }
  }, [])

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch('/api/auth', {
        headers: { 'Authorization': `Bearer ${tokenToVerify}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setUserData({ fid: data.fid })
        onUserAuthenticated?.({ fid: data.fid })
      } else {
        // Token inválido, limpiar
        localStorage.removeItem('farcaster_token')
        setToken(null)
        setUserData(null)
      }
    } catch (error) {
      console.error('Error verificando token:', error)
    }
  }

  const signIn = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Obtener token usando Quick Auth
      const { token: newToken } = await sdk.quickAuth.getToken()
      setToken(newToken)
      
      // Almacenar token
      localStorage.setItem('farcaster_token', newToken)
      
      // Usar el token para autenticar al usuario y obtener datos
      const response = await sdk.quickAuth.fetch(`${window.location.origin}/api/auth`, {
        headers: { 'Authorization': `Bearer ${newToken}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setUserData({ fid: data.fid })
        onUserAuthenticated?.({ fid: data.fid })
      } else {
        throw new Error('Error en la autenticación del servidor')
      }
    } catch (error) {
      console.error('Error en autenticación:', error)
      setError('Error en la autenticación. Por favor, intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    setToken(null)
    setUserData(null)
    localStorage.removeItem('farcaster_token')
    onUserSignedOut?.()
  }

  // Si ya está autenticado, mostrar información del usuario
  if (token && userData) {
    return (
      <div className="neural-glass-card rounded-lg p-4 neural-interactive">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {userData.fid.toString().slice(-2)}
            </div>
            <div>
              <p className="text-white font-medium">
                Usuario {userData.fid}
              </p>
              <p className="text-white/60 text-sm">
                Autenticado con Farcaster
              </p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="px-3 py-1 bg-red-600/20 text-red-300 rounded-md hover:bg-red-600/30 transition-colors text-sm"
          >
            Salir
          </button>
        </div>
      </div>
    )
  }

  // Mostrar botón de autenticación
  return (
    <div className="neural-glass-card rounded-lg p-4 neural-interactive">
      <div className="text-center">
        <h3 className="text-white font-semibold mb-2">
          🔐 Autenticación
        </h3>
        <p className="text-white/70 text-sm mb-4">
          Conecta tu wallet para acceder a todas las funciones
        </p>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}
        
        <button
          onClick={signIn}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {isLoading ? 'Conectando...' : 'Conectar con Farcaster'}
        </button>
        
        <p className="text-white/50 text-xs mt-2">
          Autenticación rápida y segura
        </p>
      </div>
    </div>
  )
}
