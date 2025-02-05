import { SubmitHandler, useForm } from 'react-hook-form';
import { addTask } from '@/app/actions/taskActions';
import { toast } from 'react-hot-toast';
import { FormField } from '@/components/form-field';
import { useTasks } from '@/components/contexts/tasks-context/TasksContext';

interface TaskFormData {
  title: string;
  description: string;
  dueDate: string | null;
  priority: string;
}

// const taskSchema = Yup.object().shape({
//   title: Yup.string().required('Title is required'),
//   description: Yup.string(),
//   dueDate: Yup.string().nullable(),
//   priority: Yup.string()
//     .oneOf(['low', 'medium', 'high'], 'Invalid priority')
//     .required('Priority is required'),
// });

export function TaskForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({});
  const { tasks, setTasks } = useTasks();

  const onSubmit: SubmitHandler<TaskFormData> = async (data) => {
    try {
      const t = await addTask(
        data.title,
        data.description,
        data.dueDate || '',
        data.priority,
      );
      if (t?.id) {
        setTasks([...tasks, t]);
        onClose();
        toast.success('Task added successfully');
      }
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add Task</h2>

      <FormField
        id="title"
        label="Title"
        type="text"
        register={register('title')}
        error={errors.title?.message}
      />

      <FormField
        id="description"
        label="Description"
        type="text"
        register={register('description')}
        error={errors.description?.message}
      />

      <FormField
        id="dueDate"
        label="Due Date"
        type="date"
        register={register('dueDate')}
        error={errors.dueDate?.message}
      />

      <div>
        <label className="block mb-1 text-black">Priority:</label>
        <select
          {...register('priority')}
          className="w-full p-2 border rounded text-black focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && (
          <p className="text-red-500 text-sm">{errors.priority.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
