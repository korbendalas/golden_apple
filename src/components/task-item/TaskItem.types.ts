import { Task } from '@prisma/client';

export interface TaskItemProps {
  task: Task;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}
