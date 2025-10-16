import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEther(value: string): string {
  return parseFloat(value).toFixed(4)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(date: string): string {
  return new Date(date).toLocaleDateString('es-MX', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function truncateAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function generateTicketId(): string {
  return `TICK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function formatPrice(price: string, currency: 'ETH' | 'USD' = 'ETH'): string {
  const numPrice = parseFloat(price)
  
  if (currency === 'USD') {
    return `$${(numPrice * 3000).toFixed(2)}`
  }
  
  return `${numPrice.toFixed(4)} ETH`
}

export function calculateTimeUntil(date: string): string {
  const now = new Date()
  const eventDate = new Date(date)
  const diff = eventDate.getTime() - now.getTime()
  
  if (diff < 0) return 'Evento pasado'
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (days > 0) return `${days} día${days > 1 ? 's' : ''} restante${days > 1 ? 's' : ''}`
  if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''} restante${hours > 1 ? 's' : ''}`
  if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''} restante${minutes > 1 ? 's' : ''}`
  
  return 'Muy pronto'
}

export function getEventStatus(date: string): 'upcoming' | 'today' | 'past' {
  const now = new Date()
  const eventDate = new Date(date)
  const diff = eventDate.getTime() - now.getTime()
  
  if (diff < 0) return 'past'
  if (diff < 24 * 60 * 60 * 1000) return 'today' // Less than 24 hours
  return 'upcoming'
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function generateRandomId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export function isValidTxHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash)
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    return Promise.resolve()
  }
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function getRandomColor(): string {
  const colors = [
    '#0052FF', // Base Blue
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
