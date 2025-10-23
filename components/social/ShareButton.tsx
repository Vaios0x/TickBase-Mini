'use client'

import { useState } from 'react'
import { Share2, Copy, Check } from 'lucide-react'

interface ShareButtonProps {
  ticketId?: string
  ticketName?: string
  ticketImage?: string
  className?: string
}

export function ShareButton({ 
  ticketId, 
  ticketName = 'TickBase NFT Ticket', 
  ticketImage,
  className = '' 
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const shareUrl = ticketId 
    ? `https://tickbase-miniapp.vercel.app/tickets/${ticketId}`
    : 'https://tickbase-miniapp.vercel.app/'

  const shareText = ticketId 
    ? `🎫 ¡Mira este ticket NFT en TickBase! ${ticketName}`
    : '🎫 ¡Descubre TickBase, el marketplace de boletos NFT en Base!'

  const handleShare = async () => {
    setIsSharing(true)

    try {
      // Intentar usar la API nativa de compartir
      if (navigator.share) {
        await navigator.share({
          title: ticketName,
          text: shareText,
          url: shareUrl,
        })
      } else {
        // Fallback: copiar al portapapeles
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      console.error('Error compartiendo:', error)
      // Fallback: copiar al portapapeles
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } finally {
      setIsSharing(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copiando:', error)
    }
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={handleShare}
        disabled={isSharing}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors"
      >
        <Share2 className="w-4 h-4" />
        {isSharing ? 'Compartiendo...' : 'Compartir'}
      </button>
      
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            ¡Copiado!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copiar
          </>
        )}
      </button>
    </div>
  )
}
