// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useTodoStore } from '../store/todoStore';
// import { Task } from '../types';
// import { getTimeUntilDue, formatDateTime } from '../utils/dateUtils';

// interface Alert {
//   id: string;
//   task: Task;
//   message: string;
//   type: 'urgent' | 'warning' | 'info';
//   minutesLeft: number;
// }

// export default function AlertNotification() {
//   const { tasks } = useTodoStore();
//   const [alerts, setAlerts] = useState<Alert[]>([]);

//   useEffect(() => {
//     const checkAlerts = () => {
//       const now = new Date();
//       const activeTasks = tasks.filter((t) => !t.completed && t.dueDate);
//       const newAlerts: Alert[] = [];

//       activeTasks.forEach((task) => {
//         const minutesLeft = getTimeUntilDue(task.dueDate, task.dueTime);
        
//         if (minutesLeft !== null && minutesLeft > 0) {
//           if (minutesLeft <= 15) {
//             // Urgent - less than 15 minutes
//             const minuteText = minutesLeft !== 1 ? 'minutes' : 'minute';
//             newAlerts.push({
//               id: task.id,
//               task,
//               message: `🚨 URGENT! "${task.text}" is due in ${minutesLeft} ${minuteText}!`,
//               type: 'urgent',
//               minutesLeft,
//             });
//           } else if (minutesLeft <= 60) {
//             // Warning - less than 1 hour
//             newAlerts.push({
//               id: task.id,
//               task,
//               message: `⏰ "${task.text}" is due in ${Math.round(minutesLeft)} minutes!`,
//               type: 'warning',
//               minutesLeft,
//             });
//           } else if (minutesLeft <= 180) {
//             // Info - less than 3 hours
//             const hours = Math.round(minutesLeft / 60);
//             const hourText = hours !== 1 ? 'hours' : 'hour';
//             newAlerts.push({
//               id: task.id,
//               task,
//               message: `📅 "${task.text}" is due in ${hours} ${hourText}`,
//               type: 'info',
//               minutesLeft,
//             });
//           }
//         }
//       }

//       // Sort by urgency (most urgent first)
//       newAlerts.sort((a, b) => a.minutesLeft - b.minutesLeft);
//       setAlerts(newAlerts.slice(0, 3)); // Show max 3 alerts
//     };

//     checkAlerts();
//     const interval = setInterval(checkAlerts, 30000); // Check every 30 seconds

//     return () => clearInterval(interval);
//   }, [tasks]);

//   const dismissAlert = (id: string) => {
//     setAlerts((prev) => prev.filter((a) => a.id !== id));
//   };

//   if (alerts.length === 0) return null;

//   return (
//     <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
//       <AnimatePresence>
//         {alerts.map((alert) => (
//           <motion.div
//             key={alert.id}
//             initial={{ opacity: 0, x: 100, scale: 0.8 }}
//             animate={{ opacity: 1, x: 0, scale: 1 }}
//             exit={{ opacity: 0, x: 100, scale: 0.8 }}
//             className={`p-4 rounded-xl shadow-lg border-2 ${
//               alert.type === 'urgent'
//                 ? 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-600'
//                 : alert.type === 'warning'
//                 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 dark:border-yellow-600'
//                 : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-600'
//             }`}
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div className="flex-1">
//                 <p
//                   className={`text-sm font-medium ${
//                     alert.type === 'urgent'
//                       ? 'text-red-900 dark:text-red-100'
//                       : alert.type === 'warning'
//                       ? 'text-yellow-900 dark:text-yellow-100'
//                       : 'text-blue-900 dark:text-blue-100'
//                   }`}
//                 >
//                   {alert.message}
//                 </p>
//                 {alert.task.dueTime && (
//                   <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
//                     Due: {formatDateTime(alert.task.dueDate, alert.task.dueTime)}
//                   </p>
//                 )}
//               </div>
//               <button
//                 onClick={() => dismissAlert(alert.id)}
//                 className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// }

