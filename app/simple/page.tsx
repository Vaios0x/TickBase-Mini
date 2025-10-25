'use client'

import { useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { CheckCircle, AlertCircle, Loader2, ExternalLink, Wallet } from 'lucide-react'

export default function SimplePage() {
  const { address, isConnected, connector } = useAccount()
  const { connect, connectors, error: connectError } = useConnect()
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [transactionResult, setTransactionResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const connectWallet = async () => {
    try {
      setError(null)
      console.log('🔗 Conectando wallet...')
      
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

  const handlePurchase = async () => {
    if (!isConnected) {
      setError('Por favor conecta tu wallet primero')
      await connectWallet()
      return
    }

    setIsPurchasing(true)
    setError(null)

    try {
      console.log('🛒 Iniciando compra de ticket...')
      console.log(`🌐 Red: Base Sepolia Testnet`)
      console.log(`👤 Wallet: ${connector?.name}`)
      
      // Simular transacción
      const mockTx = {
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        blockNumber: Math.floor(Math.random() * 1000000) + 30000000,
        gasUsed: '21000',
        gasPrice: '1000000000'
      }
      
      console.log('📝 Transacción simulada:', mockTx.hash)
      console.log('🔗 Link BaseScan:', `https://sepolia.basescan.org/tx/${mockTx.hash}`)
      
      const result = {
        hash: mockTx.hash,
        link: `https://sepolia.basescan.org/tx/${mockTx.hash}`,
        status: 'confirmed',
        blockNumber: mockTx.blockNumber,
        gasUsed: mockTx.gasUsed,
        gasPrice: mockTx.gasPrice,
        network: 'Base Sepolia Testnet',
        explorer: 'https://sepolia.basescan.org'
      }
      
      setTransactionResult(result)
      
      console.log('✅ Compra completada:', result)
      
    } catch (err: any) {
      console.error('❌ Error en compra:', err)
      setError(err.message || 'Error al procesar la compra')
    } finally {
      setIsPurchasing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🎫 TickBase - Compra de Tickets</h1>
          
          {/* Estado de conexión */}
          {!isConnected && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
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

          {/* Información del evento */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">🎵 Festival de Música Electrónica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <strong>📅 Fecha:</strong> 19 de Diciembre, 2025
              </div>
              <div>
                <strong>📍 Lugar:</strong> Centro de Convenciones
              </div>
              <div>
                <strong>💰 Precio:</strong> 0.08 ETH
              </div>
              <div>
                <strong>🎫 Disponibles:</strong> 100 tickets
              </div>
            </div>
          </div>

          {/* Botón de compra */}
          <button
            onClick={handlePurchase}
            disabled={!isConnected || isPurchasing}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-semibold"
          >
            {isPurchasing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Procesando...
              </>
            ) : (
              'Comprar Ticket por 0.08 ETH'
            )}
          </button>

          {/* Resultado de la transacción */}
          {transactionResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-lg font-semibold text-green-800">¡Compra Exitosa!</span>
              </div>
              <div className="text-sm text-green-700 space-y-2">
                <div><strong>Hash:</strong> {transactionResult.hash}</div>
                <div><strong>Block:</strong> {transactionResult.blockNumber}</div>
                <div><strong>Gas Used:</strong> {transactionResult.gasUsed}</div>
                <div><strong>Red:</strong> {transactionResult.network}</div>
                <a 
                  href={transactionResult.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Ver en BaseScan
                </a>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
              <div className="flex items-center mb-2">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-medium text-red-800">Error</span>
              </div>
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* Información de red */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">🌐 Información de Red</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>Red:</strong> Base Sepolia Testnet</div>
              <div><strong>Chain ID:</strong> 84532</div>
              <div><strong>RPC:</strong> https://sepolia.base.org</div>
              <div><strong>Explorer:</strong> https://sepolia.basescan.org</div>
              <div><strong>Wallet:</strong> {connector?.name || 'No conectado'}</div>
              <div><strong>Address:</strong> {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'No conectado'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
