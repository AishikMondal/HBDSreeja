"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useSound } from "@/components/sound-provider"

interface Clue {
  id: number
  text: string
  revealed: boolean
  position: { x: number; y: number }
}

export default function DetectiveGame() {
  const router = useRouter()
  const { playSound } = useSound()
  const [clues, setClues] = useState<Clue[]>([])
  const [revealedCount, setRevealedCount] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    const initialClues: Clue[] = [
      {
        id: 1,
        text: "You are amazing!",
        revealed: false,
        position: { x: 10, y: 20 },
      },
      {
        id: 2,
        text: "Your smile lights up the room",
        revealed: false,
        position: { x: 70, y: 30 },
      },
      {
        id: 3,
        text: "You inspire everyone around you",
        revealed: false,
        position: { x: 20, y: 70 },
      },
      {
        id: 4,
        text: "Your kindness knows no bounds",
        revealed: false,
        position: { x: 75, y: 75 },
      },
      {
        id: 5,
        text: "You deserve all the happiness",
        revealed: false,
        position: { x: 50, y: 50 },
      },
    ]
    setClues(initialClues)
  }, [])

  const revealClue = (id: number) => {
    playSound("reveal")
    setClues((prev) => prev.map((clue) => (clue.id === id ? { ...clue, revealed: true } : clue)))
    setRevealedCount((prev) => prev + 1)
  }

  useEffect(() => {
    if (revealedCount === 5 && !gameComplete) {
      playSound("success")
      setGameComplete(true)
      setTimeout(() => {
        router.push("/letter")
      }, 2000)
    }
  }, [revealedCount, gameComplete, router, playSound])

  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, 50, 0], y: [0, 100, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -bottom-40 -left-40"
          animate={{ x: [0, -50, 0], y: [0, -100, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
          Detective Mode
        </h1>
        <p className="text-xl text-gray-200">Find all the hidden clues about you!</p>
        <div className="mt-4 text-lg font-semibold">
          <span className="text-pink-400">{revealedCount}</span>
          <span className="text-gray-300"> / 5 clues found</span>
        </div>
      </motion.div>

      {/* Clue cards */}
      <div className="relative z-10 w-full h-96 max-w-2xl">
        {clues.map((clue) => (
          <motion.div
            key={clue.id}
            className="absolute cursor-pointer"
            style={{
              left: `${clue.position.x}%`,
              top: `${clue.position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            whileHover={{ scale: 1.1 }}
            onClick={() => revealClue(clue.id)}
          >
            <motion.div
              className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg flex items-center justify-center cursor-pointer relative"
              animate={clue.revealed ? { rotateY: 180, opacity: 0.5 } : { y: [0, -10, 0] }}
              transition={{ duration: clue.revealed ? 0.6 : 2, repeat: !clue.revealed ? Number.POSITIVE_INFINITY : 0 }}
            >
              {!clue.revealed ? (
                <div className="text-center">
                  <div className="text-3xl mb-1">🔍</div>
                  <p className="text-xs font-bold text-gray-800">Click me!</p>
                </div>
              ) : (
                <motion.p
                  className="text-center text-sm font-bold text-gray-800 px-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {clue.text}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Completion message */}
      {gameComplete && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-gradient-to-br from-pink-500 to-purple-600 p-8 rounded-2xl text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">All Clues Found!</h2>
            <p className="text-white text-lg">Moving to your special letter...</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
