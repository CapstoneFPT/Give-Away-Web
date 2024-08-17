import React, { useState } from 'react';
import { Card, Form, Select, Button, Modal, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DeliveryRequest } from '../../api';
import AddressForm from './AddressForm';

const AddressManager: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [addressForm] = Form.useForm<DeliveryRequest>();

    const handleAddAddress = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = async () => {
        try {
            const values = await addressForm.validateFields();
            console.log('New Address:', values);
            // Here you would typically send this data to your backend
            setIsModalVisible(false);
            addressForm.resetFields();
            notification.success({ message: 'Address added successfully!' });
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <Card>
            <Form.Item name="address" label="Address">
                <Select style={{ width: '75%' }} placeholder="Select an address">
                    <Select.Option value="address1">Address 1</Select.Option>
                    <Select.Option value="address2">Address 2</Select.Option>
                </Select>
                <Button
                    type="link"
                    onClick={handleAddAddress}
                    style={{ marginLeft: '10px', color: 'black' }}
                    icon={<PlusOutlined />}
                >
                    Add Address
                </Button>
            </Form.Item>

            <Modal
                title="Add New Address"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                okButtonProps={{ style: { backgroundColor: 'black', color: 'white' } }}
            >
                <AddressForm form={addressForm} />
            </Modal>
        </Card>
    );
};

export default AddressManager;