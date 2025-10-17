'use client'

import { useEffect, useState, useRef } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export function NeuralParticles({ 
  count = 50, 
  speed = 1, 
  colors = ['#78dbff', '#4facfe', '#00d4aa', '#ff77c6'],
  className = ''
}: {
  count?: number
  speed?: number
  colors?: string[]
  className?: string
}) {
  const [particles, setParticles] = useState<Particle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = []
      
      for (let i = 0; i < count; i++) {
        // Usar valores determinísticos basados en el índice para evitar problemas de hidratación
        const seed = i * 7 + 13
        newParticles.push({
          id: i,
          x: (seed * 11) % 100,
          y: (seed * 13) % 100,
          vx: ((seed % 10) - 5) * speed * 0.1,
          vy: ((seed % 7) - 3) * speed * 0.1,
          size: (seed % 4) + 1,
          opacity: ((seed % 8) / 10) + 0.2,
          color: colors[seed % colors.length]
        })
      }
      
      setParticles(newParticles)
    }

    createParticles()

    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.vx
          let newY = particle.y + particle.vy
          let newVx = particle.vx
          let newVy = particle.vy

          // Bounce off edges
          if (newX <= 0 || newX >= 100) {
            newVx = -newVx
            newX = Math.max(0, Math.min(100, newX))
          }
          if (newY <= 0 || newY >= 100) {
            newVy = -newVy
            newY = Math.max(0, Math.min(100, newY))
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          }
        })
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [count, speed])

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full neural-glow"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
    </div>
  )
}

export function NeuralConnections({ 
  particles, 
  maxDistance = 100,
  opacity = 0.3,
  strokeWidth = 1
}: {
  particles: Particle[]
  maxDistance?: number
  opacity?: number
  strokeWidth?: number
}) {
  const connections: Array<{ from: Particle; to: Particle; distance: number }> = []

  // Calcular conexiones entre partículas cercanas
  particles.forEach((particle, i) => {
    particles.slice(i + 1).forEach(otherParticle => {
      const distance = Math.sqrt(
        Math.pow(particle.x - otherParticle.x, 2) + 
        Math.pow(particle.y - otherParticle.y, 2)
      )
      
      if (distance < maxDistance) {
        connections.push({
          from: particle,
          to: otherParticle,
          distance
        })
      }
    })
  })

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <linearGradient id="neuralConnectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#78dbff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#4facfe" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00d4aa" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {connections.map((connection, index) => (
        <line
          key={`connection-${connection.from.id}-${connection.to.id}`}
          x1={`${connection.from.x}%`}
          y1={`${connection.from.y}%`}
          x2={`${connection.to.x}%`}
          y2={`${connection.to.y}%`}
          stroke="url(#neuralConnectionGradient)"
          strokeWidth={strokeWidth}
          opacity={opacity * (1 - connection.distance / maxDistance)}
          className="neural-connection"
        />
      ))}
    </svg>
  )
}
