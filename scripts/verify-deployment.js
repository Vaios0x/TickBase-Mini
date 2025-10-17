#!/usr/bin/env node

/**
 * Script para verificar el despliegue y recursos
 * Ejecutar con: node scripts/verify-deployment.js
 */

const https = require('https');

console.log('🔍 Verificando despliegue y recursos...\n');

const baseUrl = 'https://tickbase-miniapp.vercel.app';

const checkResource = (url) => {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 10000 }, (res) => {
      resolve({ 
        url, 
        status: res.statusCode, 
        success: res.statusCode === 200,
        contentType: res.headers['content-type']
      });
    });
    
    req.on('error', (error) => {
      resolve({ url, status: 'ERROR', success: false, error: error.message });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ url, status: 'TIMEOUT', success: false });
    });
  });
};

const resourcesToCheck = [
  `${baseUrl}/`,
  `${baseUrl}/icon.png`,
  `${baseUrl}/icon-192x192.png`,
  `${baseUrl}/icon-512x512.png`,
  `${baseUrl}/manifest.json`,
  `${baseUrl}/.well-known/farcaster.json`
];

(async () => {
  console.log('📋 Verificando recursos:');
  
  const results = await Promise.all(resourcesToCheck.map(checkResource));
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    const details = result.success ? 
      `${result.status} (${result.contentType})` : 
      `${result.status}${result.error ? ` - ${result.error}` : ''}`;
    
    console.log(`  ${status} ${result.url} (${details})`);
  });
  
  const allSuccess = results.every(r => r.success);
  
  console.log('\n📊 Resumen:');
  if (allSuccess) {
    console.log('✅ Todos los recursos están disponibles');
    console.log('✅ El despliegue está funcionando correctamente');
  } else {
    console.log('❌ Algunos recursos no están disponibles');
    console.log('💡 Posibles soluciones:');
    console.log('  1. Esperar unos minutos para propagación de DNS');
    console.log('  2. Verificar que el despliegue se completó');
    console.log('  3. Revisar logs de Vercel');
    console.log('  4. Redesplegar si es necesario');
  }
  
  console.log('\n🔧 Comandos útiles:');
  console.log('• Ver logs: vercel logs');
  console.log('• Redesplegar: vercel --prod');
  console.log('• Verificar build local: npm run build');
})();
