import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { List, message, Popconfirm, Tooltip } from 'antd';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '../../../lib/components/Box';
import { useAppDispatch } from '../../../store';

import LoadingState from '../../../lib/enums/LoadingState';
import { Product } from '../../../lib/models/PriceHistory';
import { usePriceHistoryState } from '../../../store/selectors';
import EditProductModal from './EditProductModal';
import { deleteProductHistory } from '../../../store/slices/priceHistory.slice';
import Spin from '../../../lib/components/Spin';

const ProductList = () => {
    const priceHistoryState = usePriceHistoryState();

    const [productToBeEdited, setProductToBeEdited] = useState<Product | null>(null);
    const dispatch = useAppDispatch();
    const openEditProductNameModal = (product: Product) => {
        setProductToBeEdited(product);
    };
    const closeEditProductNameModal = () => {
        setProductToBeEdited(null);
    };
    const deleteProduct = (product: Product) => {
        dispatch(deleteProductHistory(product.id));
        message.success('Product deleted successfully');
    };
    const sorted = useMemo(
        () => [...priceHistoryState.list].sort((a, b) => b.id - a.id),
        [priceHistoryState.list],
    );

    return (
        <React.Fragment>
            <EditProductModal
                closeModal={closeEditProductNameModal}
                product={productToBeEdited!}
                visible={Boolean(productToBeEdited)}
            />
            <Spin
                tip="Loading Data"
                data-testid="loading"
                spinning={priceHistoryState.loading === LoadingState.PENDING}>
                <List
                    dataSource={sorted}
                    renderItem={(item, index) => (
                        <List.Item
                            data-testid="product-item"
                            className="bg-white my-2 lg:w-[70%] px-4 flex items-center"
                            key={index}>
                            <List.Item.Meta
                                title={
                                    <Link
                                        className="hover:underline"
                                        to={`/product/${item.id}/price-history`}>
                                        {item.name}
                                    </Link>
                                }
                            />
                            <Box>
                                <Box display="flex" alignItems="items-center" className="gap-x-4">
                                    <Tooltip title="Delete price entry"></Tooltip>
                                    <Tooltip title="Edit product in record">
                                        <EditOutlined
                                            data-testid="open-edit-product-btn"
                                            onClick={() => openEditProductNameModal(item)}
                                            className="text-xl"
                                        />
                                    </Tooltip>

                                    <Popconfirm
                                        onConfirm={() => deleteProduct(item)}
                                        title="Are you sure you want to delete this product?">
                                        <Tooltip title="Delete product from record">
                                            <DeleteOutlined
                                                data-testid="delete-product-btn"
                                                className="text-xl text-orange-600"
                                            />
                                        </Tooltip>
                                    </Popconfirm>
                                    <Link
                                        className="hover:underline"
                                        to={`/product/${item.id}/price-history`}>
                                        View price history
                                    </Link>
                                </Box>
                            </Box>
                        </List.Item>
                    )}
                />
            </Spin>
        </React.Fragment>
    );
};

export default ProductList;
