# Todo App - Stay Organized

A beautiful, feature-rich Todo List application built with React, TypeScript, and modern web technologies.

## Features

### Core Functionality
- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as completed
- ✅ Organize tasks into categories
- ✅ Set due dates and times for tasks
- ✅ Priority levels (Low, Medium, High)
- ✅ Subtasks for breaking work into steps
- ✅ Drag and drop to reorder tasks
- ✅ Today view for daily focus
- ✅ Visual progress indicator

### User Experience
- 🎨 Clean, minimal UI design
- 🌙 Dark mode support
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth animations with Framer Motion
- 💾 Offline-first with local storage persistence
- 🎯 Intuitive and easy to use

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Framer Motion** - Animations
- **@hello-pangea/dnd** - Drag and drop
- **date-fns** - Date utilities

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/       # React components
│   ├── TaskItem.tsx
│   ├── TaskForm.tsx
│   ├── TaskList.tsx
│   ├── SubtaskItem.tsx
│   ├── CategorySidebar.tsx
│   ├── MobileCategorySelector.tsx
│   ├── Header.tsx
│   └── ProgressBar.tsx
├── store/           # Zustand store
│   └── todoStore.ts
├── types/           # TypeScript types
│   └── index.ts
├── utils/           # Utility functions
│   └── dateUtils.ts
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Usage

### Adding a Task
- Click the "Add Task" button
- Fill in the task details (text, priority, category, due date/time)
- Click "Add Task" to save

### Managing Tasks
- Click the checkbox to mark a task as completed
- Click the edit icon to modify a task
- Click the delete icon to remove a task
- Drag tasks to reorder them

### Subtasks
- Click "Show subtasks" on a task
- Add subtasks to break down work
- Mark subtasks as completed individually

### Categories
- Use the sidebar (desktop) or top bar (mobile) to filter by category
- Default categories: Personal, Work, Shopping
- Tasks are automatically organized by category

### Today View
- Switch to "Today" view to see only tasks due today
- Perfect for daily focus and planning

## Data Persistence

All data is stored locally in your browser using localStorage. Your tasks will persist across browser sessions.

## 📌 Project Info

Developed for: SkillCraft Technology
Developed by: Saransh Mishra

 
           Built with ❤️ to promote better daily organization and productivity.
"# SCT_WD_4" 
