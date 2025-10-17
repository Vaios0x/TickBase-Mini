'use client'

import { useEffect, useState } from 'react'

export function FarcasterSDKInterceptor() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window === 'undefined') {
      return
    }

    // Verificar si estamos en localhost
    const isLocalhost = window.location.hostname.includes('localhost') || 
                       window.location.hostname.includes('127.0.0.1')

    if (isLocalhost) {
      console.log('🚫 FarcasterSDKInterceptor: Bloqueando SDK en localhost')
      
      // Interceptar errores de autorización
      const originalError = console.error
      console.error = function(...args) {
        const message = args.join(' ')
        if (message.includes('authorized') || message.includes('authorization')) {
          console.log('🚫 Error de autorización interceptado y bloqueado')
          return
        }
        originalError.apply(console, args)
      }
      
      // Interceptar console.log también
      const originalLog = console.log
      console.log = function(...args) {
        const message = args.join(' ')
        if (message.includes('authorized') || message.includes('authorization')) {
          console.log('🚫 Log de autorización interceptado y bloqueado')
          return
        }
        originalLog.apply(console, args)
      }
      
      setIsReady(true)
      return
    }

    // Si no es localhost, continuar normalmente
    setIsReady(true)
  }, [])

  // Mostrar splash screen hasta que esté listo
  if (!isReady) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        color: 'white',
        padding: '20px'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          🎫 TickBase
        </div>
        <div style={{
          fontSize: '16px',
          opacity: 0.8,
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          NFT Ticket Marketplace
        </div>
        <div style={{
          marginBottom: '24px',
          width: '40px',
          height: '40px',
          border: '3px solid #00d4aa',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        
        <div style={{
          fontSize: '14px',
          opacity: 0.7,
          textAlign: 'center',
          maxWidth: '300px'
        }}>
          Inicializando en modo desarrollo...
        </div>
        
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return null
}