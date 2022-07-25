import { CollapseProps as AntdCollapseProps } from 'antd';
import { ReactNode } from 'react';

export interface CollapseProps extends AntdCollapseProps {
    children: ReactNode;
}
