#!/usr/bin/env node

/**
 * Script para verificar que TickBase esté listo para Base App
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando integración con Base App...\n');

// Verificar archivos necesarios
const filesToCheck = [
  'public/.well-known/farcaster.json',
  'app/api/og-image/route.ts',
  'app/api/webhook/route.ts',
  'public/images/screenshot1.svg',
  'public/images/screenshot2.svg',
  'public/images/screenshot3.svg'
];

let allFilesExist = true;

filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - FALTANTE`);
    allFilesExist = false;
  }
});

// Verificar manifiesto
const manifestPath = path.join(__dirname, '..', 'public', '.well-known', 'farcaster.json');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    console.log('\n📋 Verificando manifiesto:');
    
    // Campos requeridos
    const requiredFields = [
      'miniapp.version',
      'miniapp.name', 
      'miniapp.homeUrl',
      'miniapp.iconUrl',
      'miniapp.splashImageUrl',
      'miniapp.splashBackgroundColor',
      'miniapp.primaryCategory',
      'miniapp.tags'
    ];
    
    let manifestValid = true;
    
    requiredFields.forEach(field => {
      const keys = field.split('.');
      let value = manifest;
      for (const key of keys) {
        value = value?.[key];
      }
      
      if (value !== undefined && value !== '') {
        console.log(`✅ ${field}: ${value}`);
      } else {
        console.log(`❌ ${field}: FALTANTE`);
        manifestValid = false;
      }
    });
    
    // Verificar accountAssociation
    if (manifest.accountAssociation?.header && 
        manifest.accountAssociation?.payload && 
        manifest.accountAssociation?.signature) {
      console.log('✅ accountAssociation: CONFIGURADO');
    } else {
      console.log('⚠️  accountAssociation: PENDIENTE (completar en Base Build)');
    }
    
    if (manifestValid) {
      console.log('\n✅ Manifiesto válido');
    } else {
      console.log('\n❌ Manifiesto tiene campos faltantes');
    }
    
  } catch (error) {
    console.log(`❌ Error leyendo manifiesto: ${error.message}`);
    allFilesExist = false;
  }
}

// Resumen
console.log('\n📊 RESUMEN:');
if (allFilesExist) {
  console.log('✅ Todos los archivos necesarios están presentes');
  console.log('✅ TickBase está listo para Base App');
  console.log('\n🚀 Próximos pasos:');
  console.log('1. Despliega: vercel --prod');
  console.log('2. Verifica: https://tickbase-miniapp.vercel.app/.well-known/farcaster.json');
  console.log('3. Asocia cuenta: https://build.base.org/');
  console.log('4. Preview: https://www.base.dev/preview?url=https://tickbase-miniapp.vercel.app/');
} else {
  console.log('❌ Faltan archivos necesarios');
  console.log('🔧 Ejecuta: node scripts/generate-screenshots.js');
}
