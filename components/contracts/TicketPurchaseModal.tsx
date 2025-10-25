'use client'

import { useState } from 'react'
import { useContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import { useContractContext } from './ContractProvider'
import { formatPrice, formatDate } from '@/lib/contract-utils'
import { X, ShoppingCart, Wallet, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface TicketPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  event: {
    id: number
    name: string
    venue: string
    date: string
    price: string
    image: string
    available: number
  }
}

export function TicketPurchaseModal({ isOpen, onClose, event }: TicketPurchaseModalProps) {
  const { address, isConnected } = useAccount()
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details')
  const [quantity, setQuantity] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [transactionResult, setTransactionResult] = useState<any>(null)
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
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransaction({
    hash: txData?.hash,
  })

  const totalPrice = (parseFloat(event.price) * quantity).toString()
  const gasEstimate = 0.0001 // Estimación de gas para Base
  const finalTotal = (parseFloat(totalPrice) + gasEstimate).toFixed(4)

  const handlePurchase = async () => {
    if (!isConnected) {
      setError('Por favor conecta tu wallet primero')
      return
    }

    setIsProcessing(true)
    setError(null)
    setStep('confirmation')

    try {
      // Simular compra de ticket (en producción esto sería una transacción real)
      console.log('🛒 Iniciando compra de ticket...')
      console.log(`📝 Evento: ${event.name}`)
      console.log(`🎟️ Cantidad: ${quantity}`)
      console.log(`💰 Precio total: ${finalTotal} ETH`)
      
      // Aquí se abriría el wallet para firmar la transacción
      // const tx = await buyTicket({
      //   args: [1], // listingId
      //   value: ethers.parseEther(finalTotal)
      // })

      // Simular transacción exitosa
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`
      setTransactionHash(mockTxHash)
      
      // Simular confirmación
      setTimeout(() => {
        setTransactionResult({
          hash: mockTxHash,
          link: `https://sepolia.basescan.org/tx/${mockTxHash}`,
          status: 'confirmed',
          blockNumber: Math.floor(Math.random() * 1000000) + 30000000,
          gasUsed: '150000'
        })
        setIsProcessing(false)
      }, 3000)

    } catch (err: any) {
      console.error('❌ Error en la compra:', err)
      setError(err.message || 'Error al procesar la compra')
      setIsProcessing(false)
    }
  }

  const handleWalletConnect = () => {
    // En producción, esto activaría la conexión del wallet
    console.log('🔗 Conectando wallet...')
    // El wallet se abriría automáticamente
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Comprar Ticket</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${step === 'details' ? 'text-blue-600' : step === 'payment' || step === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${step === 'details' ? 'bg-blue-600 text-white' : step === 'payment' || step === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                {step === 'payment' || step === 'confirmation' ? <CheckCircle className="w-4 h-4" /> : '1'}
              </div>
              <span className="ml-2 text-sm font-medium">Detalles</span>
            </div>
            
            <div className={`flex items-center ${step === 'payment' ? 'text-blue-600' : step === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${step === 'payment' ? 'bg-blue-600 text-white' : step === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                {step === 'confirmation' ? <CheckCircle className="w-4 h-4" /> : '2'}
              </div>
              <span className="ml-2 text-sm font-medium">Pago</span>
            </div>
            
            <div className={`flex items-center ${step === 'confirmation' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${step === 'confirmation' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Confirmación</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'details' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src={event.image} alt={event.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="font-semibold text-gray-900">{event.name}</h3>
                  <p className="text-sm text-gray-600">{event.venue}</p>
                  <p className="text-sm text-gray-600">{formatDate(new Date(event.date).getTime() / 1000)}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={event.available}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(event.available, quantity + 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Precio unitario</span>
                  <span className="font-medium">{formatPrice(event.price)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Cantidad</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-lg">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={() => setStep('payment')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Continuar al Pago
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Método de Pago</h3>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-blue-900">Base Network</div>
                      <div className="text-sm text-blue-700">Pago con ETH</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Pago</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Precio unitario</span>
                    <span className="text-sm">{formatPrice(event.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cantidad</span>
                    <span className="text-sm">{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gas fee (Base)</span>
                    <span className="text-sm">{formatPrice(gasEstimate.toString())}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-blue-600">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-green-600 text-sm">
                  <div className="w-4 h-4 mr-2">🛡️</div>
                  <span>Transacción segura en Base</span>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <div className="w-4 h-4 mr-2">⚡</div>
                  <span>Gas fees bajos en Base</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('details')}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300"
                >
                  Anterior
                </button>
                <button
                  onClick={handlePurchase}
                  disabled={!isConnected}
                  className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Comprar {formatPrice(finalTotal)}
                </button>
              </div>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="space-y-4">
              {isProcessing && !transactionResult && (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Procesando Compra</h3>
                  <p className="text-gray-600">Por favor firma la transacción en tu wallet...</p>
                  <div className="mt-4 bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Tu wallet se abrirá automáticamente</strong> para firmar la transacción
                    </p>
                  </div>
                </div>
              )}

              {transactionResult && (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Compra Exitosa!</h3>
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
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Ver transacción en BaseScan →
                  </a>
                </div>
              )}

              {error && (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Error en la Compra</h3>
                  <p className="text-red-600 mb-4">{error}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300"
                >
                  {transactionResult ? 'Cerrar' : 'Cancelar'}
                </button>
                {!transactionResult && !error && (
                  <button
                    onClick={handlePurchase}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Reintentar
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
