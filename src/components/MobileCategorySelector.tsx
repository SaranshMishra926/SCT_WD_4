import { useTodoStore } from '../store/todoStore';
import { motion } from 'framer-motion';

export default function MobileCategorySelector() {
  const { categories, activeCategory, setActiveCategory, getTasksByCategory } = useTodoStore();

  return (
    <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            activeCategory === null
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          All ({getTasksByCategory(null).length})
        </button>
        {categories.map((category) => {
          const taskCount = getTasksByCategory(category.id).length;
          return (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {category.name} ({taskCount})
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

