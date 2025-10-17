'use client'

import { useState, useEffect } from 'react'

export function useSiteLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular tiempo de carga inicial - Loader rápido y profesional
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 200) // 0.2 segundos - loader súper instantáneo

    return () => clearTimeout(timer)
  }, [])

  return { isLoading, setIsLoading }
}
