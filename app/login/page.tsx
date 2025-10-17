'use client'

import '@farcaster/auth-kit/styles.css'
import { AuthKitProvider, SignInButton, useProfile } from '@farcaster/auth-kit'
import { useState } from 'react'

const config = {
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'tickbase-miniapp.vercel.app',
  siweUri: 'https://tickbase-miniapp.vercel.app/login',
  relay: 'https://relay.farcaster.xyz',
  version: 'v1'
}

function LoginContent() {
  const {
    isAuthenticated,
    profile: { username, fid, bio, displayName, pfpUrl }
  } = useProfile()

  const [debugLogs, setDebugLogs] = useState<string[]>([])

  const addDebugLog = (message: string) => {
    console.log(`🔗 AuthKit Login: ${message}`)
    setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  if (isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid #00d4aa',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#00d4aa', marginBottom: '20px' }}>
            🎉 ¡Conectado con Farcaster!
          </h1>
          
          <div style={{ marginBottom: '20px' }}>
            {pfpUrl && (
              <img 
                src={pfpUrl} 
                alt="Profile" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  marginBottom: '15px',
                  border: '2px solid #00d4aa'
                }} 
              />
            )}
            <h2 style={{ margin: '0 0 10px 0', color: '#00d4aa' }}>
              {displayName || username}
            </h2>
            <p style={{ margin: '0 0 5px 0', opacity: 0.8 }}>
              @{username}
            </p>
            <p style={{ margin: '0 0 15px 0', fontSize: '14px', opacity: 0.6 }}>
              FID: {fid}
            </p>
            {bio && (
              <p style={{ margin: '0 0 20px 0', fontSize: '14px', opacity: 0.8 }}>
                "{bio}"
              </p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <a 
              href="/" 
              style={{
                background: '#00d4aa',
                color: 'black',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block'
              }}
            >
              🎫 Ir a TickBase
            </a>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.6 }}>
            <p>✅ Autenticado con Farcaster AuthKit</p>
            <p>🔗 Usando la librería oficial de Farcaster</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid #333',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#00d4aa', marginBottom: '20px' }}>
          🎫 TickBase
        </h1>
        
        <p style={{ marginBottom: '30px', opacity: 0.8 }}>
          Conecta con Farcaster para acceder al marketplace de boletos NFT
        </p>

        <div style={{ marginBottom: '30px' }}>
          <SignInButton
            onSuccess={({ fid, username }) => {
              addDebugLog(`🎉 Successfully connected: ${username} (FID: ${fid})`)
            }}
            onError={(error) => {
              addDebugLog(`❌ Connection error: ${error}`)
            }}
            debug={true}
          />
        </div>

        <div style={{ fontSize: '12px', opacity: 0.6, marginBottom: '20px' }}>
          <p>🔗 Usando Farcaster AuthKit oficial</p>
          <p>📱 Compatible con app de Farcaster</p>
          <p>🔒 Autenticación segura</p>
        </div>

        {debugLogs.length > 0 && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '15px',
            marginTop: '20px',
            textAlign: 'left'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#00d4aa' }}>
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
    </div>
  )
}

export default function LoginPage() {
  return (
    <AuthKitProvider config={config}>
      <LoginContent />
    </AuthKitProvider>
  )
}
