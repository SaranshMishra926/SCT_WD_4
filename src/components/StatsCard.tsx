import { useTodoStore } from '../store/todoStore';
import { motion } from 'framer-motion';

export default function StatsCard() {
  const { streak, totalCompleted, achievements } = useTodoStore();

  return (
    <div className="bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 rounded-xl p-6 shadow-lg text-white">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>📊</span> Your Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/20 backdrop-blur-sm rounded-lg p-3"
        >
          <div className="text-3xl font-bold">{streak}</div>
          <div className="text-sm opacity-90">Day Streak 🔥</div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/20 backdrop-blur-sm rounded-lg p-3"
        >
          <div className="text-3xl font-bold">{totalCompleted}</div>
          <div className="text-sm opacity-90">Total Completed ✅</div>
        </motion.div>
      </div>

      {achievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 pt-4 border-t border-white/20"
        >
          <div className="text-sm font-medium mb-2">Achievements 🏆</div>
          <div className="flex flex-wrap gap-2">
            {achievements.map((ach) => (
              <motion.span
                key={ach}
                whileHover={{ scale: 1.1 }}
                className="text-2xl"
                title={ach}
              >
                {ach === 'first' && '🎯'}
                {ach === 'ten' && '🔥'}
                {ach === 'fifty' && '💪'}
                {ach === 'hundred' && '🏆'}
                {ach === 'streak3' && '🔥'}
                {ach === 'streak7' && '⚡'}
                {ach === 'streak30' && '👑'}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

