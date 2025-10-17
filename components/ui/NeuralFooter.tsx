'use client'

import { useState, useEffect } from 'react'
import { Github, Twitter, MessageCircle, Globe, Heart, Zap, Shield, Star } from 'lucide-react'

export function NeuralFooter() {
  const [currentYear] = useState(new Date().getFullYear())
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-300' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: MessageCircle, href: '#', label: 'Discord', color: 'hover:text-purple-400' },
    { icon: Globe, href: '#', label: 'Website', color: 'hover:text-green-400' }
  ]

  const features = [
    { icon: Zap, text: 'Gasless Transactions', color: 'text-yellow-400' },
    { icon: Shield, text: 'Secure NFT Tickets', color: 'text-blue-400' },
    { icon: Star, text: 'AI-Powered Discovery', color: 'text-purple-400' }
  ]

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Neural Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      
      {/* Neural Grid Overlay */}
      <div className="absolute inset-0 neural-grid opacity-20"></div>
      
      {/* Neural Energy Waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="neural-wave" style={{ top: '10%' }}></div>
        <div className="neural-wave" style={{ top: '30%' }}></div>
        <div className="neural-wave" style={{ top: '50%' }}></div>
        <div className="neural-wave" style={{ top: '70%' }}></div>
      </div>

      {/* Neural Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 neural-glow"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
              animation: `neural-float ${15 + (i % 10)}s linear infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 neural-glass-card border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center neural-glow">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold neural-text-effect">TickBase</h3>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                La plataforma NFT más avanzada para boletos de eventos. 
                Transacciones gasless, descubrimiento con IA y características DeFi integradas.
              </p>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>Hecho con pasión por la comunidad Web3</span>
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4">Características Principales</h4>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 neural-interactive`}
                  >
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    <span className="text-white/80 text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4">Conecta con Nosotros</h4>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={`flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 neural-interactive ${link.color}`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="text-sm">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-white/60">
              <span>© {currentYear} TickBase. Todos los derechos reservados.</span>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                <a href="#" className="hover:text-white transition-colors">Términos</a>
                <a href="#" className="hover:text-white transition-colors">Soporte</a>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span>Powered by</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-sm"></div>
                <span className="font-semibold">Base Network</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Neural Scan Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="neural-scan-line" style={{ animationDelay: '0s' }}></div>
        <div className="neural-scan-line" style={{ animationDelay: '3s' }}></div>
        <div className="neural-scan-line" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Neural Holographic Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="neural-hologram" style={{ top: '20%', left: '5%', width: '20%', height: '10%' }}></div>
        <div className="neural-hologram" style={{ top: '60%', right: '5%', width: '15%', height: '8%', animationDelay: '2s' }}></div>
      </div>
    </footer>
  )
}
