# 🚀 Guía de Migración: TickBase → Base Mini App

## 📋 Resumen de Cambios

Tu proyecto TickBase ha sido completamente transformado en una Base Mini App con las siguientes mejoras:

### ✅ Nuevas Características Implementadas

1. **Base Mini App Framework**
   - Integración completa con MiniKit SDK
   - Soporte para Coinbase Wallet y Farcaster
   - Transacciones gasless con Base Paymaster

2. **UI/UX Optimizada**
   - Diseño mobile-first para mini apps
   - Glass morphism y animaciones suaves
   - Safe area insets para dispositivos móviles

3. **Funcionalidades Sociales**
   - Frames de Farcaster para compartir eventos
   - Integración con grafo social
   - Notificaciones push

4. **Transacciones Avanzadas**
   - Transacciones gasless automáticas
   - Validación de tickets on-chain
   - Transferencias P2P de tickets

## 🛠️ Pasos para Completar la Migración

### 1. Instalar Dependencias

```bash
# Instalar nuevas dependencias
npm install @coinbase/minikit@latest @coinbase/onchainkit@latest
npm install wagmi viem @tanstack/react-query
npm install lucide-react clsx tailwind-merge canvas-confetti zustand
npm install @tailwindcss/forms @tailwindcss/typography

# Dependencias de desarrollo
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` con:

```env
# Base Mini App Configuration
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
NEXT_PUBLIC_PAYMASTER_URL=https://api.developer.coinbase.com/rpc/v1/base/your-paymaster-key
NEXT_PUBLIC_BASE_URL=https://tickbase-miniapp.vercel.app

# Smart Contract Addresses
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MARKETPLACE_ADDRESS=0x...
NEXT_PUBLIC_FACTORY_ADDRESS=0x...

# Network Configuration
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_EXPLORER=https://basescan.org

# API Keys
BASESCAN_API_KEY=your_basescan_api_key
```

### 3. Obtener API Keys

#### OnchainKit API Key
1. Ve a [Coinbase Developer Platform](https://portal.cdp.coinbase.com)
2. Crea un nuevo proyecto
3. Copia el API key

#### Paymaster Key
1. En el mismo portal, ve a "Paymasters"
2. Crea un nuevo paymaster para Base
3. Copia la URL con el key

#### Basescan API Key
1. Ve a [Basescan](https://basescan.org/apis)
2. Registra una cuenta
3. Genera un API key

### 4. Deploy Contratos

```bash
# Compilar contratos
npx hardhat compile

# Deploy en Base Sepolia (testnet)
npx hardhat run scripts/deploy.js --network base-sepolia

# Deploy en Base Mainnet
npx hardhat run scripts/deploy.js --network base
```

### 5. Deploy la App

```bash
# Deploy en Vercel
vercel --prod

# O usar el dashboard de Vercel
# 1. Conecta tu repositorio
# 2. Configura las variables de entorno
# 3. Deploy automático
```

### 6. Asociar Cuenta con Farcaster

1. Ve a [base.dev/account-association](https://base.dev/account-association)
2. Ingresa tu dominio de Vercel
3. Sigue las instrucciones para firmar con tu cuenta de Farcaster
4. Actualiza `minikit.config.ts` con las credenciales generadas

### 7. Verificar en Base Preview

1. Ve a [base.dev/preview](https://base.dev/preview)
2. Ingresa la URL de tu app
3. Verifica que:
   - ✅ El manifest se carga correctamente
   - ✅ La asociación de cuenta es válida
   - ✅ Los frames funcionan
   - ✅ La app se abre correctamente

## 🎯 Nuevas Funcionalidades

### 1. Transacciones Gasless

```typescript
// Las transacciones ahora son automáticamente gasless
const { data, write } = useContractWrite({
  address: CONTRACT_ADDRESS,
  abi: TICKET_ABI,
  functionName: 'mintTickets',
  args: [eventId, quantity],
  value: parseEther(price),
  // Paymaster se aplica automáticamente
})
```

### 2. Frames de Farcaster

```typescript
// Los usuarios pueden compartir eventos en Farcaster
const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Comprar Ticket',
      action: 'tx',
      target: '/api/tx/purchase'
    }
  ],
  image: '/og-image.png',
  postUrl: '/api/frame'
})
```

### 3. Notificaciones Push

```typescript
// Enviar notificaciones a usuarios
const sendNotification = useSendNotification()

await sendNotification({
  title: "¡Ticket Comprado!",
  body: "Tu boleto NFT está listo",
  targetUrl: `/my-tickets`
})
```

### 4. Validación de Tickets

```typescript
// Validar tickets on-chain
const { data: isValid } = useContractRead({
  address: CONTRACT_ADDRESS,
  abi: TICKET_ABI,
  functionName: 'validateTicket',
  args: [tokenId]
})
```

## 📱 Testing

### 1. En Coinbase Wallet

1. Instala Coinbase Wallet
2. Abre la app
3. Ve a "Apps" → Busca tu mini app
4. Prueba todas las funcionalidades

### 2. En Farcaster

1. Abre Farcaster
2. Busca tu frame
3. Prueba las interacciones
4. Verifica que las transacciones funcionen

### 3. Debug Tools

```javascript
// Agregar logs para debugging
if (process.env.NODE_ENV === 'development') {
  console.log('MiniKit Context:', context)
  console.log('Safe Area Insets:', safeAreaInsets)
  console.log('User FID:', context?.client?.clientFid)
}
```

## 🐛 Troubleshooting

### Problemas Comunes

#### 1. "Manifest not found"
```bash
# Verificar que el manifest existe
curl https://your-app.com/.well-known/farcaster.json

# Regenerar manifest
npm run build
```

#### 2. "Transaction failed"
```javascript
// Verificar configuración de Paymaster
console.log('Paymaster URL:', process.env.NEXT_PUBLIC_PAYMASTER_URL)
```

#### 3. "Invalid signature"
```bash
# Regenerar credenciales de asociación
# Ve a base.dev/account-association
```

## 📚 Recursos Adicionales

- [MiniKit Docs](https://docs.base.org/minikit)
- [OnchainKit Docs](https://onchainkit.xyz)
- [Base Developer Portal](https://docs.base.org)
- [Discord de Base](https://discord.gg/base)

## ✅ Checklist de Migración

- [ ] Instalar dependencias de MiniKit y OnchainKit
- [ ] Configurar variables de entorno
- [ ] Obtener API keys de Coinbase Developer Platform
- [ ] Deploy contratos en Base
- [ ] Deploy app en Vercel
- [ ] Asociar cuenta con Farcaster
- [ ] Verificar en Base Preview
- [ ] Probar en Coinbase Wallet
- [ ] Probar frames en Farcaster
- [ ] Configurar analytics y monitoreo

## 🎉 ¡Felicitaciones!

Tu aplicación TickBase ahora está lista para funcionar como una Base Mini App, accesible para millones de usuarios a través de Coinbase Wallet y Farcaster sin necesidad de instalación.

### Próximos Pasos

1. **Marketing**: Comparte tu mini app en redes sociales
2. **Comunidad**: Únete al Discord de Base para soporte
3. **Iteración**: Recopila feedback y mejora la app
4. **Escalamiento**: Considera funcionalidades adicionales como DeFi

¡Tu proyecto está listo para el futuro del Web3! 🚀
