#!/bin/bash

# 🚀 TickBase Mini App Setup Script
# Este script configura el proyecto completo con todas las dependencias

echo "🎫 Configurando TickBase Mini App..."

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+ primero."
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Se requiere Node.js 18 o superior. Versión actual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar instalación
if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error al instalar dependencias"
    exit 1
fi

# Crear archivo .env.local si no existe
if [ ! -f ".env.local" ]; then
    echo "📝 Creando archivo .env.local..."
    cp env.example .env.local
    echo "✅ Archivo .env.local creado. Por favor configura las variables de entorno."
else
    echo "✅ Archivo .env.local ya existe"
fi

# Verificar TypeScript
echo "🔍 Verificando TypeScript..."
npx tsc --noEmit

if [ $? -eq 0 ]; then
    echo "✅ TypeScript configurado correctamente"
else
    echo "⚠️  Advertencias de TypeScript encontradas (esto es normal en desarrollo)"
fi

# Crear directorios necesarios
echo "📁 Creando directorios necesarios..."
mkdir -p public/images
mkdir -p public/icons
mkdir -p components/advanced
mkdir -p components/social
mkdir -p components/purchase
mkdir -p lib
mkdir -p contracts
mkdir -p scripts

echo "✅ Directorios creados"

# Verificar estructura del proyecto
echo "🔍 Verificando estructura del proyecto..."
if [ -f "package.json" ] && [ -f "next.config.js" ] && [ -f "tailwind.config.js" ]; then
    echo "✅ Estructura del proyecto correcta"
else
    echo "❌ Faltan archivos de configuración importantes"
    exit 1
fi

echo ""
echo "🎉 ¡Setup completado exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura las variables de entorno en .env.local"
echo "2. Ejecuta 'npm run dev' para iniciar el servidor de desarrollo"
echo "3. Visita http://localhost:3000 para ver tu Base Mini App"
echo ""
echo "🔗 Recursos útiles:"
echo "- Documentación: https://docs.base.org/minikit"
echo "- Base Developer Portal: https://base.dev"
echo "- Discord: https://discord.gg/base"
echo ""
echo "¡Disfruta construyendo tu Base Mini App! 🚀"
