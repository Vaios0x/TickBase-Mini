'use client'

import { useEffect, useState } from 'react'

export function FarcasterSDK() {
  const [isReady, setIsReady] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  const addDebugLog = (message: string) => {
    console.log(message)
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  useEffect(() => {
    const initializeSDK = async () => {
      addDebugLog('🚀 Initializing Farcaster SDK...')
      
      // Detectar si estamos en Base Build o Farcaster
      const isBaseBuild = typeof window !== 'undefined' && 
        (window.location.hostname.includes('base.dev') || 
         window.location.hostname.includes('vercel.app') ||
         window.location.hostname.includes('localhost'))
      
      addDebugLog(`🔍 Environment detected: ${isBaseBuild ? 'Base Build' : 'Farcaster'}`)
      addDebugLog(`📍 Current URL: ${window.location.href}`)
      
      try {
        // Importar el SDK
        const { sdk } = await import('@farcaster/miniapp-sdk')
        addDebugLog('✅ SDK imported successfully')
        
        // Verificar si el SDK está disponible
        if (!sdk || !sdk.actions) {
          throw new Error('SDK not properly initialized')
        }
        
        addDebugLog('🔧 SDK structure verified')
        
        // En Base Build, intentar ready() inmediatamente
        if (isBaseBuild) {
          addDebugLog('🎯 Base Build detected, calling ready() immediately')
          try {
            await sdk.actions.ready()
            addDebugLog('✅ Ready called successfully in Base Build')
            setIsReady(true)
            return
          } catch (readyError) {
            const errorMessage = readyError instanceof Error ? readyError.message : String(readyError)
            addDebugLog(`⚠️ Ready failed in Base Build: ${errorMessage}`)
            
            // Verificar si es un error de autorización
            if (errorMessage.includes('authorized') || 
                errorMessage.includes('authorization')) {
              addDebugLog('🔐 Authorization error detected')
              
              // Solo mostrar ayuda si NO estamos en localhost
              if (!window.location.hostname.includes('localhost')) {
                addDebugLog('💡 Run: node scripts/authorize-base-build.js for help')
              } else {
                addDebugLog('ℹ️ Localhost: Este error es normal en desarrollo')
              }
            }
            
            // Continuar sin SDK en Base Build
            setIsReady(true)
            return
          }
        }
        
        // En Farcaster, verificar contexto primero
        try {
          const context = await sdk.context
          if (context) {
            addDebugLog('📱 Farcaster context detected')
            addDebugLog(`👤 User: ${context.user ? 'Available' : 'Not available'}`)
            addDebugLog(`📱 Client: ${context.client ? 'Available' : 'Not available'}`)
          } else {
            addDebugLog('ℹ️ No Farcaster context available')
          }
        } catch (contextError) {
          addDebugLog(`ℹ️ Context check failed: ${contextError}`)
        }
        
        // Llamar a ready()
        try {
          await sdk.actions.ready()
          addDebugLog('✅ Farcaster SDK ready() called successfully')
          setIsReady(true)
        } catch (readyError) {
          const errorMessage = readyError instanceof Error ? readyError.message : String(readyError)
          addDebugLog(`⚠️ Ready call failed: ${errorMessage}`)
          // Continuar sin SDK
          setIsReady(true)
        }
        
      } catch (error) {
        addDebugLog(`⚠️ SDK initialization failed: ${error}`)
        
        // Fallback: intentar múltiples métodos
        try {
          // Método alternativo 1: Verificar si SDK está en window
          if (typeof window !== 'undefined' && (window as any).farcaster?.sdk) {
            await (window as any).farcaster.sdk.actions.ready()
            addDebugLog('✅ Ready called via window.farcaster')
            setIsReady(true)
            return
          }
          
          // Método alternativo 2: Verificar si hay un SDK global
          if (typeof window !== 'undefined' && (window as any).sdk?.actions?.ready) {
            await (window as any).sdk.actions.ready()
            addDebugLog('✅ Ready called via global SDK')
            setIsReady(true)
            return
          }
          
          // Si todo falla, continuar sin SDK
          addDebugLog('ℹ️ No SDK available, continuing without it')
          setIsReady(true)
          
        } catch (fallbackError) {
          addDebugLog(`⚠️ All fallback methods failed: ${fallbackError}`)
          setIsReady(true)
        }
      }
    }

    // Ejecutar inmediatamente
    initializeSDK()
    
    // También intentar después de un delay para entornos lentos
    const timeout = setTimeout(() => {
      if (!isReady) {
        addDebugLog('⏰ Timeout reached, forcing ready state')
        setIsReady(true)
      }
    }, 5000)
    
    return () => clearTimeout(timeout)
  }, [isReady])

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
        
        {/* Debug Info */}
        {debugInfo.length > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '12px',
            maxHeight: '200px',
            overflow: 'auto',
            border: '1px solid #333'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#00d4aa' }}>
              Debug Log:
            </div>
            {debugInfo.slice(-10).map((log, index) => (
              <div key={index} style={{ 
                marginBottom: '4px', 
                fontFamily: 'monospace',
                fontSize: '11px',
                opacity: 0.9
              }}>
                {log}
              </div>
            ))}
          </div>
        )}
        
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
