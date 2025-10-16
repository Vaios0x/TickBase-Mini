#!/bin/bash

# Script de setup automático para TickBase MiniKit
# Basado en el tutorial de YouTube: https://www.youtube.com/watch?v=juZxqgMx5rE&t=319s

echo "🚀 Configurando TickBase MiniKit..."

# Verificar Node.js
echo "📦 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+ desde https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js $NODE_VERSION detectado"

# Verificar npm
echo "📦 Verificando npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está disponible"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm $NPM_VERSION detectado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias"
    exit 1
fi

# Instalar dependencias específicas de MiniKit
echo "📦 Instalando dependencias de MiniKit..."
npm install @coinbase/minikit@latest @coinbase/agentkit@latest

# Crear archivo .env.local si no existe
if [ ! -f ".env.local" ]; then
    echo "📝 Creando archivo .env.local..."
    cp env.example .env.local
    echo "✅ Archivo .env.local creado. Por favor configura tus API keys."
fi

# Verificar configuración
echo "🔍 Verificando configuración..."

# Verificar archivos de configuración
CONFIG_FILES=(
    "minikit.config.ts"
    "next.config.js"
    "tailwind.config.js"
    "tsconfig.json"
    "package.json"
)

for file in "${CONFIG_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file encontrado"
    else
        echo "❌ $file no encontrado"
    fi
done

# Compilar proyecto
echo "🔨 Compilando proyecto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error compilando proyecto"
    echo "💡 Ejecuta 'npm run dev' para ver errores detallados"
else
    echo "✅ Proyecto compilado exitosamente"
fi

echo ""
echo "🎉 ¡Setup completado!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura tus API keys en .env.local"
echo "2. Obtén tu OnchainKit API key en: https://portal.cdp.coinbase.com/products/onchainkit"
echo "3. Configura tu Paymaster URL"
echo "4. Ejecuta 'npm run dev' para iniciar el servidor de desarrollo"
echo "5. Visita http://localhost:3000 para ver tu Mini App"
echo ""
echo "🔗 Enlaces útiles:"
echo "• Base Developer Portal: https://base.dev"
echo "• OnchainKit Docs: https://docs.base.org/onchainkit"
echo "• MiniKit Docs: https://docs.base.org/minikit"
echo "• Tutorial YouTube: https://www.youtube.com/watch?v=juZxqgMx5rE&t=319s"
echo ""
echo "🚀 ¡Tu TickBase Mini App está lista!"
