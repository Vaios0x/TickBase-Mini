#!/usr/bin/env node

/**
 * Script para autorizar URLs en Base Build
 * Ejecutar con: node scripts/authorize-base-build.js
 */

const https = require('https');
const fs = require('fs');

console.log('🔐 Base Build Authorization Helper\n');

// URLs que necesitan autorización
const urlsToAuthorize = [
  'https://tickbase-miniapp.vercel.app',
  'https://www.base.dev/preview?url=https://tickbase-miniapp.vercel.app',
  'https://base.dev/preview?url=https://tickbase-miniapp.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

console.log('📋 URLs que necesitan autorización:');
urlsToAuthorize.forEach((url, index) => {
  console.log(`  ${index + 1}. ${url}`);
});

console.log('\n🔧 Pasos para autorizar en Base Build:');
console.log('1. Ve a https://www.base.dev');
console.log('2. Inicia sesión con tu wallet');
console.log('3. Ve a "My Apps" o "Developer Dashboard"');
console.log('4. Busca "TickBase" en tus aplicaciones');
console.log('5. Haz clic en "Settings" o "Configuration"');
console.log('6. En la sección "Allowed URLs" o "Authorized Domains":');
console.log('   - Agrega: https://tickbase-miniapp.vercel.app');
console.log('   - Agrega: https://www.base.dev/preview?url=https://tickbase-miniapp.vercel.app');
console.log('   - Agrega: http://localhost:3000 (para desarrollo local)');
console.log('7. Guarda los cambios');

console.log('\n🌐 Verificando configuración actual...');

// Verificar si el archivo farcaster.json tiene las URLs configuradas
try {
  const farcasterConfig = JSON.parse(fs.readFileSync('public/.well-known/farcaster.json', 'utf8'));
  
  if (farcasterConfig.baseBuilder && farcasterConfig.baseBuilder.allowedUrls) {
    console.log('✅ URLs configuradas en farcaster.json:');
    farcasterConfig.baseBuilder.allowedUrls.forEach((url, index) => {
      console.log(`  ${index + 1}. ${url}`);
    });
  } else {
    console.log('⚠️ No se encontraron allowedUrls en la configuración');
  }
  
} catch (error) {
  console.log(`❌ Error leyendo farcaster.json: ${error.message}`);
}

console.log('\n📱 Alternativas si la autorización no funciona:');
console.log('1. Usar el dominio directo: https://tickbase-miniapp.vercel.app');
console.log('2. Desarrollar localmente: http://localhost:3000');
console.log('3. Usar el modo de desarrollo de Base Build');
console.log('4. Contactar soporte de Base si persiste el problema');

console.log('\n🔍 Para verificar si está autorizado:');
console.log('1. Abre la consola del navegador en Base Build');
console.log('2. Busca errores de autorización');
console.log('3. Verifica que no aparezca "has not been authorized yet"');

console.log('\n✅ Una vez autorizado, la app debería funcionar sin errores de autorización.');
