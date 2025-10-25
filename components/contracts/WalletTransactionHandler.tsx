'use client'

import { useState, useEffect } from 'react'
import { useContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import { useContractContext } from './ContractProvider'
import { formatPrice } from '@/lib/contract-utils'
import { Wallet, CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react'

interface WalletTransactionHandlerProps {
  onTransactionComplete?: (result: TransactionResult) => void
  onTransactionError?: (error: string) => void
}

interface TransactionResult {
  hash: string
  link: string
  status: 'pending' | 'confirmed' | 'failed'
  blockNumber?: number
  gasUsed?: string
  gasPrice?: string
}

export function WalletTransactionHandler({ 
  onTransactionComplete, 
  onTransactionError 
}: WalletTransactionHandlerProps) {
  const { address, isConnected } = useAccount()
  const [isWalletOpen, setIsWalletOpen] = useState(false)
  const [transactionStep, setTransactionStep] = useState<'idle' | 'wallet-open' | 'signing' | 'confirming' | 'completed' | 'error'>('idle')
  const [transactionResult, setTransactionResult] = useState<TransactionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Hook para escribir en el contrato
  const { writeAsync: buyTicket, data: txData, error: contractError } = useContractWrite({
    address: '0xff85e8A49d4623C3D1edE1c0CbC7ed08685D7CC4', // Marketplace address
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

  // Hook para esperar confirmación
  const { isLoading: isConfirming, isSuccess: isConfirmed, data: receipt } = useWaitForTransaction({
    hash: txData?.hash,
  })

  // Efecto para manejar el estado de la transacción
  useEffect(() => {
    if (txData?.hash) {
      setTransactionStep('signing')
      setIsWalletOpen(true)
    }
  }, [txData?.hash])

  useEffect(() => {
    if (isConfirming) {
      setTransactionStep('confirming')
    }
  }, [isConfirming])

  useEffect(() => {
    if (isConfirmed && receipt) {
      setTransactionStep('completed')
      setIsWalletOpen(false)
      
      const result: TransactionResult = {
        hash: txData?.hash || '',
        link: `https://sepolia.basescan.org/tx/${txData?.hash}`,
        status: 'confirmed',
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        gasPrice: receipt.gasPrice?.toString()
      }
      
      setTransactionResult(result)
      onTransactionComplete?.(result)
    }
  }, [isConfirmed, receipt, txData?.hash, onTransactionComplete])

  useEffect(() => {
    if (contractError) {
      setTransactionStep('error')
      setIsWalletOpen(false)
      setError(contractError.message)
      onTransactionError?.(contractError.message)
    }
  }, [contractError, onTransactionError])

  const handleBuyTicket = async (listingId: number, price: string) => {
    if (!isConnected) {
      setError('Por favor conecta tu wallet primero')
      return
    }

    setTransactionStep('wallet-open')
    setIsWalletOpen(true)
    setError(null)

    try {
      console.log('🛒 Iniciando compra de ticket...')
      console.log(`📝 Listing ID: ${listingId}`)
      console.log(`💰 Precio: ${price} ETH`)
      
      // Esta función abrirá automáticamente el wallet para firmar
      const tx = await buyTicket({
        args: [listingId],
        value: price // En producción sería ethers.parseEther(price)
      })

      console.log('📝 Transacción enviada:', tx.hash)
      console.log('🔗 Link BaseScan:', `https://sepolia.basescan.org/tx/${tx.hash}`)

    } catch (err: any) {
      console.error('❌ Error en la compra:', err)
      setTransactionStep('error')
      setIsWalletOpen(false)
      setError(err.message || 'Error al procesar la compra')
      onTransactionError?.(err.message || 'Error al procesar la compra')
    }
  }

  const resetTransaction = () => {
    setTransactionStep('idle')
    setTransactionResult(null)
    setError(null)
    setIsWalletOpen(false)
  }

  return (
    <div className="space-y-4">
      {/* Botón de compra */}
      <button
        onClick={() => handleBuyTicket(1, '0.05')} // Ejemplo: listingId 1, precio 0.05 ETH
        disabled={!isConnected || transactionStep !== 'idle'}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Comprar Ticket
      </button>

      {/* Modal de transacción */}
      {isWalletOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              {transactionStep === 'wallet-open' && (
                <div className="text-center">
                  <Wallet className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Abrir Wallet</h3>
                  <p className="text-gray-600 mb-4">
                    Tu wallet se abrirá automáticamente para firmar la transacción
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Tip:</strong> Asegúrate de tener suficiente ETH para la transacción
                    </p>
                  </div>
                </div>
              )}

              {transactionStep === 'signing' && (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Firmando Transacción</h3>
                  <p className="text-gray-600 mb-4">
                    Por favor firma la transacción en tu wallet...
                  </p>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      ⚠️ <strong>Importante:</strong> No cierres esta ventana hasta que la transacción se complete
                    </p>
                  </div>
                </div>
              )}

              {transactionStep === 'confirming' && (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmando Transacción</h3>
                  <p className="text-gray-600 mb-4">
                    Esperando confirmación en la blockchain...
                  </p>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                      ✅ <strong>Transacción enviada:</strong> {txData?.hash}
                    </p>
                  </div>
                </div>
              )}

              {transactionStep === 'completed' && transactionResult && (
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Transacción Exitosa!</h3>
                  <p className="text-gray-600 mb-4">Tu ticket ha sido comprado correctamente</p>
                  
                  <div className="bg-green-50 rounded-lg p-4 mb-4">
                    <div className="text-sm text-green-800">
                      <div className="font-medium mb-2">Detalles de la Transacción:</div>
                      <div>📝 Hash: {transactionResult.hash}</div>
                      <div>📦 Block: {transactionResult.blockNumber}</div>
                      <div>⛽ Gas Used: {transactionResult.gasUsed}</div>
                    </div>
                  </div>

                  <a
                    href={transactionResult.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mb-4"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Ver en BaseScan
                  </a>

                  <button
                    onClick={resetTransaction}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                  >
                    Completar
                  </button>
                </div>
              )}

              {transactionStep === 'error' && (
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Error en la Transacción</h3>
                  <p className="text-red-600 mb-4">{error}</p>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={resetTransaction}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                    >
                      Cerrar
                    </button>
                    <button
                      onClick={() => handleBuyTicket(1, '0.05')}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      Reintentar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Estado de la transacción */}
      {transactionResult && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">Transacción Completada</span>
          </div>
          <div className="text-sm text-green-700">
            <div>Hash: {transactionResult.hash}</div>
            <div>Block: {transactionResult.blockNumber}</div>
            <div>Gas Used: {transactionResult.gasUsed}</div>
          </div>
        </div>
      )}
    </div>
  )
}
