# 🚀 Guía de Instalación - TickBase Mini App

## 📋 Prerrequisitos

### Software Requerido
- **Node.js 18+** - [Descargar aquí](https://nodejs.org/)
- **npm 8+** - Viene incluido con Node.js
- **Git** - [Descargar aquí](https://git-scm.com/)

### Verificar Instalación
```bash
node --version  # Debe ser 18.0.0 o superior
npm --version   # Debe ser 8.0.0 o superior
git --version   # Cualquier versión reciente
```

## 🚀 Instalación Automática (Recomendado)

### Windows (PowerShell)
```powershell
# Ejecutar como administrador si es necesario
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Ejecutar el script de setup
.\scripts\setup.ps1
```

### macOS/Linux
```bash
# Hacer ejecutable el script
chmod +x scripts/setup.sh

# Ejecutar el script
./scripts/setup.sh
```

## 🛠️ Instalación Manual

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/TickBase.git
cd TickBase
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp env.example .env.local

# Editar con tus valores
# Windows
notepad .env.local

# macOS/Linux
nano .env.local
```

### 4. Crear Directorios Necesarios
```bash
# Windows (PowerShell)
New-Item -ItemType Directory -Path "public/images", "public/icons", "components/advanced", "components/social", "components/purchase", "lib", "contracts", "scripts" -Force

# macOS/Linux
mkdir -p public/images public/icons
mkdir -p components/advanced components/social components/purchase
mkdir -p lib contracts scripts
```

### 5. Verificar Instalación
```bash
# Verificar TypeScript
npm run type-check

# Verificar build
npm run build

# Iniciar servidor de desarrollo
npm run dev
```

## 🔧 Configuración de Variables de Entorno

### Archivo .env.local
```env
# Coinbase Developer Platform
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here

# Paymaster (para transacciones sin gas)
NEXT_PUBLIC_PAYMASTER_URL=https://api.developer.coinbase.com/rpc/v1/base/your-paymaster-key

# Contrato NFT
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# DeFi Contract
NEXT_PUBLIC_DEFI_CONTRACT_ADDRESS=0x...

# Red (8453 para Base mainnet, 84532 para Base Sepolia)
NEXT_PUBLIC_CHAIN_ID=84532

# AI Features
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_ENABLE_AI_RECOMMENDATIONS=true

# DeFi Features
NEXT_PUBLIC_ENABLE_STAKING=true
NEXT_PUBLIC_ENABLE_LIQUIDITY_POOLS=true
NEXT_PUBLIC_ENABLE_FLASH_LOANS=true

# Social Features
NEXT_PUBLIC_ENABLE_FARCASTER_INTEGRATION=true
NEXT_PUBLIC_ENABLE_SOCIAL_PROOF=true
NEXT_PUBLIC_ENABLE_GROUP_PURCHASES=true

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_SOCIAL_FEATURES=true
NEXT_PUBLIC_ENABLE_DYNAMIC_PRICING=true
NEXT_PUBLIC_ENABLE_ONE_CLICK_BUY=true

# Basescan API (para verificación de contratos)
BASESCAN_API_KEY=your_basescan_api_key

# Wallet Connect (opcional)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Development
NODE_ENV=development
NEXT_PUBLIC_DEBUG=true
```

## 🔑 Obtener API Keys

### 1. OnchainKit API Key
1. Ve a [Coinbase Developer Platform](https://portal.cdp.coinbase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Copia el API key y pégalo en `NEXT_PUBLIC_ONCHAINKIT_API_KEY`

### 2. Paymaster Key
1. En el mismo portal, ve a la sección "Paymasters"
2. Crea un nuevo paymaster para Base
3. Copia la URL completa y pégalo en `NEXT_PUBLIC_PAYMASTER_URL`

### 3. OpenAI API Key (para AI Features)
1. Ve a [OpenAI Platform](https://platform.openai.com)
2. Crea una cuenta o inicia sesión
3. Ve a API Keys
4. Crea una nueva API key
5. Copia la key y pégalo en `OPENAI_API_KEY`

### 4. Basescan API Key
1. Ve a [Basescan](https://basescan.org/apis)
2. Registra una cuenta
3. Genera un API key
4. Copia la key y pégalo en `BASESCAN_API_KEY`

## 🧪 Verificar Instalación

### 1. Verificar Dependencias
```bash
npm list --depth=0
```

### 2. Verificar TypeScript
```bash
npm run type-check
```

### 3. Verificar Build
```bash
npm run build
```

### 4. Iniciar Desarrollo
```bash
npm run dev
```

### 5. Abrir en Navegador
Visita [http://localhost:3000](http://localhost:3000)

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "TypeScript errors"
```bash
# Verificar configuración de TypeScript
npx tsc --noEmit

# Si hay errores, verificar tsconfig.json
```

### Error: "Build failed"
```bash
# Verificar variables de entorno
echo $NEXT_PUBLIC_ONCHAINKIT_API_KEY

# Verificar que todos los archivos existen
ls -la .env.local
```

### Error: "Port already in use"
```bash
# Cambiar puerto
npm run dev -- -p 3001

# O matar proceso en puerto 3000
npx kill-port 3000
```

## 📱 Testing en Dispositivos

### 1. Testing Local
```bash
# Obtener IP local
ipconfig getifaddr en0  # macOS
ipconfig               # Windows

# Acceder desde dispositivo móvil
http://TU_IP_LOCAL:3000
```

### 2. Testing en Coinbase Wallet
1. Instala Coinbase Wallet en tu dispositivo
2. Conecta a la misma red WiFi
3. Visita la URL de tu app
4. Prueba todas las funcionalidades

## 🚀 Deployment

### 1. Build de Producción
```bash
npm run build
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
1. Ve al dashboard de Vercel
2. Settings → Domains
3. Agrega tu dominio personalizado
4. Configura DNS según las instrucciones

## ✅ Checklist de Instalación

- [ ] Node.js 18+ instalado
- [ ] npm 8+ instalado
- [ ] Git instalado
- [ ] Repositorio clonado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Variables de entorno configuradas
- [ ] Directorios creados
- [ ] TypeScript sin errores
- [ ] Build exitoso
- [ ] Servidor de desarrollo funcionando
- [ ] App accesible en navegador
- [ ] Testing en Coinbase Wallet

## 🆘 Soporte

Si tienes problemas con la instalación:

1. **Revisa los logs de error** - Copia y pega el error completo
2. **Verifica las versiones** - Asegúrate de tener Node.js 18+
3. **Limpia la instalación** - Borra `node_modules` y reinstala
4. **Consulta la documentación** - [Base Docs](https://docs.base.org)
5. **Únete al Discord** - [Base Discord](https://discord.gg/base)

---

**¡Tu Base Mini App está lista para el desarrollo! 🎉**
