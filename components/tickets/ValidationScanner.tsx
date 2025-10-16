'use client'

import { useState, useRef, useEffect } from 'react'
import { QrCode, CheckCircle, XCircle, Camera, AlertTriangle } from 'lucide-react'

export function ValidationScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid' | 'error'>('idle')
  const [ticketInfo, setTicketInfo] = useState<any>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startScanning = async () => {
    try {
      if (typeof navigator.mediaDevices.getUserMedia === 'function') {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        })
        streamRef.current = stream
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
        
        setIsScanning(true)
        setValidationStatus('idle')
        setScanResult(null)
      } else {
        // Simular escaneo para desarrollo
        simulateScan()
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      setValidationStatus('error')
    }
  }

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
  }

  const simulateScan = () => {
    setIsScanning(true)
    setValidationStatus('idle')
    
    // Simular escaneo
    setTimeout(() => {
      const mockResult = 'ticket_123_abc_456'
      setScanResult(mockResult)
      validateTicket(mockResult)
    }, 2000)
  }

  const validateTicket = async (ticketId: string) => {
    try {
      // Simular validación de ticket
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock validation result
      const isValid = Math.random() > 0.3 // 70% chance of being valid
      
      if (isValid) {
        setValidationStatus('valid')
        setTicketInfo({
          id: ticketId,
          event: 'Concierto de Rock',
          date: '2025-01-15',
          venue: 'Estadio Nacional',
          owner: '0x1234...5678',
          price: '0.05 ETH',
          status: 'Valid'
        })
      } else {
        setValidationStatus('invalid')
        setTicketInfo({
          id: ticketId,
          status: 'Invalid',
          reason: 'Ticket ya utilizado o no válido'
        })
      }
    } catch (error) {
      setValidationStatus('error')
    }
  }

  const resetScanner = () => {
    stopScanning()
    setScanResult(null)
    setValidationStatus('idle')
    setTicketInfo(null)
  }

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
          <QrCode className="w-8 h-8 text-blue-400" />
          Validación de Tickets
        </h2>
        <p className="text-white/70">
          Escanea el código QR del ticket para validar su autenticidad
        </p>
      </div>

      {/* Scanner Area */}
      <div className="neural-glass-card rounded-xl p-6">
        <div className="relative">
          {!isScanning ? (
            <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center border-2 border-dashed border-white/30">
              <div className="text-center">
                <Camera className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/70 mb-4">Cámara lista para escanear</p>
                <button
                  onClick={startScanning}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Iniciar Escaneo
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full aspect-video rounded-lg bg-black"
                autoPlay
                playsInline
                muted
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-blue-400 rounded-lg relative">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400"></div>
                </div>
              </div>
              <button
                onClick={stopScanning}
                className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Scan Result */}
        {scanResult && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Resultado del Escaneo</h3>
            <p className="text-white/70 font-mono text-sm break-all">{scanResult}</p>
          </div>
        )}

        {/* Validation Status */}
        {validationStatus !== 'idle' && (
          <div className="mt-6">
            {validationStatus === 'valid' && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <h3 className="text-xl font-semibold text-green-400">Ticket Válido</h3>
                </div>
                {ticketInfo && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Evento:</span>
                      <span className="text-white">{ticketInfo.event}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Fecha:</span>
                      <span className="text-white">{ticketInfo.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Venue:</span>
                      <span className="text-white">{ticketInfo.venue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Propietario:</span>
                      <span className="text-white font-mono">{ticketInfo.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Precio:</span>
                      <span className="text-white">{ticketInfo.price}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {validationStatus === 'invalid' && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-8 h-8 text-red-400" />
                  <h3 className="text-xl font-semibold text-red-400">Ticket Inválido</h3>
                </div>
                {ticketInfo && (
                  <div className="text-white/70">
                    <p className="mb-2">Razón: {ticketInfo.reason}</p>
                    <p className="text-sm">ID: {ticketInfo.id}</p>
                  </div>
                )}
              </div>
            )}

            {validationStatus === 'error' && (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-8 h-8 text-yellow-400" />
                  <h3 className="text-xl font-semibold text-yellow-400">Error de Validación</h3>
                </div>
                <p className="text-white/70">
                  No se pudo validar el ticket. Por favor, intenta nuevamente.
                </p>
              </div>
            )}

            <div className="mt-4 flex gap-3">
              <button
                onClick={resetScanner}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Escanear Otro
              </button>
              {validationStatus === 'valid' && (
                <button
                  onClick={() => {/* Lógica para marcar como usado */}}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Marcar como Usado
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="neural-glass-card rounded-lg p-6 border border-blue-500/30">
        <h3 className="text-lg font-semibold text-white mb-3">Instrucciones</h3>
        <ul className="space-y-2 text-white/70 text-sm">
          <li>• Asegúrate de que el código QR esté bien iluminado</li>
          <li>• Mantén el código QR dentro del marco de escaneo</li>
          <li>• El ticket debe ser auténtico y no haber sido usado previamente</li>
          <li>• La validación se realiza en tiempo real en la blockchain</li>
        </ul>
      </div>
    </div>
  )
}