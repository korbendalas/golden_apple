import { FormFieldProps } from '@/components/form-field/FormField.types';

export const FormField = ({
  id,
  label,
  type,
  register,
  error,
}: FormFieldProps) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      {...register}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
