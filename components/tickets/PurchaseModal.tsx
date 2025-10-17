'use client'

import { useState } from 'react'
import { X, CreditCard, Shield, Zap, Wallet, CheckCircle, AlertCircle } from 'lucide-react'
import { TicketLoaderFullScreen } from '@/components/ui/TicketLoader'

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
      // Simular proceso completo de compra en Base Mainnet
      console.log('🚀 Iniciando compra en Base Mainnet...')
      
      // Paso 1: Verificar wallet conectado
      await new Promise(resolve => setTimeout(resolve, 800))
      console.log('✅ Wallet verificado')
      
      // Paso 2: Aprobar tokens (si es necesario)
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('✅ Aprobación de tokens completada')
      
      // Paso 3: Ejecutar transacción de compra
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('✅ Transacción enviada a Base')
      
      // Paso 4: Esperar confirmación
      await new Promise(resolve => setTimeout(resolve, 1200))
      console.log('✅ Transacción confirmada en Base')
      
      // Generar hash de transacción realista de Base
      const mockTxHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')
      setTxHash(mockTxHash)
      
      console.log('🎉 Compra completada exitosamente!')
      console.log('📄 Hash de transacción:', mockTxHash)
      console.log('🔗 Ver en BaseScan: https://basescan.org/tx/' + mockTxHash)
      
      // Simular creación del ticket NFT
      console.log('🎫 Creando ticket NFT...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('✅ Ticket NFT creado exitosamente')
      
      // Avanzar al paso 3 y terminar procesamiento
      setIsProcessing(false)
      setCurrentStep(3)
      
    } catch (error) {
      console.error('❌ Error en la compra:', error)
      setIsProcessing(false)
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
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Precio unitario:</span>
                  <span className="text-white text-sm">{ticket.price} ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Cantidad:</span>
                  <span className="text-white text-sm">{quantity} tickets</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Subtotal:</span>
                  <span className="text-white text-sm">{totalPrice} ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Gas fee (Base):</span>
                  <span className="text-white text-sm">0.0001 ETH</span>
                </div>
                <div className="border-t border-white/20 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Total a pagar:</span>
                    <span className="text-blue-400 font-bold">{totalWithGas} ETH</span>
                  </div>
                </div>
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
                <div className="neural-glass-card rounded-xl p-6 mb-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5 text-blue-400" />
                    Procesando en Base Mainnet
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white/80">Verificando wallet conectado...</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-white/80">Aprobando tokens en Base...</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-white/80">Ejecutando transacción...</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-white/80">Esperando confirmación...</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-blue-400 mb-1">Red: Base Mainnet</div>
                    <div className="text-xs text-white/70">Gas estimado: 0.0001 ETH</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3 animate-pulse" />
                <h3 className="text-lg font-semibold text-white mb-2">¡Ticket NFT Creado!</h3>
                <p className="text-white/70 mb-4 text-sm">Tu ticket NFT ha sido creado exitosamente en Base</p>
                
                <div className="neural-glass-card rounded-xl p-4 mb-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-xs">Evento:</span>
                      <span className="text-white text-xs font-medium">{ticket.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-xs">Fecha:</span>
                      <span className="text-white text-xs">{new Date(ticket.date).toLocaleDateString('es-ES')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-xs">Cantidad:</span>
                      <span className="text-white text-xs">{quantity} ticket{quantity > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-xs">Red:</span>
                      <span className="text-blue-400 text-xs font-medium">Base Mainnet</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-xs">Estado:</span>
                      <span className="text-green-400 text-xs font-medium">✅ NFT Creado</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-xs">Gas usado:</span>
                      <span className="text-white text-xs">0.0001 ETH</span>
                    </div>
                    <div className="border-t border-white/20 pt-2">
                      <p className="text-white/70 text-xs mb-1">Hash de transacción:</p>
                      <p className="text-white font-mono text-xs break-all bg-white/5 rounded p-2">{txHash}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <button 
                    onClick={() => {
                      // Simular navegación a la página de tickets del usuario
                      console.log('🎫 Navegando a mis tickets...')
                      // Aquí podrías navegar a /my-tickets o abrir un modal con el ticket
                      alert('🎫 ¡Tu ticket NFT ha sido agregado a tu colección! Ve a "Mis Tickets" para verlo.')
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 transition-all text-sm"
                  >
                    🎫 Ver mi Ticket NFT
                  </button>
                  <a 
                    href={`https://basescan.org/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all text-sm"
                  >
                    🔗 Ver en BaseScan
                  </a>
                </div>
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
      <div className="neural-glass-card rounded-xl max-w-sm sm:max-w-md w-full max-h-[98vh] overflow-y-auto">
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