'use client'

import { useEffect, useState } from 'react'

interface MobileOptimizedProps {
  children: React.ReactNode
}

export function MobileOptimized({ children }: MobileOptimizedProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  })

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                            window.innerWidth <= 768 ||
                            'ontouchstart' in window

      setIsMobile(isMobileDevice)

      // Obtener safe area insets si están disponibles
      if (CSS.supports('padding: env(safe-area-inset-top)')) {
        const computedStyle = getComputedStyle(document.documentElement)
        setSafeAreaInsets({
          top: parseInt(computedStyle.getPropertyValue('--safe-area-inset-top') || '0'),
          bottom: parseInt(computedStyle.getPropertyValue('--safe-area-inset-bottom') || '0'),
          left: parseInt(computedStyle.getPropertyValue('--safe-area-inset-left') || '0'),
          right: parseInt(computedStyle.getPropertyValue('--safe-area-inset-right') || '0')
        })
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('orientationchange', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkMobile)
    }
  }, [])

  return (
    <div 
      className={`mobile-optimized ${isMobile ? 'mobile' : 'desktop'}`}
      style={{
        paddingTop: `${safeAreaInsets.top}px`,
        paddingBottom: `${safeAreaInsets.bottom}px`,
        paddingLeft: `${safeAreaInsets.left}px`,
        paddingRight: `${safeAreaInsets.right}px`,
        minHeight: '100vh',
        minHeight: '100dvh', // Dynamic viewport height
      }}
    >
      {children}
    </div>
  )
}

// Hook para detectar gestos táctiles
export function useTouchGestures() {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > minSwipeDistance
    const isRightSwipe = distanceX < -minSwipeDistance
    const isUpSwipe = distanceY > minSwipeDistance
    const isDownSwipe = distanceY < -minSwipeDistance

    return {
      isLeftSwipe,
      isRightSwipe,
      isUpSwipe,
      isDownSwipe,
      distanceX,
      distanceY
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}

// Componente para botones táctiles optimizados
export function TouchButton({ 
  children, 
  onClick, 
  className = '',
  disabled = false,
  ...props 
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  [key: string]: any
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        touch-button
        min-h-[44px] min-w-[44px] 
        px-4 py-3 
        rounded-lg 
        font-medium 
        transition-all 
        active:scale-95 
        disabled:opacity-50 
        disabled:active:scale-100
        ${className}
      `}
      style={{
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
      {...props}
    >
      {children}
    </button>
  )
}
