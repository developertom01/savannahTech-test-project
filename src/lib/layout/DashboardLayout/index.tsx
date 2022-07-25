import { Layout } from 'antd';
import React from 'react';
import DashboardFooter from './components/Footer';
import DashboardHeader from './components/Header';
import DashboardSidebar from './components/Sidebar';
import { DashboardLayoutProps } from './Props';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <Layout>
            <DashboardSidebar />
            <Layout>
                <DashboardHeader />
                <Layout.Content className="min-h-[80vh] bg-[#F2F5FB] ">{children}</Layout.Content>
                <DashboardFooter />
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
