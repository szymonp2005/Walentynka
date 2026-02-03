import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import MagneticNoButton from './MagneticNoButton';
import { triggerHeartConfetti } from '../utils/confetti';

interface ProposalCardProps {
  onAccept: () => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ onAccept }) => {
  const handleYes = () => {
    triggerHeartConfetti();
    onAccept();
  };

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
      transition={{ type: "spring", duration: 0.8 }}
      className="relative w-full max-w-lg mx-4 text-center z-10"
    >
        {/* Glass Container with clipping for background effects */}
        <div className="absolute inset-0 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl overflow-hidden pointer-events-none">
            {/* Decorative gloss shine */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
        </div>

        {/* Content Container - Allows elements to overflow (escape) the card */}
        <div className="relative p-8 md:p-12 z-20">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-6"
            >
                <div className="p-4 bg-white/20 rounded-full shadow-inner border border-white/20">
                    <Heart className="w-12 h-12 text-rose-100 fill-rose-500/50 animate-pulse" />
                </div>
            </motion.div>

            <motion.h1 
                className="font-serif text-4xl md:text-5xl font-bold text-white mb-8 leading-tight drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                Czy zostaniesz moją Walentynką?
            </motion.h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 h-32 md:h-auto relative">
                {/* YES Button */}
                <motion.button
                    onClick={handleYes}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(244, 63, 94, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                        boxShadow: ["0 0 0px rgba(244, 63, 94, 0)", "0 0 20px rgba(244, 63, 94, 0.5)", "0 0 0px rgba(244, 63, 94, 0)"] 
                    }}
                    transition={{ 
                        boxShadow: { duration: 2, repeat: Infinity } 
                    }}
                    className="px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-lg shadow-xl hover:from-rose-400 hover:to-pink-500 transition-all border border-white/20 z-30 relative"
                >
                    TAK! ❤️
                </motion.button>

                {/* NO Button (Evasive) */}
                <div className="relative w-32 h-12 flex justify-center items-center z-30">
                     <MagneticNoButton text="NIE" />
                </div>
            </div>
        </div>
    </motion.div>
  );
};

export default ProposalCard;