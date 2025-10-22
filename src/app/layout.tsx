import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AkjellRC - Digital Garage & Speed Log',
  description: 'RC Car enthusiast portfolio showcasing Speed Run Garage and Basher Fleet collections',
  keywords: 'RC cars, speed running, bashing, Arrma Limitless, Traxxas X-Maxx, remote control',
  authors: [{ name: 'AkjellRC' }],
  openGraph: {
    title: 'AkjellRC - Digital Garage',
    description: 'The pursuit of speed and the joy of bashing',
    type: 'website',
    url: 'https://akjellrc.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-garage-darkest`}>
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}