'use client'

import React, { useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACT_ADDRESSES } from '@/lib/constants'
import { CheckCircle, AlertCircle, Loader2, ExternalLink, Wallet } from 'lucide-react'

interface SimpleTicketPurchaseProps {
  eventId: number
  price: string
  onPurchaseComplete?: (result: any) => void
}

export function SimpleTicketPurchase({ eventId, price, onPurchaseComplete }: SimpleTicketPurchaseProps) {
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
      console.log(`📝 Event ID: ${eventId}`)
      console.log(`💰 Precio: ${price} ETH`)
      console.log(`🌐 Red: Base Sepolia Testnet`)
      console.log(`🔗 Contrato: ${CONTRACT_ADDRESSES.MARKETPLACE}`)
      
      // Simular transacción (en producción esto sería real)
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
      onPurchaseComplete?.(result)
      
      console.log('✅ Compra completada:', result)
      
    } catch (err: any) {
      console.error('❌ Error en compra:', err)
      setError(err.message || 'Error al procesar la compra')
    } finally {
      setIsPurchasing(false)
    }
  }

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
        disabled={!isConnected || isPurchasing}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isPurchasing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Procesando...
          </>
        ) : (
          `Comprar por ${price} ETH`
        )}
      </button>

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
          <div>📝 Transacciones: Simuladas (para demo)</div>
          <div>⛽ Gas: Muy bajo en Base</div>
          <div>👤 Wallet: {connector?.name || 'No conectado'}</div>
        </div>
      </div>
    </div>
  )
}
