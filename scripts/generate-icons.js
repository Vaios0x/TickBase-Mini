#!/usr/bin/env node

/**
 * Script para generar iconos válidos para PWA
 * Ejecutar con: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Generando iconos para PWA...\n');

// Crear un icono SVG simple y válido
const createSVGIcon = (size) => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0052FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00D4AA;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size/8}" fill="url(#grad)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size/4}" font-weight="bold" text-anchor="middle" dy=".3em" fill="white">🎫</text>
</svg>`;
};

// Crear iconos en diferentes tamaños
const sizes = [192, 512];

sizes.forEach(size => {
  const svgContent = createSVGIcon(size);
  const filename = `public/icon-${size}x${size}.svg`;
  
  try {
    fs.writeFileSync(filename, svgContent);
    console.log(`✅ Creado: ${filename}`);
  } catch (error) {
    console.log(`❌ Error creando ${filename}: ${error.message}`);
  }
});

// Crear un icono principal
const mainIcon = createSVGIcon(512);
const mainIconPath = 'public/icon.svg';

try {
  fs.writeFileSync(mainIconPath, mainIcon);
  console.log(`✅ Creado: ${mainIconPath}`);
} catch (error) {
  console.log(`❌ Error creando ${mainIconPath}: ${error.message}`);
}

// Actualizar manifest.json para usar SVG
const manifestPath = 'public/manifest.json';
try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  
  manifest.icons = [
    {
      "src": "/icon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any"
    },
    {
      "src": "/icon-192x192.svg",
      "sizes": "192x192",
      "type": "image/svg+xml",
      "purpose": "any"
    },
    {
      "src": "/icon-512x512.svg",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "any"
    }
  ];
  
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✅ Manifest actualizado con iconos SVG');
  
} catch (error) {
  console.log(`❌ Error actualizando manifest: ${error.message}`);
}

console.log('\n🎯 Iconos generados exitosamente!');
console.log('📱 Los iconos SVG son compatibles con PWA');
console.log('🔧 Reinicia el servidor de desarrollo para ver los cambios');
