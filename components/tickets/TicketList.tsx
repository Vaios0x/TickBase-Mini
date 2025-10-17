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
        date: "2025-11-15",
        price: "0.05",
        venue: "Estadio Nacional",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
        available: 50
      },
      {
        id: 2,
        name: "Festival de Música Electrónica",
        date: "2025-12-20",
        price: "0.08",
        venue: "Centro de Convenciones",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        available: 100
      },
      {
        id: 3,
        name: "Conferencia de Blockchain",
        date: "2026-01-10",
        price: "0.03",
        venue: "Centro de Convenciones",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
        available: 200
      },
      {
        id: 4,
        name: "Partido de Fútbol - Clásico",
        date: "2025-11-25",
        price: "0.12",
        venue: "Estadio Monumental",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400",
        available: 25
      },
      {
        id: 5,
        name: "Festival de Jazz",
        date: "2025-12-14",
        price: "0.07",
        venue: "Teatro Municipal",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        available: 80
      },
      {
        id: 6,
        name: "Exposición de Arte Digital",
        date: "2026-01-05",
        price: "0.04",
        venue: "Museo de Arte Moderno",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
        available: 150
      },
      {
        id: 7,
        name: "Conferencia de IA y Machine Learning",
        date: "2025-12-28",
        price: "0.06",
        venue: "Centro de Innovación",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
        available: 120
      },
      {
        id: 8,
        name: "Festival de Cine Independiente",
        date: "2026-01-15",
        price: "0.09",
        venue: "Cine Paradiso",
        image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400",
        available: 60
      },
      {
        id: 9,
        name: "Concierto de Música Clásica",
        date: "2025-11-30",
        price: "0.11",
        venue: "Auditorio Nacional",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        available: 40
      },
      {
        id: 10,
        name: "Workshop de Desarrollo Web3",
        date: "2025-12-10",
        price: "0.02",
        venue: "Campus Tecnológico",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
        available: 300
      },
      {
        id: 11,
        name: "Festival de Comida Gourmet",
        date: "2026-01-20",
        price: "0.15",
        venue: "Parque Central",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
        available: 90
      },
      {
        id: 12,
        name: "Concierto de Reggaeton",
        date: "2025-12-05",
        price: "0.10",
        venue: "Arena Coliseo",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
        available: 75
      },
      {
        id: 13,
        name: "Exposición de NFT Art",
        date: "2026-01-25",
        price: "0.08",
        venue: "Galería Digital",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
        available: 110
      },
      {
        id: 14,
        name: "Festival de Tecnología y Gaming",
        date: "2026-02-10",
        price: "0.13",
        venue: "Centro de Convenciones Tech",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400",
        available: 180
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