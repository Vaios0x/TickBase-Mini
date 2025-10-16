'use client'

import { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: any) => void
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-dark">
            <div className="glass-morphism rounded-xl p-8 max-w-md w-full text-center animate-fade-in">
              <AlertTriangle className="w-16 h-16 text-base-red mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Algo salió mal
              </h2>
              <p className="text-white/70 mb-6">
                {this.state.error?.message || 'Ha ocurrido un error inesperado'}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => this.setState({ hasError: false })}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reintentar
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="btn-secondary w-full"
                >
                  Recargar Página
                </button>
              </div>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

// Hook para manejar errores en componentes funcionales
export function useErrorHandler() {
  const handleError = (error: Error, context?: string) => {
    console.error(`Error${context ? ` in ${context}` : ''}:`, error)
    
    // Aquí podrías enviar el error a un servicio de monitoreo
    // como Sentry, LogRocket, etc.
    
    // Por ahora, solo lo mostramos en consola
    if (process.env.NODE_ENV === 'development') {
      console.error('Error context:', context)
      console.error('Error stack:', error.stack)
    }
  }

  return { handleError }
}
