import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, notification, Typography } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { AccountApi, DeliveryListResponse, DeliveryRequest, InquiryApi, InquiryListResponse,  } from '../../api';

const { Text } = Typography;

const ProfileForm: React.FC = () => {
    const [form] = Form.useForm();
    const [addressForm] = Form.useForm<DeliveryRequest>();
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [addresses, setAddresses] = useState<DeliveryListResponse[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false);
    const [inquiries, setInquiries] = useState<InquiryListResponse[]>([]); // State to hold inquiries

    useEffect(() => {
        fetchUserData();
        fetchInquiries(); // Fetch inquiries on component mount
    }, []);

    const userId = JSON.parse(localStorage.getItem('userId') || 'null');

    const fetchUserData = async () => {
        if (!userId) {
            notification.error({ message: 'User ID not found in local storage.' });
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
            setAddresses(addressResponse.data.data || []);
        } catch (error) {
            console.error('Error fetching user data:', error);
            notification.error({ message: 'Failed to fetch user data. Please try again later.' });
        }
    };
console.log()
    const fetchInquiries = async () => {
        try {
            const inquiryApi = new InquiryApi();
            const response = await inquiryApi.apiInquiriesGet(null!, null!,null!,  userId!);
            setInquiries(response.data.items || []); 
            // Set inquiries data
            console.log('hihi',response)
            console.log('huy',userId)
        } catch (error) {
            console.error('Error fetching inquiries:', error);
            notification.error({ message: 'Failed to fetch inquiries. Please try again later.' });
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

            notification.success({ message: 'User data updated successfully!' });
            setIsFormChanged(false);
        } catch (error) {
            console.error('Error updating user data:', error);
            notification.error({ message: 'Failed to update user data. Please try again later.' });
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
            notification.success({ message: 'Address added successfully!' });
        } catch (error) {
            console.error('Validation failed:', error);
            notification.error({ message: 'Failed to add address. Please try again.' });
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
                    <Input prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item name="phone" label="Phone">
                    <Input prefix={<PhoneOutlined />} maxLength={10} />
                </Form.Item>
                <Form.Item name="email" label="Email">
                    <Input prefix={<MailOutlined />} readOnly />
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

            <Card style={{ marginTop: '20px' }} title='Your Inquiries'>
    {inquiries.length > 0 ? (
        inquiries.map((inquiry, index) => (
            <div key={inquiry.inquiryId}>
                <Text style={{ display: 'block', fontSize:'20px', }}>{inquiry.message}</Text> {/* Display each inquiry on a new line */}
                {index < inquiries.length - 1 && <hr />} {/* Add horizontal line except after the last inquiry */}
            </div>
        ))
    ) : (
        <Text>No inquiries available.</Text> // Message when no inquiries exist
    )}
</Card>
        </Card>
    );
};

export default ProfileForm;