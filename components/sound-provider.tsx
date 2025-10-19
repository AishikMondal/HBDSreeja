"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface SoundContextType {
  playSound: (soundName: string) => void
  isMuted: boolean
  toggleMute: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)
  const [audioElements, setAudioElements] = useState<Record<string, HTMLAudioElement>>({})

  useEffect(() => {
    // Create audio elements for different sounds
    const sounds: Record<string, string> = {
      reveal: "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==",
      success: "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==",
      click: "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==",
    }

    const elements: Record<string, HTMLAudioElement> = {}
    Object.entries(sounds).forEach(([name, data]) => {
      const audio = new Audio(data)
      audio.volume = 0.5
      elements[name] = audio
    })
    setAudioElements(elements)
  }, [])

  const playSound = (soundName: string) => {
    if (!isMuted && audioElements[soundName]) {
      audioElements[soundName].currentTime = 0
      audioElements[soundName].play().catch(() => {
        // Silently fail if audio can't play
      })
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return <SoundContext.Provider value={{ playSound, isMuted, toggleMute }}>{children}</SoundContext.Provider>
}

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error("useSound must be used within SoundProvider")
  }
  return context
}
