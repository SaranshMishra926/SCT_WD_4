import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTodoStore } from '../store/todoStore';
import { Task } from '../types';
import { formatDateTime, isOverdue } from '../utils/dateUtils';
import SubtaskItem from './SubtaskItem';
import TaskForm from './TaskForm';
import Confetti from './Confetti';

interface TaskItemProps {
  task: Task;
  index: number;
}

export default function TaskItem({ task, index }: TaskItemProps) {
  const { toggleTask, deleteTask, addSubtask, toggleSubtask, deleteSubtask, updateSubtask, categories } = useTodoStore();
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [wasCompleted, setWasCompleted] = useState(task.completed);

  useEffect(() => {
    if (task.completed && !wasCompleted) {
      setShowConfetti(true);
    }
    setWasCompleted(task.completed);
  }, [task.completed, wasCompleted]);

  const category = categories.find((c) => c.id === task.category);
  const priorityColors = {
    low: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubtaskText.trim()) {
      addSubtask(task.id, { text: newSubtaskText.trim(), completed: false });
      setNewSubtaskText('');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: task.completed && !wasCompleted ? [1, 1.02, 1] : 1,
        }}
        transition={{ 
          delay: index * 0.05,
          scale: { duration: 0.3 }
        }}
        className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-[1.01] transition-all ${
          task.completed ? 'opacity-60' : ''
        }`}
      >
        <div className="flex items-start gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleTask(task.id)}
            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all mt-0.5 ${
              task.completed
                ? 'bg-primary-600 border-primary-600 shadow-md'
                : 'border-gray-300 dark:border-gray-600 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
            }`}
          >
            {task.completed && (
              <motion.svg 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className="w-3 h-3 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </motion.svg>
            )}
          </motion.button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3
                  className={`font-medium text-gray-900 dark:text-white ${
                    task.completed ? 'line-through text-gray-400 dark:text-gray-600' : ''
                  }`}
                >
                  {task.text}
                </h3>

                {(task.dueDate || task.priority !== 'medium' || category) && (
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {category && (
                      <span
                        className="px-2 py-0.5 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: `${category.color}20`,
                          color: category.color,
                        }}
                      >
                        {category.name}
                      </span>
                    )}
                    {task.priority !== 'medium' && (
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    )}
                    {task.dueDate && (
                      <span
                        className={`text-xs ${
                          isOverdue(task.dueDate) && !task.completed
                            ? 'text-red-600 dark:text-red-400 font-medium'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {formatDateTime(task.dueDate, task.dueTime)}
                      </span>
                    )}
                  </div>
                )}

                {task.subtasks.length > 0 && (
                  <button
                    onClick={() => setShowSubtasks(!showSubtasks)}
                    className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {showSubtasks ? 'Hide' : 'Show'} {task.subtasks.length} subtask{task.subtasks.length !== 1 ? 's' : ''}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  title="Edit task"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  title="Delete task"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {showSubtasks && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 space-y-2 pl-7 border-l-2 border-gray-200 dark:border-gray-700"
              >
                {task.subtasks.map((subtask) => (
                  <SubtaskItem
                    key={subtask.id}
                    subtask={subtask}
                    onToggle={() => toggleSubtask(task.id, subtask.id)}
                    onDelete={() => deleteSubtask(task.id, subtask.id)}
                    onUpdate={(text) => updateSubtask(task.id, subtask.id, text)}
                  />
                ))}

                <form onSubmit={handleAddSubtask} className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newSubtaskText}
                    onChange={(e) => setNewSubtaskText(e.target.value)}
                    placeholder="Add subtask..."
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors"
                  >
                    Add
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {isEditing && (
        <TaskForm
          initialTask={task}
          onClose={() => setIsEditing(false)}
        />
      )}

      {showConfetti && (
        <Confetti onComplete={() => setShowConfetti(false)} />
      )}
    </>
  );
}

