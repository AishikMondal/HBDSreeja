"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dancing_Script } from "next/font/google";
import { useSound } from "@/components/sound-provider";

const dancing = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });

// Birthday emoji cards
const emojis = ["🎂", "🎁", "🎈", "🎉", "🎊", "💖", "🌹", "🍰"];
const allEmojis = [...emojis, ...emojis]; // Duplicate for pairs

export default function GamePage() {
  const router = useRouter();
  const { playSound } = useSound();
  const [cards, setCards] = useState<{emoji: string, flipped: boolean, matched: boolean}[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize and shuffle cards
  useEffect(() => {
    const shuffled = [...allEmojis]
      .sort(() => Math.random() - 0.5)
      .map(emoji => ({ emoji, flipped: false, matched: false }));
    
    setCards(shuffled);
    setFlippedIndices([]);
    setMatches(0);
    setMoves(0);
    setGameComplete(false);
  }, []);

  // Handle card click
  const handleCardClick = (index: number) => {
    if (!gameStarted) setGameStarted(true);
    
    // Ignore if already flipped or if two cards are already flipped
    if (cards[index].flipped || flippedIndices.length === 2) return;
    
    playSound("reveal");
    
    // Flip the card
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    
    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    
    // Check if we have two flipped cards
    if (newFlippedIndices.length === 2) {
      setMoves(prev => prev + 1);
      
      // Check if they match
      const [first, second] = newFlippedIndices;
      if (newCards[first].emoji === newCards[second].emoji) {
        // Match!
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setCards(matchedCards);
          setMatches(prev => prev + 1);
          setFlippedIndices([]);
          
          // Check if game is complete
          if (matches + 1 === emojis.length) {
            setGameComplete(true);
            playSound("reveal");
          }
        }, 500);
      } else {
        // No match, flip cards back
        setTimeout(() => {
          const unflippedCards = [...newCards];
          unflippedCards[first].flipped = false;
          unflippedCards[second].flipped = false;
          setCards(unflippedCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  // Handle proceed to letter
  const handleProceed = () => {
    playSound("reveal");
    router.push("/letter");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-rose-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h1 
          className={`${dancing.className} text-4xl md:text-5xl text-center mb-8 text-pink-600`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Match the Birthday Pairs!
        </motion.h1>
        
        {/* Game stats */}
        <div className="flex justify-between items-center mb-6 max-w-md mx-auto">
          <motion.div 
            className="text-xl font-bold text-pink-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Moves: {moves}
          </motion.div>
          <motion.div 
            className="text-xl font-bold text-pink-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Matches: {matches}/{emojis.length}
          </motion.div>
        </div>
        
        {/* Game grid */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-md mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`aspect-square flex items-center justify-center rounded-lg text-4xl cursor-pointer ${
                card.matched ? 'bg-green-100' : card.flipped ? 'bg-white' : 'bg-gradient-to-br from-pink-400 to-rose-500'
              } shadow-lg`}
              initial={{ opacity: 0, rotateY: -180 }}
              animate={{ 
                opacity: 1, 
                rotateY: card.flipped ? 0 : -180,
                scale: card.matched ? [1, 1.1, 1] : 1,
                boxShadow: card.matched 
                  ? '0 10px 25px rgba(52, 211, 153, 0.5)'
                  : card.flipped 
                    ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
                    : '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.05,
                scale: { duration: 0.5, repeat: card.matched ? 0 : 0 }
              }}
              onClick={() => handleCardClick(index)}
            >
              {card.flipped && card.emoji}
            </motion.div>
          ))}
        </div>
        
        {/* Game complete message */}
        {gameComplete && (
          <motion.div 
            className="mt-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className={`${dancing.className} text-3xl text-center text-pink-600 mb-6`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎉 Congratulations! 🎉
            </motion.h2>
            
            <motion.button
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg font-bold py-3 px-8 rounded-full shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(236,72,153,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProceed}
            >
              Continue to Your Special Message ❤️
            </motion.button>
          </motion.div>
        )}
        
        {/* Skip game button (only show if game not complete) */}
        {!gameComplete && gameStarted && (
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <button
              className="text-pink-500 underline text-sm"
              onClick={handleProceed}
            >
              Skip to message
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
