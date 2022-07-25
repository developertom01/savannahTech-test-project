import { Layout, Menu } from 'antd';
import React from 'react';
import Box from '../../../components/Box';
import { PlusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LocalImage from '../../../components/LocalImage';
const DashboardSidebar = () => {
    return (
        <Layout.Sider collapsible theme="light">
            <Box display="flex" justifyContent="justify-center" alignItems="items-center">
                <LocalImage width="w-4/5" src="imCrownLogo" />
            </Box>
            <Box>
                <Menu>
                    <Menu.Item
                        className="flex items-center"
                        key="1"
                        title="List history"
                        icon={<UnorderedListOutlined />}>
                        <Link to="/">List History</Link>
                    </Menu.Item>
                    <Menu.Item
                        className="flex items-center"
                        key="2"
                        title="Add product"
                        icon={<PlusCircleOutlined />}>
                        <Link to="/add-product">Add Product</Link>
                    </Menu.Item>
                </Menu>
            </Box>
        </Layout.Sider>
    );
};

export default DashboardSidebar;
