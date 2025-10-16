#!/usr/bin/env node

/**
 * Script para desplegar TickBase a Base App
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Desplegando TickBase a Base App...');

// Verificar que el manifiesto existe
const manifestPath = path.join(__dirname, '..', 'public', '.well-known', 'farcaster.json');
if (!fs.existsSync(manifestPath)) {
  console.error('❌ Error: No se encontró el archivo farcaster.json');
  process.exit(1);
}

// Leer el manifiesto
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log('📋 Manifiesto encontrado:');
console.log(`   Nombre: ${manifest.miniapp.name}`);
console.log(`   URL: ${manifest.miniapp.homeUrl}`);
console.log(`   Categoría: ${manifest.miniapp.primaryCategory}`);
console.log(`   Tags: ${manifest.miniapp.tags.join(', ')}`);

console.log('\n📝 Pasos para completar la integración:');
console.log('1. Despliega tu app a Vercel:');
console.log('   vercel --prod');
console.log('');
console.log('2. Verifica que el manifiesto esté accesible:');
console.log('   https://tickbase-miniapp.vercel.app/.well-known/farcaster.json');
console.log('');
console.log('3. Ve a Base Build Account association tool:');
console.log('   https://build.base.org/');
console.log('');
console.log('4. Pega tu dominio en el campo "App URL":');
console.log('   https://tickbase-miniapp.vercel.app/');
console.log('');
console.log('5. Haz clic en "Submit" y luego en "Verify"');
console.log('');
console.log('6. Firma el manifiesto con tu wallet para generar los campos accountAssociation');
console.log('');
console.log('7. Copia los campos generados y pégalos en tu archivo farcaster.json');
console.log('');
console.log('8. Redespliega tu app con los campos accountAssociation actualizados');

console.log('\n✅ Configuración lista para Base App!');
console.log('🔗 URL de preview: https://www.base.dev/preview?url=https://tickbase-miniapp.vercel.app/');
