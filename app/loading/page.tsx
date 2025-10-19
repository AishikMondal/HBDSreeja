"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export default function LoadingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            router.push("/game");
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);
    
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100 overflow-hidden">
      {/* Decorative elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl md:text-6xl"
          initial={{
            x: Math.random() * 100 - 50 + "vw",
            y: Math.random() * 100 - 50 + "vh",
            opacity: 0.2,
            scale: 0.2,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.2, 0.6, 0.2],
            x: Math.random() * 100 - 50 + "vw",
            y: Math.random() * 100 - 50 + "vh",
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {["✨", "💖", "🎉", "🎂", "🎁", "🎊"][Math.floor(Math.random() * 6)]}
        </motion.div>
      ))}

      <motion.h1
        className={`${pacifico.className} text-7xl md:text-9xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600`}
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          filter: ["drop-shadow(0 0 10px rgba(236,72,153,0.3))", "drop-shadow(0 0 20px rgba(236,72,153,0.6))", "drop-shadow(0 0 10px rgba(236,72,153,0.3))"]
        }}
        transition={{
          duration: 1,
          filter: {
            duration: 2,
            repeat: Infinity,
          }
        }}
      >
        Happy 19th!
      </motion.h1>
      
      {/* Progress bar */}
      <div className="w-64 md:w-96 h-4 bg-pink-200 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-rose-500 absolute top-0 left-0"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>
      
      <motion.p 
        className="mt-4 text-pink-700 text-lg md:text-xl"
        animate={{
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity
        }}
      >
        Preparing your special day...
      </motion.p>
    </div>
  );
}
