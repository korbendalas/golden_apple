'use client';

import { TaskItemProps } from '@/components/task-item/TaskItem.types';
import { completeTask, deleteTask } from '@/app/actions/taskActions';
import { toast } from 'react-hot-toast';

export const TaskItem = ({ task, tasks, setTasks }: TaskItemProps) => {
  const handleComplete = async (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);

    try {
      const isCompleted = !!updatedTasks.find((t) => t.id === taskId)
        ?.completed;
      await completeTask(taskId, isCompleted);
      toast.success(
        `Task ${isCompleted ? 'completed' : 'undone'} successfully`,
      );
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleDelete = async (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    toast.success('Task deleted successfully');
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  return (
    <div
      className={`p-4 border rounded-lg transition-transform transform hover:scale-105 ${
        task.completed
          ? 'bg-green-50 border-green-200'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-black">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">Priority: {task.priority}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleComplete(task.id)}
            className={`px-3 py-1 text-sm rounded ${
              task.completed
                ? 'bg-gray-200 text-gray-700'
                : 'bg-green-500 text-white'
            }`}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={() => handleDelete(task.id)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
