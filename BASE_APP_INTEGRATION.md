# Integración con Base App

## 🎯 Objetivo
Integrar TickBase como Mini App en Base App usando el protocolo Farcaster.

## 📋 Estado Actual
- ✅ App desplegada en Vercel: https://tickbase-miniapp.vercel.app/
- ✅ Manifiesto Farcaster creado: `public/.well-known/farcaster.json`
- ✅ Endpoints necesarios configurados
- ✅ Screenshots generados
- ⏳ Pendiente: Asociación de cuenta y firma del manifiesto

## 🔧 Configuración Implementada

### Manifiesto Farcaster
```json
{
  "miniapp": {
    "version": "1",
    "name": "TickBase",
    "homeUrl": "https://tickbase-miniapp.vercel.app/",
    "primaryCategory": "finance",
    "tags": ["tickets", "nft", "marketplace", "defi", "ai"]
  }
}
```

### Endpoints Configurados
- `/api/og-image` - Imagen Open Graph para compartir
- `/api/webhook` - Webhook para notificaciones
- `/.well-known/farcaster.json` - Manifiesto de la app

## 🚀 Pasos para Completar la Integración

### 1. Desplegar a Vercel
```bash
vercel --prod
```

### 2. Verificar Manifiesto
Visita: https://tickbase-miniapp.vercel.app/.well-known/farcaster.json

### 3. Asociar Cuenta en Base Build
1. Ve a [Base Build](https://build.base.org/)
2. Pega tu URL: `https://tickbase-miniapp.vercel.app/`
3. Haz clic en "Submit" y luego "Verify"
4. Firma con tu wallet para generar `accountAssociation`

### 4. Actualizar Manifiesto
Copia los campos generados:
- `header`
- `payload` 
- `signature`

Y pégalos en tu archivo `farcaster.json`

### 5. Redesplegar
```bash
vercel --prod
```

## 🔗 URLs Importantes

- **Preview Base App**: https://www.base.dev/preview?url=https://tickbase-miniapp.vercel.app/
- **Documentación**: https://docs.base.org/mini-apps/core-concepts/manifest
- **Base Build**: https://build.base.org/

## 📱 Características de la Mini App

### Categorización
- **Categoría**: Finance
- **Tags**: tickets, nft, marketplace, defi, ai
- **Descripción**: Compra y vende boletos NFT con AI discovery, DeFi features y validación blockchain

### Funcionalidades
- ✅ AI-Powered Event Discovery
- ✅ Social Features con Farcaster
- ✅ DeFi Integration (Staking, Liquidity)
- ✅ One-Click Purchase Gasless
- ✅ Dynamic Pricing Engine
- ✅ Base Mini App Framework

## 🎨 Assets Generados

### Imágenes
- **Icon**: `/icon.png` (1024x1024)
- **Splash**: `/images/grid-pattern.svg`
- **Hero**: `/api/og-image` (1200x630)
- **Screenshots**: `/images/screenshot1-3.svg`

### Colores
- **Background**: #000000
- **Primary**: #00d4aa (Base green)
- **Text**: #ffffff

## 🔍 Verificación

### Checklist Pre-Despliegue
- [ ] Manifiesto accesible en `/.well-known/farcaster.json`
- [ ] Todas las imágenes cargan correctamente
- [ ] Webhook endpoint responde
- [ ] App funciona en móvil
- [ ] Conexión de wallet funcional

### Checklist Post-Despliegue
- [ ] Preview funciona en Base App
- [ ] Account association completada
- [ ] Manifiesto firmado y actualizado
- [ ] App aparece en Base App discovery
- [ ] Notificaciones funcionan

## 🐛 Troubleshooting

### Error: "Manifest not found"
- Verifica que `/.well-known/farcaster.json` sea accesible
- Revisa headers CORS en `next.config.js`

### Error: "Invalid manifest"
- Valida JSON en https://jsonlint.com/
- Verifica que todos los campos requeridos estén presentes

### Error: "Account association failed"
- Asegúrate de usar la misma wallet en Base Build
- Verifica que la firma sea válida

## 📞 Soporte

Para problemas específicos de Base App:
- [Base Documentation](https://docs.base.org/)
- [Base Discord](https://discord.gg/buildonbase)
- [Base Build Support](https://build.base.org/support)
