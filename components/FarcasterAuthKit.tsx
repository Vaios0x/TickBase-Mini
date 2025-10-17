'use client'

import '@farcaster/auth-kit/styles.css'
import { AuthKitProvider, SignInButton, useProfile } from '@farcaster/auth-kit'
import { useEffect, useState } from 'react'

// Configuración para AuthKit
const config = {
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'tickbase-miniapp.vercel.app',
  siweUri: 'https://tickbase-miniapp.vercel.app/login',
  relay: 'https://relay.farcaster.xyz',
  version: 'v1'
}

// Componente de perfil de usuario
function UserProfile() {
  const {
    isAuthenticated,
    profile: { username, fid, bio, displayName, pfpUrl }
  } = useProfile()

  const [debugLogs, setDebugLogs] = useState<string[]>([])

  const addDebugLog = (message: string) => {
    console.log(`🔗 AuthKit: ${message}`)
    setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  useEffect(() => {
    if (isAuthenticated) {
      addDebugLog('✅ User authenticated with Farcaster AuthKit')
      addDebugLog(`👤 Username: ${username}`)
      addDebugLog(`🆔 FID: ${fid}`)
      addDebugLog(`📝 Bio: ${bio}`)
      addDebugLog(`👋 Display Name: ${displayName}`)
    } else {
      addDebugLog('⚠️ User not authenticated')
    }
  }, [isAuthenticated, username, fid, bio, displayName])

  if (!isAuthenticated) {
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
            🔗 Farcaster AuthKit
          </div>
          <div style={{ fontSize: '10px', color: '#ffaa00' }}>
            Not Connected
          </div>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '11px' }}>
            Usa el botón oficial de Farcaster para conectarte:
          </p>
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

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      zIndex: 10000,
      background: 'rgba(0, 0, 0, 0.9)',
      border: '1px solid #00d4aa',
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
        borderBottom: '1px solid #00d4aa',
        paddingBottom: '5px'
      }}>
        <div style={{ fontWeight: 'bold', color: '#00d4aa' }}>
          🔗 Farcaster AuthKit
        </div>
        <div style={{ fontSize: '10px', color: '#00ff00' }}>
          Connected
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '4px' }}>
          <strong>Username:</strong> {username}
        </div>
        <div style={{ marginBottom: '4px' }}>
          <strong>FID:</strong> {fid}
        </div>
        <div style={{ marginBottom: '4px' }}>
          <strong>Display Name:</strong> {displayName}
        </div>
        {bio && (
          <div style={{ marginBottom: '4px' }}>
            <strong>Bio:</strong> {bio}
          </div>
        )}
        {pfpUrl && (
          <div style={{ marginBottom: '4px' }}>
            <strong>Profile Picture:</strong> 
            <img 
              src={pfpUrl} 
              alt="Profile" 
              style={{ 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%', 
                marginLeft: '5px',
                verticalAlign: 'middle'
              }} 
            />
          </div>
        )}
      </div>

      {debugLogs.length > 0 && (
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#00d4aa' }}>
            Debug Log:
          </div>
          {debugLogs.slice(-3).map((log, index) => (
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

// Componente principal con AuthKitProvider
export function FarcasterAuthKit() {
  return (
    <AuthKitProvider config={config}>
      <UserProfile />
    </AuthKitProvider>
  )
}
