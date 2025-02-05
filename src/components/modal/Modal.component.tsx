import { ModalProps } from '@/components/modal/Modal.types';


export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">{children}</div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
    </div>
  );
}
