import { motion } from 'framer-motion';

interface ConfettiProps {
  onComplete?: () => void;
}

export default function Confetti({ onComplete }: ConfettiProps) {
  const colors = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444', '#14b8a6', '#f97316'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(100)].map((_, i) => {
        const angle = (Math.PI * 2 * i) / 100;
        const distance = 300 + Math.random() * 200;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        return (
          <motion.div
            key={i}
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: x + (Math.random() - 0.5) * 100,
              y: y + (Math.random() - 0.5) * 100,
              rotate: Math.random() * 720,
              opacity: [1, 1, 0],
              scale: [1, 1.2, 0.5],
            }}
            transition={{
              duration: 2 + Math.random(),
              delay: Math.random() * 0.5,
              ease: 'easeOut',
            }}
            onAnimationComplete={() => {
              if (i === 99 && onComplete) {
                setTimeout(onComplete, 500);
              }
            }}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
            style={{
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            }}
          />
        );
      })}
    </div>
  );
}

