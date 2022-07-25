import { CloseOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, InputNumber, message, Row, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import Box from '../../../lib/components/Box';
import Modal from '../../../lib/components/Modal';
import { EditPricePayloadInfo } from '../../../lib/interfaces';
import { useAppDispatch } from '../../../store';
import { editPriceItem } from '../../../store/slices/priceHistory.slice';
import { EditPricePayload } from '../../../store/types';
import { EditPriceModalProps } from '../Props';

const EditPriceModal: React.FC<EditPriceModalProps> = ({ priceInfo, closeModal, ...props }) => {
    const [form] = Form.useForm<EditPricePayloadInfo>();
    const dispatch = useAppDispatch();

    const onSubmit = (value: EditPricePayloadInfo) => {
        const payload: EditPricePayload = {
            productId: priceInfo.productId,
            priceInfo: {
                id: priceInfo.price.id,
                price: value.price,
                date: value.date.toISOString(),
            },
        };
        dispatch(editPriceItem(payload));
        message.success('Price updated successfully');
        form.resetFields();
        closeModal();
    };

    const onAfterClose = () => {
        form.resetFields();
    };
    return (
        <Modal
            data-testid="edit-price-modal"
            closeIcon={<CloseOutlined date-testid="close-btn" />}
            afterClose={onAfterClose}
            destroyOnClose
            onCancel={closeModal}
            {...props}
            footer={null}>
            <Typography.Title className="text-center pb-5" level={4}>
                Edit Price
            </Typography.Title>
            <Form onFinish={onSubmit} form={form}>
                <Row>
                    <Col xs={14}>
                        <Form.Item
                            initialValue={moment(priceInfo?.price?.date)}
                            name="date"
                            label="Date">
                            <DatePicker data-testid="date-picker" />
                        </Form.Item>
                    </Col>
                    <Col xs={8}>
                        <Form.Item
                            name="price"
                            initialValue={priceInfo?.price?.price}
                            label="Price">
                            <InputNumber data-testid="price-input" />
                        </Form.Item>
                    </Col>
                </Row>
                <Box className="gap-x-3" display="flex" justifyContent="justify-end">
                    <Button data-testid="submit-btn" shape="round" htmlType="submit" type="primary">
                        Edit Price
                    </Button>
                    <Button data-testid="close-modal" shape="round" onClick={() => closeModal()}>
                        Cancel
                    </Button>
                </Box>
            </Form>
        </Modal>
    );
};

export default EditPriceModal;
