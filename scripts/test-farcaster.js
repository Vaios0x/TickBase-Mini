#!/usr/bin/env node

/**
 * Script para probar la integración de Farcaster
 * Ejecutar con: node scripts/test-farcaster.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Farcaster Integration...\n');

// Verificar archivos requeridos
const requiredFiles = [
  'public/.well-known/farcaster.json',
  'components/FarcasterSDK.tsx',
  'components/FarcasterDebug.tsx',
  'app/layout.tsx'
];

console.log('📁 Checking required files:');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing!');
  process.exit(1);
}

console.log('\n✅ All required files found!');

// Verificar contenido del archivo farcaster.json
console.log('\n📋 Checking farcaster.json content:');
let configValid = true;

try {
  const farcasterConfig = JSON.parse(fs.readFileSync('public/.well-known/farcaster.json', 'utf8'));
  
  const requiredFields = [
    'accountAssociation',
    'miniapp.name',
    'miniapp.homeUrl',
    'miniapp.iconUrl',
    'miniapp.webhookUrl'
  ];
  
  requiredFields.forEach(field => {
    const keys = field.split('.');
    let value = farcasterConfig;
    for (const key of keys) {
      value = value?.[key];
    }
    
    if (value) {
      console.log(`  ✅ ${field}: ${value}`);
    } else {
      console.log(`  ❌ ${field}: Missing`);
      configValid = false;
    }
  });
  
  if (configValid) {
    console.log('\n✅ Farcaster configuration is valid!');
  } else {
    console.log('\n❌ Farcaster configuration has issues!');
  }
  
} catch (error) {
  console.log(`\n❌ Error reading farcaster.json: ${error.message}`);
  configValid = false;
}

// Verificar URLs accesibles
console.log('\n🌐 Testing URL accessibility:');

const testUrls = [
  'https://tickbase-miniapp.vercel.app/',
  'https://tickbase-miniapp.vercel.app/icon.png',
  'https://tickbase-miniapp.vercel.app/api/og-image',
  'https://tickbase-miniapp.vercel.app/api/webhook'
];

const testUrl = (url) => {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 5000 }, (res) => {
      resolve({ url, status: res.statusCode, success: res.statusCode < 400 });
    });
    
    req.on('error', () => {
      resolve({ url, status: 'ERROR', success: false });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ url, status: 'TIMEOUT', success: false });
    });
  });
};

(async () => {
  const results = await Promise.all(testUrls.map(testUrl));
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`  ${status} ${result.url} (${result.status})`);
  });
  
  const allUrlsWork = results.every(r => r.success);
  
  if (allUrlsWork) {
    console.log('\n✅ All URLs are accessible!');
  } else {
    console.log('\n⚠️ Some URLs are not accessible. This might affect Farcaster integration.');
  }
  
  console.log('\n🎯 Integration Test Summary:');
  console.log(`  Files: ${allFilesExist ? '✅' : '❌'}`);
  console.log(`  Config: ${configValid ? '✅' : '❌'}`);
  console.log(`  URLs: ${allUrlsWork ? '✅' : '⚠️'}`);
  
  if (allFilesExist && configValid) {
    console.log('\n🚀 Farcaster integration is ready!');
    console.log('\n📱 Next steps:');
    console.log('  1. Deploy to Vercel: vercel --prod');
    console.log('  2. Test in Farcaster app');
    console.log('  3. Check debug panel in development');
  } else {
    console.log('\n❌ Farcaster integration needs fixes!');
  }
})();
