
# SOLUCIONES COMUNES PARA PROBLEMAS DE WALLET

## 🔧 Problema: Wallet no se abre automáticamente

### Solución 1: Verificar configuración de red
- Asegúrate de que tu wallet esté configurado para Base Sepolia
- Chain ID: 84532
- RPC URL: https://sepolia.base.org
- Explorer: https://sepolia.basescan.org

### Solución 2: Verificar conectores
- MetaMask: Asegúrate de que esté instalado y desbloqueado
- Coinbase Wallet: Asegúrate de que esté instalado y desbloqueado
- WalletConnect: Verifica que tengas un Project ID válido

### Solución 3: Verificar permisos
- Asegúrate de que el sitio tenga permisos para abrir el wallet
- Revisa la configuración de pop-ups en tu navegador
- Desactiva bloqueadores de anuncios temporalmente

### Solución 4: Verificar configuración de wagmi
- Asegúrate de que useContractWrite esté configurado correctamente
- Verifica que las direcciones de contratos sean correctas
- Revisa que el ABI sea válido

## 🚨 Errores Comunes

### Error: "User rejected the request"
- El usuario canceló la transacción en el wallet
- Solución: Intentar de nuevo y no cancelar

### Error: "Insufficient funds"
- No hay suficiente ETH para la transacción
- Solución: Obtener ETH de testnet

### Error: "Network mismatch"
- El wallet está en una red diferente
- Solución: Cambiar a Base Sepolia en el wallet

### Error: "Contract not found"
- La dirección del contrato es incorrecta
- Solución: Verificar direcciones en constants.ts

## 🔍 Pasos de Diagnóstico

1. Abrir: http://localhost:3000/diagnostic
2. Ejecutar diagnóstico completo
3. Verificar resultados
4. Aplicar soluciones según los errores encontrados
5. Probar transacción de nuevo

## 📞 Soporte

Si el problema persiste:
1. Revisar logs de la consola del navegador
2. Verificar configuración de red en el wallet
3. Probar con diferentes wallets (MetaMask, Coinbase)
4. Verificar que los contratos estén desplegados correctamente
