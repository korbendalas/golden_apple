import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { TaskList } from '@/components/tasks-list';

export default async function Tasks() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      <TaskList />
    </div>
  );
}
