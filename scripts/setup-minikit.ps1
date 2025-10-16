# Script de setup automático para TickBase MiniKit
# Basado en el tutorial de YouTube: https://www.youtube.com/watch?v=juZxqgMx5rE&t=319s

Write-Host "🚀 Configurando TickBase MiniKit..." -ForegroundColor Green

# Verificar Node.js
Write-Host "📦 Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js no está instalado. Por favor instala Node.js 18+ desde https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js $nodeVersion detectado" -ForegroundColor Green

# Verificar npm
Write-Host "📦 Verificando npm..." -ForegroundColor Yellow
$npmVersion = npm --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm no está disponible" -ForegroundColor Red
    exit 1
}
Write-Host "✅ npm $npmVersion detectado" -ForegroundColor Green

# Instalar dependencias
Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error instalando dependencias" -ForegroundColor Red
    exit 1
}

# Instalar dependencias específicas de MiniKit
Write-Host "📦 Instalando dependencias de MiniKit..." -ForegroundColor Yellow
npm install @coinbase/minikit@latest @coinbase/agentkit@latest

# Crear archivo .env.local si no existe
if (!(Test-Path ".env.local")) {
    Write-Host "📝 Creando archivo .env.local..." -ForegroundColor Yellow
    Copy-Item "env.example" ".env.local"
    Write-Host "✅ Archivo .env.local creado. Por favor configura tus API keys." -ForegroundColor Green
}

# Verificar configuración
Write-Host "🔍 Verificando configuración..." -ForegroundColor Yellow

# Verificar archivos de configuración
$configFiles = @(
    "minikit.config.ts",
    "next.config.js",
    "tailwind.config.js",
    "tsconfig.json",
    "package.json"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file encontrado" -ForegroundColor Green
    } else {
        Write-Host "❌ $file no encontrado" -ForegroundColor Red
    }
}

# Compilar proyecto
Write-Host "🔨 Compilando proyecto..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error compilando proyecto" -ForegroundColor Red
    Write-Host "💡 Ejecuta 'npm run dev' para ver errores detallados" -ForegroundColor Yellow
} else {
    Write-Host "✅ Proyecto compilado exitosamente" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 ¡Setup completado!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Configura tus API keys en .env.local" -ForegroundColor White
Write-Host "2. Obtén tu OnchainKit API key en: https://portal.cdp.coinbase.com/products/onchainkit" -ForegroundColor White
Write-Host "3. Configura tu Paymaster URL" -ForegroundColor White
Write-Host "4. Ejecuta 'npm run dev' para iniciar el servidor de desarrollo" -ForegroundColor White
Write-Host "5. Visita http://localhost:3000 para ver tu Mini App" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Enlaces útiles:" -ForegroundColor Cyan
Write-Host "• Base Developer Portal: https://base.dev" -ForegroundColor White
Write-Host "• OnchainKit Docs: https://docs.base.org/onchainkit" -ForegroundColor White
Write-Host "• MiniKit Docs: https://docs.base.org/minikit" -ForegroundColor White
Write-Host "• Tutorial YouTube: https://www.youtube.com/watch?v=juZxqgMx5rE&t=319s" -ForegroundColor White
Write-Host ""
Write-Host "🚀 ¡Tu TickBase Mini App está lista!" -ForegroundColor Green
