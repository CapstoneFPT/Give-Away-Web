import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Input, Modal, notification, Select} from 'antd';
import {MailOutlined, PhoneOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons';
import {AccountApi, DeliveryRequest, DeliveryListResponse} from '../../api';
import AddressForm from './AddressForm';

const ProfileForm: React.FC = () => {
    const [form] = Form.useForm();
    const [addressForm] = Form.useForm<DeliveryRequest>();
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [addresses, setAddresses] = useState<DeliveryListResponse[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const userId = JSON.parse(localStorage.getItem('userId') || 'null');
        if (!userId) {
            notification.error({message: 'User ID not found in local storage.'});
            return;
        }

        try {
            const accountApi = new AccountApi();
            const response = await accountApi.apiAccountsIdGet(userId);
            form.setFieldsValue({
                fullname: response.data?.data?.fullname,
                phone: response.data?.data?.phone,
                email: response.data?.data?.email,
            });

            const addressResponse = await accountApi.apiAccountsAccountIdDeliveriesGet(userId);
            setAddresses(addressResponse.data.data || [])
        } catch (error) {
            console.error('Error fetching user data:', error);
            notification.error({message: 'Failed to fetch user data. Please try again later.'});
        }
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const userId = JSON.parse(localStorage.getItem('userId') || 'null');
            if (!userId) throw new Error('User ID not found');

            const accountApi = new AccountApi();
            await accountApi.apiAccountsAccountIdPut(userId, {
                fullname: values.fullname,
                phone: values.phone,
            });

            notification.success({message: 'User data updated successfully!'});
            setIsFormChanged(false);
        } catch (error) {
            console.error('Error updating user data:', error);
            notification.error({message: 'Failed to update user data. Please try again later.'});
        }
    };

    const handleAddAddress = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = async () => {
        try {
            setIsSaveButtonLoading(true);
            const values = await addressForm.validateFields();
            console.log('New Address:', values);

            const accountApi = new AccountApi();
            const userId = JSON.parse(localStorage.getItem('userId') || 'null');
            if (!userId) throw new Error('User ID not found');

            await accountApi.apiAccountsAccountIdDeliveriesPost(userId, values);
            setIsSaveButtonLoading(false);
            setIsModalVisible(false);
            addressForm.resetFields();
            notification.success({message: 'Address added successfully!'});
        } catch (error) {
            console.error('Validation failed:', error);
            notification.error({message: 'Failed to add address. Please try again.'});
            setIsSaveButtonLoading(false);
        }
    };

    return (
        <Card>
            <Form
                form={form}
                name="profile"
                layout="vertical"
                onValuesChange={() => setIsFormChanged(true)}
            >
                <Form.Item name="fullname" label="Name">
                    <Input prefix={<UserOutlined/>}/>
                </Form.Item>
                <Form.Item name="phone" label="Phone">
                    <Input prefix={<PhoneOutlined/>} maxLength={10}/>
                </Form.Item>
                <Form.Item name="email" label="Email">
                    <Input prefix={<MailOutlined/>} readOnly/>
                </Form.Item>
                <Form.Item name="address" label="Address">
                    <Select style={{width: '75%'}} placeholder="Select an address">
                        {/*<Select.Option value="address1">Address 1</Select.Option>*/}
                        {/*<Select.Option value="address2">Address 2</Select.Option>*/}
                        {
                            addresses.map((address, index) => (
                                <Select.Option key={index} value={address.addressId}>
                                    {address.recipientName}
                                    {' - '}
                                    {address.residence}
                                </Select.Option>
                            ))
                        }
                    </Select>
                    <Button
                        type="link"
                        onClick={handleAddAddress}
                        style={{marginLeft: '10px', color: 'black'}}
                        icon={<PlusOutlined/>}
                    >
                        Add Address
                    </Button>
                </Form.Item>
                <Button
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        width: '120px',
                        height: '40px',
                        marginTop: '25px',
                    }}
                    onClick={handleSave}
                    disabled={!isFormChanged}
                >
                    Save
                </Button>
            </Form>

            <Modal
                title="Add New Address"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                okButtonProps={{style: {backgroundColor: 'black', color: 'white'}}}
                footer={
                    <Button
                        style={{backgroundColor: 'black', color: 'white'}}
                        onClick={handleModalOk}
                        loading={isSaveButtonLoading}
                    >
                        Add
                    </Button>
                }
            >
                <AddressForm form={addressForm}/>
            </Modal>
        </Card>
    );
};

export default ProfileForm;
