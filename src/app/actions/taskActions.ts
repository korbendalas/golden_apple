'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
const prisma = new PrismaClient();

/*
  The fetchTasks and addTask functions are Server Actions.
  They handle data fetching and mutation while running on the server.
  revalidatePath ensures the /tasks page reflects the latest data after adding a task.
 */

export async function fetchTasks(userId: number) {
  return prisma.task.findMany({ where: { userId } });
}

export async function addTask(
  title: string,
  description: string,
  dueDate: string,
  priority: string,
) {
  const session = await getServerSession(authOptions);
  const userId = parseInt(session.user.id);

  if (!title.trim()) {
    throw new Error('Title is required');
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      dueDate: new Date(dueDate),
      priority,
      userId,
    },
  });

  // Revalidate the cache for the tasks page to reflect the new task
  revalidatePath('/tasks');
  return task;
}

export async function completeTask(taskId: number, completed: boolean) {
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { completed },
  });

  revalidatePath('/tasks');
  return updatedTask;
}

export async function deleteTask(taskId: number) {
  await prisma.task.delete({ where: { id: taskId } });
  revalidatePath('/tasks');
}
