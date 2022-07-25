import { Button, message, Popconfirm, Table, TableColumnsType, Tooltip, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import moment from 'moment';
import React, { useCallback, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Box from '../../lib/components/Box';
import Container from '../../lib/components/Container';
import DashboardLayout from '../../lib/layout/DashboardLayout';
import { Price } from '../../lib/models/PriceHistory';
import { usePriceHistoryState } from '../../store/selectors';
import { PriceToBeEditedInfo } from '../../lib/interfaces';
import EditPriceModal from './components/EditPriceModal';
import { useAppDispatch } from '../../store';
import { deleteProductPrice } from '../../store/slices/priceHistory.slice';
import AddPriceModal from './components/AddPriceModal';
import { NotFroundError } from '../../lib/utils/errors';

const PriceTable = () => {
    /* This is a hack to get the id of the product in the test environment.  Do this to avoid error in test environment*/
    const id =
        process.env.REACT_APP_ENV === 'test'
            ? useLocation().pathname.match(/\d/g)![0]
            : useParams().id;

    const productState = usePriceHistoryState();
    const product = useMemo(
        () => productState.list.find((item) => item.id === parseInt(id!)),
        [productState.list],
    );
    /* Throw error before functions other hooks access it */
    if (!id || !product) {
        throw new NotFroundError('No products found');
    }
    const [priceToBeEditedInfo, setPriceToBeEditedInfo] = useState<PriceToBeEditedInfo | null>(
        null,
    );
    const [productToAddPriceTo, setProductToAddPriceTo] = useState<number | null>(null);

    const dispatch = useAppDispatch();

    const openEditPriceModal = useCallback((priceInfo: PriceToBeEditedInfo) => {
        setPriceToBeEditedInfo(priceInfo);
    }, []);
    const closeEditPriceDrawer = () => {
        setPriceToBeEditedInfo(null);
    };
    const openAddPriceModal = useCallback(() => {
        setProductToAddPriceTo(product!.id);
    }, []);
    const columns: TableColumnsType<Price> = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (value) => (
                <Typography data-testid="price-date">
                    {moment(value).format('DD/MM/YYYY')}
                </Typography>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (value) => (
                <Typography data-testid="price-value">{parseFloat(value).toFixed(2)} </Typography>
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            dataIndex: 'id',
            render: (id, record) => (
                <Box display="flex" className="gap-x-4">
                    <Tooltip title="Edit price entry">
                        <EditOutlined
                            data-testid="open-edit-price-modal"
                            onClick={() => {
                                openEditPriceModal({ price: record, productId: product!.id });
                            }}
                            className="text-lg"
                        />
                    </Tooltip>
                    <Popconfirm
                        onConfirm={() => {
                            dispatch(deleteProductPrice({ id, productId: product!.id }));
                            message.success('Price deleted successfully');
                        }}
                        title={`Are you sure you want to delete price entry for ${moment(
                            record.date,
                        ).format('LL')}?`}>
                        <Tooltip title="Delete price entry">
                            <DeleteOutlined className="text-lg text-orange-600" />
                        </Tooltip>
                    </Popconfirm>
                </Box>
            ),
        },
    ];

    return (
        <DashboardLayout>
            <Container>
                <Box className="w-full">
                    <Box
                        display="flex"
                        justifyContent="justify-between"
                        alignItems="items-center"
                        className="mt-16 mb-5 w-full">
                        <Typography.Title
                            data-testid="page_header"
                            className="text-gray-600"
                            level={4}>
                            Price history of {product?.name}
                        </Typography.Title>
                        <Button
                            data-testid="open-add-price-modal"
                            onClick={openAddPriceModal}
                            shape="round"
                            type="primary">
                            Add new Price
                        </Button>
                    </Box>
                    <Table
                        pagination={{ pageSize: 5 }}
                        dataSource={product.prices}
                        columns={columns}
                    />
                </Box>
            </Container>
            {/* Modals */}
            <EditPriceModal
                closeModal={closeEditPriceDrawer}
                priceInfo={priceToBeEditedInfo!}
                visible={Boolean(priceToBeEditedInfo)}
            />
            <AddPriceModal
                closeModal={() => setProductToAddPriceTo(null)}
                visible={Boolean(productToAddPriceTo)}
                productId={productToAddPriceTo!}
            />
        </DashboardLayout>
    );
};

export default PriceTable;
