"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useSound } from "@/components/sound-provider"
import { Lora, Dancing_Script, Pacifico } from "next/font/google"

// Elegant, readable serif for body + romantic script for headings/signature
const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600"] })
const dancing = Dancing_Script({ subsets: ["latin"], weight: ["400", "600", "700"] })
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" }) // playful font for name

export default function LetterReveal() {
  const { playSound } = useSound()
  const [isOpen, setIsOpen] = useState(true) // start opened
  const [showContent, setShowContent] = useState(false)
  const [isCelebrating, setIsCelebrating] = useState(false)
  const [showStartOver, setShowStartOver] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editMessage, setEditMessage] = useState("")
  const [showEditModal, setShowEditModal] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      playSound("reveal")
      // removed: setIsOpen(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [playSound])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowContent(true)
        // Play soft background music
        if (audioRef.current) {
          audioRef.current.play().catch(() => {
            // Autoplay might be blocked, that's okay
          })
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Load existing messages
  useEffect(() => {
    const storedMessages = localStorage.getItem("sreeja-messages")
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }
  }, [])

  const handleCelebrate = () => {
    playSound("reveal")
    setIsCelebrating(true)
    setTimeout(() => {
      setShowStartOver(true)
    }, 4000)
  }

  const handleStartOver = () => {
    setIsOpen(false)
    setShowContent(false)
    setIsCelebrating(false)
    setShowStartOver(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setTimeout(() => {
      playSound("reveal")
      setIsOpen(true)
    }, 500)
  }

  // Handle new message submission
  const handleSubmitMessage = () => {
    if (!newMessage.trim()) return

    setIsSubmitting(true)

    // Add message to the list
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)

    // Store in localStorage
    localStorage.setItem("sreeja-messages", JSON.stringify(updatedMessages))

    // Visual and audio feedback
    playSound("reveal")

    // Reset and close modal
    setTimeout(() => {
      setNewMessage("")
      setShowMessageModal(false)
      setIsSubmitting(false)
    }, 1000)
  }

  // Handle message deletion
  const handleDeleteMessage = (index: number) => {
    playSound("reveal")
    const updatedMessages = messages.filter((_, i) => i !== index)
    setMessages(updatedMessages)
    localStorage.setItem("sreeja-messages", JSON.stringify(updatedMessages))
  }

  // Open edit modal
  const handleEditClick = (index: number) => {
    setEditingIndex(index)
    setEditMessage(messages[index])
    setShowEditModal(true)
    playSound("reveal")
  }

  // Save edited message
  const handleSaveEdit = () => {
    if (editingIndex === null || !editMessage.trim()) return

    setIsSubmitting(true)

    const updatedMessages = [...messages]
    updatedMessages[editingIndex] = editMessage

    setMessages(updatedMessages)
    localStorage.setItem("sreeja-messages", JSON.stringify(updatedMessages))

    playSound("reveal")

    setTimeout(() => {
      setShowEditModal(false)
      setEditingIndex(null)
      setEditMessage("")
      setIsSubmitting(false)
    }, 1000)
  }

  const letterContent = [
    { text: "💖 Dear Sreeja,", isHeading: true },
    { text: "", isHeading: false },
    {
      text: "Some people speak a lot and say little… and then there are a few who say almost nothing — yet somehow leave the air a little different.",
      isHeading: false,
    },
    { text: "You belong to the second kind, Sreeja. 🌸✨", isHeading: false },
    { text: "", isHeading: false },
    {
      text: "That day near college — the quiet lemon tea, the small talk — it all felt beautifully unscripted ☕🌧️💭.",
      isHeading: false,
    },
    {
      text: "And yes, before you raise that eyebrow — your treat is still pending 😏🕵️‍♂️. (I'm only keeping count like a proper detective, after all.)",
      isHeading: false,
    },
    { text: "", isHeading: false },
    {
      text: "You know, I've noticed how your eyes pause before you reply, how you tilt your head slightly when you're thinking 👀💫 — don't be shocked, I just happen to be a very good listener.",
      isHeading: false,
    },
    { text: "You say things once, and somehow they settle like soft ink in my mind ✒️💌.", isHeading: false },
    { text: "(Honestly, it's unfair — you make remembering look like an instinct 💖.)", isHeading: false },
    { text: "", isHeading: false },
    {
      text: "Maybe that's why I remember every detail — not out of effort, but because your words and expressions somehow refuse to leave. 💭🌿",
      isHeading: false,
    },
    { text: "", isHeading: false },
    { text: "রবীন্দ্রনাথ একবার লিখেছিলেন —", isHeading: false },
    { text: '"সে যে ছায়া, সে যে কুসুম, সে যে রবি, সে যে জীবনভরা গভীর নিবিড় রবি।" 🌺', isHeading: false },
    {
      text: "There's something in your calmness that feels just like that — not loud, not rushing — simply and quietly luminous. 🌟",
      isHeading: false,
    },
    { text: "", isHeading: false },
    { text: "And sometimes you walk through silence like a Jibanananda das's line —", isHeading: false },
    { text: '"আবার আসিব ফিরে ধানসিঁড়িটির তীরে, এই বাংলার ধান গন্ধে, পাকা শস্যের গন্ধে…" 🌾🍃', isHeading: false },
    {
      text: "Maybe that's what your presence is — a return, a soft pull of peace amidst all the noise. 💌💫",
      isHeading: false,
    },
    { text: "", isHeading: false },
    {
      text: "I still remember our Capture the Flag event at Techrix — the way your eyes focused, your mind mapping clues faster than the rest of us could think 🎯💡.",
      isHeading: false,
    },
    {
      text: "You had that calm chaos — the rare mix of logic and poetry that makes watching you feel like a secret thrill. ✨🔍",
      isHeading: false,
    },
    { text: "", isHeading: false },
    {
      text: "And oh, the way expression of being offended blooms shyly on your cheeks when you smile or get caught off guard 🌸😊.",
      isHeading: false,
    },
    { text: "It's like dawn peeking through clouds — gentle, unexpected, quietly magical ☀️💖.", isHeading: false },
    { text: "", isHeading: false },
    { text: "Sometimes you look so composed that even silence hesitates to disturb you…", isHeading: false },
    {
      text: "And then that fleeting, almost-hidden smile — the one that vanishes before it can be fully understood — leaves the world guessing 🌙💫.",
      isHeading: false,
    },
    { text: "", isHeading: false },
    { text: "You once spoke of the hills — quiet, vast, peaceful 🏔️🌿.", isHeading: false },
    { text: "Maybe you carry a bit of them inside — untamed yet serene.", isHeading: false },
    { text: "", isHeading: false },
    {
      text: "You're not a mystery to be solved, Sreeja — you're one to be read slowly, like a classic novel that smells of time, rain, and meaning 📖💌.",
      isHeading: false,
    },
    { text: "", isHeading: false },
    { text: "So here's to you —", isHeading: false },
    { text: "to the listener who speaks through silence, 🎧", isHeading: false },
    { text: "to the dreamer who hides fire in her calm, 🔥", isHeading: false },
    { text: "to the storyteller who makes reality a little softer ✨💖.", isHeading: false },
    { text: "THANK YOU FOR BEING A PERFECT MOVIE RECOMMENDER AS WELL >> AI CANNOT REPLACE YOU HAHA", isHeading: false },
    { text: "", isHeading: false },
    { text: "শুভ জন্মদিন, সৃজা —", isHeading: false },
    { text: "তোমার জীবনের প্রতিটি দিন হোক একেকটি অনাবিষ্কৃত কবিতা 💐💫.", isHeading: false },
    { text: "", isHeading: false },
    {
      text: "And may your future be bright, the mountain peak ambitions will get accomplished, your dreams are bold, and your heart always at peace 🌟🏔️💚.",
      isHeading: false,
    },
    { text: "", isHeading: false },
    {
      text: "— From someone who still smiles after disturbing you, remembers far too much, and will always cheer for you 🌸💌,",
      isHeading: false,
    },
    { text: "Aishik 💖", isHeading: true },
  ]

  const FloatingHearts = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => {
          const startX = Math.random() * 100
          const startY = Math.random() * 100
          const endX = Math.random() * 100
          const endY = Math.random() * 100
          const duration = Math.random() * 15 + 20

          return (
            <motion.div
              key={i}
              className="absolute text-2xl md:text-4xl lg:text-5xl"
              initial={{
                x: `${startX}vw`,
                y: `${startY}vh`,
                opacity: 0.15,
                scale: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                x: `${endX}vw`,
                y: `${endY}vh`,
                opacity: [0.15, 0.35, 0.15],
                scale: [Math.random() * 0.5 + 0.3, Math.random() * 0.8 + 0.5, Math.random() * 0.5 + 0.3],
              }}
              transition={{
                duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.3,
              }}
            >
              ❤️
            </motion.div>
          )
        })}
      </div>
    )
  }

  const ConfettiPiece = ({ delay }: { delay: number }) => {
    return (
      <motion.div
        className="fixed pointer-events-none text-2xl md:text-4xl"
        initial={{
          x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
          y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
          opacity: 1,
          scale: 1,
        }}
        animate={{
          x: (typeof window !== "undefined" ? window.innerWidth / 2 : 0) + (Math.random() - 0.5) * 500,
          y: (typeof window !== "undefined" ? window.innerHeight / 2 : 0) + Math.random() * 600,
          opacity: 0,
          scale: 0,
          rotate: Math.random() * 360,
        }}
        transition={{
          duration: 3.5,
          delay,
          ease: "easeOut",
        }}
      >
        {["🎉", "✨", "💫", "🌟", "💕", "🎊", "🎈", "🎁", "💐", "🌸"][Math.floor(Math.random() * 10)]}
      </motion.div>
    )
  }

  return (
    <div className={`w-full min-h-screen relative overflow-hidden p-4 md:p-6 lg:p-8 ${lora.className}`}>
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(244, 114, 182, 0.05) 2px,
              rgba(244, 114, 182, 0.05) 4px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(244, 114, 182, 0.05) 2px,
              rgba(244, 114, 182, 0.05) 4px
            ),
            radial-gradient(1200px 800px at 10% 10%, #ffe6ef 0%, transparent 60%),
            radial-gradient(1200px 800px at 90% 90%, #ffe8f2 0%, transparent 60%),
            linear-gradient(135deg, #ffd6e7 0%, #ffe9f2 50%, #ffdfe9 100%)
          `,
          backgroundColor: "#ffe9f2",
        }}
      />

      <FloatingHearts />

      {/* Confetti animation during celebration */}
      {isCelebrating && (
        <>
          {[...Array(40)].map((_, i) => (
            <ConfettiPiece key={i} delay={i * 0.04} />
          ))}
        </>
      )}

      {/* Audio element for background music */}
      <audio
        ref={audioRef}
        loop
        src="data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=="
      />

      <div className="w-full min-h-screen flex items-center justify-center relative z-10">
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Content area without the black/boxed card look */}
          <motion.div
            className="w-full rounded-2xl p-0 md:p-0 min-h-screen md:min-h-[600px] flex flex-col justify-start relative overflow-visible border-0 shadow-none bg-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Fun playful heading instead of just an envelope */}
            <motion.div className="flex flex-col items-center mb-8 md:mb-12">
              {/* Playful emoji decorations */}
              <div className="relative w-full h-24 md:h-32 mb-2">
                {/* Balloons */}
                <motion.div
                  className="absolute text-5xl md:text-6xl left-[10%] top-0"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  🎈
                </motion.div>

                <motion.div
                  className="absolute text-5xl md:text-6xl right-[15%] top-5"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, -8, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  🎈
                </motion.div>

                {/* Sinchan */}
                <motion.div
                  className="absolute text-4xl md:text-5xl left-[25%] bottom-0"
                  animate={{
                    x: [0, 15, 0],
                    y: [0, -5, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  👦
                </motion.div>

                {/* Detective toys */}
                <motion.div
                  className="absolute text-4xl md:text-5xl right-[25%] bottom-2"
                  animate={{
                    x: [0, -10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                >
                  🔍
                </motion.div>

                {/* More fun elements */}
                <motion.div
                  className="absolute text-4xl md:text-5xl left-[40%] top-2"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  🎭
                </motion.div>

                <motion.div
                  className="absolute text-4xl md:text-5xl right-[40%] bottom-0"
                  animate={{
                    y: [0, -8, 0],
                    filter: ["drop-shadow(0 0 0px rgba(255,255,255,0))", "drop-shadow(0 0 10px rgba(255,200,100,0.8))", "drop-shadow(0 0 0px rgba(255,255,255,0))"],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                >
                  🎮
                </motion.div>
              </div>

              <motion.h1
                className={`${pacifico.className} text-5xl md:text-7xl lg:text-8xl text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 drop-shadow-[0_2px_8px_rgba(236,72,153,0.4)]`}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
              >
                Sreeja
              </motion.h1>
            </motion.div>

            {/* Letter content (unchanged) */}
            <motion.div
              className="space-y-2 md:space-y-3 text-sm md:text-base lg:text-lg max-h-[65vh] md:max-h-[60vh] overflow-y-auto pr-2 md:pr-4"
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              {letterContent.map((line, index) => (
                <motion.p
                  key={index}
                  className={`leading-relaxed md:leading-relaxed ${
                    line.isHeading
                      ? `${dancing.className} text-lg md:text-xl lg:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 drop-shadow-[0_1px_0_rgb(255,255,255,0.4)]`
                      : `${lora.className} text-rose-900/90`
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={showContent ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                >
                  {line.text}
                </motion.p>
              ))}
            </motion.div>

            {/* Messages from Sreeja - Updated with edit/delete buttons */}
            {messages.length > 0 && (
              <motion.div
                className="mt-8 p-4 md:p-6 rounded-lg bg-purple-50 border border-purple-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className={`${dancing.className} text-xl md:text-2xl font-bold text-purple-600 mb-3`}>
                  Clues & Feedback from Sreeja:
                </h3>
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      className="rounded-lg bg-gradient-to-r from-purple-200 to-indigo-200 shadow-sm overflow-hidden"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="p-3 text-purple-900 font-medium">
                        {message}
                      </div>
                      <div className="flex justify-end bg-white/30 px-2 py-1">
                        <button
                          onClick={() => handleEditClick(index)}
                          className="text-xs text-purple-700 hover:text-purple-900 px-2 py-1 rounded-md hover:bg-purple-100 transition-colors"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(index)}
                          className="text-xs text-rose-600 hover:text-rose-800 px-2 py-1 rounded-md hover:bg-rose-100 transition-colors ml-2"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Celebration emojis */}
            <motion.div
              className="mt-6 md:mt-8 flex justify-center gap-2 md:gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : {}}
              transition={{ delay: letterContent.length * 0.06 + 0.5 }}
            >
              {["💖", "🌸", "✨", "🌟", "💫", "🎊"].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="text-2xl md:text-3xl lg:text-4xl"
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1],
                    filter: [
                      "drop-shadow(0 0 0px rgba(255,255,255,0))",
                      "drop-shadow(0 0 15px rgba(255,200,100,0.8))",
                      "drop-shadow(0 0 0px rgba(255,255,255,0))",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.15,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </motion.div>

            {/* Celebrate button */}
            {!isCelebrating && !showStartOver && (
              <motion.button
                className="mt-8 md:mt-10 mx-auto px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white rounded-full font-bold text-base md:text-lg shadow-lg hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.08, boxShadow: "0 15px 35px rgba(244, 63, 94, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCelebrate}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: letterContent.length * 0.06 + 1 }}
              >
                🎊 Celebrate! 🎊
              </motion.button>
            )}

            {/* Celebration state */}
            {isCelebrating && (
              <motion.div
                className="mt-8 md:mt-10 flex flex-col items-center gap-4 md:gap-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-7xl md:text-9xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  ✨
                </motion.div>
                <motion.p
                  className="text-xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 text-center"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  🎉 HAPPY BIRTHDAY SREEJA! 🎉
                </motion.p>
                <motion.div
                  className="flex gap-3 md:gap-6 text-4xl md:text-6xl lg:text-7xl"
                  animate={{
                    y: [0, -25, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  {["🎈", "🎁", "🌟", "💫", "🎊"].map((emoji, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        delay: i * 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Start Over button */}
            {showStartOver && (
              <motion.button
                className="mt-8 md:mt-10 mx-auto px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full font-bold text-base md:text-lg shadow-lg hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.08, boxShadow: "0 15px 35px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartOver}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                🔄 Start Over 🔄
              </motion.button>
            )}

            {/* Add Sreeja's Message Button */}
            <motion.div
              className="mt-8 md:mt-10 text-center"
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : {}}
              transition={{ delay: letterContent.length * 0.06 + 1.5 }}
            >
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm md:text-base shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowMessageModal(true)
                  playSound("reveal")
                }}
              >
                ✏️ Leave a Feedback for Aishik ✏️
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Sreeja's Message Modal */}
      {showMessageModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isSubmitting && setShowMessageModal(false)}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-md w-full"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={`${dancing.className} text-2xl md:text-3xl text-center mb-4 text-purple-600`}>
              ✨ Sreeja's Clue/Feedback ✨
            </h3>

            <p className="mb-4 text-gray-600 text-center text-sm md:text-base">
              Hi Sreeja! Leave a  feedback for Aishik here. Your message will appear below in the purple box.( I know you are busy enough to leave a Thank You ..So you can say your words here)
            </p>

            <textarea
              className="w-full p-3 border-2 border-purple-300 rounded-lg mb-4 h-32 focus:ring focus:ring-purple-300 outline-none text-purple-800 font-medium bg-purple-50"
              placeholder="Your clue/feedback for Aishik..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={isSubmitting}
              style={{ color: "#5B21B6" }} // Deep purple text color for better visibility
            />

            <div className="flex justify-center gap-3">
              <button
                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-full font-medium"
                onClick={() => setShowMessageModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium flex items-center justify-center min-w-[80px]"
                onClick={handleSubmitMessage}
                disabled={isSubmitting || !newMessage.trim()}
              >
                {isSubmitting ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Message Modal */}
      {showEditModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isSubmitting && setShowEditModal(false)}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-md w-full"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={`${dancing.className} text-2xl md:text-3xl text-center mb-4 text-purple-600`}>
              ✏️ Edit Your Message ✏️
            </h3>

            <textarea
              className="w-full p-3 border-2 border-purple-300 rounded-lg mb-4 h-32 focus:ring focus:ring-purple-300 outline-none text-purple-800 font-medium bg-purple-50"
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              disabled={isSubmitting}
              style={{ color: "#5B21B6" }}
            />

            <div className="flex justify-center gap-3">
              <button
                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-full font-medium"
                onClick={() => setShowEditModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium flex items-center justify-center min-w-[80px]"
                onClick={handleSaveEdit}
                disabled={isSubmitting || !editMessage.trim()}
              >
                {isSubmitting ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
