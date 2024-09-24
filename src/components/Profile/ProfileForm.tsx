import React, { useState } from 'react';
import { Button, Card, Form, Input, notification, Typography, Skeleton } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { AccountApi, DeliveryRequest, InquiryApi } from '../../api';
import { useAuth } from '../Auth/Auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Icon from '@ant-design/icons/lib/components/Icon';

const { Text } = Typography;

const ProfileForm: React.FC = () => {
    const [form] = Form.useForm();
    const [addressForm] = Form.useForm<DeliveryRequest>();
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isInquiriesVisible, setInquiriesVisible] = useState(false); // State để kiểm soát hiển thị inquiries
    const { currentUser } = useAuth();
    const userId = currentUser?.id || '';
    const queryClient = useQueryClient();

    const { data: userData, isLoading: isUserLoading } = useQuery({
        queryKey: ['userData', userId],
        queryFn: async () => {
            const accountApi = new AccountApi();
            const response = await accountApi.apiAccountsIdGet(userId);
            return response.data?.data;
        },
        enabled: !!userId,
    });

    const { data: inquiries, isLoading: isInquiriesLoading } = useQuery({
        queryKey: ['inquiries', userId],
        queryFn: async () => {
            const inquiryApi = new InquiryApi();
            const response = await inquiryApi.apiInquiriesGet(null!, null!, null!, userId!);
            return response.data.items || [];
        },
        enabled: !!userId,
    });

    const updateUserMutation = useMutation({
        mutationFn: async (values: any) => {
            const accountApi = new AccountApi();
            await accountApi.apiAccountsAccountIdPut(userId, {
                fullname: values.fullname,
                phone: values.phone,
            });
        },
        onSuccess: () => {
            notification.success({ message: 'User data updated successfully!' });
            setIsFormChanged(false);
            queryClient.invalidateQueries({ queryKey: ['userData', userId] });
        },
        onError: (error) => {
            console.error('Error updating user data:', error);
            notification.error({ message: 'Failed to update user data. Please try again later.' });
        },
    });

    React.useEffect(() => {
        if (userData) {
            form.setFieldsValue({
                fullname: userData.fullname,
                phone: userData.phone,
                email: userData.email,
            });
        }
    }, [userData, form]);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            updateUserMutation.mutate(values);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const toggleInquiries = () => {
        setInquiriesVisible(!isInquiriesVisible); // Đảo ngược trạng thái hiển thị inquiries
    };

    const isLoading = isUserLoading || isInquiriesLoading;

    if (isLoading) {
        return (
            <Card>
                <Skeleton avatar active paragraph={{ rows: 4 }} />
                <Skeleton active paragraph={{ rows: 2 }} />
                <Skeleton.Button active size="large" style={{ width: 120, marginTop: 16 }} />
                <Skeleton active paragraph={{ rows: 4 }} style={{ marginTop: 24 }} />
            </Card>
        );
    }

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
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        {
                            pattern: /^\d{10}$/,
                            message: 'Phone number must be 10 digits long.',
                        },
                    ]}
                >
                    <Input
                        prefix={<PhoneOutlined />}
                        maxLength={10}
                        onChange={(e) => {
                            const { value } = e.target;
                            // Remove any non-numeric characters
                            const numericValue = value.replace(/\D/g, '');
                            // Limit the value to 10 digits
                            if (numericValue.length <= 10) {
                                form.setFieldsValue({ phone: numericValue });
                            }
                        }}
                    />
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

            <Button 
                style={{ marginTop: '20px', marginBottom: '10px' }} 
                onClick={toggleInquiries}
            >
                {isInquiriesVisible ? 'Hide Inquiries' : 'Show Inquiries'}
            </Button>

            {isInquiriesVisible && (
                <Card 
                    style={{ 
                        marginTop: '20px', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                        backgroundColor: '#f7f7f7',
                        padding: '20px'
                    }} 
                    title={<span style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Your Inquiries</span>}
                >
                    {inquiries && inquiries.length > 0 ? (
                        inquiries.map((inquiry, index) => (
                            <div 
                                key={inquiry.inquiryId} 
                                style={{ 
                                    padding: '10px 0', 
                                    borderBottom: index < inquiries.length - 1 ? '1px solid #e0e0e0' : 'none' 
                                }}
                            >
                                <Text style={{ display: 'block', fontSize: '18px', color: '#555', marginBottom: '5px' }}>
                                    <strong>{index + 1}.</strong> {inquiry.message}
                                </Text>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                    <Text type="secondary" style={{ fontSize: '14px', color: '#888' }}>
                                        {new Date(inquiry.createdDate!).toLocaleString()} {/* Hiển thị thời gian */}
                                    </Text>
                                    <Icon type="message" style={{ marginLeft: '10px', color: '#888' }} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <Text style={{ fontSize: '16px', color: '#999' }}>No inquiries available.</Text>
                    )}
                </Card>
            )}
        </Card>
    );
};

export default ProfileForm;
