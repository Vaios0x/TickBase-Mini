/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configuración para Base Mini App
  experimental: {
    serverComponentsExternalPackages: ['@coinbase/minikit']
  },
  
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false
    }
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  
  // Headers para CORS y Mini App
  async headers() {
    return [
      {
        source: '/.well-known/farcaster.json',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
  
  // Configuración de imágenes
  images: {
    domains: [
      'images.unsplash.com',
      'gateway.pinata.cloud',
      'ipfs.io',
      'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi.ipfs.dweb.link'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configuración de PWA
  async rewrites() {
    return [
      {
        source: '/manifest.json',
        destination: '/api/manifest'
      }
    ]
  }
}

module.exports = nextConfig