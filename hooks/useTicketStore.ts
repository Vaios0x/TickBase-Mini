'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useContractRead } from 'wagmi'
import { create } from 'zustand'

interface Ticket {
  id: number
  name: string
  date: string
  price: string
  venue: string
  image: string
  available: number
  category: string
  description?: string
  organizer?: string
}

interface TicketStore {
  tickets: Ticket[]
  userTickets: Ticket[]
  isLoading: boolean
  error: string | null
  setTickets: (tickets: Ticket[]) => void
  setUserTickets: (tickets: Ticket[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addTicket: (ticket: Ticket) => void
  updateTicket: (id: number, updates: Partial<Ticket>) => void
  removeTicket: (id: number) => void
}

export const useTicketStore = create<TicketStore>((set, get) => ({
  tickets: [],
  userTickets: [],
  isLoading: false,
  error: null,
  
  setTickets: (tickets) => set({ tickets }),
  setUserTickets: (tickets) => set({ userTickets: tickets }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addTicket: (ticket) => set((state) => ({
    tickets: [...state.tickets, ticket]
  })),
  
  updateTicket: (id, updates) => set((state) => ({
    tickets: state.tickets.map(ticket => 
      ticket.id === id ? { ...ticket, ...updates } : ticket
    )
  })),
  
  removeTicket: (id) => set((state) => ({
    tickets: state.tickets.filter(ticket => ticket.id !== id)
  }))
}))

// Hook para obtener tickets del usuario
export function useUserTickets() {
  const { address } = useAccount()
  const { userTickets, setUserTickets, setLoading, setError } = useTicketStore()

  // Simular lectura de contratos (en producción usar useContractRead)
  useEffect(() => {
    if (!address) {
      setUserTickets([])
      return
    }

    const loadUserTickets = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Simular llamada a contrato
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data para tickets del usuario
        const mockUserTickets: Ticket[] = [
          {
            id: 101,
            name: "Concierto de Jazz",
            date: "2025-01-20",
            price: "0.04",
            venue: "Blue Note Club",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
            available: 1,
            category: "music",
            description: "Una noche íntima de jazz con los mejores artistas",
            organizer: "Blue Note Productions"
          },
          {
            id: 102,
            name: "Tech Conference 2025",
            date: "2025-02-15",
            price: "0.06",
            venue: "Convention Center",
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
            available: 1,
            category: "tech",
            description: "La conferencia de tecnología más importante del año",
            organizer: "Tech Events Inc"
          }
        ]
        
        setUserTickets(mockUserTickets)
      } catch (error) {
        setError('Error al cargar tickets del usuario')
        console.error('Error loading user tickets:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUserTickets()
  }, [address, setUserTickets, setLoading, setError])

  return {
    userTickets,
    isLoading: useTicketStore(state => state.isLoading),
    error: useTicketStore(state => state.error)
  }
}

// Hook para obtener todos los tickets disponibles
export function useAvailableTickets() {
  const { tickets, setTickets, setLoading, setError } = useTicketStore()

  useEffect(() => {
    const loadTickets = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Simular llamada a API/contrato
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockTickets: Ticket[] = [
          {
            id: 1,
            name: "Concierto de Rock",
            date: "2025-01-15",
            price: "0.05",
            venue: "Estadio Nacional",
            image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
            available: 50,
            category: "music",
            description: "El concierto de rock más esperado del año",
            organizer: "Rock Productions"
          },
          {
            id: 2,
            name: "Festival de Música Electrónica",
            date: "2025-02-20",
            price: "0.08",
            venue: "Centro de Convenciones",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
            available: 100,
            category: "music",
            description: "El festival de música electrónica más grande de la ciudad",
            organizer: "Electronic Events"
          },
          {
            id: 3,
            name: "Conferencia de Blockchain",
            date: "2025-03-10",
            price: "0.03",
            venue: "Centro de Convenciones",
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
            available: 200,
            category: "tech",
            description: "La conferencia de blockchain más importante del año",
            organizer: "Blockchain Events"
          },
          {
            id: 4,
            name: "Partido de Fútbol",
            date: "2025-01-25",
            price: "0.12",
            venue: "Estadio Monumental",
            image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400",
            available: 25,
            category: "sports",
            description: "El clásico más esperado del año",
            organizer: "Sports Events"
          }
        ]
        
        setTickets(mockTickets)
      } catch (error) {
        setError('Error al cargar tickets disponibles')
        console.error('Error loading tickets:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTickets()
  }, [setTickets, setLoading, setError])

  return {
    tickets,
    isLoading: useTicketStore(state => state.isLoading),
    error: useTicketStore(state => state.error)
  }
}

// Hook para operaciones de tickets
export function useTicketOperations() {
  const { addTicket, updateTicket, removeTicket } = useTicketStore()

  const purchaseTicket = async (ticketId: number, quantity: number = 1) => {
    try {
      // Simular compra de ticket
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // En producción, aquí se ejecutaría la transacción
      console.log(`Purchasing ${quantity} ticket(s) with ID: ${ticketId}`)
      
      return { success: true, transactionHash: '0x123...abc' }
    } catch (error) {
      console.error('Error purchasing ticket:', error)
      return { success: false, error: 'Error al comprar ticket' }
    }
  }

  const transferTicket = async (ticketId: number, toAddress: string) => {
    try {
      // Simular transferencia de ticket
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log(`Transferring ticket ${ticketId} to ${toAddress}`)
      
      return { success: true, transactionHash: '0x456...def' }
    } catch (error) {
      console.error('Error transferring ticket:', error)
      return { success: false, error: 'Error al transferir ticket' }
    }
  }

  const validateTicket = async (ticketId: string) => {
    try {
      // Simular validación de ticket
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock validation result
      const isValid = Math.random() > 0.3 // 70% chance of being valid
      
      return {
        success: true,
        isValid,
        ticketInfo: isValid ? {
          id: ticketId,
          event: 'Concierto de Rock',
          date: '2025-01-15',
          venue: 'Estadio Nacional',
          owner: '0x1234...5678',
          price: '0.05 ETH',
          status: 'Valid'
        } : null
      }
    } catch (error) {
      console.error('Error validating ticket:', error)
      return { success: false, error: 'Error al validar ticket' }
    }
  }

  return {
    purchaseTicket,
    transferTicket,
    validateTicket
  }
}