// import Box from '../../lib/components/Box';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Space,
    Typography,
} from 'antd';
import React from 'react';
import Box from '../../lib/components/Box';
import Container from '../../lib/components/Container';
import DashboardLayout from '../../lib/layout/DashboardLayout';
import { useAppDispatch } from '../../store';
import { addNewProduct } from '../../store/slices/priceHistory.slice';
import { AddProductHistoryPayload } from '../../store/types';
import { useNavigate } from 'react-router-dom';
import { AddProductPayload } from '../../lib/interfaces';

const AddProductHistory = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onSubmit = (values: AddProductPayload) => {
        const valueToBeSubmitted: AddProductHistoryPayload = {
            ...values,
            prices: values.prices?.map((price) => ({
                price: price.price,
                date: price.date.toISOString(),
            })),
        };
        dispatch(addNewProduct(valueToBeSubmitted));
        form.resetFields();
        message.success('Product successfully added');
        navigate('/');
    };
    return (
        <DashboardLayout>
            <Container>
                <Box className="w-full">
                    <Box display="block" className="mt-16 w-full">
                        <Typography.Title
                            data-testid="page_header"
                            className="text-gray-600"
                            level={3}>
                            Add new Product
                        </Typography.Title>
                    </Box>
                    <Box className="w-full ">
                        <Card className="w-full lg:w-2/3">
                            <Form onFinish={onSubmit} size="large" form={form}>
                                <Form.Item
                                    rules={[
                                        { required: true, message: 'Product Name is required' },
                                    ]}
                                    name="name"
                                    label="Product Name">
                                    <Input data-testid="form-product-name-input" />
                                </Form.Item>

                                <Typography.Title level={5}>Add prices</Typography.Title>
                                <Form.List name="prices">
                                    {(fields, { add, remove, ...restField }) => (
                                        <React.Fragment>
                                            {fields.map(({ key, name }) => (
                                                <Space className="block w-full" key={key}>
                                                    <Row
                                                        data-testid="prices-form-group"
                                                        justify="space-between">
                                                        <Col xs={12} sm={14}>
                                                            <Form.Item
                                                                {...restField}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Date is required',
                                                                    },
                                                                ]}
                                                                name={[name, 'date']}
                                                                label="Date">
                                                                <DatePicker data-testid="price-date-picker" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col xs={12} sm={8}>
                                                            <Form.Item
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            'Price is required',
                                                                    },
                                                                ]}
                                                                name={[name, 'price']}
                                                                label="Price"
                                                                {...restField}>
                                                                <InputNumber data-testid="price-price-input" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col xs={12} sm={2}>
                                                            <MinusCircleOutlined
                                                                className="text-orange-600 text-xl"
                                                                onClick={() => remove(name)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <PlusCircleOutlined
                                                    data-testid="add-price-input-group"
                                                    className="text-2xl"
                                                    onClick={add}
                                                />
                                            </Form.Item>
                                        </React.Fragment>
                                    )}
                                </Form.List>
                                <Box display="flex" justifyContent="justify-end">
                                    <Button
                                        data-testid="submit-add-product-btn"
                                        htmlType="submit"
                                        shape="round"
                                        type="primary">
                                        Add Product
                                    </Button>
                                </Box>
                            </Form>
                        </Card>
                    </Box>
                </Box>
            </Container>
        </DashboardLayout>
    );
};

export default AddProductHistory;
