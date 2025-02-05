'use client';

import { lazy, Suspense } from 'react';
import { useTasks } from '@/components/contexts/tasks-context/TasksContext';

const TaskItem = lazy(async () => ({
  default: (await import('@/components/task-item/TaskItem.component')).TaskItem,
}));
export function TaskList() {
  const { tasks, setTasks } = useTasks();
  return (
    <div className="space-y-4">
      <Suspense fallback={<div>Loading...</div>}>
        {tasks?.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}
      </Suspense>
    </div>
  );
}
