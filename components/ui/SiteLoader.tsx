'use client'

import { useState, useEffect } from 'react'
import { Ticket, Sparkles, Zap, Shield } from 'lucide-react'

interface SiteLoaderProps {
  isLoading: boolean
  text?: string
}

export function SiteLoader({ isLoading, text = 'Cargando TickBase...' }: SiteLoaderProps) {
  const [rotation, setRotation] = useState(0)
  const [pulse, setPulse] = useState(1)

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setRotation(prev => (prev + 3) % 360)
      setPulse(prev => prev === 1 ? 1.05 : 1)
    }, 30)

    return () => clearInterval(interval)
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Ticket NFT Loader */}
        <div className="relative">
          {/* Glow Effect */}
          <div 
            className="absolute inset-0 w-32 h-48 rounded-xl bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-purple-600/30 blur-lg"
            style={{
              transform: `rotate(${rotation}deg) scale(${pulse})`,
              animation: 'pulse 1s ease-in-out infinite'
            }}
          />
          
          {/* Main Ticket */}
          <div 
            className="relative w-32 h-48 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-xl border border-cyan-400/50 shadow-2xl overflow-hidden"
            style={{
              transform: `rotate(${rotation * 0.1}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Ticket Header */}
            <div className="h-1/3 bg-gradient-to-r from-cyan-500 to-blue-600 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20" />
              <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                  <span className="text-white text-xs font-bold">NFT</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-400 animate-bounce" />
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
                  <Shield className="w-4 h-4 text-green-400 animate-pulse" />
                  <Ticket className="w-4 h-4 text-cyan-400 animate-bounce" />
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                </div>
                
                {/* Loading Dots */}
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.6s' }} />
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '100ms', animationDuration: '0.6s' }} />
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '0.6s' }} />
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
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${25 + (i % 4) * 15}%`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-lg font-bold text-white mb-2 neural-gradient-text">
            TickBase
          </h2>
          <p className="text-white/80 text-xs font-medium mb-3">{text}</p>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDuration: '0.8s' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '150ms', animationDuration: '0.8s' }} />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '300ms', animationDuration: '0.8s' }} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 bg-white/10 rounded-full h-1 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full animate-pulse"
            style={{
              width: '100%',
              animation: 'loading-bar 0.4s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
