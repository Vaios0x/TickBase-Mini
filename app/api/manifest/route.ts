import { NextResponse } from 'next/server'
import { minikitConfig } from '@/minikit.config'

export async function GET() {
  const manifest = {
    name: minikitConfig.miniapp.name,
    short_name: "TickBase",
    description: minikitConfig.miniapp.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: minikitConfig.miniapp.primaryColor,
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/icon.png", 
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    categories: ["finance", "business", "productivity"],
    lang: "es",
    dir: "ltr"
  }

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}