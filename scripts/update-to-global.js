const { ethers } = require("ethers");
const fs = require('fs');

async function main() {
  console.log("🌍 CONVIRTIENDO TICKBASE A APP GLOBAL");
  console.log("=" .repeat(60));
  console.log("🌐 Red: Base Sepolia Testnet");
  console.log("📅 Fecha:", new Date().toLocaleString());
  console.log("🎯 Objetivo: App global en Base + Farcaster");
  console.log("");

  // Configurar provider y wallet
  const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
  const privateKey = "5f0a78243564952c45fc64a9347410abe9c9b0056918b650bc1c76d019d17d41";
  const wallet = new ethers.Wallet(privateKey, provider);
  
  console.log("👤 Owner:", wallet.address);
  console.log("💰 Balance:", ethers.formatEther(await provider.getBalance(wallet.address)), "ETH");
  console.log("");

  // Direcciones de contratos
  const contracts = {
    TICKET_NFT: "0xE81fd4523284561382FEd2C694b0BAb0881C148D",
    MARKETPLACE: "0xff85e8A49d4623C3D1edE1c0CbC7ed08685D7CC4",
    VALIDATOR: "0x7Ecd57D7fF8b0c9A894c6282bB023980154732c5",
    FACTORY: "0x7A8917D50441c154A0eE545f02c6695C20fb92d7",
    SIMPLE_FACTORY: "0xFDCFd7EDf8f1A34Fe6DcADf27cF237bF26a3de8E"
  };

  console.log("📋 CONTRATOS A ACTUALIZAR:");
  Object.entries(contracts).forEach(([name, address]) => {
    console.log(`   ${name}: ${address}`);
  });
  console.log("");

  try {
    // 1. VERIFICAR ESTADO ACTUAL
    console.log("🔍 VERIFICANDO ESTADO ACTUAL...");
    console.log("-".repeat(40));
    
    const marketplaceABI = JSON.parse(fs.readFileSync('./artifacts/contracts/TicketMarketplace.sol/TicketMarketplace.json', 'utf8')).abi;
    const marketplace = new ethers.Contract(contracts.MARKETPLACE, marketplaceABI, wallet);
    
    const factoryABI = JSON.parse(fs.readFileSync('./artifacts/contracts/TicketFactory.sol/TicketFactory.json', 'utf8')).abi;
    const factory = new ethers.Contract(contracts.FACTORY, factoryABI, wallet);
    
    const currentMarketplaceFee = await marketplace.platformFeePercent();
    const currentFactoryFee = await factory.platformFeePercent();
    
    console.log(`   🏪 Marketplace Fee: ${currentMarketplaceFee.toString()} (${(Number(currentMarketplaceFee)/100).toFixed(2)}%)`);
    console.log(`   🏭 Factory Fee: ${currentFactoryFee.toString()} (${(Number(currentFactoryFee)/100).toFixed(2)}%)`);
    console.log("✅ Estado actual verificado");
    console.log("");

    // 2. ACTUALIZAR CONFIGURACIÓN DEL FRONTEND
    console.log("📱 ACTUALIZANDO FRONTEND PARA APP GLOBAL...");
    console.log("-".repeat(40));
    
    // Leer constants.ts actual
    const constantsPath = './lib/constants.ts';
    let constantsContent = fs.readFileSync(constantsPath, 'utf8');
    
    // Actualizar para app global
    const globalUpdates = [
      // Cambiar descripción
      {
        from: 'description: "Marketplace de boletos NFT como Base Mini App",',
        to: 'description: "Global NFT Ticket Marketplace on Base + Farcaster",'
      },
      // Actualizar categorías para ser más globales
      {
        from: `export const TICKET_CATEGORIES = [
  'Todos',
  'Conciertos',
  'Deportes',
  'Teatro',
  'Festivales',
  'Conferencias',
] as const`,
        to: `export const TICKET_CATEGORIES = [
  'All',
  'Concerts',
  'Sports',
  'Theater',
  'Festivals',
  'Conferences',
  'Gaming',
  'Art',
  'Technology',
  'Community'
] as const`
      },
      // Actualizar opciones de ordenamiento
      {
        from: `export const SORT_OPTIONS = [
  { value: 'date', label: 'Fecha' },
  { value: 'price', label: 'Precio' },
  { value: 'name', label: 'Nombre' },
  { value: 'popularity', label: 'Popularidad' },
] as const`,
        to: `export const SORT_OPTIONS = [
  { value: 'date', label: 'Date' },
  { value: 'price', label: 'Price' },
  { value: 'name', label: 'Name' },
  { value: 'popularity', label: 'Popularity' },
] as const`
      },
      // Actualizar tickets de ejemplo para ser más globales
      {
        from: `export const MOCK_TICKETS = [
  {
    id: 1,
    name: "Festival de Verano 2025",
    date: "2025-07-15",
    price: "0.05",
    venue: "Parque Central",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
    category: "Festivales",
    available: 100,
    description: "3 días de música, arte y cultura en el corazón de la ciudad"
  },`,
        to: `export const MOCK_TICKETS = [
  {
    id: 1,
    name: "Summer Music Festival 2025",
    date: "2025-07-15",
    price: "0.05",
    venue: "Central Park",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
    category: "Festivals",
    available: 100,
    description: "3 days of music, art and culture in the heart of the city"
  },`
      },
      // Actualizar más tickets de ejemplo
      {
        from: `  {
    id: 2,
    name: "Partido de Fútbol - Final",
    date: "2025-06-20",
    price: "0.03",
    venue: "Estadio Nacional",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=600&fit=crop",
    category: "Deportes",
    available: 250,
    description: "Gran final del campeonato nacional de fútbol"
  },`,
        to: `  {
    id: 2,
    name: "Championship Final Match",
    date: "2025-06-20",
    price: "0.03",
    venue: "National Stadium",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=600&fit=crop",
    category: "Sports",
    available: 250,
    description: "Grand final of the national football championship"
  },`
      },
      // Actualizar características
      {
        from: `export const FEATURES = [
  {
    icon: '🎫',
    title: 'Tickets NFT',
    description: 'Cada boleto es un NFT único y verificable en blockchain'
  },
  {
    icon: '⚡',
    title: 'Transacciones Gasless',
    description: 'Sin costos de gas gracias a Base Paymaster'
  },
  {
    icon: '🛡️',
    title: '100% Seguro',
    description: 'Blockchain elimina fraudes y falsificaciones'
  },
  {
    icon: '👥',
    title: 'Comunidad',
    description: 'Conecta con otros asistentes al evento'
  },
  {
    icon: '🔄',
    title: 'Transferible',
    description: 'Transfiere tus tickets a otros usuarios fácilmente'
  },
  {
    icon: '📱',
    title: 'Mobile First',
    description: 'Optimizado para dispositivos móviles'
  }
] as const`,
        to: `export const FEATURES = [
  {
    icon: '🎫',
    title: 'NFT Tickets',
    description: 'Each ticket is a unique and verifiable NFT on blockchain'
  },
  {
    icon: '⚡',
    title: 'Gasless Transactions',
    description: 'No gas costs thanks to Base Paymaster'
  },
  {
    icon: '🛡️',
    title: '100% Secure',
    description: 'Blockchain eliminates fraud and counterfeiting'
  },
  {
    icon: '👥',
    title: 'Community',
    description: 'Connect with other event attendees'
  },
  {
    icon: '🔄',
    title: 'Transferable',
    description: 'Transfer your tickets to other users easily'
  },
  {
    icon: '📱',
    title: 'Mobile First',
    description: 'Optimized for mobile devices'
  },
  {
    icon: '🌍',
    title: 'Global',
    description: 'Available worldwide on Base network'
  },
  {
    icon: '🔗',
    title: 'Farcaster Native',
    description: 'Built for the Farcaster ecosystem'
  }
] as const`
      },
      // Actualizar mensajes de error
      {
        from: `export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Por favor conecta tu wallet para continuar',
  INSUFFICIENT_FUNDS: 'Fondos insuficientes para completar la transacción',
  TRANSACTION_FAILED: 'La transacción falló. Por favor intenta de nuevo',
  NETWORK_ERROR: 'Error de red. Verifica tu conexión',
  INVALID_ADDRESS: 'Dirección de wallet inválida',
  EVENT_NOT_FOUND: 'Evento no encontrado',
  TICKET_NOT_AVAILABLE: 'No hay tickets disponibles para este evento',
  INVALID_QUANTITY: 'Cantidad inválida de tickets',
} as const`,
        to: `export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  INSUFFICIENT_FUNDS: 'Insufficient funds to complete the transaction',
  TRANSACTION_FAILED: 'Transaction failed. Please try again',
  NETWORK_ERROR: 'Network error. Check your connection',
  INVALID_ADDRESS: 'Invalid wallet address',
  EVENT_NOT_FOUND: 'Event not found',
  TICKET_NOT_AVAILABLE: 'No tickets available for this event',
  INVALID_QUANTITY: 'Invalid ticket quantity',
} as const`
      },
      // Actualizar mensajes de éxito
      {
        from: `export const SUCCESS_MESSAGES = {
  TICKET_PURCHASED: '¡Ticket comprado exitosamente!',
  TICKET_TRANSFERRED: 'Ticket transferido exitosamente',
  WALLET_CONNECTED: 'Wallet conectado exitosamente',
  TRANSACTION_CONFIRMED: 'Transacción confirmada',
} as const`,
        to: `export const SUCCESS_MESSAGES = {
  TICKET_PURCHASED: 'Ticket purchased successfully!',
  TICKET_TRANSFERRED: 'Ticket transferred successfully',
  WALLET_CONNECTED: 'Wallet connected successfully',
  TRANSACTION_CONFIRMED: 'Transaction confirmed',
} as const`
      }
    ];
    
    // Aplicar todas las actualizaciones
    globalUpdates.forEach(update => {
      constantsContent = constantsContent.replace(update.from, update.to);
    });
    
    // Guardar archivo actualizado
    fs.writeFileSync(constantsPath, constantsContent);
    console.log("   ✅ lib/constants.ts actualizado para app global");
    console.log("   🌍 Idioma cambiado a inglés");
    console.log("   🎯 Categorías globalizadas");
    console.log("   📱 Características actualizadas");
    console.log("");

    // 3. ACTUALIZAR CONFIGURACIÓN DE RED
    console.log("🌐 ACTUALIZANDO CONFIGURACIÓN DE RED...");
    console.log("-".repeat(40));
    
    // Leer config.ts
    const configPath = './lib/config.ts';
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Actualizar configuración para app global
    configContent = configContent.replace(
      'appName: \'TickBase - NFT Tickets\',',
      'appName: \'TickBase - Global NFT Tickets\','
    );
    
    configContent = configContent.replace(
      'appLogoUrl: \'https://tickbase-miniapp.vercel.app/icon.png\',',
      'appLogoUrl: \'https://tickbase-miniapp.vercel.app/icon.png\','
    );
    
    fs.writeFileSync(configPath, configContent);
    console.log("   ✅ lib/config.ts actualizado");
    console.log("   🌍 App name globalizado");
    console.log("");

    // 4. CREAR CONFIGURACIÓN GLOBAL
    console.log("📝 CREANDO CONFIGURACIÓN GLOBAL...");
    console.log("-".repeat(40));
    
    const globalConfig = {
      network: {
        name: "Base Sepolia",
        chainId: 84532,
        rpcUrl: "https://sepolia.base.org",
        explorer: "https://sepolia.basescan.org"
      },
      app: {
        name: "TickBase",
        description: "Global NFT Ticket Marketplace on Base + Farcaster",
        version: "1.0.0",
        type: "Global",
        target: "Base + Farcaster Ecosystem"
      },
      deployer: wallet.address,
      updatedAt: new Date().toISOString(),
      contracts: {
        TICKET_NFT: "0xE81fd4523284561382FEd2C694b0BAb0881C148D",
        MARKETPLACE: "0xff85e8A49d4623C3D1edE1c0CbC7ed08685D7CC4",
        VALIDATOR: "0x7Ecd57D7fF8b0c9A894c6282bB023980154732c5",
        FACTORY: "0x7A8917D50441c154A0eE545f02c6695C20fb92d7",
        SIMPLE_FACTORY: "0xFDCFd7EDf8f1A34Fe6DcADf27cF237bF26a3de8E"
      },
      fees: {
        platformFee: "1.0%",
        royaltyFee: "2.5%",
        maxFee: "10.0%",
        globalCompliant: true
      },
      features: {
        global: true,
        farcasterNative: true,
        baseOptimized: true,
        mobileFirst: true,
        gaslessTransactions: true,
        nftTickets: true,
        secondaryMarketplace: true,
        validationSystem: true
      }
    };

    // Guardar configuración global
    const globalConfigPath = './global-config.json';
    fs.writeFileSync(globalConfigPath, JSON.stringify(globalConfig, null, 2));
    console.log(`   📝 Configuración global guardada en: ${globalConfigPath}`);
    console.log("");

    console.log("🎉 CONVERSIÓN A APP GLOBAL COMPLETADA!");
    console.log("=" .repeat(60));
    console.log("✅ Frontend actualizado para mercado global");
    console.log("✅ Idioma cambiado a inglés");
    console.log("✅ Categorías globalizadas");
    console.log("✅ Características actualizadas");
    console.log("✅ Configuración optimizada para Base + Farcaster");
    console.log("");
    console.log("🌍 CARACTERÍSTICAS GLOBALES:");
    console.log("   🌐 Disponible mundialmente");
    console.log("   🔗 Nativo de Farcaster");
    console.log("   ⚡ Optimizado para Base");
    console.log("   📱 Mobile First");
    console.log("   💰 Comisiones competitivas (1%)");
    console.log("   🎫 Tickets NFT únicos");
    console.log("   🏪 Marketplace secundario");
    console.log("   🔍 Sistema de validación");
    console.log("");
    console.log("🚀 PRÓXIMOS PASOS:");
    console.log("   1. Desplegar frontend actualizado");
    console.log("   2. Configurar para Base App");
    console.log("   3. Integrar con Farcaster");
    console.log("   4. Probar en mercado global");
    console.log("");
    console.log("🔗 Enlaces del explorador:");
    Object.entries(contracts).forEach(([name, address]) => {
      console.log(`   ${name}: https://sepolia.basescan.org/address/${address}`);
    });

  } catch (error) {
    console.error("❌ Error durante la conversión:", error);
    console.error("📋 Detalles del error:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error fatal:", error);
    process.exit(1);
  });
