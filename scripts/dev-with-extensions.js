#!/usr/bin/env node

/**
 * Script de desarrollo que maneja mejor las extensiones de Chrome
 * y configura el entorno para desarrollo local
 */

const { spawn } = require('child_process');
const path = require('path');

// Configuración para desarrollo con extensiones
process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';
process.env.NEXT_PUBLIC_DEV_MODE = 'true';
process.env.NEXT_PUBLIC_ALLOW_EXTENSIONS = 'true';

console.log('🚀 Iniciando servidor de desarrollo con soporte para extensiones...');
console.log('📱 URL: http://localhost:3000');
console.log('🔧 Modo desarrollo: Activado');
console.log('🔌 Soporte para extensiones: Activado');

// Iniciar el servidor de Next.js
const nextDev = spawn('npx', ['next', 'dev', '-p', '3000'], {
  stdio: 'inherit',
  shell: true,
  cwd: path.resolve(__dirname, '..')
});

nextDev.on('error', (error) => {
  console.error('❌ Error al iniciar el servidor:', error);
  process.exit(1);
});

nextDev.on('close', (code) => {
  console.log(`🛑 Servidor cerrado con código: ${code}`);
  process.exit(code);
});

// Manejar señales de terminación
process.on('SIGINT', () => {
  console.log('\n🛑 Cerrando servidor...');
  nextDev.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Cerrando servidor...');
  nextDev.kill('SIGTERM');
});
