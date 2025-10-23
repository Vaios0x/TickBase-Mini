'use client'

import { useEffect, useState } from 'react'
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

interface FarcasterWalletConnectorProps {
  onWalletConnected?: (address: string) => void
}

export function FarcasterWalletConnector({ onWalletConnected }: FarcasterWalletConnectorProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sdk, setSdk] = useState<any>(null)

  useEffect(() => {
    const initializeFarcasterSDK = async () => {
      try {
        // Verificar si estamos en Farcaster
        const isFarcaster = typeof window !== 'undefined' && 
          (window.location.hostname.includes('farcaster') || 
           window.location.hostname.includes('warpcast') ||
           window.location.hostname.includes('farcaster.xyz'))

        if (!isFarcaster) {
          console.log('🚫 No estamos en Farcaster, usando wallet tradicional')
          return
        }

        console.log('🎯 Detectado Farcaster, inicializando SDK...')

        // Importar el SDK de Farcaster
        const { sdk: farcasterSDK } = await import('@farcaster/miniapp-sdk')
        setSdk(farcasterSDK)

        console.log('✅ Farcaster SDK cargado')

        // Verificar si ya hay una conexión
        try {
          // En Farcaster, el wallet se conecta automáticamente
          // No necesitamos verificar contexto previo
          console.log('📱 Farcaster SDK listo para conectar wallet')
        } catch (contextError) {
          console.log('ℹ️ No hay contexto de usuario aún')
        }

      } catch (error) {
        console.error('❌ Error inicializando Farcaster SDK:', error)
        setError('Error inicializando SDK de Farcaster')
      }
    }

    initializeFarcasterSDK()
  }, [onWalletConnected])

  const connectWallet = async () => {
    if (!sdk) {
      setError('SDK de Farcaster no disponible')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log('🔗 Conectando wallet en Farcaster...')

      // En Farcaster, el usuario debe elegir conectar manualmente
      // No simular conexión automática
      console.log('📱 Usuario debe elegir conectar wallet manualmente')
      
      // Por ahora, no conectamos automáticamente
      // El usuario debe hacer clic en el botón
      setError('Por favor, usa el botón "Connect Wallet" de Coinbase para conectar tu wallet')

    } catch (error) {
      console.error('❌ Error conectando wallet:', error)
      setError('Error conectando wallet en Farcaster')
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    setIsConnected(false)
    console.log('🔌 Wallet desconectado')
  }

  // Si no estamos en Farcaster, no mostrar este componente
  const isFarcaster = typeof window !== 'undefined' && 
    (window.location.hostname.includes('farcaster') || 
     window.location.hostname.includes('warpcast') ||
     window.location.hostname.includes('farcaster.xyz'))

  if (!isFarcaster) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          Conectar Wallet en Farcaster
        </h3>
        <p className="text-gray-300 text-sm mb-4">
          En Farcaster, tu wallet se conecta automáticamente
        </p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {isConnected && walletAddress ? (
        <div className="space-y-3">
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
            <p className="text-green-200 text-sm font-medium">
              ✅ Wallet Conectado
            </p>
            <p className="text-green-300 text-xs mt-1 font-mono">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          </div>
          
          <Button
            onClick={disconnectWallet}
            variant="outline"
            className="w-full"
          >
            Desconectar Wallet
          </Button>
        </div>
      ) : (
        <Button
          onClick={connectWallet}
          disabled={isLoading || !sdk}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? 'Conectando...' : 'Conectar Wallet'}
        </Button>
      )}

      <div className="text-xs text-gray-400 text-center">
        <p>💡 En Farcaster, tu wallet se conecta automáticamente</p>
        <p>🔗 No necesitas MetaMask o Coinbase Wallet</p>
      </div>
    </div>
  )
}
