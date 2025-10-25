import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { coinbaseWallet, injected } from 'wagmi/connectors'

// Configuración de wagmi
export const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'TickBase - Global NFT Tickets',
      appLogoUrl: 'https://tickbase-miniapp.vercel.app/icon.png',
    }),
    injected(),
  ],
  transports: {
    [base.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
