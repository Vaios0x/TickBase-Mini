'use client'

import React, { useState } from 'react'
import { useContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACT_ADDRESSES } from '@/lib/constants'
import { CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react'

interface RealTicketPurchaseProps {
  eventId: number
  price: string
  onPurchaseComplete?: (result: any) => void
}

export function RealTicketPurchase({ eventId, price, onPurchaseComplete }: RealTicketPurchaseProps) {
  const { address, isConnected } = useAccount()
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [transactionResult, setTransactionResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

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

  const handleRealPurchase = async () => {
    if (!isConnected) {
      setError('Por favor conecta tu wallet primero')
      return
    }

    setIsPurchasing(true)
    setError(null)

    try {
      console.log('🛒 Iniciando compra REAL de ticket...')
      console.log(`📝 Event ID: ${eventId}`)
      console.log(`💰 Precio: ${price} ETH`)
      console.log(`🌐 Red: Base Sepolia Testnet`)
      console.log(`🔗 Contrato: ${CONTRACT_ADDRESSES.MARKETPLACE}`)
      
      // TRANSACCIÓN REAL - Esto abrirá el wallet automáticamente
      const tx = await buyTicket({
        args: [eventId],
        value: parseEther(price)
      })

      console.log('📝 Transacción REAL enviada:', tx.hash)
      console.log('🔗 Link BaseScan:', `https://sepolia.basescan.org/tx/${tx.hash}`)
      
      // El wallet se cierra automáticamente después de firmar
      // La transacción se confirma en segundo plano
      
    } catch (err: any) {
      console.error('❌ Error en compra REAL:', err)
      setError(err.message || 'Error al procesar la compra')
    } finally {
      setIsPurchasing(false)
    }
  }

  // Efecto para manejar confirmación
  React.useEffect(() => {
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
  React.useEffect(() => {
    if (contractError) {
      setError(contractError.message)
      console.error('❌ Error en contrato:', contractError)
    }
  }, [contractError])

  return (
    <div className="space-y-4">
      {/* Botón de compra */}
      <button
        onClick={handleRealPurchase}
        disabled={!isConnected || isPurchasing || isConfirming}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isPurchasing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Abriendo Wallet...
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
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {/* Información de red */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-sm text-gray-600">
          <div className="font-medium mb-1">🌐 Red: Base Sepolia Testnet</div>
          <div>🔗 Contrato: {CONTRACT_ADDRESSES.MARKETPLACE}</div>
          <div>📝 Transacciones: 100% Reales</div>
          <div>⛽ Gas: Muy bajo en Base</div>
        </div>
      </div>
    </div>
  )
}
