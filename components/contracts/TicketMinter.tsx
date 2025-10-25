'use client'

import { useState } from 'react'
import { useContractContext } from './ContractProvider'
import { useEventData } from '@/hooks/useContracts'
import { formatPrice, formatDate } from '@/lib/contract-utils'
import { Ticket, Users, DollarSign, Calendar } from 'lucide-react'

interface TicketMinterProps {
  eventId: number
  onTicketsMinted?: (quantity: number) => void
}

export function TicketMinter({ eventId, onTicketsMinted }: TicketMinterProps) {
  const { mintTickets, isLoading, error } = useContractContext()
  const { data: eventData, isLoading: isEventLoading } = useEventData(eventId)
  
  const [quantity, setQuantity] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  
  const handleMint = async () => {
    if (!eventData || quantity <= 0) return
    
    setIsMinting(true)
    
    try {
      // Calcular precio total
      const totalPrice = (Number(eventData.price) * quantity).toString()
      
      // Mintear tickets
      const tx = await mintTickets(eventId, 1, quantity) // ticketTypeId = 1 por defecto
      
      console.log('✅ Tickets minted successfully:', tx)
      
      // Callback
      if (onTicketsMinted) {
        onTicketsMinted(quantity)
      }
      
      // Reset quantity
      setQuantity(1)
      
    } catch (err) {
      console.error('❌ Error minting tickets:', err)
    } finally {
      setIsMinting(false)
    }
  }
  
  if (isEventLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }
  
  if (!eventData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="text-gray-500 mb-2">❌</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Event Not Found</h3>
          <p className="text-gray-600">The event you're looking for doesn't exist</p>
        </div>
      </div>
    )
  }
  
  const totalPrice = Number(eventData.price) * quantity
  const isSoldOut = Number(eventData.currentSupply) >= Number(eventData.maxSupply)
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{eventData.name}</h2>
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formatDate(Number(eventData.date))}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <span className="font-medium">📍 {eventData.venue}</span>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-600 mr-2">⚠️</div>
            <div>
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Event Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <DollarSign className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Price</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{formatPrice(eventData.price)}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Users className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Available</span>
          </div>
          <p className="text-lg font-bold text-gray-900">
            {Number(eventData.maxSupply) - Number(eventData.currentSupply)} / {eventData.maxSupply}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Ticket className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Sold</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{eventData.currentSupply}</p>
        </div>
      </div>
      
      {/* Mint Form */}
      {!isSoldOut ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={Number(eventData.maxSupply) - Number(eventData.currentSupply)}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => setQuantity(Math.min(Number(eventData.maxSupply) - Number(eventData.currentSupply), quantity + 1))}
                disabled={quantity >= Number(eventData.maxSupply) - Number(eventData.currentSupply)}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Price:</span>
              <span className="text-lg font-bold text-blue-900">{formatPrice(totalPrice.toString())}</span>
            </div>
          </div>
          
          <button
            onClick={handleMint}
            disabled={isMinting || isLoading || quantity <= 0}
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isMinting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Minting Tickets...
              </>
            ) : (
              <>
                <Ticket className="w-4 h-4 mr-2" />
                Mint {quantity} Ticket{quantity > 1 ? 's' : ''}
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-2">🎫</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sold Out</h3>
          <p className="text-gray-600">This event is completely sold out</p>
        </div>
      )}
    </div>
  )
}
