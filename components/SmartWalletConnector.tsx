'use client'

import { useEffect, useState } from 'react'
import { FarcasterWalletConnector } from './FarcasterWalletConnector'
// Componente Button simple
const Button = ({ children, onClick, disabled, className, ...props }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${className || ''}`}
    {...props}
  >
    {children}
  </button>
)

interface SmartWalletConnectorProps {
  onWalletConnected?: (address: string) => void
}

export function SmartWalletConnector({ onWalletConnected }: SmartWalletConnectorProps) {
  const [environment, setEnvironment] = useState<'farcaster' | 'base' | 'local' | 'unknown'>('unknown')
  const [isDetecting, setIsDetecting] = useState(true)

  useEffect(() => {
    const detectEnvironment = () => {
      if (typeof window === 'undefined') {
        setEnvironment('unknown')
        setIsDetecting(false)
        return
      }

      const hostname = window.location.hostname
      const href = window.location.href

      console.log('🔍 Detectando entorno:', { hostname, href })

      // Detectar Farcaster
      if (hostname.includes('farcaster') || 
          hostname.includes('warpcast') ||
          hostname.includes('farcaster.xyz') ||
          href.includes('farcaster.xyz')) {
        console.log('🎯 Entorno detectado: Farcaster')
        setEnvironment('farcaster')
        setIsDetecting(false)
        return
      }

      // Detectar Base App
      if (hostname.includes('base.dev') || 
          hostname.includes('vercel.app') ||
          href.includes('base.dev')) {
        console.log('🎯 Entorno detectado: Base App')
        setEnvironment('base')
        setIsDetecting(false)
        return
      }

      // Detectar localhost
      if (hostname.includes('localhost') || 
          hostname.includes('127.0.0.1')) {
        console.log('🎯 Entorno detectado: Local')
        setEnvironment('local')
        setIsDetecting(false)
        return
      }

      // Desconocido
      console.log('🎯 Entorno detectado: Desconocido')
      setEnvironment('unknown')
      setIsDetecting(false)
    }

    detectEnvironment()
  }, [])

  if (isDetecting) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-300">Detectando entorno...</span>
      </div>
    )
  }

  // En Farcaster, usar el conector específico
  if (environment === 'farcaster') {
    return <FarcasterWalletConnector onWalletConnected={onWalletConnected} />
  }

  // Mostrar opciones de wallet para que el usuario elija
  return (
    <div className="text-center space-y-3">
      <div className="text-green-300 text-sm mb-2">
        Elige tu wallet preferido:
      </div>
      
      <div className="space-y-2">
        <div className="text-white/70 text-xs">
          MetaMask, Coinbase Wallet, Brave Wallet, etc.
        </div>
        
        <div className="text-blue-300 text-xs">
          💡 Haz clic en "Connect Wallet" para ver todas las opciones
        </div>
      </div>
    </div>
  )
}
