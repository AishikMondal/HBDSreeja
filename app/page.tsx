"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSound } from "@/components/sound-provider";
import { Pacifico, Dancing_Script } from "next/font/google";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
const dancing = Dancing_Script({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function HomePage() {
  const { playSound } = useSound();
  
  const handleExploreClick = () => {
    playSound("reveal");
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Background with soft gradient */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(1200px 800px at 10% 10%, #ffe6ef 0%, transparent 60%),
            radial-gradient(1200px 800px at 90% 90%, #ffe8f2 0%, transparent 60%),
            linear-gradient(135deg, #ffd6e7 0%, #ffe9f2 50%, #ffdfe9 100%)
          `,
          backgroundColor: "#ffe9f2",
        }}
      />

      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 right-[20%] text-8xl"
        animate={{ 
          y: [0, -30, 0], 
          rotate: [0, 15, 0],
          filter: ["drop-shadow(0 0 10px rgba(236,72,153,0.2))", "drop-shadow(0 0 25px rgba(236,72,153,0.6))", "drop-shadow(0 0 10px rgba(236,72,153,0.2))"]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        ✨
      </motion.div>
      
      <motion.div 
        className="absolute bottom-32 left-[15%] text-8xl"
        animate={{ 
          y: [0, 30, 0], 
          rotate: [0, -20, 0] 
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        🎁
      </motion.div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
        {/* Large image of Sreeja - using the image you shared */}
        <motion.div
          className="mb-8 relative"
          animate={{ 
            scale: [1, 1.03, 1],
            y: [0, -10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          {/* Option 1: If you save the image to public folder */}
          {/* <img 
            src="/sreeja.jpg" 
            alt="Sreeja" 
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-8 border-white shadow-[0_0_40px_rgba(236,72,153,0.3)]"
          /> */}
          
          {/* Option 2: Using the direct URL you shared */}
          <img 
            src="https://i.postimg.cc/hJKnTt4f/Screenshot-2025-10-19-020941.png" 
            alt="Sreeja" 
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-8 border-white shadow-[0_0_40px_rgba(236,72,153,0.3)]"
          />
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-pink-300 to-rose-300 -z-10 opacity-30 blur-xl"/>
        </motion.div>
        
        {/* Name with playful font */}
        <motion.h1 
          className={`${pacifico.className} text-7xl md:text-9xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600`}
          animate={{ 
            scale: [1, 1.03, 1],
            filter: ["drop-shadow(0 0 10px rgba(236,72,153,0.2))", "drop-shadow(0 0 20px rgba(236,72,153,0.4))", "drop-shadow(0 0 10px rgba(236,72,153,0.2))"]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Sreeja
        </motion.h1>
        
        {/* Birthday message */}
        <motion.h2 
          className={`${dancing.className} text-4xl md:text-5xl lg:text-6xl text-pink-600 mb-12 text-center`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Happy Birthday!
        </motion.h2>
        
        {/* Emoji decorations */}
        <motion.div 
          className="flex justify-center gap-5 mb-12 text-4xl md:text-6xl"
        >
          {["🎂", "💖", "🎉", "🌸", "✨"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.2, 1],
                rotate: [0, emoji === "✨" ? 15 : -5, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Explore button */}
        <Link href="/loading" onClick={handleExploreClick}>
          <motion.button 
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl md:text-2xl font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(236,72,153,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore More ✨
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
