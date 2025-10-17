'use client'

import { useEffect } from 'react'

export function FarcasterSDKBlocker() {
  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window === 'undefined') {
      return
    }

    // Verificar si estamos en localhost
    const isLocalhost = window.location.hostname.includes('localhost') || 
                       window.location.hostname.includes('127.0.0.1')

    if (!isLocalhost) {
      return
    }

    console.log('🚫 FarcasterSDKBlocker: Activando bloqueo completo en localhost')

    // Bloquear completamente el SDK de Farcaster
    const blockFarcasterSDK = () => {
      // Interceptar errores de autorización
      const originalError = console.error
      console.error = function(...args) {
        const message = args.join(' ')
        if (message.includes('authorized') || message.includes('authorization')) {
          console.log('🚫 Error de autorización bloqueado:', message)
          return
        }
        originalError.apply(console, args)
      }

      // Interceptar console.log
      const originalLog = console.log
      console.log = function(...args) {
        const message = args.join(' ')
        if (message.includes('authorized') || message.includes('authorization')) {
          console.log('🚫 Log de autorización bloqueado:', message)
          return
        }
        originalLog.apply(console, args)
      }

      // Interceptar fetch requests
      const originalFetch = window.fetch
      window.fetch = function(url: RequestInfo | URL, options?: RequestInit) {
        if (typeof url === 'string' && (url.includes('farcaster') || url.includes('authorized'))) {
          console.log('🚫 Fetch request bloqueado:', url)
          return Promise.reject(new Error('Request blocked'))
        }
        return originalFetch.call(this, url, options)
      }

      // Interceptar XMLHttpRequest
      const originalXHROpen = XMLHttpRequest.prototype.open
      XMLHttpRequest.prototype.open = function(method: string, url: string | URL, async?: boolean, user?: string | null, password?: string | null) {
        if (typeof url === 'string' && (url.includes('farcaster') || url.includes('authorized'))) {
          console.log('🚫 XMLHttpRequest bloqueado:', url)
          return
        }
        return originalXHROpen.call(this, method, url, async ?? true, user, password)
      }

      console.log('✅ FarcasterSDKBlocker: Bloqueo completo activado')
    }

    // Ejecutar bloqueo inmediatamente
    blockFarcasterSDK()

    // También ejecutar después de un delay para capturar imports tardíos
    setTimeout(blockFarcasterSDK, 100)
    setTimeout(blockFarcasterSDK, 500)
    setTimeout(blockFarcasterSDK, 1000)

  }, [])

  return null
}