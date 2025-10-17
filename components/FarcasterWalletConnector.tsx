'use client'

import { useEffect, useState } from 'react'

interface WalletState {
  isConnected: boolean
  address: string | null
  chainId: string | null
  error: string | null
  isConnecting: boolean
}

export function FarcasterWalletConnector() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    error: null,
    isConnecting: false
  })

  const [debugLogs, setDebugLogs] = useState<string[]>([])

  const addDebugLog = (message: string) => {
    console.log(`🔗 Wallet: ${message}`)
    setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  useEffect(() => {
    const initializeWallet = async () => {
      addDebugLog('🚀 Initializing wallet connection...')
      
      try {
        // Importar el SDK de Farcaster
        const { sdk } = await import('@farcaster/miniapp-sdk')
        addDebugLog('✅ Farcaster SDK imported')

        // Verificar si estamos en Farcaster
        const isFarcaster = typeof window !== 'undefined' && 
          (window.location.hostname.includes('farcaster') || 
           window.location.hostname.includes('warpcast'))

        if (!isFarcaster) {
          addDebugLog('ℹ️ Not in Farcaster environment, wallet connection not needed')
          return
        }

        addDebugLog('📱 Farcaster environment detected')

        // Verificar contexto de Farcaster
        try {
          const context = await sdk.context
          if (context) {
            addDebugLog('✅ Farcaster context available')
            addDebugLog(`👤 User: ${context.user ? 'Logged in' : 'Not logged in'}`)
            
            if (context.user) {
              addDebugLog('🎉 User is logged in to Farcaster')
              setWalletState(prev => ({
                ...prev,
                isConnected: true,
                address: context.user?.fid?.toString() || 'Farcaster User',
                chainId: 'farcaster',
                error: null
              }))
            } else {
              addDebugLog('⚠️ User not logged in to Farcaster')
              setWalletState(prev => ({
                ...prev,
                error: 'Please log in to Farcaster first'
              }))
            }
          } else {
            addDebugLog('❌ No Farcaster context available')
            setWalletState(prev => ({
              ...prev,
              error: 'Farcaster context not available'
            }))
          }
        } catch (contextError) {
          addDebugLog(`❌ Context error: ${contextError}`)
          setWalletState(prev => ({
            ...prev,
            error: `Context error: ${contextError}`
          }))
        }

        // Verificar si hay wallet externo disponible
        if (typeof window !== 'undefined' && (window as any).ethereum) {
          addDebugLog('🔗 External wallet detected (MetaMask, etc.)')
          
          try {
            const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' })
            if (accounts.length > 0) {
              addDebugLog(`✅ External wallet connected: ${accounts[0]}`)
              setWalletState(prev => ({
                ...prev,
                isConnected: true,
                address: accounts[0],
                chainId: (window as any).ethereum.chainId || 'unknown',
                error: null
              }))
            } else {
              addDebugLog('⚠️ External wallet not connected')
            }
          } catch (walletError) {
            addDebugLog(`⚠️ External wallet error: ${walletError}`)
          }
        } else {
          addDebugLog('ℹ️ No external wallet detected')
        }

      } catch (error) {
        addDebugLog(`❌ Wallet initialization failed: ${error}`)
        setWalletState(prev => ({
          ...prev,
          error: `Initialization failed: ${error}`
        }))
      }
    }

    initializeWallet()
  }, [])

  const connectWallet = async () => {
    setWalletState(prev => ({ ...prev, isConnecting: true, error: null }))
    addDebugLog('🔄 Attempting to connect wallet...')

    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ 
          method: 'eth_requestAccounts' 
        })
        
        if (accounts.length > 0) {
          addDebugLog(`✅ Wallet connected: ${accounts[0]}`)
          setWalletState(prev => ({
            ...prev,
            isConnected: true,
            address: accounts[0],
            chainId: (window as any).ethereum.chainId || 'unknown',
            isConnecting: false,
            error: null
          }))
        }
      } else {
        addDebugLog('❌ No wallet provider found')
        setWalletState(prev => ({
          ...prev,
          error: 'No wallet provider found. Please install MetaMask or similar.',
          isConnecting: false
        }))
      }
    } catch (error) {
      addDebugLog(`❌ Wallet connection failed: ${error}`)
      setWalletState(prev => ({
        ...prev,
        error: `Connection failed: ${error}`,
        isConnecting: false
      }))
    }
  }

  // Solo mostrar en desarrollo o si hay errores
  if (process.env.NODE_ENV === 'production' && !walletState.error) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      zIndex: 10000,
      background: 'rgba(0, 0, 0, 0.9)',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '15px',
      color: 'white',
      fontSize: '12px',
      fontFamily: 'monospace',
      maxWidth: '400px',
      maxHeight: '300px',
      overflow: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        borderBottom: '1px solid #333',
        paddingBottom: '5px'
      }}>
        <div style={{ fontWeight: 'bold', color: '#00d4aa' }}>
          🔗 Wallet Status
        </div>
        <div style={{
          fontSize: '10px',
          color: walletState.isConnected ? '#00ff00' : '#ffaa00'
        }}>
          {walletState.isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      {walletState.address && (
        <div style={{ marginBottom: '8px', fontSize: '11px' }}>
          <div>Address: <code style={{ background: '#333', padding: '1px 3px', borderRadius: '2px' }}>
            {walletState.address.substring(0, 20)}...
          </code></div>
          <div>Chain: <code style={{ background: '#333', padding: '1px 3px', borderRadius: '2px' }}>
            {walletState.chainId}
          </code></div>
        </div>
      )}

      {walletState.error && (
        <div style={{
          marginBottom: '8px',
          padding: '5px',
          background: 'rgba(255, 0, 0, 0.2)',
          borderRadius: '4px',
          fontSize: '11px',
          color: '#ff6b6b'
        }}>
          ❌ {walletState.error}
        </div>
      )}

      {!walletState.isConnected && (
        <button
          onClick={connectWallet}
          disabled={walletState.isConnecting}
          style={{
            background: walletState.isConnecting ? '#333' : '#00d4aa',
            border: 'none',
            color: walletState.isConnecting ? '#888' : 'black',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: walletState.isConnecting ? 'not-allowed' : 'pointer',
            fontSize: '11px',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}
        >
          {walletState.isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}

      {debugLogs.length > 0 && (
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#00d4aa' }}>
            Debug Log:
          </div>
          {debugLogs.slice(-5).map((log, index) => (
            <div key={index} style={{
              marginBottom: '2px',
              fontSize: '10px',
              opacity: 0.8
            }}>
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
