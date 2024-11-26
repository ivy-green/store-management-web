import CustomModal from "@/components/general/modal/CustomModal";
import { Button } from "antd";
import { ReactNode } from "react";

interface UpdateConfirmModalProps {
    onConfirm: (val: any) => void;
    open: boolean;
    children: ReactNode
    onCancel: () => void;
}

export default function UpdateConfirmModal(props: UpdateConfirmModalProps) {
    const { onConfirm, onCancel, open, children } = props

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
            {children}
        </CustomModal>
    )
}
