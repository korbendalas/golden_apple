import { LoginForm } from '@/components/login-form/LoginForm.component';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/tasks');
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}
