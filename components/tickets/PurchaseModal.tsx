'use client'

import { useState } from 'react'
import { X, CreditCard, Shield, Zap } from 'lucide-react'

interface Ticket {
  id: number
  name: string
  date: string
  price: string
  venue: string
  image: string
  available: number
}

interface PurchaseModalProps {
  ticket: Ticket
  onClose: () => void
}

export function PurchaseModal({ ticket, onClose }: PurchaseModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const totalPrice = (parseFloat(ticket.price) * quantity).toFixed(4)

  const handlePurchase = async () => {
    setIsProcessing(true)
    // Simular compra
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="neural-glass-card rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Comprar Ticket</h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Ticket Info */}
            <div className="flex gap-4">
              <img
                src={ticket.image}
                alt={ticket.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{ticket.name}</h3>
                <p className="text-white/70 text-sm">{ticket.venue}</p>
                <p className="text-white/70 text-sm">
                  {new Date(ticket.date).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-white font-medium mb-2">
                Cantidad
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  -
                </button>
                <span className="text-white font-medium text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(ticket.available, quantity + 1))}
                  className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">Precio unitario:</span>
                <span className="text-white">{ticket.price} ETH</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">Cantidad:</span>
                <span className="text-white">{quantity}</span>
              </div>
              <div className="border-t border-white/20 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Total:</span>
                  <span className="text-blue-400 font-bold text-lg">{totalPrice} ETH</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Shield className="w-4 h-4" />
                Transacción segura en Base
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Zap className="w-4 h-4" />
                Gasless transaction
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CreditCard className="w-4 h-4" />
                One-click purchase
              </div>
            </div>

            {/* Purchase Button */}
            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isProcessing ? 'Procesando...' : 'Comprar Ahora'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}