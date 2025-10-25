'use client'

import React, { useState, useEffect } from 'react'
import { useContractWrite, useWaitForTransaction, useAccount, useConnect } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACT_ADDRESSES } from '@/lib/constants'
import { CheckCircle, AlertCircle, Loader2, ExternalLink, Wallet, RefreshCw } from 'lucide-react'

interface ImprovedTicketPurchaseProps {
  eventId: number
  price: string
  onPurchaseComplete?: (result: any) => void
}

export function ImprovedTicketPurchase({ eventId, price, onPurchaseComplete }: ImprovedTicketPurchaseProps) {
  const { address, isConnected, connector } = useAccount()
  const { connect, connectors, error: connectError } = useConnect()
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [transactionResult, setTransactionResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [walletOpening, setWalletOpening] = useState(false)

  // Hook para escribir en el contrato - TRANSACCIÓN REAL
  const { writeAsync: buyTicket, data: txData, error: contractError } = useContractWrite({
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

  // Hook para esperar confirmación - TRANSACCIÓN REAL
  const { isLoading: isConfirming, isSuccess: isConfirmed, data: receipt } = useWaitForTransaction({
    hash: txData?.hash,
  })

  // Función para conectar wallet si no está conectado
  const connectWallet = async () => {
    try {
      setError(null)
      console.log('🔗 Conectando wallet...')
      
      // Intentar conectar con el primer conector disponible
      const availableConnector = connectors.find(c => c.ready)
      if (availableConnector) {
        await connect({ connector: availableConnector })
        console.log('✅ Wallet conectado:', availableConnector.name)
      } else {
        setError('No hay wallets disponibles. Por favor instala MetaMask o Coinbase Wallet.')
      }
    } catch (err: any) {
      console.error('❌ Error conectando wallet:', err)
      setError(err.message || 'Error al conectar wallet')
    }
  }

  // Función principal de compra
  const handlePurchase = async () => {
    // Verificar conexión
    if (!isConnected) {
      setError('Por favor conecta tu wallet primero')
      await connectWallet()
      return
    }

    // Verificar red
    if (connector?.id === 'metaMask' || connector?.id === 'coinbaseWallet') {
      // Verificar que esté en Base Sepolia
      try {
        const chainId = await window.ethereum?.request({ method: 'eth_chainId' })
        if (chainId !== '0x14a34') { // 84532 en hex
          setError('Por favor cambia a Base Sepolia en tu wallet')
          return
        }
      } catch (err) {
        console.warn('No se pudo verificar la red:', err)
      }
    }

    setIsPurchasing(true)
    setError(null)
    setWalletOpening(true)

    try {
      console.log('🛒 Iniciando compra REAL de ticket...')
      console.log(`📝 Event ID: ${eventId}`)
      console.log(`💰 Precio: ${price} ETH`)
      console.log(`🌐 Red: Base Sepolia Testnet`)
      console.log(`🔗 Contrato: ${CONTRACT_ADDRESSES.MARKETPLACE}`)
      console.log(`👤 Wallet: ${connector?.name}`)
      
      // TRANSACCIÓN REAL - Esto abrirá el wallet automáticamente
      const tx = await buyTicket({
        args: [eventId],
        value: parseEther(price)
      })

      console.log('📝 Transacción REAL enviada:', tx.hash)
      console.log('🔗 Link BaseScan:', `https://sepolia.basescan.org/tx/${tx.hash}`)
      
      setWalletOpening(false)
      
    } catch (err: any) {
      console.error('❌ Error en compra REAL:', err)
      setError(err.message || 'Error al procesar la compra')
      setWalletOpening(false)
    } finally {
      setIsPurchasing(false)
    }
  }

  // Efecto para manejar confirmación
  useEffect(() => {
    if (isConfirmed && receipt && txData?.hash) {
      const result = {
        hash: txData.hash,
        link: `https://sepolia.basescan.org/tx/${txData.hash}`,
        status: 'confirmed',
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        gasPrice: receipt.gasPrice?.toString(),
        network: 'Base Sepolia Testnet',
        explorer: 'https://sepolia.basescan.org'
      }
      
      setTransactionResult(result)
      onPurchaseComplete?.(result)
      
      console.log('✅ Compra REAL completada:', result)
    }
  }, [isConfirmed, receipt, txData?.hash, onPurchaseComplete])

  // Efecto para manejar errores
  useEffect(() => {
    if (contractError) {
      setError(contractError.message)
      console.error('❌ Error en contrato:', contractError)
    }
  }, [contractError])

  // Efecto para manejar errores de conexión
  useEffect(() => {
    if (connectError) {
      setError(connectError.message)
      console.error('❌ Error de conexión:', connectError)
    }
  }, [connectError])

  return (
    <div className="space-y-4">
      {/* Estado de conexión */}
      {!isConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Wallet className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="font-medium text-yellow-800">Wallet No Conectado</span>
          </div>
          <p className="text-sm text-yellow-700 mb-3">
            Necesitas conectar tu wallet para comprar tickets
          </p>
          <button
            onClick={connectWallet}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Conectar Wallet
          </button>
        </div>
      )}

      {/* Botón de compra */}
      <button
        onClick={handlePurchase}
        disabled={!isConnected || isPurchasing || isConfirming}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {walletOpening ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Abriendo Wallet...
          </>
        ) : isPurchasing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Procesando...
          </>
        ) : isConfirming ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Confirmando...
          </>
        ) : (
          `Comprar por ${price} ETH`
        )}
      </button>

      {/* Estado de la transacción */}
      {txData?.hash && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Loader2 className="w-5 h-5 text-blue-600 mr-2 animate-spin" />
            <span className="font-medium text-blue-800">Transacción Enviada</span>
          </div>
          <div className="text-sm text-blue-700">
            <div>Hash: {txData.hash}</div>
            <div>Red: Base Sepolia Testnet</div>
            <div>Wallet: {connector?.name}</div>
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

      {/* Resultado de la transacción */}
      {transactionResult && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">¡Compra Exitosa!</span>
          </div>
          <div className="text-sm text-green-700">
            <div>Hash: {transactionResult.hash}</div>
            <div>Block: {transactionResult.blockNumber}</div>
            <div>Gas Used: {transactionResult.gasUsed}</div>
            <div>Red: {transactionResult.network}</div>
            <a 
              href={transactionResult.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-600 hover:text-green-800"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Ver en BaseScan
            </a>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-medium text-red-800">Error</span>
          </div>
          <div className="text-sm text-red-700 mb-3">{error}</div>
          <button
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-800 text-sm flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Reintentar
          </button>
        </div>
      )}

      {/* Información de red */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-sm text-gray-600">
          <div className="font-medium mb-1">🌐 Red: Base Sepolia Testnet</div>
          <div>🔗 Contrato: {CONTRACT_ADDRESSES.MARKETPLACE}</div>
          <div>📝 Transacciones: 100% Reales</div>
          <div>⛽ Gas: Muy bajo en Base</div>
          <div>👤 Wallet: {connector?.name || 'No conectado'}</div>
        </div>
      </div>
    </div>
  )
}
