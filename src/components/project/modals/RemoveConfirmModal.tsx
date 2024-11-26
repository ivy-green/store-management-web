import CustomModal from "@/components/general/modal/CustomModal";
import { Button } from "antd";

interface ConfirmModalProps {
    onConfirm: (val: any) => void;
    open: boolean;
    message: string;
    onCancel: () => void;
}

export default function CustomConfirmModal(props: ConfirmModalProps) {
    const { onConfirm, onCancel, open, message } = props

    return (
        <CustomModal
            key={Math.random()}
            open={open}
            onClose={onCancel}
            onOk={onCancel}
            footer={[
                <Button
                    key={Math.random()}
                    onClick={onCancel}>Cancel</Button>,
                <Button
                    key={Math.random()}
                    onClick={onConfirm}>
                    Confirm
                </Button>
            ]}>
            <div>{message}</div>
        </CustomModal>
    )
}
