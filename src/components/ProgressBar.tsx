import { useTodoStore } from '../store/todoStore';
import { motion } from 'framer-motion';

export default function ProgressBar() {
  const progress = useTodoStore((state) => state.getProgress());

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</h3>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {progress.completed} / {progress.total}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
        {progress.percentage}% completed
      </p>
    </div>
  );
}

