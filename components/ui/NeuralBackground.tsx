'use client'

import { useEffect, useState } from 'react'

interface NeuralNode {
  id: number
  x: number
  y: number
  size: number
  energy: number
  connections: number[]
  color: string
  pulse: number
}

interface DataStream {
  id: number
  x: number
  y: number
  delay: number
  speed: number
  intensity: number
}

export function NeuralBackground() {
  const [nodes, setNodes] = useState<NeuralNode[]>([])
  const [dataStreams, setDataStreams] = useState<DataStream[]>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const generateNeuralNetwork = () => {
      const nodeCount = 40 // Más nodos para mayor densidad
      const newNodes: NeuralNode[] = []
      const colors = [
        '#00ff88', '#00d4ff', '#ff0080', '#ffaa00', '#aa00ff', 
        '#00ffaa', '#ff4400', '#4400ff', '#ffaa44', '#44ffaa',
        '#ff0044', '#0044ff', '#ffaa00', '#aaff00', '#00aaff'
      ]
      
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 15 + 8, // Nodos más grandes
          energy: Math.random(),
          connections: [],
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: Math.random() * 1.5 + 0.5 // Pulso más rápido
        })
      }
      
      // Crear conexiones más densas como red blockchain
      newNodes.forEach((node, index) => {
        const connections: number[] = []
        newNodes.forEach((otherNode, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            )
            // Más conexiones para simular red blockchain
            if (distance < 50 && Math.random() > 0.4) {
              connections.push(otherIndex)
            }
          }
        })
        node.connections = connections
      })
      
      setNodes(newNodes)
    }

    const generateDataStreams = () => {
      const streamCount = 30 // Más streams para mayor dinamismo
      const newStreams: DataStream[] = []
      
      for (let i = 0; i < streamCount; i++) {
        newStreams.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 10, // Menos delay para más actividad
          speed: Math.random() * 3 + 1, // Velocidad más alta
          intensity: Math.random() * 0.9 + 0.3 // Mayor intensidad
        })
      }
      
      setDataStreams(newStreams)
    }

    generateNeuralNetwork()
    generateDataStreams()
    setIsActive(true)
    
    // Regenerar cada 20 segundos para mayor dinamismo
    const interval = setInterval(() => {
      generateNeuralNetwork()
      generateDataStreams()
    }, 20000)
    
    return () => clearInterval(interval)
  }, [])

  if (!isActive) return null

  return (
    <div className="neural-glass-bg fixed inset-0 -z-10 overflow-hidden">
      {/* Enhanced Neural Grid */}
      <div className="neural-grid-enhanced"></div>
      
      {/* Dynamic Neural Network */}
      <svg className="absolute inset-0 w-full h-full opacity-60" style={{ zIndex: 2 }}>
        <defs>
          <radialGradient id="neuralNodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#78dbff" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#4facfe" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity="0.2" />
          </radialGradient>
          <linearGradient id="neuralConnectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f093fb" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4facfe" stopOpacity="0.4" />
          </linearGradient>
          <filter id="neuralGlowAdvanced">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="neuralPulse">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Neural Connections */}
        {nodes.map((node) => 
          node.connections.map((connectionId) => {
            const connectedNode = nodes[connectionId]
            if (!connectedNode) return null
            
            return (
              <line
                key={`connection-${node.id}-${connectionId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${connectedNode.x}%`}
                y2={`${connectedNode.y}%`}
                stroke="url(#neuralConnectionGradient)"
                strokeWidth="2"
                opacity="0.6"
                className="neural-connection-advanced"
                filter="url(#neuralGlowAdvanced)"
              />
            )
          })
        )}
        
        {/* Neural Nodes */}
        {nodes.map((node) => (
          <g key={`node-${node.id}`}>
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill={node.color}
              opacity="0.8"
              filter="url(#neuralPulse)"
              className="neural-node-advanced"
              style={{
                animationDelay: `${node.id * 0.3}s`,
                animationDuration: `${node.pulse}s`
              }}
            />
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size * 1.5}
              fill="none"
              stroke={node.color}
              strokeWidth="1"
              opacity="0.4"
              className="neural-node-ring"
              style={{
                animationDelay: `${node.id * 0.3 + 0.5}s`,
                animationDuration: `${node.pulse * 2}s`
              }}
            />
          </g>
        ))}
      </svg>

      {/* Enhanced Energy Blobs with Movement */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="neural-energy-blob neural-blob-1"></div>
        <div className="neural-energy-blob neural-blob-2"></div>
        <div className="neural-energy-blob neural-blob-3"></div>
        <div className="neural-energy-blob neural-blob-4"></div>
        <div className="neural-energy-blob neural-blob-5"></div>
        <div className="neural-energy-blob neural-blob-6"></div>
      </div>

      {/* Advanced Neural Waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="neural-wave-advanced" style={{ top: '10%', animationDelay: '0s' }}></div>
        <div className="neural-wave-advanced" style={{ top: '30%', animationDelay: '1s' }}></div>
        <div className="neural-wave-advanced" style={{ top: '50%', animationDelay: '2s' }}></div>
        <div className="neural-wave-advanced" style={{ top: '70%', animationDelay: '3s' }}></div>
        <div className="neural-wave-advanced" style={{ top: '90%', animationDelay: '4s' }}></div>
      </div>

      {/* Dynamic Data Streams */}
      <div className="absolute inset-0 overflow-hidden">
        {dataStreams.map((stream) => (
          <div
            key={stream.id}
            className="neural-data-stream-advanced"
            style={{
              left: `${stream.x}%`,
              top: `${stream.y}%`,
              animationDelay: `${stream.delay}s`,
              animationDuration: `${stream.speed * 10}s`,
              opacity: stream.intensity
            }}
          />
        ))}
      </div>

      {/* Neural Matrix Rain Enhanced */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-sm font-mono opacity-40 neural-matrix-char"
            style={{
              left: `${(i * 4) % 100}%`,
              top: `${(i * 8) % 100}%`,
              animation: `neural-matrix-fall ${12 + (i % 8)}s linear infinite`,
              animationDelay: `${i * 0.8}s`
            }}
          >
            {String.fromCharCode(65 + (i % 26))}
          </div>
        ))}
      </div>

      {/* Neural Scan Lines Enhanced */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="neural-scan-line-advanced" style={{ animationDelay: '0s' }}></div>
        <div className="neural-scan-line-advanced" style={{ animationDelay: '1.5s' }}></div>
        <div className="neural-scan-line-advanced" style={{ animationDelay: '3s' }}></div>
        <div className="neural-scan-line-advanced" style={{ animationDelay: '4.5s' }}></div>
      </div>

      {/* Neural Holographic Overlays */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="neural-hologram-advanced" style={{ top: '5%', left: '5%', width: '40%', height: '25%' }}></div>
        <div className="neural-hologram-advanced" style={{ top: '35%', right: '5%', width: '35%', height: '20%', animationDelay: '2s' }}></div>
        <div className="neural-hologram-advanced" style={{ bottom: '15%', left: '10%', width: '30%', height: '15%', animationDelay: '4s' }}></div>
        <div className="neural-hologram-advanced" style={{ bottom: '5%', right: '15%', width: '25%', height: '18%', animationDelay: '6s' }}></div>
      </div>

      {/* Neural Energy Field Enhanced */}
      <div className="neural-energy-field-advanced"></div>

      {/* Neural Digital Rain Enhanced */}
      <div className="neural-digital-rain-advanced"></div>

      {/* Neural Cyber Grid Enhanced */}
      <div className="neural-cyber-grid-advanced"></div>

      {/* Neural Pulse Rings Enhanced */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="neural-pulse-ring neural-ring-1"></div>
        <div className="neural-pulse-ring neural-ring-2"></div>
        <div className="neural-pulse-ring neural-ring-3"></div>
        <div className="neural-pulse-ring neural-ring-4"></div>
      </div>

      {/* Blockchain Light Show System */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="blockchain-light-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${8 + Math.random() * 12}s`
            }}
          />
        ))}
      </div>

      {/* Blockchain Energy Bursts */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={`burst-${i}`}
            className="blockchain-energy-burst"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Blockchain Data Packets */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={`packet-${i}`}
            className="blockchain-data-packet"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 25}s`,
              animationDuration: `${6 + Math.random() * 8}s`
            }}
          />
        ))}
      </div>

      {/* Neural Energy Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="neural-orb-advanced" style={{ top: '15%', left: '20%', animationDelay: '0s' }}></div>
        <div className="neural-orb-advanced" style={{ top: '25%', right: '25%', animationDelay: '1s' }}></div>
        <div className="neural-orb-advanced" style={{ bottom: '35%', left: '15%', animationDelay: '2s' }}></div>
        <div className="neural-orb-advanced" style={{ bottom: '20%', right: '20%', animationDelay: '3s' }}></div>
        <div className="neural-orb-advanced" style={{ top: '60%', left: '50%', animationDelay: '4s' }}></div>
      </div>
    </div>
  )
}
