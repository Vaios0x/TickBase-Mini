'use client'

import { useState, useEffect } from 'react'
import { useContractContext } from './ContractProvider'
import { useListingData, useAllEvents } from '@/hooks/useContracts'
import { formatPrice, formatDate } from '@/lib/contract-utils'
import { ShoppingCart, List, DollarSign, Calendar, MapPin, User } from 'lucide-react'

interface MarketplaceInterfaceProps {
  onTicketPurchased?: (listingId: number) => void
}

export function MarketplaceInterface({ onTicketPurchased }: MarketplaceInterfaceProps) {
  const { buyTicket, listTicket, isLoading, error } = useContractContext()
  const { data: totalEvents } = useAllEvents()
  
  const [listings, setListings] = useState<any[]>([])
  const [isLoadingListings, setIsLoadingListings] = useState(true)
  const [selectedListing, setSelectedListing] = useState<number | null>(null)
  const [isPurchasing, setIsPurchasing] = useState(false)
  
  // Simular listings (en producción esto vendría del contrato)
  useEffect(() => {
    const mockListings = [
      {
        id: 1,
        tokenId: 1,
        seller: '0x1234...5678',
        price: '0.05',
        isActive: true,
        createdAt: Date.now() - 86400000, // 1 día atrás
        eventName: 'Summer Music Festival 2025',
        eventDate: '2025-07-15',
        venue: 'Central Park'
      },
      {
        id: 2,
        tokenId: 2,
        seller: '0x8765...4321',
        price: '0.03',
        isActive: true,
        createdAt: Date.now() - 172800000, // 2 días atrás
        eventName: 'Championship Final Match',
        eventDate: '2025-06-20',
        venue: 'National Stadium'
      }
    ]
    
    setTimeout(() => {
      setListings(mockListings)
      setIsLoadingListings(false)
    }, 1000)
  }, [])
  
  const handlePurchase = async (listingId: number, price: string) => {
    setIsPurchasing(true)
    
    try {
      const tx = await buyTicket(listingId, price)
      console.log('✅ Ticket purchased successfully:', tx)
      
      // Actualizar listings
      setListings(prev => prev.filter(listing => listing.id !== listingId))
      
      // Callback
      if (onTicketPurchased) {
        onTicketPurchased(listingId)
      }
      
    } catch (err) {
      console.error('❌ Error purchasing ticket:', err)
    } finally {
      setIsPurchasing(false)
    }
  }
  
  const handleListTicket = async (tokenId: number, price: string) => {
    try {
      const tx = await listTicket(tokenId, price)
      console.log('✅ Ticket listed successfully:', tx)
    } catch (err) {
      console.error('❌ Error listing ticket:', err)
    }
  }
  
  if (isLoadingListings) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Secondary Marketplace</h2>
          <div className="flex items-center text-sm text-gray-600">
            <List className="w-4 h-4 mr-1" />
            <span>{listings.length} listings available</span>
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
        
        {listings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">🛒</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Listings Available</h3>
            <p className="text-gray-600">There are no tickets listed for sale at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{listing.eventName}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(new Date(listing.eventDate).getTime() / 1000)}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{listing.venue}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>Seller: {listing.seller}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Price:</span>
                    <span className="text-lg font-bold text-green-600">{formatPrice(listing.price)}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handlePurchase(listing.id, listing.price)}
                  disabled={isPurchasing || isLoading}
                  className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isPurchasing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Purchasing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Ticket
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* List Your Ticket Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">List Your Ticket for Sale</h3>
        <p className="text-gray-600 mb-4">Have a ticket you want to sell? List it on the marketplace</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Token ID
            </label>
            <input
              type="number"
              placeholder="Enter token ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (ETH)
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="0.05"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={() => {
              // TODO: Implementar listado de tickets
              console.log('List ticket functionality to be implemented')
            }}
            className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            List Ticket
          </button>
        </div>
      </div>
    </div>
  )
}
