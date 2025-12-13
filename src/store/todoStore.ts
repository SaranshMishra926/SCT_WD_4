import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Category, Subtask } from '../types';

interface TodoStore {
  tasks: Task[];
  categories: Category[];
  activeCategory: string | null;
  darkMode: boolean;
  streak: number;
  lastActiveDate: string | null;
  totalCompleted: number;
  achievements: string[];
  
  // Task actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
  
  // Subtask actions
  addSubtask: (taskId: string, subtask: Omit<Subtask, 'id'>) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  updateSubtask: (taskId: string, subtaskId: string, text: string) => void;
  
  // Category actions
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  setActiveCategory: (id: string | null) => void;
  
  // UI actions
  toggleDarkMode: () => void;
  
  // Computed values
  getTasksByCategory: (categoryId: string | null) => Task[];
  getTodayTasks: () => Task[];
  getProgress: () => { completed: number; total: number; percentage: number };
}

const defaultCategories: Category[] = [
  { id: 'personal', name: 'Personal', color: '#3b82f6' },
  { id: 'work', name: 'Work', color: '#10b981' },
  { id: 'shopping', name: 'Shopping', color: '#f59e0b' },
];

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      categories: defaultCategories,
      activeCategory: null,
      darkMode: false,
      streak: 0,
      lastActiveDate: null,
      totalCompleted: 0,
      achievements: [],

      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      toggleTask: (id) => {
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed: !task.completed,
                  updatedAt: new Date().toISOString(),
                }
              : task
          );
          
          const task = state.tasks.find((t) => t.id === id);
          const wasCompleted = task?.completed || false;
          const nowCompleted = !wasCompleted;
          
          // Update streak and achievements
          let newStreak = state.streak;
          let newTotalCompleted = state.totalCompleted;
          let newAchievements = [...state.achievements];
          const today = new Date().toISOString().split('T')[0];
          
          if (nowCompleted) {
            newTotalCompleted = state.totalCompleted + 1;
            
            // Update streak
            if (state.lastActiveDate === today) {
              // Already active today, no change
            } else if (state.lastActiveDate === null || 
                      new Date(today).getTime() - new Date(state.lastActiveDate).getTime() === 86400000) {
              // Consecutive day
              newStreak = state.streak + 1;
            } else {
              // Reset streak
              newStreak = 1;
            }
            
            // Check achievements
            if (newTotalCompleted === 1 && !newAchievements.includes('first')) {
              newAchievements.push('first');
            }
            if (newTotalCompleted === 10 && !newAchievements.includes('ten')) {
              newAchievements.push('ten');
            }
            if (newTotalCompleted === 50 && !newAchievements.includes('fifty')) {
              newAchievements.push('fifty');
            }
            if (newTotalCompleted === 100 && !newAchievements.includes('hundred')) {
              newAchievements.push('hundred');
            }
            if (newStreak === 3 && !newAchievements.includes('streak3')) {
              newAchievements.push('streak3');
            }
            if (newStreak === 7 && !newAchievements.includes('streak7')) {
              newAchievements.push('streak7');
            }
            if (newStreak === 30 && !newAchievements.includes('streak30')) {
              newAchievements.push('streak30');
            }
          } else {
            // Task uncompleted
            newTotalCompleted = Math.max(0, state.totalCompleted - 1);
          }
          
          return {
            tasks: updatedTasks,
            streak: newStreak,
            lastActiveDate: nowCompleted ? today : state.lastActiveDate,
            totalCompleted: newTotalCompleted,
            achievements: newAchievements,
          };
        });
      },

      reorderTasks: (startIndex, endIndex) => {
        set((state) => {
          const filteredTasks = get().getTasksByCategory(state.activeCategory);
          const result = Array.from(filteredTasks);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);

          // Create a map of new positions
          const taskIdToNewIndex = new Map<string, number>();
          result.forEach((task, index) => {
            taskIdToNewIndex.set(task.id, index);
          });

          // Separate tasks by category
          const categoryTasks = state.tasks.filter(
            (t) => state.activeCategory === null || t.category === state.activeCategory
          );
          const otherTasks = state.tasks.filter(
            (t) => state.activeCategory !== null && t.category !== state.activeCategory
          );

          // Reorder category tasks
          const reorderedCategoryTasks = categoryTasks.sort((a, b) => {
            const indexA = taskIdToNewIndex.get(a.id) ?? Infinity;
            const indexB = taskIdToNewIndex.get(b.id) ?? Infinity;
            return indexA - indexB;
          });

          return { tasks: [...reorderedCategoryTasks, ...otherTasks] };
        });
      },

      addSubtask: (taskId, subtaskData) => {
        const newSubtask: Subtask = {
          ...subtaskData,
          id: generateId(),
        };
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: [...task.subtasks, newSubtask],
                  updatedAt: new Date().toISOString(),
                }
              : task
          ),
        }));
      },

      toggleSubtask: (taskId, subtaskId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: task.subtasks.map((st) =>
                    st.id === subtaskId ? { ...st, completed: !st.completed } : st
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : task
          ),
        }));
      },

      deleteSubtask: (taskId, subtaskId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: task.subtasks.filter((st) => st.id !== subtaskId),
                  updatedAt: new Date().toISOString(),
                }
              : task
          ),
        }));
      },

      updateSubtask: (taskId, subtaskId, text) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: task.subtasks.map((st) =>
                    st.id === subtaskId ? { ...st, text } : st
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : task
          ),
        }));
      },

      addCategory: (categoryData) => {
        const newCategory: Category = {
          ...categoryData,
          id: generateId(),
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== id),
          tasks: state.tasks.map((task) =>
            task.category === id ? { ...task, category: 'personal' } : task
          ),
          activeCategory: state.activeCategory === id ? null : state.activeCategory,
        }));
      },

      setActiveCategory: (id) => {
        set({ activeCategory: id });
      },

      toggleDarkMode: () => {
        set((state) => {
          const newDarkMode = !state.darkMode;
          if (newDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { darkMode: newDarkMode };
        });
      },

      getTasksByCategory: (categoryId) => {
        const tasks = get().tasks;
        if (!categoryId) return tasks;
        return tasks.filter((task) => task.category === categoryId);
      },

      getTodayTasks: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().tasks.filter((task) => task.dueDate === today);
      },

      getProgress: () => {
        const tasks = get().tasks;
        const total = tasks.length;
        const completed = tasks.filter((t) => t.completed).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { completed, total, percentage };
      },
    }),
    {
      name: 'todo-storage',
      partialize: (state) => ({
        tasks: state.tasks,
        categories: state.categories,
        activeCategory: state.activeCategory,
        darkMode: state.darkMode,
        streak: state.streak,
        lastActiveDate: state.lastActiveDate,
        totalCompleted: state.totalCompleted,
        achievements: state.achievements,
      }),
    }
  )
);

