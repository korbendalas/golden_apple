'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '@prisma/client';

interface TasksContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('/api/tasks', {
          next: { revalidate: 10 },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, [setTasks]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}
