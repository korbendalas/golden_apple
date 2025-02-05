'use client';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { TasksProvider } from '@/components/contexts/tasks-context/TasksContext';
import { toast } from 'react-hot-toast';
import { CreateTaskFormModal } from '@/components/create-task-form/create-task-form-modal/CreateTaskFormModal.component';

interface TasksLayoutProps {
  children: React.ReactNode;
  list: React.ReactNode;
  stats: React.ReactNode;
}

export default function TasksLayout({
  children,
  list: taskList,
  stats: taskStats,
}: TasksLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <TasksProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Task Management</h1>
          <div className="flex space-x-4 items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Add Task
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="p-4">
          <div className="grid grid-cols-1 gap-4">
            <div>{taskList}</div>
            <div>{taskStats}</div>
          </div>
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          &copy; {new Date().getFullYear()} Task App
        </footer>
        <CreateTaskFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </TasksProvider>
  );
}
