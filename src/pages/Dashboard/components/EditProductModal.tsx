import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import Box from '../../../lib/components/Box';
import Modal from '../../../lib/components/Modal';
import { useAppDispatch } from '../../../store';
import { editProduct } from '../../../store/slices/priceHistory.slice';
import { EditProductNamePayload } from '../../../store/types';
import { EditProductModalProps } from './Props';
interface IFrom {
    name: string;
}
const EditProductModal: React.FC<EditProductModalProps> = ({ closeModal, product, ...props }) => {
    const [form] = useForm<IFrom>();
    const dispatch = useAppDispatch();
    const onSubmit = (values: IFrom) => {
        const payload: EditProductNamePayload = { product: { ...product, name: values.name } };
        dispatch(editProduct(payload));
        message.success('You have successfully edited your product');
        form.resetFields();
        closeModal();
    };
    const onCloseModal = () => {
        form.resetFields();
    };
    return (
        <Modal
            data-testid="edit-product-modal"
            afterClose={onCloseModal}
            destroyOnClose
            onCancel={closeModal}
            {...props}
            footer={null}>
            <Typography.Title className="text-center pb-5" level={4}>
                Edit Product Name
            </Typography.Title>
            <Form form={form} onFinish={onSubmit}>
                <Row>
                    <Col xs={24}>
                        <Form.Item
                            rules={[{ required: true, message: 'Product name is required' }]}
                            initialValue={product?.name}
                            name="name"
                            label="Name">
                            <Input data-testid="name-input" />
                        </Form.Item>
                    </Col>
                </Row>
                <Box display="flex" justifyContent="justify-end">
                    <Button data-testid="submit-btn" htmlType="submit" shape="round" type="primary">
                        Edit Product Name
                    </Button>
                </Box>
            </Form>
        </Modal>
    );
};

export default EditProductModal;
