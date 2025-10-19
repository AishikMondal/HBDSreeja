import './globals.css'
import type { Metadata } from 'next'
import { SoundProvider } from '@/components/sound-provider'

export const metadata: Metadata = {
  title: 'Happy Birthday Sreeja!',
  description: 'A special birthday website for Sreeja',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SoundProvider>
          {children}
        </SoundProvider>
      </body>
    </html>
  )
}
