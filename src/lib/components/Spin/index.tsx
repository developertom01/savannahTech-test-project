import React from 'react';
import { Spin as AntdSpin } from 'antd';
import { SpinProps } from './Props';

const Spin: React.FC<SpinProps> = ({ children, ...props }) => {
    return <AntdSpin {...props}>{children}</AntdSpin>;
};

export default Spin;
