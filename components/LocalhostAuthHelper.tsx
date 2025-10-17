'use client'

import { useEffect, useState } from 'react'

export function LocalhostAuthHelper() {
  const [showHelper, setShowHelper] = useState(false)
  const [isLocalhost, setIsLocalhost] = useState(false)

  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window === 'undefined') {
      return
    }
    
    // Verificar si estamos en localhost
    const isLocal = window.location.hostname.includes('localhost') || 
                   window.location.hostname.includes('127.0.0.1')
    
    setIsLocalhost(isLocal)
    
    // Escuchar errores de autorización
    const originalError = console.error
    const originalLog = console.log

    console.error = (...args) => {
      const message = args.join(' ')
      if (message.includes('authorized') || message.includes('authorization')) {
        if (isLocal) {
          setShowHelper(true)
        }
      }
      originalError.apply(console, args)
    }

    console.log = (...args) => {
      const message = args.join(' ')
      if (message.includes('authorized') || message.includes('authorization')) {
        if (isLocal) {
          setShowHelper(true)
        }
      }
      originalLog.apply(console, args)
    }

    return () => {
      console.error = originalError
      console.log = originalLog
    }
  }, [])

  if (!isLocalhost || !showHelper) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10001,
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      border: '2px solid #00d4aa',
      borderRadius: '12px',
      padding: '16px',
      color: 'white',
      maxWidth: '400px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <h3 style={{ 
          margin: 0, 
          color: '#00d4aa',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          🔧 Desarrollo Local
        </h3>
        <button
          onClick={() => setShowHelper(false)}
          style={{
            background: 'transparent',
            border: '1px solid #555',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', lineHeight: '1.4' }}>
          El error de autorización es normal en localhost. La app funciona sin el SDK de Farcaster.
        </p>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <h4 style={{ margin: '0 0 6px 0', color: '#ffd93d', fontSize: '13px' }}>
          💡 Soluciones:
        </h4>
        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', lineHeight: '1.4' }}>
          <li>Ignorar el error (recomendado para desarrollo)</li>
          <li>Usar: <code style={{ background: '#333', padding: '1px 3px', borderRadius: '2px' }}>npm run dev:no-sdk</code></li>
          <li>Para producción: <code style={{ background: '#333', padding: '1px 3px', borderRadius: '2px' }}>npm run auth:base</code></li>
        </ul>
      </div>

      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-end'
      }}>
        <button
          onClick={() => setShowHelper(false)}
          style={{
            background: '#333',
            border: '1px solid #555',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Entendido
        </button>
        <button
          onClick={() => {
            window.open('https://www.base.dev', '_blank')
            setShowHelper(false)
          }}
          style={{
            background: '#00d4aa',
            border: 'none',
            color: 'black',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          Autorizar
        </button>
      </div>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
