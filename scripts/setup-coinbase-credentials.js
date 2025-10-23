#!/usr/bin/env node

/**
 * Script para configurar las credenciales de Coinbase API en Vercel
 * Ejecuta: node scripts/setup-coinbase-credentials.js
 */

const { execSync } = require('child_process');

console.log('🔐 Configurando credenciales de Coinbase API...\n');

// Credenciales de Coinbase API
const credentials = {
  'NEXT_PUBLIC_ONCHAINKIT_API_KEY': '7ca121ac-73cb-4540-9ea4-24730cf60e6e',
  'COINBASE_API_ID': '7ca121ac-73cb-4540-9ea4-24730cf60e6e',
  'COINBASE_API_SECRET': 'YoQyOkUbn5jd4xuuo2C9HzOUAaivv0cqVH/akHSXXJxJV1oPpESdOTY1TqKBRMDjCac6p+tTPWd1QiO4iKizcQ==',
  'NEXT_PUBLIC_PAYMASTER_URL': 'https://api.developer.coinbase.com/rpc/v1/base/7ca121ac-73cb-4540-9ea4-24730cf60e6e',
  'NEXT_PUBLIC_BASE_URL': 'https://tickbase-miniapp.vercel.app'
};

// Smart Contract Addresses (desde deployment-config.json)
const contracts = {
  'NEXT_PUBLIC_CONTRACT_ADDRESS': '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7',
  'NEXT_PUBLIC_MARKETPLACE_ADDRESS': '0xbd31a954BadFe27D4f8fD1E6bcA445A69e60B5Dd',
  'NEXT_PUBLIC_FACTORY_ADDRESS': '0x7cAb028594fd5900680cB6328E34498e3610940b',
  'NEXT_PUBLIC_VALIDATOR_ADDRESS': '0xB1627A905EB21938009f5fA97C9dd35ffB9F1e82'
};

// Network Configuration
const network = {
  'NEXT_PUBLIC_CHAIN_ID': '84532',
  'NEXT_PUBLIC_BASE_RPC_URL': 'https://sepolia.base.org',
  'NEXT_PUBLIC_BASE_EXPLORER': 'https://sepolia.basescan.org'
};

// Feature Flags
const features = {
  'NEXT_PUBLIC_ENABLE_FARCASTER_INTEGRATION': 'true',
  'NEXT_PUBLIC_ENABLE_AI_RECOMMENDATIONS': 'true',
  'NEXT_PUBLIC_ENABLE_ONE_CLICK_BUY': 'true',
  'NEXT_PUBLIC_ENABLE_SOCIAL_FEATURES': 'true',
  'NEXT_PUBLIC_ENABLE_NOTIFICATIONS': 'true'
};

// Combinar todas las variables
const allVars = { ...credentials, ...contracts, ...network, ...features };

console.log('📋 Variables de entorno a configurar:');
Object.keys(allVars).forEach(key => {
  console.log(`  ${key}=${allVars[key]}`);
});

console.log('\n🚀 Configurando en Vercel...\n');

try {
  // Configurar cada variable en Vercel
  Object.entries(allVars).forEach(([key, value]) => {
    console.log(`Configurando ${key}...`);
    execSync(`vercel env add ${key} ${value}`, { stdio: 'inherit' });
  });

  console.log('\n✅ ¡Credenciales configuradas exitosamente!');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Redesplegar la aplicación: npm run deploy');
  console.log('2. Verificar en Base App: https://www.base.dev/preview?url=https://tickbase-miniapp.vercel.app');
  console.log('3. Autorizar URLs en Base.dev si es necesario');

} catch (error) {
  console.error('\n❌ Error configurando credenciales:', error.message);
  console.log('\n🔧 Solución manual:');
  console.log('1. Ve a https://vercel.com/vai0sxs-projects/tickbase-miniapp/settings/environment-variables');
  console.log('2. Agrega las variables manualmente');
  console.log('3. Redesplega la aplicación');
}
