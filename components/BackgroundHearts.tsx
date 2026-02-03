import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HeartParticle } from '../types';

const BackgroundHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    // Generate static hearts on client side to avoid hydration mismatch
    const newHearts: HeartParticle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: 110, // start below screen (unused in visual, logic handled by negative delay)
      size: Math.random() * 40 + 10,
      duration: Math.random() * 20 + 10,
      delay: -Math.random() * 30, // Negative delay to start mid-animation (instantly visible)
      rotation: Math.random() * 360,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            y: "110vh",
            x: `${heart.x}vw`,
            opacity: 0,
            rotate: heart.rotation
          }}
          animate={{
            y: "-20vh",
            opacity: [0, 0.4, 0],
            rotate: heart.rotation + 360
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          style={{
            position: 'absolute',
            fontSize: `${heart.size}px`,
            color: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          ❤️
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/80 via-pink-800/60 to-rose-500/40 mix-blend-overlay" />
    </div>
  );
};

export default BackgroundHearts;