'use client'

import { useEffect, useState } from 'react'

interface NeuralNode {
  id: number
  x: number
  y: number
  size: number
  energy: number
  connections: number[]
}

export function NeuralEffects() {
  const [nodes, setNodes] = useState<NeuralNode[]>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Generar nodos neurales
    const generateNodes = () => {
      const nodeCount = 12
      const newNodes: NeuralNode[] = []
      
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          energy: Math.random(),
          connections: []
        })
      }
      
      // Crear conexiones entre nodos cercanos
      newNodes.forEach((node, index) => {
        const connections: number[] = []
        newNodes.forEach((otherNode, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            )
            if (distance < 30) {
              connections.push(otherIndex)
            }
          }
        })
        node.connections = connections
      })
      
      setNodes(newNodes)
    }

    generateNodes()
    setIsActive(true)
    
    // Regenerar nodos cada 45 segundos
    const interval = setInterval(generateNodes, 45000)
    return () => clearInterval(interval)
  }, [])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none -z-5">
      {/* Neural Network Nodes */}
      <svg className="absolute inset-0 w-full h-full opacity-40">
        <defs>
          <radialGradient id="neuralNodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#78dbff" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#4facfe" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity="0.1" />
          </radialGradient>
          <filter id="neuralNodeGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Dibujar conexiones primero */}
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
                stroke="url(#neuralNodeGradient)"
                strokeWidth="1"
                opacity="0.3"
                className="neural-connection"
                filter="url(#neuralNodeGlow)"
              />
            )
          })
        )}
        
        {/* Dibujar nodos */}
        {nodes.map((node) => (
          <circle
            key={`node-${node.id}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="url(#neuralNodeGradient)"
            filter="url(#neuralNodeGlow)"
            className="neural-glow"
            style={{
              animationDelay: `${node.id * 0.5}s`,
              animationDuration: `${3 + node.energy * 2}s`
            }}
          />
        ))}
      </svg>

      {/* Neural Energy Pulses */}
      <div className="absolute inset-0">
        {nodes.slice(0, 6).map((node) => (
          <div
            key={`pulse-${node.id}`}
            className="absolute w-4 h-4 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              animation: `neural-pulse ${2 + node.energy * 3}s ease-in-out infinite`,
              animationDelay: `${node.id * 0.8}s`
            }}
          />
        ))}
      </div>

      {/* Neural Data Flow */}
      <div className="absolute inset-0">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={`flow-${i}`}
            className="absolute w-1 h-20 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `neural-float ${10 + Math.random() * 15}s linear infinite`,
              animationDelay: `${Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      {/* Neural Holographic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-transparent animate-pulse-slow"></div>
    </div>
  )
}
