import React from 'react';
import { Modal as AntdModal } from 'antd';
import { ModalProps } from './Props';

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
    return <AntdModal {...props}>{children}</AntdModal>;
};

export default Modal;
