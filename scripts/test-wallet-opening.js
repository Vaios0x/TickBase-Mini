const { ethers } = require("ethers");
const fs = require('fs');

async function main() {
  console.log("🧪 PROBANDO APERTURA DE WALLET");
  console.log("=" .repeat(60));
  console.log("🌐 Red: Base Sepolia Testnet");
  console.log("📅 Fecha:", new Date().toLocaleString());
  console.log("🎯 Objetivo: Probar por qué el wallet no se abre automáticamente");
  console.log("");

  // Configurar provider y wallet
  const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
  const privateKey = "5f0a78243564952c45fc64a9347410abe9c9b0056918b650bc1c76d019d17d41";
  const wallet = new ethers.Wallet(privateKey, provider);
  
  console.log("👤 Owner:", wallet.address);
  console.log("💰 Balance:", ethers.formatEther(await provider.getBalance(wallet.address)), "ETH");
  console.log("");

  try {
    // 1. PROBAR TRANSACCIÓN SIMPLE
    console.log("💸 PROBANDO TRANSACCIÓN SIMPLE...");
    console.log("-".repeat(40));
    
    try {
      const tx = {
        to: wallet.address, // Enviar a sí mismo
        value: ethers.parseEther("0.001"), // 0.001 ETH
        gasLimit: 21000
      };
      
      console.log("   📝 Enviando transacción de prueba...");
      const sendTx = await wallet.sendTransaction(tx);
      console.log(`   ✅ Transacción enviada: ${sendTx.hash}`);
      console.log(`   🔗 Link BaseScan: https://sepolia.basescan.org/tx/${sendTx.hash}`);
      
      const receipt = await sendTx.wait();
      console.log(`   ✅ Transacción confirmada en bloque: ${receipt.blockNumber}`);
      console.log(`   ⛽ Gas usado: ${receipt.gasUsed.toString()}`);
      
    } catch (error) {
      console.log(`   ❌ Error en transacción simple: ${error.message}`);
    }
    
    console.log("");

    // 2. CREAR COMPONENTE DE PRUEBA
    console.log("🧩 CREANDO COMPONENTE DE PRUEBA...");
    console.log("-".repeat(40));
    
    const testComponent = `
'use client'

import React, { useState } from 'react'
import { useContractWrite, useWaitForTransaction, useAccount, useConnect } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACT_ADDRESSES } from '@/lib/constants'
import { CheckCircle, AlertCircle, Loader2, ExternalLink, Wallet } from 'lucide-react'

export function WalletTestComponent() {
  const { address, isConnected, connector } = useAccount()
  const { connect, connectors, error: connectError } = useConnect()
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

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

  const testWalletOpening = async () => {
    if (!isConnected) {
      setError('Por favor conecta tu wallet primero')
      return
    }

    setIsTesting(true)
    setError(null)

    try {
      console.log('🧪 Probando apertura de wallet...')
      console.log('👤 Wallet:', connector?.name)
      console.log('📍 Address:', address)
      console.log('🌐 Chain ID:', await window.ethereum?.request({ method: 'eth_chainId' }))
      
      // Esta función debería abrir el wallet automáticamente
      const tx = await testTransaction({
        args: [1], // listingId de prueba
        value: parseEther('0.001') // Cantidad pequeña para prueba
      })

      console.log('✅ Transacción enviada:', tx.hash)
      setTestResult({
        hash: tx.hash,
        link: \`https://sepolia.basescan.org/tx/\${tx.hash}\`,
        status: 'pending'
      })
      
    } catch (err: any) {
      console.error('❌ Error en prueba:', err)
      setError(err.message || 'Error al probar wallet')
    } finally {
      setIsTesting(false)
    }
  }

  const connectWallet = async () => {
    try {
      const availableConnector = connectors.find(c => c.ready)
      if (availableConnector) {
        await connect({ connector: availableConnector })
      } else {
        setError('No hay wallets disponibles')
      }
    } catch (err: any) {
      setError(err.message || 'Error al conectar wallet')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🧪 Prueba de Apertura de Wallet</h2>
        
        {/* Estado de conexión */}
        <div className={\`p-4 rounded-lg mb-4 \${isConnected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}\`}>
          <div className="flex items-center mb-2">
            <Wallet className="w-5 h-5 mr-2" />
            <span className="font-medium">Estado del Wallet</span>
          </div>
          <div className="text-sm">
            {isConnected ? (
              <div>
                <div className="text-green-800">✅ Conectado</div>
                <div className="text-green-700">Wallet: {connector?.name}</div>
                <div className="text-green-700">Address: {address?.slice(0, 6)}...{address?.slice(-4)}</div>
              </div>
            ) : (
              <div className="text-red-800">❌ No conectado</div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex space-x-4 mb-6">
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Conectar Wallet
            </button>
          ) : (
            <button
              onClick={testWalletOpening}
              disabled={isTesting || isConfirming}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isTesting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Probando...
                </>
              ) : (
                'Probar Apertura de Wallet'
              )}
            </button>
          )}
        </div>

        {/* Resultado de la prueba */}
        {testResult && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <Loader2 className="w-5 h-5 text-blue-600 mr-2 animate-spin" />
              <span className="font-medium text-blue-800">Prueba Enviada</span>
            </div>
            <div className="text-sm text-blue-700">
              <div>Hash: {testResult.hash}</div>
              <div>Estado: {testResult.status}</div>
              <a 
                href={testResult.link}
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

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="font-medium text-red-800">Error</span>
            </div>
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Información de debug */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">🔍 Información de Debug</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <div>Wallet: {connector?.name || 'No conectado'}</div>
            <div>Address: {address || 'No conectado'}</div>
            <div>Chain ID: {typeof window !== 'undefined' ? window.ethereum?.chainId : 'N/A'}</div>
            <div>Contrato: {CONTRACT_ADDRESSES.MARKETPLACE}</div>
            <div>Red: Base Sepolia Testnet</div>
          </div>
        </div>
      </div>
    </div>
  )
}
`;
    
    fs.writeFileSync('./components/contracts/WalletTestComponent.tsx', testComponent);
    console.log("   ✅ Componente de prueba creado");
    console.log("");

    // 3. CREAR PÁGINA DE PRUEBA
    console.log("📄 CREANDO PÁGINA DE PRUEBA...");
    console.log("-".repeat(40));
    
    const testPage = `
'use client'

import { WalletTestComponent } from '@/components/contracts/WalletTestComponent'
import { ContractProvider } from '@/components/contracts/ContractProvider'

export default function WalletTestPage() {
  return (
    <ContractProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🧪 Prueba de Wallet</h1>
            <p className="text-gray-600">Prueba si el wallet se abre automáticamente</p>
          </div>
          
          <WalletTestComponent />
        </div>
      </div>
    </ContractProvider>
  )
}
`;
    
    fs.writeFileSync('./app/wallet-test/page.tsx', testPage);
    console.log("   ✅ Página de prueba creada");
    console.log("");

    // 4. CREAR GUÍA DE SOLUCIÓN
    console.log("📋 CREANDO GUÍA DE SOLUCIÓN...");
    console.log("-".repeat(40));
    
    const solutionGuide = `
# 🔧 SOLUCIÓN PARA WALLET NO SE ABRE

## 🎯 Problema Identificado
El wallet no se abre automáticamente cuando intentas comprar tickets.

## 🔍 Causas Posibles

### 1. Wallet no conectado
- **Síntoma**: Botón de compra no funciona
- **Solución**: Conectar wallet primero

### 2. Red incorrecta
- **Síntoma**: Error de red
- **Solución**: Cambiar a Base Sepolia (Chain ID: 84532)

### 3. Permisos del navegador
- **Síntoma**: Wallet no se abre
- **Solución**: Permitir pop-ups para el sitio

### 4. Wallet no instalado
- **Síntoma**: No hay opciones de wallet
- **Solución**: Instalar MetaMask o Coinbase Wallet

### 5. Configuración de wagmi
- **Síntoma**: Error en consola
- **Solución**: Verificar configuración

## 🛠️ Soluciones Paso a Paso

### Paso 1: Verificar Wallet
1. Abrir: http://localhost:3000/wallet-test
2. Hacer clic en "Conectar Wallet"
3. Seleccionar MetaMask o Coinbase Wallet
4. Aprobar conexión

### Paso 2: Verificar Red
1. En el wallet, cambiar a Base Sepolia
2. Chain ID: 84532
3. RPC URL: https://sepolia.base.org
4. Explorer: https://sepolia.basescan.org

### Paso 3: Probar Transacción
1. Hacer clic en "Probar Apertura de Wallet"
2. El wallet debería abrirse automáticamente
3. Firmar la transacción
4. Verificar resultado

### Paso 4: Verificar Permisos
1. Permitir pop-ups para localhost:3000
2. Desactivar bloqueadores de anuncios
3. Verificar configuración de seguridad

## 🚨 Errores Comunes

### Error: "User rejected the request"
- **Causa**: Usuario canceló en el wallet
- **Solución**: No cancelar, firmar la transacción

### Error: "Insufficient funds"
- **Causa**: No hay ETH suficiente
- **Solución**: Obtener ETH de testnet

### Error: "Network mismatch"
- **Causa**: Wallet en red incorrecta
- **Solución**: Cambiar a Base Sepolia

### Error: "Contract not found"
- **Causa**: Dirección incorrecta
- **Solución**: Verificar direcciones en constants.ts

## 📞 Soporte Adicional

Si el problema persiste:
1. Revisar consola del navegador (F12)
2. Verificar logs de wagmi
3. Probar con diferentes wallets
4. Verificar configuración de red
`;
    
    fs.writeFileSync('./WALLET_SOLUTION_GUIDE.md', solutionGuide);
    console.log("   ✅ Guía de solución creada");
    console.log("");

    console.log("🎉 PRUEBA DE WALLET COMPLETADA!");
    console.log("=" .repeat(60));
    console.log("✅ COMPONENTE DE PRUEBA CREADO");
    console.log("✅ PÁGINA DE PRUEBA CREADA");
    console.log("✅ GUÍA DE SOLUCIÓN CREADA");
    console.log("");
    console.log("🔍 PRÓXIMOS PASOS:");
    console.log("   1. Ejecutar: npm run dev");
    console.log("   2. Navegar a: http://localhost:3000/wallet-test");
    console.log("   3. Conectar wallet");
    console.log("   4. Probar apertura de wallet");
    console.log("   5. Verificar resultados");
    console.log("");
    console.log("🛠️ SOLUCIONES COMUNES:");
    console.log("   🔧 Verificar que el wallet esté conectado");
    console.log("   🔧 Verificar que esté en Base Sepolia");
    console.log("   🔧 Verificar permisos del navegador");
    console.log("   🔧 Verificar que el wallet esté instalado");
    console.log("");
    console.log("📋 ARCHIVOS CREADOS:");
    console.log("   📄 components/contracts/WalletTestComponent.tsx");
    console.log("   📄 app/wallet-test/page.tsx");
    console.log("   📄 WALLET_SOLUTION_GUIDE.md");

  } catch (error) {
    console.error("❌ Error durante la prueba:", error);
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
