import { Button, Typography } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '../../lib/components/Box';
import Container from '../../lib/components/Container';
import DashboardLayout from '../../lib/layout/DashboardLayout';
import { useAppDispatch } from '../../store';
import { fetchPriceHistoriesThunk } from '../../store/thunk/priceHistory.thunk';
import ProductList from './components/ProductList';

const LandingPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPriceHistoriesThunk());
    }, [dispatch]);

    return (
        <DashboardLayout>
            <Container>
                <Box className="w-full">
                    <Box
                        display="flex"
                        justifyContent="justify-between"
                        alignItems="items-center"
                        className="mt-16 mb-5 lg:w-[70%]">
                        <Typography.Title
                            data-testid="page_header"
                            className="text-gray-600"
                            level={4}>
                            List of Price History
                        </Typography.Title>
                        <Link to="/add-product">
                            <Button shape="round" type="primary">
                                Add new Price
                            </Button>
                        </Link>
                    </Box>
                    <ProductList />
                </Box>
            </Container>
        </DashboardLayout>
    );
};

export default LandingPage;
