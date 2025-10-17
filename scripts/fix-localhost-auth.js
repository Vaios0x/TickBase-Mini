#!/usr/bin/env node

/**
 * Script para solucionar errores de autorización en localhost
 * Ejecutar con: node scripts/fix-localhost-auth.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 SOLUCIONANDO ERROR DE AUTORIZACIÓN EN LOCALHOST');
console.log('=' .repeat(50));
console.log('');

// Verificar si estamos en desarrollo
const isLocalhost = process.env.NODE_ENV === 'development' || 
                   process.argv.includes('--localhost') ||
                   process.argv.includes('--dev');

console.log('🔍 Detectando entorno...');
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
console.log(`   Localhost mode: ${isLocalhost ? '✅ Activado' : '❌ Desactivado'}`);
console.log('');

if (!isLocalhost) {
  console.log('⚠️ Este script está diseñado para desarrollo local');
  console.log('💡 Para producción, usa: node scripts/authorize-base-build.js');
  console.log('');
  process.exit(0);
}

console.log('📋 SOLUCIONES PARA LOCALHOST:');
console.log('');

console.log('1️⃣ MÉTODO RÁPIDO - Modo desarrollo:');
console.log('   • El error de autorización es normal en localhost');
console.log('   • La app funcionará sin el SDK de Farcaster');
console.log('   • Todas las funciones básicas están disponibles');
console.log('');

console.log('2️⃣ MÉTODO COMPLETO - Autorizar localhost:');
console.log('   • Ve a https://www.base.dev');
console.log('   • Inicia sesión con tu wallet');
console.log('   • Ve a "My Apps" → "TickBase" → "Settings"');
console.log('   • Agrega estas URLs a "Allowed URLs":');
console.log('     - http://localhost:3000');
console.log('     - http://127.0.0.1:3000');
console.log('   • Guarda los cambios');
console.log('');

console.log('3️⃣ MÉTODO ALTERNATIVO - Variables de entorno:');
console.log('   • Crea un archivo .env.local con:');
console.log('     DISABLE_FARCASTER_SDK=true');
console.log('   • Esto deshabilitará completamente el SDK');
console.log('');

// Crear archivo .env.local si no existe
const envLocalPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envLocalPath)) {
  console.log('📝 Creando archivo .env.local para desarrollo...');
  const envContent = `# Configuración para desarrollo local
# Deshabilitar SDK de Farcaster en localhost
DISABLE_FARCASTER_SDK=true

# Configuración de desarrollo
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development
`;
  
  fs.writeFileSync(envLocalPath, envContent);
  console.log('✅ Archivo .env.local creado');
  console.log('');
}

console.log('🚀 PRÓXIMOS PASOS:');
console.log('1. Reinicia el servidor de desarrollo: npm run dev');
console.log('2. El error de autorización debería desaparecer');
console.log('3. La app funcionará en modo desarrollo');
console.log('');

console.log('🔍 VERIFICACIÓN:');
console.log('• Abre http://localhost:3000');
console.log('• Revisa la consola del navegador');
console.log('• No deberías ver errores de autorización');
console.log('• La app debería cargar normalmente');
console.log('');

console.log('📱 PARA PRODUCCIÓN:');
console.log('• Usa: node scripts/authorize-base-build.js');
console.log('• Autoriza las URLs de producción');
console.log('• Despliega en Vercel o similar');
console.log('');

console.log('✅ ¡Listo! El error de autorización en localhost está solucionado.');
