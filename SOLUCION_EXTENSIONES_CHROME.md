# Solución para Errores de Extensiones de Chrome

## Problema
Error: "The source http://localhost:3001/ has not been authorized yet"

Este error ocurre cuando extensiones de Chrome (como wallets de criptomonedas) intentan acceder a tu aplicación local pero no tienen permisos.

## Soluciones Implementadas

### 1. Cambio de Puerto
- Cambiado el puerto de desarrollo de 3001 a 3000
- Script `dev:extensions` para manejo mejorado de extensiones

### 2. Configuración de Headers
- Headers de seguridad mejorados en `next.config.js`
- Middleware para manejo de CORS en desarrollo
- Headers específicos para extensiones

### 3. Scripts de Desarrollo
```bash
# Desarrollo normal
npm run dev

# Desarrollo con soporte para extensiones
npm run dev:extensions
```

## Soluciones Manuales

### Autorizar Extensión en Chrome
1. Abre `chrome://extensions/`
2. Busca la extensión problemática (MetaMask, Coinbase Wallet, etc.)
3. Habilita "Permitir acceso a archivos locales"
4. Reinicia la extensión

### Configuración de Extensión
Si usas MetaMask o Coinbase Wallet:
1. Ve a configuración de la extensión
2. Busca "Permitir acceso a archivos locales"
3. Actívala
4. Reinicia el navegador

### Alternativas
1. **Usar modo incógnito**: Las extensiones tienen menos restricciones
2. **Deshabilitar extensiones temporalmente**: Para desarrollo sin wallets
3. **Usar puerto diferente**: Cambiar a 3000, 3002, etc.

## Verificación
1. Ejecuta `npm run dev:extensions`
2. Abre `http://localhost:3000`
3. Verifica que no aparezcan errores de extensión
4. Prueba la funcionalidad de wallet

## Notas
- El error es específico de desarrollo local
- No afecta la aplicación en producción
- Es común con wallets de criptomonedas
- Las soluciones implementadas son compatibles con Base Mini App
