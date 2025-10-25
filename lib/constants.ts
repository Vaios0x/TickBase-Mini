export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '84532')
export const IS_TESTNET = CHAIN_ID === 84532

export const TICKET_CATEGORIES = [
  'Todos',
  'Conciertos',
  'Deportes',
  'Teatro',
  'Festivales',
  'Conferencias',
] as const

export const SORT_OPTIONS = [
  { value: 'date', label: 'Fecha' },
  { value: 'price', label: 'Precio' },
  { value: 'name', label: 'Nombre' },
  { value: 'popularity', label: 'Popularidad' },
] as const

export const MOCK_TICKETS = [
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
  },
  {
    id: 2,
    name: "Partido de Fútbol - Final",
    date: "2025-06-20",
    price: "0.03",
    venue: "Estadio Nacional",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=600&fit=crop",
    category: "Deportes",
    available: 250,
    description: "Gran final del campeonato nacional de fútbol"
  },
  {
    id: 3,
    name: "Concierto de Jazz",
    date: "2025-05-10",
    price: "0.04",
    venue: "Teatro Municipal",
    image: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786?w=800&h=600&fit=crop",
    category: "Conciertos",
    available: 75,
    description: "Una noche inolvidable de jazz clásico con los mejores músicos"
  },
  {
    id: 4,
    name: "Conferencia de Blockchain",
    date: "2025-04-25",
    price: "0.02",
    venue: "Centro de Convenciones",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    category: "Conferencias",
    available: 200,
    description: "El futuro de la tecnología blockchain y Web3"
  },
  {
    id: 5,
    name: "Obra de Teatro: Hamlet",
    date: "2025-03-18",
    price: "0.035",
    venue: "Teatro Nacional",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    category: "Teatro",
    available: 120,
    description: "La clásica obra de Shakespeare en una producción moderna"
  },
  {
    id: 6,
    name: "Festival de Música Electrónica",
    date: "2025-08-30",
    price: "0.08",
    venue: "Playa del Sol",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    category: "Festivales",
    available: 500,
    description: "El festival de música electrónica más grande del año"
  }
]

export const CONTRACT_ADDRESSES = {
  TICKET_NFT: "0xE81fd4523284561382FEd2C694b0BAb0881C148D" as `0x${string}`,
  MARKETPLACE: "0xff85e8A49d4623C3D1edE1c0CbC7ed08685D7CC4" as `0x${string}`,
  FACTORY: "0x7A8917D50441c154A0eE545f02c6695C20fb92d7" as `0x${string}`,
  VALIDATOR: "0x7Ecd57D7fF8b0c9A894c6282bB023980154732c5" as `0x${string}`,
  SIMPLE_FACTORY: "0xFDCFd7EDf8f1A34Fe6DcADf27cF237bF26a3de8E" as `0x${string}`,
} as const

export const RPC_URLS = {
  BASE_MAINNET: 'https://mainnet.base.org',
  BASE_SEPOLIA: 'https://sepolia.base.org',
} as const

export const EXPLORER_URLS = {
  BASE_MAINNET: 'https://basescan.org',
  BASE_SEPOLIA: 'https://sepolia.basescan.org',
} as const

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/TickBaseApp',
  DISCORD: 'https://discord.gg/tickbase',
  TELEGRAM: 'https://t.me/tickbase',
  GITHUB: 'https://github.com/tickbase',
} as const

export const FEATURES = [
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
] as const

export const STATS = {
  TOTAL_USERS: 10000,
  TOTAL_EVENTS: 500,
  TOTAL_VOLUME: 1000000,
  FRAUD_RATE: 0,
} as const

export const PRICING = {
  PLATFORM_FEE: 1.0, // 1.0%
  MIN_TICKET_PRICE: 0.001, // 0.001 ETH
  MAX_TICKET_PRICE: 10, // 10 ETH
} as const

export const VALIDATION_RULES = {
  MIN_EVENT_DATE_DAYS: 1, // Mínimo 1 día de anticipación
  MAX_EVENT_DATE_DAYS: 365, // Máximo 1 año de anticipación
  MAX_TICKETS_PER_USER: 10,
  MAX_TICKETS_PER_EVENT: 10000,
} as const

export const NOTIFICATION_TYPES = {
  TICKET_PURCHASED: 'ticket_purchased',
  TICKET_TRANSFERRED: 'ticket_transferred',
  EVENT_REMINDER: 'event_reminder',
  PRICE_DROP: 'price_drop',
  NEW_EVENT: 'new_event',
} as const

export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Por favor conecta tu wallet para continuar',
  INSUFFICIENT_FUNDS: 'Fondos insuficientes para completar la transacción',
  TRANSACTION_FAILED: 'La transacción falló. Por favor intenta de nuevo',
  NETWORK_ERROR: 'Error de red. Verifica tu conexión',
  INVALID_ADDRESS: 'Dirección de wallet inválida',
  EVENT_NOT_FOUND: 'Evento no encontrado',
  TICKET_NOT_AVAILABLE: 'No hay tickets disponibles para este evento',
  INVALID_QUANTITY: 'Cantidad inválida de tickets',
} as const

export const SUCCESS_MESSAGES = {
  TICKET_PURCHASED: '¡Ticket comprado exitosamente!',
  TICKET_TRANSFERRED: 'Ticket transferido exitosamente',
  WALLET_CONNECTED: 'Wallet conectado exitosamente',
  TRANSACTION_CONFIRMED: 'Transacción confirmada',
} as const
