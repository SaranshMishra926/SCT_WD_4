import { useState, useEffect } from 'react';
import { useTodoStore } from './store/todoStore';
import Header from './components/Header';
import CategorySidebar from './components/CategorySidebar';
import MobileCategorySelector from './components/MobileCategorySelector';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ProgressBar from './components/ProgressBar';
import StatsCard from './components/StatsCard';
import AchievementBadge from './components/AchievementBadge';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const { getTasksByCategory, getTodayTasks, activeCategory, darkMode, achievements } = useTodoStore();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [view, setView] = useState<'all' | 'today'>('all');
  const [newAchievement, setNewAchievement] = useState<string | null>(null);
  const [previousAchievements, setPreviousAchievements] = useState<string[]>(achievements);

  useEffect(() => {
    // Check for new achievements
    const newAch = achievements.find((a) => !previousAchievements.includes(a));
    if (newAch) {
      setNewAchievement(newAch);
      setPreviousAchievements(achievements);
    }
  }, [achievements, previousAchievements]);

  // Initialize dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const tasks = view === 'today' ? getTodayTasks() : getTasksByCategory(activeCategory);

  // Filter out completed tasks for better UX (optional - can be changed)
  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header onAddTask={() => setShowTaskForm(true)} view={view} onViewChange={setView} />

      {/* Mobile Category Selector */}
      <MobileCategorySelector />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <CategorySidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Stats Card */}
            {view === 'all' && (
              <div className="grid md:grid-cols-2 gap-6">
                <ProgressBar />
                <StatsCard />
              </div>
            )}

            {/* Active Tasks */}
            {activeTasks.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {view === 'today' ? "Today's Tasks" : 'Active Tasks'}
                </h2>
                <TaskList tasks={activeTasks} />
              </div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Completed ({completedTasks.length})
                </h2>
                <TaskList tasks={completedTasks} />
              </div>
            )}

            {/* Empty State */}
            {tasks.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="text-6xl mb-4"
                >
                  {view === 'today' ? '🎉' : '✨'}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-medium text-gray-600 dark:text-gray-400"
                >
                  {view === 'today' ? "No tasks for today" : 'No tasks yet'}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm mt-1 text-gray-500 dark:text-gray-500"
                >
                  {view === 'today' ? "You're all caught up! 🚀" : 'Add a new task to get started'}
                </motion.p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Add Button */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button
          onClick={() => setShowTaskForm(true)}
          className="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Task Form Modal */}
      <AnimatePresence>
        {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
      </AnimatePresence>

      {/* Achievement Badge */}
      <AnimatePresence>
        {newAchievement && (
          <AchievementBadge
            achievementId={newAchievement}
            onClose={() => setNewAchievement(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
