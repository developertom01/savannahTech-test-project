import { SpinProps as AntdSpinProps } from 'antd';
import { ReactNode } from 'react';
export interface SpinProps extends AntdSpinProps {
    children: ReactNode;
}
