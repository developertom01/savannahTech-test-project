import React from 'react';
import { CollapseProps } from './Props';
import { Collapse as AntdCollapse } from 'antd';

const Collapse: React.FC<CollapseProps> = ({ children, ...props }) => {
    return <AntdCollapse {...props}>{children}</AntdCollapse>;
};

export default Collapse;
