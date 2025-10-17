#!/usr/bin/env node

/**
 * Script para verificar headers de iframe
 * Ejecutar con: node scripts/verify-headers.js
 */

const https = require('https');

console.log('🔍 Verificando Headers de Iframe\n');

const testUrl = 'https://tickbase-miniapp.vercel.app';

const checkHeaders = (url) => {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 10000 }, (res) => {
      const headers = res.headers;
      
      console.log('📋 Headers encontrados:');
      console.log(`  X-Frame-Options: ${headers['x-frame-options'] || 'No encontrado'}`);
      console.log(`  Content-Security-Policy: ${headers['content-security-policy'] || 'No encontrado'}`);
      console.log(`  Access-Control-Allow-Origin: ${headers['access-control-allow-origin'] || 'No encontrado'}`);
      
      const xFrameOptions = headers['x-frame-options'];
      const csp = headers['content-security-policy'];
      
      let status = '❌';
      if (xFrameOptions === 'ALLOWALL' || csp?.includes('frame-ancestors *')) {
        status = '✅';
      }
      
      console.log(`\n${status} Estado de configuración de iframe:`);
      
      if (xFrameOptions === 'ALLOWALL') {
        console.log('  ✅ X-Frame-Options configurado correctamente');
      } else if (csp?.includes('frame-ancestors *')) {
        console.log('  ✅ Content-Security-Policy permite iframe');
      } else {
        console.log('  ❌ Configuración de iframe no encontrada');
        console.log('  💡 Debería ser: X-Frame-Options: ALLOWALL');
      }
      
      resolve({
        xFrameOptions,
        csp,
        success: xFrameOptions === 'ALLOWALL' || csp?.includes('frame-ancestors *')
      });
    });
    
    req.on('error', (error) => {
      console.log(`❌ Error verificando headers: ${error.message}`);
      resolve({ success: false, error: error.message });
    });
    
    req.on('timeout', () => {
      console.log('⏰ Timeout verificando headers');
      req.destroy();
      resolve({ success: false, error: 'Timeout' });
    });
  });
};

(async () => {
  console.log(`🌐 Verificando: ${testUrl}\n`);
  
  const result = await checkHeaders(testUrl);
  
  console.log('\n📊 Resumen:');
  if (result.success) {
    console.log('✅ Headers configurados correctamente para Base Build');
    console.log('✅ La aplicación debería cargar en iframe sin problemas');
  } else {
    console.log('❌ Headers no configurados correctamente');
    console.log('💡 Verificar que el despliegue se haya completado');
    console.log('💡 Esperar unos minutos para que los cambios se propaguen');
  }
  
  console.log('\n🔧 Si persiste el problema:');
  console.log('1. Esperar 2-3 minutos para propagación de DNS');
  console.log('2. Limpiar caché del navegador');
  console.log('3. Verificar en modo incógnito');
  console.log('4. Contactar soporte de Vercel si es necesario');
})();
