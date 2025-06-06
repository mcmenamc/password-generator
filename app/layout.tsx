import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Generador de Contraseñas Seguras',
  description: 'Genera contraseñas seguras y personalizadas con nuestro generador gratuito. Crea contraseñas fuertes con opciones de personalización.',
  generator: 'v0.dev',
  keywords: ['generador de contraseñas', 'contraseña segura', 'crear contraseña', 'seguridad en línea'],
  authors: [{ name: 'Tu Nombre', url: 'https://tusitio.com' }],
  openGraph: {
    title: 'Generador de Contraseñas Seguras',
    description: 'Genera contraseñas seguras y personalizadas con nuestro generador gratuito',
    url: 'https://tusitio.com',
    siteName: 'Generador de Contraseñas',
    images: [
      {
        url: 'https://tusitio.com/og-image.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Contraseñas Seguras',
    description: 'Genera contraseñas seguras y personalizadas con nuestro generador gratuito',
    images: ['https://tusitio.com/twitter-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
