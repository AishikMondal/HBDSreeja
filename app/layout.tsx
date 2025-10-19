import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Baloo_2, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SoundProvider } from "@/components/sound-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _baloo = Baloo_2({ subsets: ["latin"], variable: "--font-baloo" })
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Happy Birthday SREEJA",
  description: "A special birthday celebration",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_baloo.variable} ${_playfair.variable}`}>
        <SoundProvider>
          {children}
          <Analytics />
        </SoundProvider>
      </body>
    </html>
  )
}
