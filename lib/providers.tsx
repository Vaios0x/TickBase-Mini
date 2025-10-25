'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './network-config'
import { ReactNode, useState } from 'react'

// Configuración de QueryClient para wagmi
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 10, // 10 minutos
    },
  },
})

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

// Provider específico para desarrollo (Base Sepolia)
export function DevelopmentProviders({ children }: ProvidersProps) {
  const [devConfig] = useState(() => {
    // Configuración específica para desarrollo
    return {
      ...config,
      chains: [config.chains.find(chain => chain.id === 84532) || config.chains[0]],
    }
  })

  return (
    <WagmiProvider config={devConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

// Provider específico para producción (Base Mainnet)
export function ProductionProviders({ children }: ProvidersProps) {
  const [prodConfig] = useState(() => {
    // Configuración específica para producción
    return {
      ...config,
      chains: [config.chains.find(chain => chain.id === 8453) || config.chains[0]],
    }
  })

  return (
    <WagmiProvider config={prodConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
