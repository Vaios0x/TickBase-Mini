'use client'

// import { useBaseAccount } from '@coinbase/onchainkit/wallet' // Comentado temporalmente
import { useState } from 'react'
import { Zap, CheckCircle } from 'lucide-react'
import confetti from 'canvas-confetti'
import { encodeFunctionData } from 'viem'
import { TICKET_ABI } from '@/lib/abi'

interface Event {
  id: number
  name: string
  price: string
  image: string
  venue: string
  date: string
}

export function OneClickBuy({ event }: { event: Event }) {
  // const { baseAccount, isConnected } = useBaseAccount() // Comentado temporalmente
  const baseAccount = null // Valor por defecto
  const isConnected = false // Valor por defecto
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [purchased, setPurchased] = useState(false)

  const handleInstantPurchase = async () => {
    if (!isConnected || !baseAccount) return
    
    setIsPurchasing(true)
    
    try {
      // Execute gasless transaction using Base Account
      // TODO: Implementar transacción gasless
      // Simular compra exitosa por ahora
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Celebrate!
      setPurchased(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      
      // Track conversion
      trackEvent('one_click_purchase', {
        eventId: event.id,
        price: event.price,
        method: 'base_account'
      })
      
    } catch (error) {
      console.error('Purchase failed:', error)
      // toast.error('Purchase failed. Please try again.')
    } finally {
      setIsPurchasing(false)
    }
  }

  const trackEvent = (eventName: string, properties: any) => {
    // Track analytics event
    console.log('Analytics:', eventName, properties)
  }

  if (purchased) {
    return (
      <div className="bg-green-500/20 border border-green-500 rounded-xl p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-green-400 mb-2">
          Ticket Purchased! 🎉
        </h3>
        <p className="text-white/70 mb-4">
          Check your wallet for your NFT ticket
        </p>
        <button
          onClick={() => window.location.href = '/my-tickets'}
          className="btn-primary"
        >
          View My Tickets
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleInstantPurchase}
        disabled={isPurchasing || !isConnected}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transform transition-all hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isPurchasing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            Processing...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            Buy Instantly - {event.price} ETH
          </>
        )}
      </button>
      
      <p className="text-center text-white/50 text-sm">
        ⚡ Gasless • 🔒 Secure • ✨ Instant
      </p>
    </div>
  )
}
