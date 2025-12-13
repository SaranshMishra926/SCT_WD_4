import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Achievement {
  id: string;
  title: string;
  emoji: string;
  description: string;
}

const achievementMap: Record<string, Achievement> = {
  first: { id: 'first', title: 'First Step!', emoji: '🎯', description: 'Completed your first task' },
  ten: { id: 'ten', title: 'Getting Started!', emoji: '🔥', description: 'Completed 10 tasks' },
  fifty: { id: 'fifty', title: 'Half Century!', emoji: '💪', description: 'Completed 50 tasks' },
  hundred: { id: 'hundred', title: 'Century!', emoji: '🏆', description: 'Completed 100 tasks' },
  streak3: { id: 'streak3', title: 'On Fire!', emoji: '🔥', description: '3 day streak' },
  streak7: { id: 'streak7', title: 'Week Warrior!', emoji: '⚡', description: '7 day streak' },
  streak30: { id: 'streak30', title: 'Legend!', emoji: '👑', description: '30 day streak' },
};

interface AchievementBadgeProps {
  achievementId: string;
  onClose: () => void;
}

export default function AchievementBadge({ achievementId, onClose }: AchievementBadgeProps) {
  const achievement = achievementMap[achievementId];
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!achievement) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-2xl border-4 border-white dark:border-gray-800"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: 2 }}
            className="text-6xl text-center mb-2"
          >
            {achievement.emoji}
          </motion.div>
          <h3 className="text-2xl font-bold text-white text-center mb-1">
            {achievement.title}
          </h3>
          <p className="text-white/90 text-center text-sm">
            {achievement.description}
          </p>
          <div className="absolute top-2 right-2">
            <button
              onClick={() => {
                setShow(false);
                setTimeout(onClose, 500);
              }}
              className="text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

