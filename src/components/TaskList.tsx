import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useTodoStore } from '../store/todoStore';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const { reorderTasks } = useTodoStore();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    reorderTasks(sourceIndex, destinationIndex);
  };

  if (tasks.length === 0) {
    return null; // Empty state is handled in App.tsx
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.8 : 1,
                      transform: snapshot.isDragging
                        ? `${provided.draggableProps.style?.transform} rotate(2deg)`
                        : provided.draggableProps.style?.transform,
                    }}
                    className={snapshot.isDragging ? 'shadow-lg z-50' : ''}
                  >
                    <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                      <TaskItem task={task} index={index} />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

