'use client'

import { useEffect, useState } from 'react'

interface DebugInfo {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}

export function FarcasterDebug() {
  const [debugLogs, setDebugLogs] = useState<DebugInfo[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [sdkStatus, setSdkStatus] = useState<string>('Checking...')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const addLog = (message: string, type: DebugInfo['type'] = 'info') => {
      const newLog: DebugInfo = {
        timestamp: new Date().toLocaleTimeString(),
        message,
        type
      }
      setDebugLogs(prev => [...prev.slice(-19), newLog]) // Mantener solo los últimos 20 logs
    }

    // Verificar estado del SDK
    const checkSDKStatus = async () => {
      try {
        // Verificar si estamos en un entorno Farcaster
        const isFarcaster = typeof window !== 'undefined' && 
          (window.location.hostname.includes('farcaster') || 
           window.location.hostname.includes('warpcast'))
        
        const isBaseBuild = typeof window !== 'undefined' && 
          (window.location.hostname.includes('base.dev') || 
           window.location.hostname.includes('vercel.app') ||
           window.location.hostname.includes('localhost'))

        addLog(`Environment: ${isFarcaster ? 'Farcaster' : isBaseBuild ? 'Base Build' : 'Unknown'}`, 'info')
        addLog(`URL: ${window.location.href}`, 'info')

        // Verificar SDK
        try {
          const { sdk } = await import('@farcaster/miniapp-sdk')
          if (sdk && sdk.actions) {
            addLog('SDK loaded successfully', 'success')
            setSdkStatus('SDK Available')
            
            // Verificar contexto
            try {
              const context = await sdk.context
              if (context) {
                addLog('Farcaster context available', 'success')
                addLog(`User: ${context.user ? 'Logged in' : 'Not logged in'}`, 'info')
                addLog(`Client: ${context.client ? 'Available' : 'Not available'}`, 'info')
              } else {
                addLog('No Farcaster context', 'warning')
              }
            } catch (contextError) {
              addLog(`Context error: ${contextError}`, 'warning')
            }
          } else {
            addLog('SDK not properly initialized', 'error')
            setSdkStatus('SDK Error')
          }
        } catch (sdkError) {
          addLog(`SDK import failed: ${sdkError}`, 'error')
          setSdkStatus('SDK Not Available')
        }

        // Verificar window.farcaster
        if (typeof window !== 'undefined' && (window as any).farcaster) {
          addLog('window.farcaster detected', 'success')
        } else {
          addLog('window.farcaster not found', 'warning')
        }

        // Verificar user agent
        addLog(`User Agent: ${navigator.userAgent.substring(0, 50)}...`, 'info')

      } catch (error) {
        addLog(`Debug check failed: ${error}`, 'error')
        setSdkStatus('Debug Error')
      }
    }

    checkSDKStatus()

    // Escuchar cambios en el SDK
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).farcaster?.sdk) {
        addLog('SDK became available', 'success')
        setSdkStatus('SDK Available')
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (process.env.NODE_ENV === 'production' || !isMounted) {
    return null // No mostrar debug en producción o antes de montar
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 10000,
      background: 'rgba(0, 0, 0, 0.9)',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '10px',
      color: 'white',
      fontSize: '12px',
      fontFamily: 'monospace',
      maxWidth: '300px',
      maxHeight: '400px',
      overflow: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        borderBottom: '1px solid #333',
        paddingBottom: '4px'
      }}>
        <div style={{ fontWeight: 'bold', color: '#00d4aa' }}>
          Farcaster Debug
        </div>
        <button
          onClick={() => setIsVisible(!isVisible)}
          style={{
            background: 'transparent',
            border: '1px solid #555',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '10px'
          }}
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      
      <div style={{ marginBottom: '8px', fontSize: '11px' }}>
        Status: <span style={{ color: sdkStatus.includes('Available') ? '#00ff00' : '#ffaa00' }}>
          {sdkStatus}
        </span>
      </div>

      {isVisible && (
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#00d4aa' }}>
            Debug Log:
          </div>
          {debugLogs.map((log, index) => (
            <div key={index} style={{
              marginBottom: '2px',
              padding: '2px',
              borderRadius: '2px',
              backgroundColor: log.type === 'error' ? 'rgba(255, 0, 0, 0.2)' :
                             log.type === 'warning' ? 'rgba(255, 165, 0, 0.2)' :
                             log.type === 'success' ? 'rgba(0, 255, 0, 0.2)' :
                             'rgba(255, 255, 255, 0.1)',
              fontSize: '10px'
            }}>
              <span style={{ color: '#888' }}>[{log.timestamp}]</span> {log.message}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
