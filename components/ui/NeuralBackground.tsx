'use client'

import { useEffect, useState } from 'react'

export function NeuralBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    // Generar partículas neurales dinámicas
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 20
      }))
      setParticles(newParticles)
    }

    generateParticles()
    
    // Regenerar partículas cada 30 segundos
    const interval = setInterval(generateParticles, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="neural-glass-bg fixed inset-0 -z-10">
      {/* Neural Grid Overlay */}
      <div className="neural-grid"></div>
      
      {/* Floating Neural Particles */}
      <div className="neural-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="neural-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Neural Energy Waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Neural Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#764ba2" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f093fb" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {particles.slice(0, 8).map((particle, index) => {
          const nextParticle = particles[(index + 1) % 8]
          if (!nextParticle) return null
          
          return (
            <line
              key={`line-${particle.id}`}
              x1={`${particle.x}%`}
              y1={`${particle.y}%`}
              x2={`${nextParticle.x}%`}
              y2={`${nextParticle.y}%`}
              stroke="url(#neuralGradient)"
              strokeWidth="1"
              opacity="0.3"
              className="animate-pulse"
              style={{ animationDelay: `${index * 0.5}s` }}
            />
          )
        })}
      </svg>

      {/* Neural Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border border-white/20 rounded-full animate-ping"></div>
        <div className="absolute w-24 h-24 border border-white/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-16 h-16 border border-white/40 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  )
}
