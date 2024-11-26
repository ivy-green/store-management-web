import CustomConfirmModal from '@/components/project/modals/RemoveConfirmModal';
import { useState } from 'react';

const useConfirmModal = () => {
  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const [message, setMessage] = useState("");

  const [confirmAction, setConfirmAction] = useState<(() => Promise<void>) | null>(null);

  const confirmRemove = async (message: string, action: () => Promise<void>) => {
    setConfirmAction(() => async () => {
      try {
        await action();
      } finally {
        setIsOpenRemove(false);
      }
    });
    setMessage(message);
    setIsOpenRemove(true);
  };

  const handleConfirm = () => {
    if (confirmAction) confirmAction();
    setIsOpenRemove(false);
  };

  const handleCancel = () => {
    setIsOpenRemove(false);
  };

  const RemoveConfirmDialogComponent = () => {
    return (
      <CustomConfirmModal
        open={isOpenRemove}
        message={message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    )
  };

  return { confirmRemove, RemoveConfirmDialogComponent };
};

export default useConfirmModal;
