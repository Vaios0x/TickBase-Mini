// Configuración de red para TickBase
// Generado automáticamente - NO EDITAR MANUALMENTE
// Fecha: 2025-10-24T05:26:53.694Z

import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

// Configuración de red principal - Base Sepolia Testnet
export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'TickBase - Global NFT Tickets (Testnet)',
      appLogoUrl: 'https://tickbase-miniapp.vercel.app/icon.png',
    }),
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    }),
  ],
  transports: {
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org'),
  },
});

// Configuración específica para Base Sepolia (desarrollo)
export const sepoliaConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'TickBase - Global NFT Tickets (Testnet)',
      appLogoUrl: 'https://tickbase-miniapp.vercel.app/icon.png',
    }),
    injected(),
  ],
  transports: {
    [baseSepolia.id]: http('https://sepolia.base.org'),
  },
});

// Configuración específica para Base Mainnet (producción)
export const mainnetConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'TickBase - Global NFT Tickets',
      appLogoUrl: 'https://tickbase-miniapp.vercel.app/icon.png',
    }),
    injected(),
  ],
  transports: {
    [base.id]: http('https://mainnet.base.org'),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
