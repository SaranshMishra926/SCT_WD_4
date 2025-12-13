import { motion } from 'framer-motion';
import { useTodoStore } from '../store/todoStore';

export default function CategorySidebar() {
  const { categories, activeCategory, setActiveCategory, getTasksByCategory } = useTodoStore();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 h-full overflow-y-auto scrollbar-hide">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h2>
      
      <div className="space-y-1">
        <button
          onClick={() => setActiveCategory(null)}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
            activeCategory === null
              ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <span className="font-medium">All Tasks</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {getTasksByCategory(null).length}
          </span>
        </button>

        {categories.map((category) => {
          const taskCount = getTasksByCategory(category.id).length;
          return (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                activeCategory === category.id
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              whileHover={{ x: 2 }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{taskCount}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

