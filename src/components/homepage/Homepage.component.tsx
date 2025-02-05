import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'TaskApp - Welcome',
  description: 'Manage your tasks efficiently with TaskApp.',
};

export async function Homepage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/tasks');
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Welcome to TaskApp</h1>
        <p className="text-lg mt-2">
          Manage your tasks efficiently with our intuitive and secure platform.
        </p>
      </header>

      <section className="max-w-md text-center">
        <ul className="list-disc list-inside text-gray-300">
          <li>Create and manage tasks effortlessly.</li>
          <li>Mark tasks as completed or pending.</li>
          <li>Secure authentication to protect your data.</li>
        </ul>
      </section>


      <div className="mt-8 space-x-4">
        <Link
          href="/auth/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
