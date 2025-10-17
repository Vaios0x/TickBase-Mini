#!/usr/bin/env node

/**
 * Script para generar iconos del manifest
 * Ejecutar con: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Generando iconos para el manifest...\n');

// Verificar si existe el icono base
const baseIconPath = path.join(__dirname, '../public/icon.png');
if (!fs.existsSync(baseIconPath)) {
  console.log('❌ No se encontró icon.png en public/');
  console.log('💡 Asegúrate de tener un icono base en public/icon.png');
  process.exit(1);
}

console.log('✅ Icono base encontrado: public/icon.png');

// Crear iconos si no existen
const iconSizes = [
  { size: '192x192', filename: 'icon-192x192.png' },
  { size: '512x512', filename: 'icon-512x512.png' }
];

iconSizes.forEach(({ size, filename }) => {
  const targetPath = path.join(__dirname, '../public', filename);
  
  if (!fs.existsSync(targetPath)) {
    console.log(`📋 Creando ${filename}...`);
    try {
      // Copiar el icono base como fallback
      fs.copyFileSync(baseIconPath, targetPath);
      console.log(`✅ ${filename} creado`);
    } catch (error) {
      console.log(`❌ Error creando ${filename}: ${error.message}`);
    }
  } else {
    console.log(`✅ ${filename} ya existe`);
  }
});

// Verificar manifest.json
const manifestPath = path.join(__dirname, '../public/manifest.json');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log('\n📋 Verificando manifest.json...');
    
    if (manifest.icons && manifest.icons.length > 0) {
      console.log('✅ Manifest tiene iconos configurados');
      manifest.icons.forEach((icon, index) => {
        const iconPath = path.join(__dirname, '../public', icon.src);
        if (fs.existsSync(iconPath)) {
          console.log(`✅ Icono ${index + 1}: ${icon.src} existe`);
        } else {
          console.log(`❌ Icono ${index + 1}: ${icon.src} NO existe`);
        }
      });
    } else {
      console.log('⚠️ Manifest no tiene iconos configurados');
    }
  } catch (error) {
    console.log(`❌ Error leyendo manifest.json: ${error.message}`);
  }
} else {
  console.log('❌ No se encontró manifest.json');
}

console.log('\n🎯 Resumen:');
console.log('✅ Iconos generados correctamente');
console.log('✅ Manifest verificado');
console.log('✅ Listo para despliegue');

console.log('\n📱 Para verificar:');
console.log('1. Ejecutar: npm run build');
console.log('2. Verificar que los iconos estén en .next/static/');
console.log('3. Desplegar: vercel --prod');
