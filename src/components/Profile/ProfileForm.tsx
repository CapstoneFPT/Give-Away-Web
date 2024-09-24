import React, { useState } from 'react';
import { Button, Card, Form, Input, notification, Typography, Skeleton } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { AccountApi, DeliveryListResponse, DeliveryRequest, InquiryApi, InquiryListResponse } from '../../api';
import { useAuth } from '../Auth/Auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const { Text } = Typography;

const ProfileForm: React.FC = () => {
    const [form] = Form.useForm();
    const [addressForm] = Form.useForm<DeliveryRequest>();
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
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

    const { data: addresses, isLoading: isAddressesLoading } = useQuery({
        queryKey: ['addresses', userId],
        queryFn: async () => {
            const accountApi = new AccountApi();
            const response = await accountApi.apiAccountsAccountIdDeliveriesGet(userId);
            return response.data.data || [];
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

    const addAddressMutation = useMutation({
        mutationFn: async (values: DeliveryRequest) => {
            const accountApi = new AccountApi();
            await accountApi.apiAccountsAccountIdDeliveriesPost(userId, values);
        },
        onSuccess: () => {
            notification.success({ message: 'Address added successfully!' });
            setIsModalVisible(false);
            addressForm.resetFields();
            queryClient.invalidateQueries({ queryKey: ['addresses', userId] });
        },
        onError: (error) => {
            console.error('Error adding address:', error);
            notification.error({ message: 'Failed to add address. Please try again.' });
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

    const handleAddAddress = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = async () => {
        try {
            const values = await addressForm.validateFields();
            addAddressMutation.mutate(values);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const isLoading = isUserLoading || isAddressesLoading || isInquiriesLoading;

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

            <Card style={{ marginTop: '20px' }} title='Your Inquiries'>
                {inquiries && inquiries.length > 0 ? (
                    inquiries.map((inquiry, index) => (
                        <div key={inquiry.inquiryId}>
                            <Text style={{ display: 'block', fontSize: '20px', }}>{inquiry.message}</Text>
                            {index < inquiries.length - 1 && <hr />}
                        </div>
                    ))
                ) : (
                    <Text>No inquiries available.</Text>
                )}
            </Card>
        </Card>
    );
};

export default ProfileForm;