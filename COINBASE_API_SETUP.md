# 🔐 Configuración de Credenciales Coinbase API

## ✅ Credenciales Configuradas

### **API ID**: `7ca121ac-73cb-4540-9ea4-24730cf60e6e`
### **API Secret**: `YoQyOkUbn5jd4xuuo2C9HzOUAaivv0cqVH/akHSXXJxJV1oPpESdOTY1TqKBRMDjCac6p+tTPWd1QiO4iKizcQ==`

## 🚀 Configuración Automática

### **Opción 1: Script Automático**
```bash
npm run setup:coinbase
```

### **Opción 2: Configuración Manual en Vercel**
1. Ve a [Vercel Dashboard](https://vercel.com/vai0sxs-projects/tickbase-miniapp/settings/environment-variables)
2. Agrega las siguientes variables:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=7ca121ac-73cb-4540-9ea4-24730cf60e6e
COINBASE_API_ID=7ca121ac-73cb-4540-9ea4-24730cf60e6e
COINBASE_API_SECRET=YoQyOkUbn5jd4xuuo2C9HzOUAaivv0cqVH/akHSXXJxJV1oPpESdOTY1TqKBRMDjCac6p+tTPWd1QiO4iKizcQ==
NEXT_PUBLIC_PAYMASTER_URL=https://api.developer.coinbase.com/rpc/v1/base/7ca121ac-73cb-4540-9ea4-24730cf60e6e
NEXT_PUBLIC_BASE_URL=https://tickbase-miniapp.vercel.app
```

## 🎯 Beneficios de las Credenciales

### **1. Integración Completa con Base App**
- ✅ Autenticación automática
- ✅ Acceso a Base ecosystem
- ✅ Integración con Base wallet

### **2. Transacciones Gasless**
- ✅ Paymaster habilitado
- ✅ Transacciones sin gas fees
- ✅ Mejor UX para usuarios

### **3. OnChainKit Integration**
- ✅ SDK oficial de Coinbase
- ✅ Componentes pre-construidos
- ✅ Mejor compatibilidad

## 📋 Variables Configuradas

### **Credenciales Core**
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: API Key para OnChainKit
- `COINBASE_API_ID`: ID de la aplicación Coinbase
- `COINBASE_API_SECRET`: Secret para autenticación
- `NEXT_PUBLIC_PAYMASTER_URL`: URL del paymaster para gasless

### **Smart Contracts**
- `NEXT_PUBLIC_CONTRACT_ADDRESS`: 0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7
- `NEXT_PUBLIC_MARKETPLACE_ADDRESS`: 0xbd31a954BadFe27D4f8fD1E6bcA445A69e60B5Dd
- `NEXT_PUBLIC_FACTORY_ADDRESS`: 0x7cAb028594fd5900680cB6328E34498e3610940b
- `NEXT_PUBLIC_VALIDATOR_ADDRESS`: 0xB1627A905EB21938009f5fA97C9dd35ffB9F1e82

### **Network Configuration**
- `NEXT_PUBLIC_CHAIN_ID`: 84532 (Base Sepolia)
- `NEXT_PUBLIC_BASE_RPC_URL`: https://sepolia.base.org
- `NEXT_PUBLIC_BASE_EXPLORER`: https://sepolia.basescan.org

## 🔄 Próximos Pasos

### **1. Configurar Variables**
```bash
npm run setup:coinbase
```

### **2. Redesplegar**
```bash
npm run deploy
```

### **3. Verificar en Base App**
- **URL**: https://www.base.dev/preview?url=https://tickbase-miniapp.vercel.app
- **Autorizar**: Si es necesario, autorizar URLs en Base.dev

### **4. Probar Funcionalidades**
- ✅ Conectar wallet
- ✅ Comprar tickets (gasless)
- ✅ Verificar transacciones
- ✅ Probar DeFi features

## 🛠️ Solución de Problemas

### **Error: "API Key not found"**
- Verificar que las variables estén configuradas en Vercel
- Redesplegar la aplicación

### **Error: "Paymaster not working"**
- Verificar `NEXT_PUBLIC_PAYMASTER_URL`
- Confirmar que la API key sea válida

### **Error: "Base App not loading"**
- Autorizar URLs en Base.dev
- Verificar headers CORS

## 📊 Estado de Integración

- ✅ **Coinbase API**: Configurada
- ✅ **OnChainKit**: Integrado
- ✅ **Paymaster**: Habilitado
- ✅ **Base App**: Listo para autorización
- ✅ **Smart Contracts**: Desplegados
- ✅ **PWA**: Funcionando

## 🎉 Resultado Final

Con estas credenciales, tu miniapp **TickBase** tendrá:

1. **Integración completa con Base App**
2. **Transacciones gasless**
3. **Mejor UX y compatibilidad**
4. **Acceso a Base ecosystem**
5. **Funcionalidades DeFi avanzadas**

¡Tu miniapp está lista para ser la mejor experiencia de tickets NFT en Base! 🚀
