import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const TaskFilter = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }
  // return (
  //   <div className="mb-4">
  //     <button
  //       onClick={() => setFilter('all')}
  //       className={`px-4 py-2 mr-2 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
  //     >
  //       All
  //     </button>
  //     <button
  //       onClick={() => setFilter('completed')}
  //       className={`px-4 py-2 mr-2 ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
  //     >
  //       Completed
  //     </button>
  //     <button
  //       onClick={() => setFilter('unfinished')}
  //       className={`px-4 py-2 ${filter === 'unfinished' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
  //     >
  //       Unfinished
  //     </button>
  //   </div>
  //);
};
export default TaskFilter;
