#!/usr/bin/env node

/**
 * Script para generar screenshots para el manifiesto de Base App
 */

const fs = require('fs');
const path = require('path');

// Crear directorio de imágenes si no existe
const imagesDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Crear archivos placeholder para screenshots
const screenshots = [
  {
    name: 'screenshot1.png',
    description: 'Pantalla principal con lista de eventos'
  },
  {
    name: 'screenshot2.png', 
    description: 'Modal de compra de tickets'
  },
  {
    name: 'screenshot3.png',
    description: 'Scanner de validación de tickets'
  }
];

console.log('📸 Generando placeholders para screenshots...');

screenshots.forEach((screenshot, index) => {
  const filePath = path.join(imagesDir, screenshot.name);
  
  // Crear un SVG placeholder para cada screenshot
  const svgContent = `
<svg width="1284" height="2778" viewBox="0 0 1284 2778" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1284" height="2778" fill="url(#bg)"/>
  <text x="642" y="1389" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#00d4aa" text-anchor="middle">
    🎫 TickBase Screenshot ${index + 1}
  </text>
  <text x="642" y="1450" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" text-anchor="middle">
    ${screenshot.description}
  </text>
  <text x="642" y="1500" font-family="Arial, sans-serif" font-size="18" fill="#888888" text-anchor="middle">
    Base Mini App - NFT Ticket Marketplace
  </text>
</svg>`;

  fs.writeFileSync(filePath.replace('.png', '.svg'), svgContent);
  console.log(`✅ Creado: ${screenshot.name.replace('.png', '.svg')}`);
});

console.log('📱 Screenshots generados correctamente');
console.log('💡 Nota: Reemplaza estos placeholders con screenshots reales de tu app');
