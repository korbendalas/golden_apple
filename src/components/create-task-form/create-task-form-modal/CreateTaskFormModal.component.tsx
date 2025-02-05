import { Modal } from '@/components/modal';
import { TaskForm } from '@/components/create-task-form';
import React from 'react';

export function CreateTaskFormModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <TaskForm onClose={onClose} />
    </Modal>
  );
}
