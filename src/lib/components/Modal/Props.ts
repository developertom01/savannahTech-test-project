import { ModalProps as AntDModalProps } from 'antd';
import { ReactNode } from 'react';
export interface ModalProps extends AntDModalProps {
    children: ReactNode;
}
