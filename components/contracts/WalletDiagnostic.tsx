
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
  
  const testWalletTransaction = async () => {
    if (!isConnected) {
      alert('Por favor conecta tu wallet primero')
      return
    }
    
    try {
      console.log('🧪 Probando transacción...')
      
      // Esta función debería abrir el wallet automáticamente
      const tx = await testWalletTransaction({
        args: [1], // listingId de prueba
        value: parseEther('0.001') // Cantidad pequeña para prueba
      })
      
      console.log('✅ Transacción enviada:', tx.hash)
      
    } catch (error: any) {
      console.error('❌ Error en transacción:', error)
      alert(`Error: ${error.message}`)
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
          <div className={`p-4 rounded-lg ${isConnected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
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
          
          <div className={`p-4 rounded-lg ${chainId === 84532 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
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
                href={`https://sepolia.basescan.org/tx/${txData.hash}`}
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
