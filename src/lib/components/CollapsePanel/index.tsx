import { Collapse } from 'antd';
import React from 'react';
import { CollapsePanelProps } from './Props';

const CollapsePanel: React.FC<CollapsePanelProps> = ({ children, ...props }) => {
    return <Collapse.Panel {...props}>{children}</Collapse.Panel>;
};

export default CollapsePanel;
