import { Button, Col, DatePicker, Form, InputNumber, message, Row, Typography } from 'antd';
import React from 'react';
import Box from '../../../lib/components/Box';
import Modal from '../../../lib/components/Modal';
import { AddPriceModalProps } from '../Props';

import { AddPricePayload } from '../../../store/types';
import { useAppDispatch } from '../../../store';
import { addPriceItem } from '../../../store/slices/priceHistory.slice';
import { AddPricePayloadInfo } from '../../../lib/interfaces';

const AddPriceModal: React.FC<AddPriceModalProps> = ({ productId, closeModal, ...props }) => {
    const [form] = Form.useForm<AddPricePayloadInfo>();
    const dispatch = useAppDispatch();
    const onSubmit = (value: AddPricePayloadInfo) => {
        const payload: AddPricePayload = {
            priceInfo: { price: value.price, date: value.date.toISOString() },
            productId,
        };
        dispatch(addPriceItem(payload));
        form.resetFields();
        message.success('Price entry added successfully');
        closeModal();
    };
    const afterClose = () => {
        form.resetFields();
    };

    return (
        <Modal
            afterClose={afterClose}
            destroyOnClose
            onCancel={closeModal}
            {...props}
            footer={null}>
            <Box data-testid="add-price-modal">
                <Typography.Title className="text-center pb-5" level={4}>
                    Add Price
                </Typography.Title>
                <Form onFinish={onSubmit} form={form}>
                    <Row>
                        <Col xs={14}>
                            <Form.Item
                                rules={[{ required: true, message: 'Date is required' }]}
                                name="date"
                                label="Date">
                                <DatePicker data-testid="date-picker" />
                            </Form.Item>
                        </Col>
                        <Col xs={8}>
                            <Form.Item
                                rules={[{ required: true, message: 'Price is required' }]}
                                name="price"
                                label="Price">
                                <InputNumber data-testid="price-input" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Box className="gap-x-3" display="flex" justifyContent="justify-end">
                        <Button
                            data-testid="submit-btn"
                            htmlType="submit"
                            shape="round"
                            type="primary">
                            Add Price
                        </Button>
                        <Button
                            data-testid="close-modal"
                            shape="round"
                            onClick={() => closeModal()}>
                            Cancel
                        </Button>
                    </Box>
                </Form>
            </Box>
        </Modal>
    );
};

export default AddPriceModal;
