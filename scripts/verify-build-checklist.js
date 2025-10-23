#!/usr/bin/env node

/**
 * Script para verificar que el proyecto cumple con el Build Checklist de Base Mini Apps
 */

const fs = require('fs')
const path = require('path')

const CHECKLIST_ITEMS = [
  {
    name: 'Base Build Registration',
    description: 'Verificar que el proyecto está registrado en Base Build',
    check: () => {
      const manifestPath = path.join(process.cwd(), 'public/.well-known/farcaster.json')
      if (!fs.existsSync(manifestPath)) return false
      
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
      return manifest.baseBuilder && manifest.baseBuilder.allowedAddresses
    }
  },
  {
    name: 'Authentication Implementation',
    description: 'Verificar que Quick Auth está implementado',
    check: () => {
      const authRoute = path.join(process.cwd(), 'app/api/auth/route.ts')
      const authComponent = path.join(process.cwd(), 'components/Authentication.tsx')
      return fs.existsSync(authRoute) && fs.existsSync(authComponent)
    }
  },
  {
    name: 'Manifest Configuration',
    description: 'Verificar que el manifest está completo y bien configurado',
    check: () => {
      const manifestPath = path.join(process.cwd(), 'public/.well-known/farcaster.json')
      if (!fs.existsSync(manifestPath)) return false
      
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
      const requiredFields = [
        'version', 'name', 'homeUrl', 'iconUrl', 'splashImageUrl', 
        'splashBackgroundColor', 'subtitle', 'description', 
        'primaryCategory', 'tags', 'ogTitle', 'ogDescription', 'ogImageUrl'
      ]
      
      return requiredFields.every(field => manifest.miniapp[field])
    }
  },
  {
    name: 'Webhook Endpoint',
    description: 'Verificar que el webhook está implementado',
    check: () => {
      const webhookPath = path.join(process.cwd(), 'app/api/webhook/route.ts')
      return fs.existsSync(webhookPath)
    }
  },
  {
    name: 'OG Image Generation',
    description: 'Verificar que la generación de OG images está implementada',
    check: () => {
      const ogImagePath = path.join(process.cwd(), 'app/api/og-image/route.tsx')
      return fs.existsSync(ogImagePath)
    }
  },
  {
    name: 'Screenshot Generation',
    description: 'Verificar que la generación de screenshots está implementada',
    check: () => {
      const screenshotPath = path.join(process.cwd(), 'app/api/screenshot/route.tsx')
      return fs.existsSync(screenshotPath)
    }
  },
  {
    name: 'Social Sharing',
    description: 'Verificar que el componente de compartir está implementado',
    check: () => {
      const shareComponent = path.join(process.cwd(), 'components/social/ShareButton.tsx')
      return fs.existsSync(shareComponent)
    }
  },
  {
    name: 'Notifications',
    description: 'Verificar que el centro de notificaciones está implementado',
    check: () => {
      const notificationComponent = path.join(process.cwd(), 'components/notifications/NotificationCenter.tsx')
      return fs.existsSync(notificationComponent)
    }
  },
  {
    name: 'Mobile Optimization',
    description: 'Verificar que la optimización móvil está implementada',
    check: () => {
      const mobileComponent = path.join(process.cwd(), 'components/ui/MobileOptimized.tsx')
      return fs.existsSync(mobileComponent)
    }
  },
  {
    name: 'Farcaster SDK Integration',
    description: 'Verificar que el SDK de Farcaster está integrado',
    check: () => {
      const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
      return packageJson.dependencies['@farcaster/miniapp-sdk']
    }
  },
  {
    name: 'OnchainKit Integration',
    description: 'Verificar que OnchainKit está integrado',
    check: () => {
      const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
      return packageJson.dependencies['@coinbase/onchainkit']
    }
  },
  {
    name: 'Wagmi Configuration',
    description: 'Verificar que Wagmi está configurado',
    check: () => {
      const configPath = path.join(process.cwd(), 'lib/config.ts')
      const providersPath = path.join(process.cwd(), 'app/providers.tsx')
      return fs.existsSync(configPath) && fs.existsSync(providersPath)
    }
  }
]

function runChecklist() {
  console.log('🔍 Verificando Build Checklist de Base Mini Apps...\n')
  
  let passed = 0
  let failed = 0
  
  CHECKLIST_ITEMS.forEach((item, index) => {
    const result = item.check()
    const status = result ? '✅' : '❌'
    const statusText = result ? 'PASS' : 'FAIL'
    
    console.log(`${index + 1}. ${status} ${item.name}`)
    console.log(`   ${item.description}`)
    console.log(`   Status: ${statusText}\n`)
    
    if (result) {
      passed++
    } else {
      failed++
    }
  })
  
  console.log('📊 Resumen del Build Checklist:')
  console.log(`✅ Pasaron: ${passed}`)
  console.log(`❌ Fallaron: ${failed}`)
  console.log(`📈 Progreso: ${Math.round((passed / CHECKLIST_ITEMS.length) * 100)}%`)
  
  if (failed === 0) {
    console.log('\n🎉 ¡Felicitaciones! Tu proyecto cumple con todos los requisitos del Build Checklist.')
    console.log('🚀 Tu Mini App está lista para ser desplegada en Base.')
  } else {
    console.log('\n⚠️  Hay algunos elementos que necesitan atención.')
    console.log('🔧 Revisa los elementos marcados como FAIL y corrígelos.')
  }
  
  return failed === 0
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const success = runChecklist()
  process.exit(success ? 0 : 1)
}

module.exports = { runChecklist, CHECKLIST_ITEMS }
