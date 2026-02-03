import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';

const SuccessCard: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative w-full max-w-lg p-10 mx-4 text-center rounded-3xl backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-pink-500/20 rounded-3xl animate-pulse" />

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="flex justify-center mb-6"
      >
        <div className="relative w-40 h-40 rounded-full border-4 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.3)] overflow-hidden">
          <img src="/us.jpg" alt="Us" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg"
      >
        Wiedziałem!
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl text-rose-50 font-light leading-relaxed drop-shadow-md"
      >
        Jesteś najlepszą Walentynką na świecie! ❤️
        <br />
        Kocham cię najbardziej Pitku
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="mt-8 text-sm text-white/60 font-sans"
      >
        (To była jedyna poprawna odpowiedź)
      </motion.div>
    </motion.div>
  );
};

export default SuccessCard;