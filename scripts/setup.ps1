# 🚀 TickBase Mini App Setup Script (PowerShell)
# Este script configura el proyecto completo con todas las dependencias

Write-Host "🎫 Configurando TickBase Mini App..." -ForegroundColor Cyan

# Verificar que Node.js esté instalado
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js $nodeVersion detectado" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado. Por favor instala Node.js 18+ primero." -ForegroundColor Red
    exit 1
}

# Verificar versión de Node.js
$version = [int](node -v).Substring(1).Split('.')[0]
if ($version -lt 18) {
    Write-Host "❌ Se requiere Node.js 18 o superior. Versión actual: $(node -v)" -ForegroundColor Red
    exit 1
}

# Instalar dependencias
Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    exit 1
}

# Crear archivo .env.local si no existe
if (!(Test-Path ".env.local")) {
    Write-Host "📝 Creando archivo .env.local..." -ForegroundColor Yellow
    Copy-Item "env.example" ".env.local"
    Write-Host "✅ Archivo .env.local creado. Por favor configura las variables de entorno." -ForegroundColor Green
} else {
    Write-Host "✅ Archivo .env.local ya existe" -ForegroundColor Green
}

# Verificar TypeScript
Write-Host "🔍 Verificando TypeScript..." -ForegroundColor Yellow
npx tsc --noEmit

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ TypeScript configurado correctamente" -ForegroundColor Green
} else {
    Write-Host "⚠️  Advertencias de TypeScript encontradas (esto es normal en desarrollo)" -ForegroundColor Yellow
}

# Crear directorios necesarios
Write-Host "📁 Creando directorios necesarios..." -ForegroundColor Yellow
$directories = @(
    "public/images",
    "public/icons", 
    "components/advanced",
    "components/social",
    "components/purchase",
    "lib",
    "contracts",
    "scripts"
)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

Write-Host "✅ Directorios creados" -ForegroundColor Green

# Verificar estructura del proyecto
Write-Host "🔍 Verificando estructura del proyecto..." -ForegroundColor Yellow
$requiredFiles = @("package.json", "next.config.js", "tailwind.config.js")
$allFilesExist = $true

foreach ($file in $requiredFiles) {
    if (!(Test-Path $file)) {
        Write-Host "❌ Faltan archivos de configuración: $file" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if ($allFilesExist) {
    Write-Host "✅ Estructura del proyecto correcta" -ForegroundColor Green
} else {
    Write-Host "❌ Faltan archivos de configuración importantes" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 ¡Setup completado exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Configura las variables de entorno en .env.local" -ForegroundColor White
Write-Host "2. Ejecuta 'npm run dev' para iniciar el servidor de desarrollo" -ForegroundColor White
Write-Host "3. Visita http://localhost:3000 para ver tu Base Mini App" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Recursos útiles:" -ForegroundColor Cyan
Write-Host "- Documentación: https://docs.base.org/minikit" -ForegroundColor White
Write-Host "- Base Developer Portal: https://base.dev" -ForegroundColor White
Write-Host "- Discord: https://discord.gg/base" -ForegroundColor White
Write-Host ""
Write-Host "¡Disfruta construyendo tu Base Mini App! 🚀" -ForegroundColor Green
