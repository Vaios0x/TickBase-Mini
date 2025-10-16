# 🎫 TickBase - Base Mini App

Marketplace de boletos NFT construido como una Base mini app, accesible a través de Coinbase Wallet y Farcaster.

![TickBase Banner](https://tickbase-miniapp.vercel.app/og-image.png)

## 🌟 Características

- ✅ **Compra y venta de boletos NFT** - Marketplace descentralizado en Base
- ✅ **Transacciones sin gas** - Usando Paymaster de Coinbase
- ✅ **Validación de boletos** - Sistema de verificación on-chain
- ✅ **Integración social** - Compartir en Farcaster y redes sociales
- ✅ **UI optimizada** - Diseñada para mini apps en Coinbase Wallet
- ✅ **Transferencias P2P** - Envía boletos a otros usuarios
- ✅ **Frames de Farcaster** - Comparte eventos en redes sociales
- ✅ **Notificaciones push** - Alertas sobre eventos y transacciones

## 🚀 Quick Start

### Opción 1: Setup Automático (Recomendado)

**En Windows (PowerShell):**
```powershell
.\scripts\setup.ps1
```

**En macOS/Linux:**
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Opción 2: Crear desde template

```bash
# Crear proyecto con MiniKit template
npx create-onchain --mini tickbase-miniapp
cd tickbase-miniapp

# Instalar dependencias adicionales
npm install lucide-react clsx tailwind-merge canvas-confetti zustand

# Copiar archivos del proyecto original
cp -r ../TicketSaferBase/ticketsafer-site/src/components ./components/legacy
```

### Opción 3: Migrar proyecto existente

```bash
# Clonar y navegar al proyecto
git clone https://github.com/Vaios0x/TickBase.git
cd TicketSaferBase

# Crear nueva branch para migración
git checkout -b miniapp-migration

# Instalar dependencias de MiniKit
cd ticketsafer-site
npm install @coinbase/onchainkit@latest @coinbase/minikit@latest
npm install wagmi viem @tanstack/react-query
npm install @headlessui/react lucide-react
```

## 📋 Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local`:

```env
# Coinbase Developer Platform
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here

# Paymaster (para transacciones sin gas)
NEXT_PUBLIC_PAYMASTER_URL=https://api.developer.coinbase.com/rpc/v1/base/your-paymaster-key

# Contrato NFT
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Dirección de tu contrato

# Red (8453 para Base mainnet, 84532 para Base Sepolia)
NEXT_PUBLIC_CHAIN_ID=84532

# Basescan API (para verificación de contratos)
BASESCAN_API_KEY=your_basescan_api_key

# Wallet Connect (opcional)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

### 2. Obtener API Keys

1. **OnchainKit API Key**:
   - Ve a [Coinbase Developer Platform](https://portal.cdp.coinbase.com)
   - Crea un nuevo proyecto
   - Copia el API key

2. **Paymaster Key**:
   - En el mismo portal, ve a "Paymasters"
   - Crea un nuevo paymaster para Base
   - Copia la URL con el key

3. **Basescan API Key**:
   - Ve a [Basescan](https://basescan.org/apis)
   - Registra una cuenta
   - Genera un API key

## 🛠️ Deployment del Contrato

### 1. Configurar Hardhat

```bash
# Instalar dependencias de Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts

# Inicializar Hardhat
npx hardhat init
```

### 2. Deploy en Base Sepolia (Testnet)

```bash
# Compilar contratos
npx hardhat compile

# Deploy en testnet
npx hardhat run scripts/deploy.js --network base-sepolia

# Verificar en Basescan
npx hardhat verify --network base-sepolia DEPLOYED_ADDRESS
```

### 3. Deploy en Base Mainnet

```bash
# Deploy en mainnet
npx hardhat run scripts/deploy.js --network base

# Verificar
npx hardhat verify --network base DEPLOYED_ADDRESS
```

## 🏗️ Estructura del Proyecto

```
tickbase-miniapp/
├── app/
│   ├── .well-known/
│   │   └── farcaster.json      # Manifest auto-generado
│   ├── api/
│   │   ├── frame/              # Frame endpoints
│   │   ├── tx/                 # Transaction endpoints
│   │   ├── og-image/           # Open Graph images
│   │   └── manifest/           # PWA manifest
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página principal
│   └── providers.tsx           # Providers de React
├── components/
│   ├── tickets/
│   │   ├── TicketList.tsx     # Lista de boletos
│   │   ├── TicketCard.tsx     # Tarjeta de boleto
│   │   ├── PurchaseModal.tsx  # Modal de compra
│   │   ├── ValidationScanner.tsx # Validador de boletos
│   │   └── TicketFilter.tsx   # Filtros de eventos
│   ├── ui/
│   │   ├── LoadingSpinner.tsx # Indicador de carga
│   │   ├── ErrorBoundary.tsx  # Manejo de errores
│   │   └── MiniAppWrapper.tsx # Wrapper para mini app
│   └── sections/
│       └── HeroSection.tsx    # Sección principal
├── hooks/
│   └── useTicketStore.ts      # Hook para manejo de tickets
├── lib/
│   ├── abi.ts                 # ABI del contrato
│   ├── constants.ts           # Constantes
│   └── utils.ts               # Utilidades
├── contracts/
│   └── TicketNFT.sol          # Contrato principal
├── public/
│   └── images/                # Imágenes
├── scripts/
│   └── deploy.js              # Script de deployment
├── test/
│   └── TicketNFT.test.js     # Tests del contrato
├── minikit.config.ts          # Configuración de MiniKit
├── hardhat.config.js          # Configuración de Hardhat
└── package.json
```

## 🚀 Deployment de la App

### 1. Build Local

```bash
# Development
npm run dev

# Build de producción
npm run build
npm run start
```

### 2. Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### 3. Configurar Dominio

En el dashboard de Vercel:
1. Ve a Settings → Domains
2. Agrega tu dominio personalizado
3. Configura DNS según las instrucciones

## 🔐 Asociación de Cuenta

### 1. Generar Credenciales

1. Ve a [base.dev/account-association](https://base.dev/account-association)
2. Ingresa tu dominio: `your-app.vercel.app`
3. Haz clic en "Generate"
4. Sigue las instrucciones para firmar con tu cuenta de Farcaster

### 2. Actualizar Configuración

```typescript
// minikit.config.ts
export const minikitConfig = defineConfig({
  accountAssociation: {
    header: "eyJ...", // Pega el header generado
    payload: "eyJ...", // Pega el payload
    signature: "0x..." // Pega la signature
  },
  // ... resto de la configuración
})
```

### 3. Verificar

Ve a [base.dev/preview](https://base.dev/preview) y verifica que:
- ✅ El manifest se carga correctamente
- ✅ La asociación de cuenta es válida
- ✅ Los frames funcionan
- ✅ La app se abre correctamente

## 📱 Testing en Coinbase Wallet

### 1. Instalar Coinbase Wallet

- [iOS](https://apps.apple.com/app/coinbase-wallet/id1278383455)
- [Android](https://play.google.com/store/apps/details?id=org.toshi)

### 2. Acceder a tu Mini App

1. Abre Coinbase Wallet
2. Ve a la sección "Apps"
3. Busca tu app o usa el URL directo
4. Prueba todas las funcionalidades

### 3. Debug Tools

```javascript
// Agregar logs para debugging
if (process.env.NODE_ENV === 'development') {
  console.log('MiniKit Context:', context)
  console.log('Safe Area Insets:', safeAreaInsets)
  console.log('User FID:', context?.client?.clientFid)
}
```

## 📊 Analytics

### Configurar Analytics

```typescript
// lib/analytics.ts
import { useMiniKit } from '@coinbase/minikit'

export function trackEvent(eventName: string, properties?: any) {
  const { context } = useMiniKit()
  
  // Enviar a tu servicio de analytics
  analytics.track(eventName, {
    ...properties,
    clientFid: context?.client?.clientFid,
    platform: 'miniapp',
    timestamp: Date.now()
  })
}
```

### Eventos Importantes

```typescript
// Trackear eventos clave
trackEvent('ticket_purchased', {
  eventId: ticket.id,
  price: ticket.price,
  quantity: quantity
})

trackEvent('ticket_validated', {
  tokenId: tokenId,
  eventId: eventId
})
```

## 🎨 Personalización

### Temas y Colores

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#0052FF',    // Base blue
        secondary: '#1E40AF',  // Dark blue
        accent: '#10B981',     // Green
        background: '#0A0B0D', // Dark background
      }
    }
  }
}
```

### Componentes Custom

```tsx
// components/ui/GlassCard.tsx
export function GlassCard({ children, className = '' }) {
  return (
    <div className={`
      bg-white/10 backdrop-blur-lg 
      border border-white/20 
      rounded-xl p-6
      ${className}
    `}>
      {children}
    </div>
  )
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

// Verificar balance de Paymaster en CDP
```

#### 3. "Invalid signature"
```bash
# Regenerar credenciales de asociación
# Ve a base.dev/account-association
```

#### 4. "CORS errors"
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
}
```

## 📈 Próximos Pasos

### Características Futuras

- [ ] Sistema de reventa P2P
- [ ] Subastas de boletos
- [ ] Programa de lealtad con puntos
- [ ] Integración con eventos de Eventbrite
- [ ] QR codes dinámicos
- [ ] Notificaciones push
- [ ] Historial de asistencia como POAPs

### Optimizaciones

- [ ] Implementar caché con Redis
- [ ] Optimizar imágenes con Next.js Image
- [ ] Lazy loading de componentes
- [ ] PWA support
- [ ] Offline mode con service workers

## 📚 Recursos

### Documentación

- [MiniKit Docs](https://docs.base.org/minikit)
- [OnchainKit](https://onchainkit.xyz)
- [Base Documentation](https://docs.base.org)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)

### Ejemplos

- [MiniKit Examples](https://github.com/coinbase/minikit-examples)
- [OnchainKit Templates](https://github.com/coinbase/onchainkit-templates)
- [Base App Examples](https://github.com/base-org/base-app-examples)

### Comunidad

- [Base Discord](https://discord.gg/base)
- [Base Builders Telegram](https://t.me/basebuilders)
- [Twitter/X](https://twitter.com/base)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [Base](https://base.org) por la infraestructura L2
- [Coinbase](https://coinbase.com) por OnchainKit y MiniKit
- [OpenZeppelin](https://openzeppelin.com) por los contratos seguros
- La comunidad de builders de Base

---

## Scripts de Utilidad

### setup.sh
```bash
#!/bin/bash

# Script de configuración inicial
echo "🚀 Configurando TickBase Mini App..."

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Crear archivo .env.local
echo "🔑 Creando archivo de configuración..."
cat > .env.local << EOL
NEXT_PUBLIC_ONCHAINKIT_API_KEY=
NEXT_PUBLIC_PAYMASTER_URL=
NEXT_PUBLIC_CONTRACT_ADDRESS=
NEXT_PUBLIC_CHAIN_ID=84532
BASESCAN_API_KEY=
EOL

echo "✅ Configuración inicial completa!"
echo "📝 Por favor, agrega tus API keys en .env.local"
```

### deploy.sh
```bash
#!/bin/bash

# Script de deployment
echo "🚀 Deploying TickBase..."

# Build
echo "🔨 Building application..."
npm run build

# Deploy to Vercel
echo "☁️ Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
```

### test.sh
```bash
#!/bin/bash

# Script de testing
echo "🧪 Running tests..."

# Contract tests
echo "📝 Testing smart contracts..."
npx hardhat test

# Component tests
echo "🎨 Testing components..."
npm run test

# E2E tests
echo "🔍 Running E2E tests..."
npm run test:e2e

echo "✅ All tests passed!"
```

---

**Built with ❤️ for the Base ecosystem**