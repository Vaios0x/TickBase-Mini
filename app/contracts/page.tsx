'use client'

import { useState } from 'react'
import { ContractProvider, ContractErrorBoundary, ConnectionStatus } from '@/components/contracts/ContractProvider'
import { EventCreator } from '@/components/contracts/EventCreator'
import { TicketMinter } from '@/components/contracts/TicketMinter'
import { MarketplaceInterface } from '@/components/contracts/MarketplaceInterface'
import { ValidationInterface } from '@/components/contracts/ValidationInterface'
import { Calendar, Ticket, ShoppingCart, CheckCircle, Settings, Home } from 'lucide-react'
import Link from 'next/link'

export default function ContractsPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'mint' | 'marketplace' | 'validate'>('create')
  const [selectedEventId, setSelectedEventId] = useState<number>(1)
  
  const tabs = [
    { id: 'create', label: 'Create Event', icon: Calendar },
    { id: 'mint', label: 'Mint Tickets', icon: Ticket },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
    { id: 'validate', label: 'Validate', icon: CheckCircle },
  ]
  
  return (
    <ContractProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center text-gray-900 hover:text-blue-600">
                  <Home className="w-5 h-5 mr-2" />
                  <span className="font-semibold">TickBase</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <ConnectionStatus />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Contract Interface</h1>
            <p className="text-gray-600">Interact with TickBase smart contracts directly</p>
          </div>
          
          <ContractErrorBoundary>
            <div className="bg-white rounded-lg shadow-lg">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {tab.label}
                      </button>
                    )
                  })}
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'create' && (
                  <div>
                    <EventCreator 
                      onEventCreated={(eventId) => {
                        console.log('Event created:', eventId)
                        setSelectedEventId(eventId)
                        setActiveTab('mint')
                      }}
                    />
                  </div>
                )}
                
                {activeTab === 'mint' && (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Mint Tickets</h2>
                      <p className="text-gray-600">Mint tickets for an existing event</p>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event ID
                      </label>
                      <input
                        type="number"
                        value={selectedEventId}
                        onChange={(e) => setSelectedEventId(parseInt(e.target.value) || 1)}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                      />
                    </div>
                    
                    <TicketMinter 
                      eventId={selectedEventId}
                      onTicketsMinted={(quantity) => {
                        console.log('Tickets minted:', quantity)
                      }}
                    />
                  </div>
                )}
                
                {activeTab === 'marketplace' && (
                  <div>
                    <MarketplaceInterface 
                      onTicketPurchased={(listingId) => {
                        console.log('Ticket purchased:', listingId)
                      }}
                    />
                  </div>
                )}
                
                {activeTab === 'validate' && (
                  <div>
                    <ValidationInterface 
                      onTicketValidated={(tokenId, isValid) => {
                        console.log('Ticket validated:', tokenId, isValid)
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </ContractErrorBoundary>
        </div>
        
        {/* Footer */}
        <div className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">TickBase Smart Contracts</h3>
              <p className="text-gray-600 mb-4">
                Powered by Base network with 1% platform fees
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <span>TicketNFT: 0xE81f...148D</span>
                <span>Marketplace: 0xff85...7CC4</span>
                <span>Factory: 0x7A89...92d7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContractProvider>
  )
}
