import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticNoButtonProps {
  text: string;
}

const MagneticNoButton: React.FC<MagneticNoButtonProps> = ({ text }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [initialRect, setInitialRect] = useState<DOMRect | null>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Increased stiffness and damping for a more responsive, physical feel
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Capture initial position relative to viewport
  useEffect(() => {
    const updateRect = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        // Calculate the "resting" layout position by subtracting current translation
        setInitialRect({
            x: rect.x - xSpring.get(),
            y: rect.y - ySpring.get(),
            width: rect.width,
            height: rect.height,
            top: rect.top - ySpring.get(),
            right: rect.right - xSpring.get(),
            bottom: rect.bottom - ySpring.get(),
            left: rect.left - xSpring.get(),
            toJSON: () => rect.toJSON()
        } as DOMRect);
      }
    };

    // Wait for enter animations
    const timer = setTimeout(updateRect, 1000);
    window.addEventListener('resize', updateRect);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateRect);
    };
  }, [xSpring, ySpring]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!initialRect) return;

      const currentX = xSpring.get();
      const currentY = ySpring.get();
      
      const btnCenterX = initialRect.left + currentX + initialRect.width / 2;
      const btnCenterY = initialRect.top + currentY + initialRect.height / 2;

      const dx = e.clientX - btnCenterX;
      const dy = e.clientY - btnCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const triggerRadius = 200;

      if (distance < triggerRadius) {
        // 1. Calculate Repulsion (Away from mouse)
        const angle = Math.atan2(dy, dx);
        const repulsionForce = (triggerRadius - distance) * 2.5;
        const moveX = -Math.cos(angle) * repulsionForce;
        const moveY = -Math.sin(angle) * repulsionForce;

        // 2. Add Center Bias (Gently pull towards screen center to prevent corner trapping)
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const centerDirX = centerX - btnCenterX;
        const centerDirY = centerY - btnCenterY;
        // Normalize center direction
        const centerDist = Math.sqrt(centerDirX * centerDirX + centerDirY * centerDirY);
        const biasStrength = 20; 
        const biasX = (centerDirX / centerDist) * biasStrength;
        const biasY = (centerDirY / centerDist) * biasStrength;

        // 3. New Target Position (Relative to initial layout position)
        let targetX = currentX + moveX + biasX;
        let targetY = currentY + moveY + biasY;

        // 4. Viewport Constraints
        const padding = 50;
        const minLeft = -initialRect.left + padding;
        const maxLeft = window.innerWidth - initialRect.left - initialRect.width - padding;
        const minTop = -initialRect.top + padding;
        const maxTop = window.innerHeight - initialRect.top - initialRect.height - padding;

        // Clamp the target offsets to ensure button stays within viewport
        if (targetX < minLeft) targetX = minLeft;
        if (targetX > maxLeft) targetX = maxLeft;
        if (targetY < minTop) targetY = minTop;
        if (targetY > maxTop) targetY = maxTop;

        x.set(targetX);
        y.set(targetY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [initialRect, x, y, xSpring, ySpring]);

  return (
    <motion.button
      ref={buttonRef}
      style={{ x: xSpring, y: ySpring }}
      className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold backdrop-blur-sm shadow-lg cursor-not-allowed z-50 whitespace-nowrap"
      whileTap={{ scale: 0.95 }}
      aria-hidden="true"
    >
      {text}
    </motion.button>
  );
};

export default MagneticNoButton;