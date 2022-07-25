import { CollapsePanelProps as AntdCollapsePanelProps } from 'antd';
import React from 'react';

export interface CollapsePanelProps extends AntdCollapsePanelProps {
    children: React.ReactNode;
}
