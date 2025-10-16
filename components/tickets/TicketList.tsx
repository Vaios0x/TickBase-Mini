'use client'

import { useState, useEffect } from 'react'
import { TicketCard } from './TicketCard'

interface Ticket {
  id: number
  name: string
  date: string
  price: string
  venue: string
  image: string
  available: number
}

export function TicketList({ onSelectTicket }: { onSelectTicket: (ticket: any) => void }) {
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    // Mock data para demostración
    setTickets([
      {
        id: 1,
        name: "Concierto de Rock",
        date: "2025-01-15",
        price: "0.05",
        venue: "Estadio Nacional",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
        available: 50
      },
      {
        id: 2,
        name: "Festival de Música Electrónica",
        date: "2025-02-20",
        price: "0.08",
        venue: "Centro de Convenciones",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        available: 100
      },
      {
        id: 3,
        name: "Conferencia de Blockchain",
        date: "2025-03-10",
        price: "0.03",
        venue: "Centro de Convenciones",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
        available: 200
      }
    ])
  }, [])

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          🎫 Boletos NFT Disponibles
        </h2>
        <p className="text-white/70">
          Compra y vende boletos NFT de forma segura en Base
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onSelect={() => onSelectTicket(ticket)}
          />
        ))}
      </div>
    </div>
  )
}