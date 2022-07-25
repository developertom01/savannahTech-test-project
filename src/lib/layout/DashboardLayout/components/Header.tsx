import { Layout, Typography } from 'antd';
import Box from '../../../components/Box';

const DashboardHeader = () => {
    return (
        <Layout.Header className="bg-[#F2F5FB]">
            <Box
                className="border-b-2 "
                display="flex"
                justifyContent="justify-start"
                alignItems="items-center">
                <Box className="lg:ml-14">
                    <Typography.Title level={2}>Price Data APP</Typography.Title>
                </Box>
            </Box>
        </Layout.Header>
    );
};

export default DashboardHeader;
