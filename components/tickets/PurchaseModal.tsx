'use client'

import { useState } from 'react'
import { X, CreditCard, Shield, Zap, Wallet, CheckCircle, AlertCircle } from 'lucide-react'

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
  const [currentStep, setCurrentStep] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [txHash, setTxHash] = useState<string>('')

  const totalPrice = (parseFloat(ticket.price) * quantity).toFixed(4)
  const gasFee = 0.0001 // Gas fee estimado para Base
  const totalWithGas = (parseFloat(totalPrice) + gasFee).toFixed(4)

  const steps = [
    { id: 1, title: 'Detalles', icon: '🎫' },
    { id: 2, title: 'Pago', icon: '💳' },
    { id: 3, title: 'Confirmación', icon: '✅' }
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePurchase = async () => {
    setIsProcessing(true)
    
    try {
      // Simular transacción en Base
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simular hash de transacción
      const mockTxHash = '0x' + Math.random().toString(16).substring(2, 66)
      setTxHash(mockTxHash)
      
      // Cerrar modal después de 3 segundos
      setTimeout(() => {
        onClose()
      }, 3000)
      
    } catch (error) {
      console.error('Error en la compra:', error)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            {/* Event Info */}
            <div className="flex gap-3">
              <img
                src={ticket.image}
                alt={ticket.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white">{ticket.name}</h3>
                <p className="text-white/70 text-xs">{ticket.venue}</p>
                <p className="text-white/70 text-xs">
                  {new Date(ticket.date).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">Cantidad</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  -
                </button>
                <span className="text-white font-medium text-base min-w-[1.5rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(ticket.available, quantity + 1))}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-white/50 text-xs mt-1">
                Disponibles: {ticket.available} tickets
              </p>
            </div>

            {/* Price Preview */}
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Precio unitario:</span>
                <span className="text-white text-sm">{ticket.price} ETH</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-white/70 text-sm">Total:</span>
                <span className="text-blue-400 font-bold text-sm">{totalPrice} ETH</span>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            {/* Payment Method */}
            <div>
              <h3 className="text-base font-semibold text-white mb-3">Método de Pago</h3>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium text-sm">Base Network</p>
                    <p className="text-white/70 text-xs">Pago con ETH</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white/5 rounded-lg p-3">
              <h4 className="text-white font-medium mb-2 text-sm">Resumen de Pago</h4>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-xs">Precio unitario:</span>
                  <span className="text-white text-xs">{ticket.price} ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-xs">Cantidad:</span>
                  <span className="text-white text-xs">{quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-xs">Subtotal:</span>
                  <span className="text-white text-xs">{totalPrice} ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-xs">Gas fee (Base):</span>
                  <span className="text-white text-xs">{gasFee} ETH</span>
                </div>
                <div className="border-t border-white/20 pt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold text-sm">Total:</span>
                    <span className="text-blue-400 font-bold text-sm">{totalWithGas} ETH</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-green-400 text-xs">
                <Shield className="w-3 h-3" />
                Transacción segura en Base
              </div>
              <div className="flex items-center gap-2 text-green-400 text-xs">
                <Zap className="w-3 h-3" />
                Gas fees bajos en Base
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            {isProcessing ? (
              <div className="text-center py-6">
                <div className="neural-loading-ring mx-auto mb-3"></div>
                <h3 className="text-lg font-semibold text-white mb-2">Procesando Compra</h3>
                <p className="text-white/70 text-sm">Confirmando transacción en Base...</p>
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">¡Compra Exitosa!</h3>
                <p className="text-white/70 mb-3 text-sm">Tu ticket ha sido comprado exitosamente</p>
                <div className="bg-white/5 rounded-lg p-3 mb-3">
                  <p className="text-white/70 text-xs">Hash de transacción:</p>
                  <p className="text-blue-400 text-xs font-mono break-all">{txHash}</p>
                </div>
                <p className="text-green-400 text-xs">Redirigiendo...</p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="neural-glass-card rounded-xl max-w-sm sm:max-w-md w-full max-h-[95vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Comprar Ticket</h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Step Navigation */}
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-white/30 text-white/50'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">{step.id}</span>
                  )}
                </div>
                <div className="ml-2 hidden sm:block">
                  <p className={`text-xs font-medium ${
                    currentStep >= step.id ? 'text-white' : 'text-white/50'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-white/30'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="mb-6">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 3 && (
            <div className="flex gap-2">
              {currentStep > 1 && (
                <button
                  onClick={handlePrev}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-lg font-medium transition-colors text-sm"
                >
                  Anterior
                </button>
              )}
              <button
                onClick={currentStep === 2 ? handlePurchase : handleNext}
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {currentStep === 2 ? (
                  <>
                    <Wallet className="w-3 h-3" />
                    {isProcessing ? 'Procesando...' : `Comprar ${totalWithGas} ETH`}
                  </>
                ) : (
                  'Siguiente'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}