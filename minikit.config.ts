// Configuración de MiniKit para TickBase
// Basado en el tutorial: https://www.youtube.com/watch?v=juZxqgMx5rE&t=319s

export const minikitConfig = {
  // Configuración de la Mini App
  miniapp: {
    name: "TickBase - NFT Tickets",
    description: "Marketplace seguro de boletos NFT en Base con transacciones gasless",
    version: "1.0.0",
    logoUrl: "https://tickbase-miniapp.vercel.app/icon.png",
    coverUrl: "https://tickbase-miniapp.vercel.app/cover.png",
    primaryColor: "#0052FF",
    homeUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://tickbase-miniapp.vercel.app",
    
    // Configuración de frames para Farcaster
    frames: {
      enabled: true,
      initialPath: "/tickets",
      shareUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://tickbase-miniapp.vercel.app"}/share`
    },
    
    // Permisos requeridos
    permissions: [
      "wallet_connect",
      "transaction_send", 
      "user_read",
      "notification_send"
    ],
    
    // Configuración de navegación
    navigation: {
      showBackButton: true,
      showShareButton: true,
      showCloseButton: true
    },
    
    // Configuración de transacciones
    transactions: {
      gasless: true,
      paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL
    }
  },
  
  // Configuración de asociación de cuenta (se generará después del deployment)
  accountAssociation: {
    header: process.env.NEXT_PUBLIC_ACCOUNT_ASSOCIATION_HEADER || "",
    payload: process.env.NEXT_PUBLIC_ACCOUNT_ASSOCIATION_PAYLOAD || "",
    signature: process.env.NEXT_PUBLIC_ACCOUNT_ASSOCIATION_SIGNATURE || ""
  }
}

export default minikitConfig
