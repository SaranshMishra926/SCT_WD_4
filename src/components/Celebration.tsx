import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CelebrationProps {
  onComplete?: () => void;
}

export default function Celebration({ onComplete }: CelebrationProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <div className="relative">
        {/* Confetti particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              x: (Math.random() - 0.5) * 1000,
              y: (Math.random() - 0.5) * 1000,
              rotate: Math.random() * 360,
              opacity: 0,
            }}
            transition={{
              duration: 1.5,
              delay: Math.random() * 0.5,
              ease: 'easeOut',
            }}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444'][
                Math.floor(Math.random() * 6)
              ],
              left: '50%',
              top: '50%',
            }}
          />
        ))}

        {/* Celebration message */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: 3,
            }}
            className="text-8xl mb-4"
          >
            🎉
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2"
          >
            Great Job!
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            Task Completed! 🚀
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

