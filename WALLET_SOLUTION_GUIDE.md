
# 🔧 SOLUCIÓN PARA WALLET NO SE ABRE

## 🎯 Problema Identificado
El wallet no se abre automáticamente cuando intentas comprar tickets.

## 🔍 Causas Posibles

### 1. Wallet no conectado
- **Síntoma**: Botón de compra no funciona
- **Solución**: Conectar wallet primero

### 2. Red incorrecta
- **Síntoma**: Error de red
- **Solución**: Cambiar a Base Sepolia (Chain ID: 84532)

### 3. Permisos del navegador
- **Síntoma**: Wallet no se abre
- **Solución**: Permitir pop-ups para el sitio

### 4. Wallet no instalado
- **Síntoma**: No hay opciones de wallet
- **Solución**: Instalar MetaMask o Coinbase Wallet

### 5. Configuración de wagmi
- **Síntoma**: Error en consola
- **Solución**: Verificar configuración

## 🛠️ Soluciones Paso a Paso

### Paso 1: Verificar Wallet
1. Abrir: http://localhost:3000/wallet-test
2. Hacer clic en "Conectar Wallet"
3. Seleccionar MetaMask o Coinbase Wallet
4. Aprobar conexión

### Paso 2: Verificar Red
1. En el wallet, cambiar a Base Sepolia
2. Chain ID: 84532
3. RPC URL: https://sepolia.base.org
4. Explorer: https://sepolia.basescan.org

### Paso 3: Probar Transacción
1. Hacer clic en "Probar Apertura de Wallet"
2. El wallet debería abrirse automáticamente
3. Firmar la transacción
4. Verificar resultado

### Paso 4: Verificar Permisos
1. Permitir pop-ups para localhost:3000
2. Desactivar bloqueadores de anuncios
3. Verificar configuración de seguridad

## 🚨 Errores Comunes

### Error: "User rejected the request"
- **Causa**: Usuario canceló en el wallet
- **Solución**: No cancelar, firmar la transacción

### Error: "Insufficient funds"
- **Causa**: No hay ETH suficiente
- **Solución**: Obtener ETH de testnet

### Error: "Network mismatch"
- **Causa**: Wallet en red incorrecta
- **Solución**: Cambiar a Base Sepolia

### Error: "Contract not found"
- **Causa**: Dirección incorrecta
- **Solución**: Verificar direcciones en constants.ts

## 📞 Soporte Adicional

Si el problema persiste:
1. Revisar consola del navegador (F12)
2. Verificar logs de wagmi
3. Probar con diferentes wallets
4. Verificar configuración de red
