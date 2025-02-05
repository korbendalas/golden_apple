import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { addTask, fetchTasks } from '@/app/actions/taskActions';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId = parseInt(session.user.id);
    const tasks = await fetchTasks(userId);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, description, dueDate, priority } = await request.json();

    const task = await addTask(title, description, dueDate, priority);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error adding task:', error);
    return NextResponse.json(
      { error: 'Failed to add task', message: (error as Error).message },
      { status: 400 },
    );
  }
}
