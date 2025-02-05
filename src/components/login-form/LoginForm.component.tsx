'use client';
import { FormField } from '@/components/form-field/FormField.component';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormValues } from '@/components/login-form/LoginForm.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/login-form/LoginForm.utils';
import { toast } from 'react-hot-toast';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema), // Use Yup validation resolver
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      router.push('/tasks');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-lg shadow-md w-96"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>

      <FormField
        id="email"
        label="Email"
        type="email"
        register={register('email')}
        error={errors.email?.message}
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        register={register('password')}
        error={errors.password?.message}
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Login
      </button>
    </form>
  );
};
