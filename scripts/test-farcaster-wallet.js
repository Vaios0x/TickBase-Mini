#!/usr/bin/env node

/**
 * Script para probar la integración de wallet en Farcaster
 * Ejecuta: node scripts/test-farcaster-wallet.js
 */

const https = require('https');
const http = require('http');

console.log('🧪 Probando integración de wallet en Farcaster...\n');

// URLs para probar
const urls = [
  'https://tickbase-miniapp.vercel.app',
  'https://farcaster.xyz/miniapps/7VjH79RncHtF/tickbase'
];

async function testUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const status = res.statusCode;
        const isWorking = status >= 200 && status < 300;
        
        console.log(`📡 ${url}`);
        console.log(`   Status: ${status} ${isWorking ? '✅' : '❌'}`);
        
        if (isWorking) {
          // Verificar si contiene elementos de wallet
          const hasWalletElements = data.includes('wallet') || 
                                  data.includes('connect') ||
                                  data.includes('SmartWalletConnector') ||
                                  data.includes('FarcasterWalletConnector');
          
          console.log(`   Wallet Elements: ${hasWalletElements ? '✅' : '❌'}`);
          
          // Verificar si contiene SDK de Farcaster
          const hasFarcasterSDK = data.includes('@farcaster/miniapp-sdk') ||
                                 data.includes('farcaster') ||
                                 data.includes('FarcasterSDK');
          
          console.log(`   Farcaster SDK: ${hasFarcasterSDK ? '✅' : '❌'}`);
        }
        
        console.log('');
        resolve({ url, status, isWorking });
      });
    }).on('error', (err) => {
      console.log(`📡 ${url}`);
      console.log(`   Error: ${err.message} ❌`);
      console.log('');
      resolve({ url, status: 0, isWorking: false });
    });
  });
}

async function runTests() {
  console.log('🚀 Iniciando pruebas...\n');
  
  const results = [];
  
  for (const url of urls) {
    const result = await testUrl(url);
    results.push(result);
  }
  
  console.log('📊 Resumen de resultados:');
  console.log('========================');
  
  const workingUrls = results.filter(r => r.isWorking);
  const brokenUrls = results.filter(r => !r.isWorking);
  
  console.log(`✅ URLs funcionando: ${workingUrls.length}`);
  console.log(`❌ URLs con problemas: ${brokenUrls.length}`);
  
  if (workingUrls.length > 0) {
    console.log('\n🎯 URLs funcionando:');
    workingUrls.forEach(r => console.log(`   - ${r.url}`));
  }
  
  if (brokenUrls.length > 0) {
    console.log('\n⚠️ URLs con problemas:');
    brokenUrls.forEach(r => console.log(`   - ${r.url} (Status: ${r.status})`));
  }
  
  console.log('\n💡 Próximos pasos:');
  console.log('1. Verificar que la aplicación esté desplegada');
  console.log('2. Probar en Farcaster: https://farcaster.xyz/miniapps/7VjH79RncHtF/tickbase');
  console.log('3. Verificar que el SDK de Farcaster esté funcionando');
  console.log('4. Probar conexión de wallet en diferentes entornos');
  
  console.log('\n🔧 Para debug:');
  console.log('- Abrir DevTools en Farcaster');
  console.log('- Verificar logs de consola');
  console.log('- Comprobar que SmartWalletConnector detecte Farcaster');
  console.log('- Verificar que FarcasterWalletConnector funcione');
}

runTests().catch(console.error);
