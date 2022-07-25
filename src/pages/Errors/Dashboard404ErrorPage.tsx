import { Typography } from 'antd';
import React from 'react';
import Box from '../../lib/components/Box';
import Container from '../../lib/components/Container';
import Svg from '../../lib/components/Svg';
import DashboardLayout from '../../lib/layout/DashboardLayout';
import { Dashboard404ErrorPageProps } from './Props';

const Dashboard404ErrorPage: React.FC<Dashboard404ErrorPageProps> = ({ message }) => {
    return (
        <DashboardLayout>
            <Container>
                <Box>
                    <Box
                        className="mt-16"
                        display="flex"
                        alignItems="items-center"
                        justifyContent="justify-center">
                        <Svg
                            width="w-60"
                            height="h-60"
                            className=" block mb-10"
                            src="SvgNotFound"
                        />
                    </Box>
                    <Typography.Title className="text-center block" level={2}>
                        {message ?? 'Resource not found'}
                    </Typography.Title>
                </Box>
            </Container>
        </DashboardLayout>
    );
};

export default Dashboard404ErrorPage;
