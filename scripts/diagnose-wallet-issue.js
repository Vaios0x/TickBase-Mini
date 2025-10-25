const fs = require('fs');

async function main() {
  console.log("🔍 DIAGNOSTICANDO PROBLEMA DE WALLET");
  console.log("=" .repeat(60));
  console.log("📅 Fecha:", new Date().toLocaleString());
  console.log("🎯 Objetivo: Identificar por qué el wallet no se abre automáticamente");
  console.log("");

  try {
    // 1. VERIFICAR CONFIGURACIÓN DE WAGMI
    console.log("🔧 VERIFICANDO CONFIGURACIÓN DE WAGMI...");
    console.log("-".repeat(40));
    
    const networkConfigPath = './lib/network-config.ts';
    if (fs.existsSync(networkConfigPath)) {
      const networkContent = fs.readFileSync(networkConfigPath, 'utf8');
      
      // Verificar que use baseSepolia
      if (networkContent.includes('chains: [baseSepolia]')) {
        console.log("   ✅ Configuración usa Base Sepolia");
      } else {
        console.log("   ❌ Configuración NO usa Base Sepolia");
      }
      
      // Verificar conectores
      if (networkContent.includes('coinbaseWallet') && networkContent.includes('injected')) {
        console.log("   ✅ Conectores configurados (Coinbase + MetaMask)");
      } else {
        console.log("   ❌ Conectores NO configurados correctamente");
      }
      
      // Verificar RPC
      if (networkContent.includes('https://sepolia.base.org')) {
        console.log("   ✅ RPC configurado para Base Sepolia");
      } else {
        console.log("   ❌ RPC NO configurado para Base Sepolia");
      }
      
    } else {
      console.log("   ❌ lib/network-config.ts no encontrado");
    }
    
    console.log("");

    // 2. VERIFICAR COMPONENTES DE COMPRA
    console.log("🛒 VERIFICANDO COMPONENTES DE COMPRA...");
    console.log("-".repeat(40));
    
    const purchaseComponents = [
      'components/contracts/RealTicketPurchase.tsx',
      'components/contracts/TicketPurchaseModal.tsx',
      'components/contracts/WalletTransactionHandler.tsx'
    ];
    
    purchaseComponents.forEach(component => {
      if (fs.existsSync(component)) {
        console.log(`   ✅ ${component} existe`);
        
        const content = fs.readFileSync(component, 'utf8');
        
        // Verificar useContractWrite
        if (content.includes('useContractWrite')) {
          console.log(`   ✅ ${component} usa useContractWrite`);
        } else {
          console.log(`   ❌ ${component} NO usa useContractWrite`);
        }
        
        // Verificar writeAsync
        if (content.includes('writeAsync')) {
          console.log(`   ✅ ${component} usa writeAsync`);
        } else {
          console.log(`   ❌ ${component} NO usa writeAsync`);
        }
        
        // Verificar manejo de errores
        if (content.includes('catch') || content.includes('error')) {
          console.log(`   ✅ ${component} maneja errores`);
        } else {
          console.log(`   ❌ ${component} NO maneja errores`);
        }
        
      } else {
        console.log(`   ❌ ${component} NO existe`);
      }
    });
    
    console.log("");

    // 3. CREAR COMPONENTE DE DIAGNÓSTICO
    console.log("🩺 CREANDO COMPONENTE DE DIAGNÓSTICO...");
    console.log("-".repeat(40));
    
    const diagnosticComponent = `
'use client'

import React, { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi'
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACT_ADDRESSES } from '@/lib/constants'
import { CheckCircle, AlertCircle, Loader2, ExternalLink, Wallet } from 'lucide-react'

export function WalletDiagnostic() {
  const { address, isConnected, connector } = useAccount()
  const { connect, connectors, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  
  const [diagnosticResults, setDiagnosticResults] = useState<any>({})
  const [isRunning, setIsRunning] = useState(false)
  
  // Hook para transacción de prueba
  const { writeAsync: testTransaction, data: txData, error: txError } = useContractWrite({
    address: CONTRACT_ADDRESSES.MARKETPLACE,
    abi: [
      {
        "inputs": [{"internalType": "uint256", "name": "_listingId", "type": "uint256"}],
        "name": "buyTicket",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }
    ],
    functionName: 'buyTicket',
  })
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransaction({
    hash: txData?.hash,
  })
  
  const runDiagnostic = async () => {
    setIsRunning(true)
    const results: any = {}
    
    try {
      // 1. Verificar conexión de wallet
      results.walletConnected = isConnected
      results.walletAddress = address
      results.connectorName = connector?.name
      
      // 2. Verificar red
      results.chainId = chainId
      results.isBaseSepolia = chainId === 84532
      
      // 3. Verificar conectores disponibles
      results.availableConnectors = connectors.map(c => ({
        name: c.name,
        id: c.id,
        ready: c.ready
      }))
      
      // 4. Verificar configuración de contratos
      results.contractAddresses = CONTRACT_ADDRESSES
      
      // 5. Verificar errores de conexión
      results.connectError = connectError?.message
      results.txError = txError?.message
      
      setDiagnosticResults(results)
      
    } catch (error: any) {
      results.error = error.message
      setDiagnosticResults(results)
    } finally {
      setIsRunning(false)
    }
  }
  
  const testWalletConnection = async () => {
    if (!isConnected) {
      try {
        // Intentar conectar con el primer conector disponible
        const firstConnector = connectors[0]
        if (firstConnector) {
          await connect({ connector: firstConnector })
        }
      } catch (error: any) {
        console.error('Error conectando wallet:', error)
      }
    }
  }
  
  const testTransaction = async () => {
    if (!isConnected) {
      alert('Por favor conecta tu wallet primero')
      return
    }
    
    try {
      console.log('🧪 Probando transacción...')
      
      // Esta función debería abrir el wallet automáticamente
      const tx = await testTransaction({
        args: [1], // listingId de prueba
        value: parseEther('0.001') // Cantidad pequeña para prueba
      })
      
      console.log('✅ Transacción enviada:', tx.hash)
      
    } catch (error: any) {
      console.error('❌ Error en transacción:', error)
      alert(\`Error: \${error.message}\`)
    }
  }
  
  useEffect(() => {
    runDiagnostic()
  }, [isConnected, chainId, connectors])
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Diagnóstico de Wallet</h2>
        
        {/* Estado actual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={\`p-4 rounded-lg \${isConnected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}\`}>
            <div className="flex items-center mb-2">
              <Wallet className="w-5 h-5 mr-2" />
              <span className="font-medium">Wallet</span>
            </div>
            <div className="text-sm">
              {isConnected ? (
                <div>
                  <div className="text-green-800">✅ Conectado</div>
                  <div className="text-green-700">{address?.slice(0, 6)}...{address?.slice(-4)}</div>
                  <div className="text-green-700">{connector?.name}</div>
                </div>
              ) : (
                <div className="text-red-800">❌ No conectado</div>
              )}
            </div>
          </div>
          
          <div className={\`p-4 rounded-lg \${chainId === 84532 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}\`}>
            <div className="flex items-center mb-2">
              <div className="w-5 h-5 mr-2">🌐</div>
              <span className="font-medium">Red</span>
            </div>
            <div className="text-sm">
              {chainId === 84532 ? (
                <div className="text-green-800">✅ Base Sepolia</div>
              ) : (
                <div className="text-red-800">❌ Chain ID: {chainId}</div>
              )}
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center mb-2">
              <div className="w-5 h-5 mr-2">🔧</div>
              <span className="font-medium">Estado</span>
            </div>
            <div className="text-sm text-blue-800">
              {isRunning ? '🔄 Diagnosticando...' : '✅ Listo'}
            </div>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={testWalletConnection}
            disabled={isConnected}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnected ? 'Wallet Conectado' : 'Conectar Wallet'}
          </button>
          
          <button
            onClick={testTransaction}
            disabled={!isConnected}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Probar Transacción
          </button>
          
          <button
            onClick={runDiagnostic}
            disabled={isRunning}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? 'Diagnosticando...' : 'Ejecutar Diagnóstico'}
          </button>
        </div>
        
        {/* Resultados del diagnóstico */}
        {Object.keys(diagnosticResults).length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">📊 Resultados del Diagnóstico</h3>
            <pre className="text-sm text-gray-700 overflow-auto">
              {JSON.stringify(diagnosticResults, null, 2)}
            </pre>
          </div>
        )}
        
        {/* Estado de transacción */}
        {txData?.hash && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Loader2 className="w-5 h-5 text-blue-600 mr-2 animate-spin" />
              <span className="font-medium text-blue-800">Transacción Enviada</span>
            </div>
            <div className="text-sm text-blue-700">
              <div>Hash: {txData.hash}</div>
              <div>Estado: {isConfirming ? 'Confirmando...' : isConfirmed ? 'Confirmada' : 'Pendiente'}</div>
              <a 
                href={\`https://sepolia.basescan.org/tx/\${txData.hash}\`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Ver en BaseScan
              </a>
            </div>
          </div>
        )}
        
        {/* Errores */}
        {(connectError || txError) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="font-medium text-red-800">Errores Detectados</span>
            </div>
            <div className="text-sm text-red-700">
              {connectError && <div>Conexión: {connectError.message}</div>}
              {txError && <div>Transacción: {txError.message}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
`;
    
    fs.writeFileSync('./components/contracts/WalletDiagnostic.tsx', diagnosticComponent);
    console.log("   ✅ Componente de diagnóstico creado");
    console.log("");

    // 4. CREAR PÁGINA DE DIAGNÓSTICO
    console.log("📄 CREANDO PÁGINA DE DIAGNÓSTICO...");
    console.log("-".repeat(40));
    
    const diagnosticPage = `
'use client'

import { WalletDiagnostic } from '@/components/contracts/WalletDiagnostic'
import { ContractProvider } from '@/components/contracts/ContractProvider'

export default function DiagnosticPage() {
  return (
    <ContractProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 Diagnóstico de Wallet</h1>
            <p className="text-gray-600">Diagnostica problemas con la conexión del wallet</p>
          </div>
          
          <WalletDiagnostic />
        </div>
      </div>
    </ContractProvider>
  )
}
`;
    
    fs.writeFileSync('./app/diagnostic/page.tsx', diagnosticPage);
    console.log("   ✅ Página de diagnóstico creada");
    console.log("");

    // 5. CREAR SOLUCIONES COMUNES
    console.log("🛠️ CREANDO SOLUCIONES COMUNES...");
    console.log("-".repeat(40));
    
    const commonSolutions = `
# SOLUCIONES COMUNES PARA PROBLEMAS DE WALLET

## 🔧 Problema: Wallet no se abre automáticamente

### Solución 1: Verificar configuración de red
- Asegúrate de que tu wallet esté configurado para Base Sepolia
- Chain ID: 84532
- RPC URL: https://sepolia.base.org
- Explorer: https://sepolia.basescan.org

### Solución 2: Verificar conectores
- MetaMask: Asegúrate de que esté instalado y desbloqueado
- Coinbase Wallet: Asegúrate de que esté instalado y desbloqueado
- WalletConnect: Verifica que tengas un Project ID válido

### Solución 3: Verificar permisos
- Asegúrate de que el sitio tenga permisos para abrir el wallet
- Revisa la configuración de pop-ups en tu navegador
- Desactiva bloqueadores de anuncios temporalmente

### Solución 4: Verificar configuración de wagmi
- Asegúrate de que useContractWrite esté configurado correctamente
- Verifica que las direcciones de contratos sean correctas
- Revisa que el ABI sea válido

## 🚨 Errores Comunes

### Error: "User rejected the request"
- El usuario canceló la transacción en el wallet
- Solución: Intentar de nuevo y no cancelar

### Error: "Insufficient funds"
- No hay suficiente ETH para la transacción
- Solución: Obtener ETH de testnet

### Error: "Network mismatch"
- El wallet está en una red diferente
- Solución: Cambiar a Base Sepolia en el wallet

### Error: "Contract not found"
- La dirección del contrato es incorrecta
- Solución: Verificar direcciones en constants.ts

## 🔍 Pasos de Diagnóstico

1. Abrir: http://localhost:3000/diagnostic
2. Ejecutar diagnóstico completo
3. Verificar resultados
4. Aplicar soluciones según los errores encontrados
5. Probar transacción de nuevo

## 📞 Soporte

Si el problema persiste:
1. Revisar logs de la consola del navegador
2. Verificar configuración de red en el wallet
3. Probar con diferentes wallets (MetaMask, Coinbase)
4. Verificar que los contratos estén desplegados correctamente
`;
    
    fs.writeFileSync('./WALLET_TROUBLESHOOTING.md', commonSolutions);
    console.log("   ✅ Guía de solución de problemas creada");
    console.log("");

    console.log("🎉 DIAGNÓSTICO COMPLETADO!");
    console.log("=" .repeat(60));
    console.log("✅ COMPONENTE DE DIAGNÓSTICO CREADO");
    console.log("✅ PÁGINA DE DIAGNÓSTICO CREADA");
    console.log("✅ GUÍA DE SOLUCIÓN CREADA");
    console.log("");
    console.log("🔍 PRÓXIMOS PASOS:");
    console.log("   1. Ejecutar: npm run dev");
    console.log("   2. Navegar a: http://localhost:3000/diagnostic");
    console.log("   3. Ejecutar diagnóstico completo");
    console.log("   4. Verificar resultados y aplicar soluciones");
    console.log("");
    console.log("🛠️ SOLUCIONES COMUNES:");
    console.log("   🔧 Verificar configuración de red (Base Sepolia)");
    console.log("   🔧 Verificar conectores (MetaMask, Coinbase)");
    console.log("   🔧 Verificar permisos del navegador");
    console.log("   🔧 Verificar configuración de wagmi");
    console.log("");
    console.log("📋 ARCHIVOS CREADOS:");
    console.log("   📄 components/contracts/WalletDiagnostic.tsx");
    console.log("   📄 app/diagnostic/page.tsx");
    console.log("   📄 WALLET_TROUBLESHOOTING.md");

  } catch (error) {
    console.error("❌ Error durante el diagnóstico:", error);
    console.error("📋 Detalles del error:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error fatal:", error);
    process.exit(1);
  });
