'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { useTicketNFT, useMarketplace, useFactory, useValidator, useSimpleFactory } from '@/hooks/useContracts'
import { CONTRACT_ADDRESSES } from '@/lib/constants'
import { parseContractError } from '@/lib/contract-utils'

// Tipos para el contexto
interface ContractContextType {
  // Contratos
  ticketNFT: any
  marketplace: any
  factory: any
  validator: any
  simpleFactory: any
  
  // Estado
  isConnected: boolean
  chainId: number
  address: string | undefined
  
  // Funciones principales
  createEvent: (eventData: CreateEventData) => Promise<any>
  mintTickets: (eventId: number, ticketTypeId: number, quantity: number) => Promise<any>
  listTicket: (tokenId: number, price: string) => Promise<any>
  buyTicket: (listingId: number, price: string) => Promise<any>
  validateTicket: (tokenId: number, validationCode: string) => Promise<any>
  
  // Estado de carga
  isLoading: boolean
  error: string | null
  
  // Utilidades
  clearError: () => void
  refreshContracts: () => void
}

interface CreateEventData {
  name: string
  venue: string
  date: string
  price: string
  maxSupply: number
  metadataURI: string
}

// Contexto
const ContractContext = createContext<ContractContextType | undefined>(undefined)

// Hook para usar el contexto
export function useContractContext() {
  const context = useContext(ContractContext)
  if (!context) {
    throw new Error('useContractContext must be used within a ContractProvider')
  }
  return context
}

// Provider principal
interface ContractProviderProps {
  children: ReactNode
}

export function ContractProvider({ children }: ContractProviderProps) {
  // Hooks de wagmi
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  
  // Hooks de contratos
  const ticketNFT = useTicketNFT()
  const marketplace = useMarketplace()
  const factory = useFactory()
  const validator = useValidator()
  const simpleFactory = useSimpleFactory()
  
  // Estado local
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Limpiar error
  const clearError = () => setError(null)
  
  // Refrescar contratos
  const refreshContracts = () => {
    // Los contratos se refrescan automáticamente con wagmi
    console.log('🔄 Refrescando contratos...')
  }
  
  // Función para crear evento
  const createEvent = async (eventData: CreateEventData) => {
    if (!factory) {
      throw new Error('Factory contract not available')
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const tx = await factory.write.createEvent([
        eventData.name,
        eventData.venue,
        Math.floor(new Date(eventData.date).getTime() / 1000),
        parseEther(eventData.price),
        BigInt(eventData.maxSupply),
        eventData.metadataURI
      ])
      
      console.log('✅ Event created:', tx)
      return tx
    } catch (err) {
      const errorMessage = parseContractError(err)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }
  
  // Función para mintear tickets
  const mintTickets = async (eventId: number, ticketTypeId: number, quantity: number) => {
    if (!factory) {
      throw new Error('Factory contract not available')
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const tx = await factory.write.mintTickets([
        BigInt(eventId),
        BigInt(ticketTypeId),
        BigInt(quantity)
      ])
      
      console.log('✅ Tickets minted:', tx)
      return tx
    } catch (err) {
      const errorMessage = parseContractError(err)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }
  
  // Función para listar ticket
  const listTicket = async (tokenId: number, price: string) => {
    if (!marketplace) {
      throw new Error('Marketplace contract not available')
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const tx = await marketplace.write.listTicket([
        BigInt(tokenId),
        parseEther(price)
      ])
      
      console.log('✅ Ticket listed:', tx)
      return tx
    } catch (err) {
      const errorMessage = parseContractError(err)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }
  
  // Función para comprar ticket
  const buyTicket = async (listingId: number, price: string) => {
    if (!marketplace) {
      throw new Error('Marketplace contract not available')
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const tx = await marketplace.write.buyTicket([
        BigInt(listingId)
      ], {
        value: parseEther(price)
      })
      
      console.log('✅ Ticket purchased:', tx)
      return tx
    } catch (err) {
      const errorMessage = parseContractError(err)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }
  
  // Función para validar ticket
  const validateTicket = async (tokenId: number, validationCode: string) => {
    if (!validator) {
      throw new Error('Validator contract not available')
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const tx = await validator.write.validateTicket([
        BigInt(tokenId),
        validationCode
      ])
      
      console.log('✅ Ticket validated:', tx)
      return tx
    } catch (err) {
      const errorMessage = parseContractError(err)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }
  
  // Efecto para detectar cambios de red
  useEffect(() => {
    if (chainId && chainId !== 84532 && chainId !== 8453) {
      setError('Please switch to Base network')
    } else {
      setError(null)
    }
  }, [chainId])
  
  // Valor del contexto
  const contextValue: ContractContextType = {
    // Contratos
    ticketNFT,
    marketplace,
    factory,
    validator,
    simpleFactory,
    
    // Estado
    isConnected,
    chainId,
    address,
    
    // Funciones principales
    createEvent,
    mintTickets,
    listTicket,
    buyTicket,
    validateTicket,
    
    // Estado de carga
    isLoading,
    error,
    
    // Utilidades
    clearError,
    refreshContracts,
  }
  
  return (
    <ContractContext.Provider value={contextValue}>
      {children}
    </ContractContext.Provider>
  )
}

// Componente de error para contratos
export function ContractErrorBoundary({ children }: { children: ReactNode }) {
  const { error, clearError } = useContractContext()
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-red-600 mr-2">⚠️</div>
            <div>
              <h3 className="text-red-800 font-medium">Contract Error</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={clearError}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Dismiss
          </button>
        </div>
      </div>
    )
  }
  
  return <>{children}</>
}

// Componente de estado de conexión
export function ConnectionStatus() {
  const { isConnected, chainId, address } = useContractContext()
  
  if (!isConnected) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-yellow-600 mr-2">🔌</div>
          <div>
            <h3 className="text-yellow-800 font-medium">Wallet Not Connected</h3>
            <p className="text-yellow-600 text-sm">Please connect your wallet to interact with contracts</p>
          </div>
        </div>
      </div>
    )
  }
  
  if (chainId !== 84532 && chainId !== 8453) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-orange-600 mr-2">🌐</div>
          <div>
            <h3 className="text-orange-800 font-medium">Wrong Network</h3>
            <p className="text-orange-600 text-sm">Please switch to Base network</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center">
        <div className="text-green-600 mr-2">✅</div>
        <div>
          <h3 className="text-green-800 font-medium">Connected to Base</h3>
          <p className="text-green-600 text-sm">Address: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
        </div>
      </div>
    </div>
  )
}
