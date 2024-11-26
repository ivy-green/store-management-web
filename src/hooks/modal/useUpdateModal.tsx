// useConfirm.js
import UpdateConfirmModal from '@/components/project/modals/UpdateConfirmModal';
import { useState } from 'react';

const useUpdateConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const confirmUpdate = (action: (val: any) => void) => {
    setConfirmAction(() => action);
    !isOpen && setIsOpen(true);
  };

  const handleConfirm = () => {
    if (confirmAction) confirmAction();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  interface IUpdateConfirmDialogComponentProps {
    children: React.ReactNode;
  }

  const UpdateConfirmDialogComponent = (props: IUpdateConfirmDialogComponentProps) => {
    return (
      <UpdateConfirmModal
        open={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >{props.children}</UpdateConfirmModal>
    )
  };

  return { confirmUpdate, UpdateConfirmDialogComponent };
};

export default useUpdateConfirm;
