import {useEffect, useState} from "react";
import {Button, Card, Col, Form, Input, Modal, notification, Row, Select, Space} from "antd";
import {AccountApi,  DeliveryListResponse, DeliveryRequest} from "../api";
import NavProfile from "../components/NavProfile/NavProfile.tsx";
import {PlusOutlined} from "@ant-design/icons";
import AddressCard from "../components/Profile/AddressCard.tsx";
import AddressForm from "../components/Profile/AddressForm.tsx";

const AddressManagementPage = () => {
    const [addresses, setAddresses] = useState<DeliveryListResponse[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm<DeliveryRequest>();
    const [editingAddress, setEditingAddress] = useState<DeliveryRequest>();
    const userId = JSON.parse(localStorage.getItem('userId') || 'null');

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const accountApi = new AccountApi();
            const response = await accountApi.apiAccountsAccountIdDeliveriesGet(userId);
            setAddresses(response.data.data || []);
        } catch (error) {
            console.error('Error fetching addresses:', error);
            notification.error({ message: 'Failed to fetch addresses. Please try again later.' });
        }
    };

    const handleAddOrEditAddress = async (values : DeliveryRequest) => {
        try {
            const accountApi = new AccountApi();
            if (editingAddress) {
                // await accountApi.apiAccountsAddressesIdPut(editingAddress.id, values);
                notification.success({ message: 'Address updated successfully!' });
            } else {
                // await accountApi.apiAccountsAddressesPost(values);
                notification.success({ message: 'Address added successfully!' });
            }
            setIsModalVisible(false);
            form.resetFields();
            setEditingAddress(null!);
            fetchAddresses();
        } catch (error) {
            console.error('Error adding/editing address:', error);
            notification.error({ message: 'Failed to save address. Please try again.' });
        }
    };

    const handleDelete = async (addressId : string) => {
        try {
            const accountApi = new AccountApi();
            // await accountApi.apiAccountsAddressesIdDelete(addressId);
            notification.success({ message: 'Address deleted successfully!' });
            fetchAddresses();
        } catch (error) {
            console.error('Error deleting address:', error);
            notification.error({ message: 'Failed to delete address. Please try again.' });
        }
    };

    const handleSetDefault = async (addressId :string) => {
        try {
            const accountApi = new AccountApi();
            // await accountApi.apiAccountsAddressesIdDefaultPut(addressId);
            notification.success({ message: 'Default address updated successfully!' });
            fetchAddresses();
        } catch (error) {
            console.error('Error setting default address:', error);
            notification.error({ message: 'Failed to set default address. Please try again.' });
        }
    };

    const showModal = (address : DeliveryRequest) => {
        setEditingAddress(address);
        if (address) {
            form.setFieldsValue(address);
        } else {
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col span={5}>
                    <NavProfile />
                </Col>
                <Col span={19}>
                    <Card style={{ borderRadius: '10px', boxShadow: '2px 2px 7px #cbc1c1' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button type="primary" style={
                                {
                                    backgroundColor: 'black',
                                }
                            } icon={<PlusOutlined />} onClick={() => showModal({} as DeliveryRequest)}>
                                Add New Address
                            </Button>
                            {addresses.map(address => (
                                <AddressCard
                                    key={address.addressId}
                                    address={address}
                                    isDefault={address.isDefault || false}
                                    onSetDefault={handleSetDefault}
                                    onEdit={() => showModal(address as DeliveryRequest)}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Modal
                title={editingAddress ? "Edit Address" : "Add New Address"}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingAddress(null!);
                }}
                footer={null}
            >
                <AddressForm
                    initialValues={editingAddress}
                    onFinish={handleAddOrEditAddress}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </Card>
    );
};

export default AddressManagementPage;