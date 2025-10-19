"use client"

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'

type SoundType = 'reveal' | 'celebrate'

type SoundContextType = {
  playSound: (type: SoundType) => void
  isMuted: boolean
  toggleMute: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)
  const [sounds, setSounds] = useState<Record<SoundType, HTMLAudioElement | null>>({
    reveal: null,
    celebrate: null,
  })

  useEffect(() => {
    // Initialize sound effects
    if (typeof window !== 'undefined') {
      setSounds({
        reveal: new Audio('/sounds/reveal.mp3'),
        celebrate: new Audio('/sounds/celebrate.mp3'),
      })
    }
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const playSound = useCallback(
    (type: SoundType) => {
      if (isMuted || !sounds[type]) return
      
      try {
        const sound = sounds[type]
        if (sound) {
          sound.currentTime = 0
          sound.play().catch((err) => {
            // Browser might block autoplay
            console.log('Error playing sound:', err)
          })
        }
      } catch (err) {
        console.log('Error playing sound:', err)
      }
    },
    [sounds, isMuted]
  )

  return (
    <SoundContext.Provider value={{ playSound, isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}
