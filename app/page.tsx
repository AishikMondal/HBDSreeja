"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Pacifico, Dancing_Script } from "next/font/google";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
const dancing = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });

export default function HomePage() {
  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Simple gradient background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(135deg, #ffd6e7 0%, #ffe9f2 50%, #ffdfe9 100%)`,
          backgroundColor: "#ffe9f2",
        }}
      />

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10">
        {/* Main image */}
        <motion.div
          className="relative mb-10"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg">
            <img 
              src="https://i.postimg.cc/Q9M2c8Pm/Screenshot-2025-10-19-020941.png" 
              alt="Sreeja" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        
        {/* Name */}
        <motion.h1 
          className={`${pacifico.className} text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 px-4 pb-2 mb-6`}
          style={{ lineHeight: '1.4', display: 'inline-block' }}
        >
          Sreeja
        </motion.h1>
        
        {/* Birthday message */}
        <h2 className={`${dancing.className} text-3xl md:text-5xl text-pink-600 mb-10 text-center`}>
          Happy Birthday!
        </h2>
        
        {/* Button */}
        <Link href="/letter">
          <motion.button 
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg md:text-xl font-bold py-3 px-8 rounded-full shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read Your Birthday Letter ✨
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
