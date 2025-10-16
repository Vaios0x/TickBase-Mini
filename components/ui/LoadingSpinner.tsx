'use client'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6', 
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

export function LoadingSpinner({ 
  size = 'md', 
  className,
  text 
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={cn(
        'spinner-base',
        sizeClasses[size],
        className
      )} />
      {text && (
        <p className="text-white/70 text-sm animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}

export function LoadingDots() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 bg-base-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-base-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-base-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  )
}

export function LoadingPulse() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-white/20 rounded w-1/2"></div>
    </div>
  )
}
