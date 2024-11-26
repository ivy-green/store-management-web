import { Modal } from 'antd';
import { ReactNode } from 'react';

interface CustomModalProps {
    children: ReactNode;
    onClose?: () => void;
    onOk?: () => void;
    open: boolean;
    footer?: ReactNode[];
    width?: string;
    height?: string;
    top?: string;
    isHideFooter?: boolean;
}

export default function CustomModal(props: CustomModalProps) {
    const { children, width, height, onClose, open, onOk, footer, isHideFooter, top = "5vh" } = props

    return (
        <Modal
            key={1}
            onOk={onOk}
            onClose={onClose}
            onCancel={onClose}
            open={open}
            width={width ?? "50vw"}
            height={height ?? "50vh"}
            style={{
                top
            }}
            footer={(_, { OkBtn, CancelBtn }) => (
                isHideFooter ?
                    null :
                    footer ? footer :
                        <>
                            <CancelBtn />
                            <OkBtn />
                        </>
            )}
        >
            {children}
        </Modal >
    )
}
