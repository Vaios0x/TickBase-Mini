'use client'

import { useSiteLoader } from '@/hooks/useSiteLoader'
import { SiteLoader } from './SiteLoader'

interface SiteLoaderWrapperProps {
  children: React.ReactNode
}

export function SiteLoaderWrapper({ children }: SiteLoaderWrapperProps) {
  const { isLoading } = useSiteLoader()

  return (
    <>
      <SiteLoader isLoading={isLoading} text="Cargando TickBase..." />
      {children}
    </>
  )
}
