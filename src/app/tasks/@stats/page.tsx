'use client';

import { useTasks } from '@/components/contexts/tasks-context/TasksContext';
import { Task } from '@prisma/client';

export default function TaskStats() {
  const { tasks } = useTasks();
  const completedTasks = tasks.filter((task: Task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Task Stats</h2>
      <div className="space-y-2">
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>Pending Tasks: {pendingTasks}</p>
      </div>
    </div>
  );
}
