'use client'

import { useState, useEffect } from 'react'
import { Ticket, Sparkles, Zap, Shield } from 'lucide-react'

interface TicketLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export function TicketLoader({ size = 'md', text = 'Procesando...' }: TicketLoaderProps) {
  const [rotation, setRotation] = useState(0)
  const [pulse, setPulse] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360)
      setPulse(prev => prev === 1 ? 1.1 : 1)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    sm: 'w-16 h-24',
    md: 'w-24 h-36',
    lg: 'w-32 h-48'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Ticket NFT Loader */}
      <div className="relative">
        {/* Glow Effect */}
        <div 
          className={`absolute inset-0 ${sizeClasses[size]} rounded-xl bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-purple-600/30 blur-lg`}
          style={{
            transform: `rotate(${rotation}deg) scale(${pulse})`,
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
        
        {/* Main Ticket */}
        <div 
          className={`relative ${sizeClasses[size]} bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-xl border border-cyan-400/50 shadow-2xl overflow-hidden`}
          style={{
            transform: `rotate(${rotation * 0.1}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Ticket Header */}
          <div className="h-1/3 bg-gradient-to-r from-cyan-500 to-blue-600 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20" />
            <div className="absolute top-1 left-2 right-2 flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Sparkles className={`${iconSizes[size]} text-white animate-pulse`} />
                <span className="text-white text-xs font-bold">NFT</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className={`${iconSizes[size]} text-yellow-400 animate-bounce`} />
              </div>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="h-2/3 p-2 relative">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 animate-pulse" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center space-y-2">
              {/* Animated Icons */}
              <div className="flex space-x-2">
                <Shield className={`${iconSizes[size]} text-green-400 animate-pulse`} />
                <Ticket className={`${iconSizes[size]} text-cyan-400 animate-bounce`} />
                <Sparkles className={`${iconSizes[size]} text-purple-400 animate-pulse`} />
              </div>
              
              {/* Loading Dots */}
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>

            {/* Ticket Perforations */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
              <div className="w-2 h-2 bg-black rounded-full border border-cyan-400/50" />
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
              <div className="w-2 h-2 bg-black rounded-full border border-cyan-400/50" />
            </div>
          </div>

          {/* Animated Border */}
          <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-border">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 animate-pulse" />
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <p className="text-white/80 text-sm font-medium mb-1">{text}</p>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  )
}

// Full Screen Loader
export function TicketLoaderFullScreen({ text = 'Procesando transacción...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="neural-glass-card rounded-2xl p-8 max-w-sm mx-4">
        <TicketLoader size="lg" text={text} />
      </div>
    </div>
  )
}

// Inline Loader
export function TicketLoaderInline({ text = 'Cargando...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center p-4">
      <TicketLoader size="sm" text={text} />
    </div>
  )
}
