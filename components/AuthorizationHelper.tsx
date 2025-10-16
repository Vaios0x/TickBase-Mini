'use client'

import { useEffect, useState } from 'react'

export function AuthorizationHelper() {
  const [showHelper, setShowHelper] = useState(false)
  const [hasAuthError, setHasAuthError] = useState(false)

  useEffect(() => {
    // Escuchar errores de autorización en la consola
    const originalError = console.error
    const originalLog = console.log

    console.error = (...args) => {
      const message = args.join(' ')
      if (message.includes('authorized') || message.includes('authorization')) {
        setHasAuthError(true)
        setShowHelper(true)
      }
      originalError.apply(console, args)
    }

    console.log = (...args) => {
      const message = args.join(' ')
      if (message.includes('authorized') || message.includes('authorization')) {
        setHasAuthError(true)
        setShowHelper(true)
      }
      originalLog.apply(console, args)
    }

    // Verificar si ya hay errores de autorización
    const checkForAuthErrors = () => {
      // Buscar en el DOM por mensajes de error
      const errorElements = document.querySelectorAll('[class*="error"], [class*="Error"]')
      errorElements.forEach(element => {
        if (element.textContent?.includes('authorized')) {
          setHasAuthError(true)
          setShowHelper(true)
        }
      })
    }

    checkForAuthErrors()

    return () => {
      console.error = originalError
      console.log = originalLog
    }
  }, [])

  if (!hasAuthError && !showHelper) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10001,
      background: 'rgba(0, 0, 0, 0.95)',
      border: '2px solid #ff6b6b',
      borderRadius: '12px',
      padding: '20px',
      color: 'white',
      maxWidth: '500px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{ 
          margin: 0, 
          color: '#ff6b6b',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          🔐 Error de Autorización
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

      <div style={{ marginBottom: '16px' }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px' }}>
          La URL <code style={{ background: '#333', padding: '2px 4px', borderRadius: '3px' }}>
            https://www.base.dev/preview?url=https://tickbase-miniapp.vercel.app
          </code> no está autorizada en Base Build.
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#00d4aa', fontSize: '14px' }}>
          📋 Pasos para solucionarlo:
        </h4>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.4' }}>
          <li>Ve a <a href="https://www.base.dev" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4aa' }}>https://www.base.dev</a></li>
          <li>Inicia sesión con tu wallet</li>
          <li>Ve a &quot;My Apps&quot; o &quot;Developer Dashboard&quot;</li>
          <li>Busca &quot;TickBase&quot; en tus aplicaciones</li>
          <li>Haz clic en &quot;Settings&quot; o &quot;Configuration&quot;</li>
          <li>En &quot;Allowed URLs&quot; agrega:
            <ul style={{ marginTop: '4px', paddingLeft: '16px' }}>
              <li><code style={{ background: '#333', padding: '1px 3px', borderRadius: '2px' }}>https://tickbase-miniapp.vercel.app</code></li>
              <li><code style={{ background: '#333', padding: '1px 3px', borderRadius: '2px' }}>https://www.base.dev/preview?url=https://tickbase-miniapp.vercel.app</code></li>
            </ul>
          </li>
          <li>Guarda los cambios</li>
        </ol>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#ffd93d', fontSize: '14px' }}>
          🔄 Alternativas:
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.4' }}>
          <li>Usar directamente: <a href="https://tickbase-miniapp.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4aa' }}>https://tickbase-miniapp.vercel.app</a></li>
          <li>Desarrollar localmente: <code style={{ background: '#333', padding: '1px 3px', borderRadius: '2px' }}>npm run dev</code></li>
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
          Cerrar
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
          Ir a Base.dev
        </button>
      </div>
    </div>
  )
}
