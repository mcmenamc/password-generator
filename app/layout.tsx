import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {

  title: 'Generador de Contraseñas Seguras',
  description: 'Genera contraseñas seguras y personalizadas con nuestro generador gratuito. Crea contraseñas fuertes con opciones de personalización.',
  generator: 'v0.dev',
  keywords: ['generador de contraseñas', 'contraseña segura', 'crear contraseña', 'seguridad en línea'],
  authors: [{ name: 'Tu Nombre', url: 'https://generador-contrasena.vercel.app/' }],
  openGraph: {
    title: 'Generador de Contraseñas Seguras',
    description: 'Genera contraseñas seguras y personalizadas con nuestro generador gratuito',
    url: 'https://generador-contrasena.vercel.app/',
    siteName: 'Generador de Contraseñas',
    images: [
      {
        url: '/favicon.svg',
        width: 800,
        height: 800,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Contraseñas Seguras',
    description: 'Genera contraseñas seguras y personalizadas con nuestro generador gratuito',
    images: ['https://generador-contrasena.vercel.app//twitter-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head />
      <link rel="icon" href="/favicon.svg" sizes="any" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      {/* <!-- Code OG META --> */}
      <meta property="og:url" content="https://generador-contrasena.vercel.app" />
      <meta property="og:title" content="Generador de Contraseñas Seguras" />
      <meta property="og:image" content="https://generador-contrasena.vercel.app/favicon.svg" />
      <meta property="og:description" content="Genera contraseñas seguras y personalizadas con nuestro generador gratuito" />
      <meta property="og:type" content="website" />	

      <body>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
