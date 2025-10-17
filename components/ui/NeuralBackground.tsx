'use client'

import { useEffect, useState } from 'react'
import { NeuralParticles, NeuralConnections } from './NeuralParticles'

export function NeuralBackground() {
  const [dataStreams, setDataStreams] = useState<Array<{ id: number; x: number; delay: number }>>([])

  useEffect(() => {
    // Generar flujos de datos neurales
    const generateDataStreams = () => {
      const newStreams = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 15
      }))
      setDataStreams(newStreams)
    }

    generateDataStreams()
    
    // Regenerar elementos cada 30 segundos
    const interval = setInterval(generateDataStreams, 30000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="neural-glass-bg fixed inset-0 -z-10">
      {/* Neural Grid Overlay */}
      <div className="neural-grid"></div>
      
      {/* Enhanced Neural Particles */}
      <NeuralParticles 
        count={30} 
        speed={0.5} 
        colors={['#78dbff', '#4facfe', '#00d4aa', '#ff77c6', '#f093fb']}
        className="opacity-60"
      />

      {/* Neural Energy Waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="neural-wave" style={{ top: '20%' }}></div>
        <div className="neural-wave" style={{ top: '40%' }}></div>
        <div className="neural-wave" style={{ top: '60%' }}></div>
        <div className="neural-wave" style={{ top: '80%' }}></div>
      </div>

      {/* Neural Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="neural-orb" style={{ top: '10%', left: '10%' }}></div>
        <div className="neural-orb" style={{ top: '20%', right: '15%' }}></div>
        <div className="neural-orb" style={{ bottom: '30%', left: '20%' }}></div>
        <div className="neural-orb" style={{ bottom: '10%', right: '10%' }}></div>
      </div>

      {/* Neural Data Streams */}
      <div className="absolute inset-0 overflow-hidden">
        {dataStreams.map((stream) => (
          <div
            key={stream.id}
            className="neural-data-stream"
            style={{
              left: `${stream.x}%`,
              animationDelay: `${stream.delay}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced Energy Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse-slow neural-glow"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse-slow neural-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl animate-pulse-slow neural-glow" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow neural-glow" style={{ animationDelay: '6s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-yellow-500/10 rounded-full blur-3xl animate-pulse-slow neural-glow" style={{ animationDelay: '8s' }}></div>
      </div>

      {/* Enhanced Neural Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#764ba2" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#f093fb" stopOpacity="0.5" />
            <stop offset="75%" stopColor="#4facfe" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity="0.3" />
          </linearGradient>
          <filter id="neuralGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Neural connection lines will be handled by NeuralConnections component */}
      </svg>

      {/* Enhanced Neural Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 border border-white/20 rounded-full animate-ping neural-glow"></div>
        <div className="absolute w-32 h-32 border border-white/30 rounded-full animate-ping neural-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-24 h-24 border border-white/40 rounded-full animate-ping neural-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-16 h-16 border border-white/50 rounded-full animate-ping neural-glow" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Neural Matrix Rain Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono opacity-30"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
              animation: `neural-float ${8 + (i % 10)}s linear infinite`,
              animationDelay: `${i * 1.5}s`
            }}
          >
            {`${i.toString(36)}${(i * 2).toString(36)}`}
          </div>
        ))}
      </div>

      {/* Neural Scan Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="neural-scan-line" style={{ animationDelay: '0s' }}></div>
        <div className="neural-scan-line" style={{ animationDelay: '2s' }}></div>
        <div className="neural-scan-line" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Neural Cyber Grid */}
      <div className="absolute inset-0 neural-cyber-grid opacity-20"></div>

      {/* Neural Energy Field */}
      <div className="neural-energy-field"></div>

      {/* Neural Digital Rain */}
      <div className="neural-digital-rain"></div>

      {/* Neural Holographic Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="neural-hologram" style={{ top: '10%', left: '10%', width: '30%', height: '20%' }}></div>
        <div className="neural-hologram" style={{ top: '60%', right: '10%', width: '25%', height: '15%', animationDelay: '3s' }}></div>
      </div>
    </div>
  )
}
