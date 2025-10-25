
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
        link: `https://sepolia.basescan.org/tx/${tx.hash}`,
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
        <div className={`p-4 rounded-lg mb-4 ${isConnected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
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
