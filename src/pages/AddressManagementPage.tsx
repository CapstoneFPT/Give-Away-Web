import {useEffect, useState} from "react";
import {Button, Card, Col, Modal, notification, Row, Space} from "antd";
import {AccountApi, AddressApi, DeliveryListResponse, DeliveryRequest, UpdateDeliveryRequest} from "../api";
import NavProfile from "../components/NavProfile/NavProfile.tsx";
import {PlusOutlined} from "@ant-design/icons";
import AddressCard from "../components/Profile/AddressCard.tsx";
import AddressForm from "../components/Profile/AddressForm.tsx";

const AddressManagementPage = () => {
    const [addresses, setAddresses] = useState<DeliveryListResponse[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteAddressModalVisible, setIsDeleteAddressModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const [editingAddress, setEditingAddress] = useState<DeliveryRequest | UpdateDeliveryRequest | null>(null);
    const userId = JSON.parse(localStorage.getItem('userId') || 'null');

    useEffect(() => {
        fetchAddresses()
            .then(() => console.log("Data fetched"))
            .catch((error) => console.error('Error fetching addresses:', error));
    }, []);

    const fetchAddresses = async () => {
        try {
            const accountApi = new AccountApi();
            const response = await accountApi.apiAccountsAccountIdDeliveriesGet(userId);
            console.log(response.data.data);
            setAddresses(response.data.data || []);
        } catch (error) {
            console.error('Error fetching addresses:', error);
            notification.error({message: 'Failed to fetch addresses. Please try again later.'});
        }
    };

    const handleAddOrEditAddress = async (values: DeliveryRequest | UpdateDeliveryRequest) => {
        try {
            setConfirmLoading(true);
            const accountApi = new AccountApi();

            if (editingAddress) {
                const updatePayload: UpdateDeliveryRequest = {
                    recipientName: values.recipientName,
                    phone: values.phone,
                    addressType: values.addressType,
                    ghnProvinceId: values.ghnProvinceId,
                    ghnDistrictId: values.ghnDistrictId,
                    ghnWardCode: values.ghnWardCode,
                    residence: values.residence,
                    isDefault: (values as UpdateDeliveryRequest).isDefault
                };

                await accountApi.apiAccountsAccountIdDeliveriesDeliveryIdPut(
                    selectedAddress!,
                    userId,
                    updatePayload
                );
                notification.success({ message: 'Address updated successfully!' });
            } else {
                const newAddressPayload: DeliveryRequest = {
                    recipientName: values.recipientName!,
                    phone: values.phone!,
                    addressType: values.addressType!,
                    ghnProvinceId: values.ghnProvinceId!,
                    ghnDistrictId: values.ghnDistrictId!,
                    ghnWardCode: values.ghnWardCode!,
                    residence: values.residence!
                };

                await accountApi.apiAccountsAccountIdDeliveriesPost(userId, newAddressPayload);
                notification.success({ message: 'Address added successfully!' });
            }

            setConfirmLoading(false);
            setIsModalVisible(false);
            setEditingAddress(null!);
            setIsAddingNewAddress(false);
            await fetchAddresses();
        } catch (error) {
            console.error('Error adding/editing address:', error);
            setConfirmLoading(false);
            notification.error({ message: 'Failed to save address. Please try again.' });
        }
    };

    const handleDelete = async (addressId: string) => {
        try {
            console.log("Deleting address ", addressId);
            setConfirmLoading(true);
            const accountApi = new AccountApi();
            await accountApi.apiAccountsAccountIdDeliveriesDeliveryIdDelete(addressId, userId);
            notification.success({message: 'Address deleted successfully!'});
            setIsDeleteAddressModalVisible(false);
            setConfirmLoading(false);
            await fetchAddresses();
        } catch (error) {
            console.error('Error deleting address:', error);
            notification.error({message: 'Failed to delete address. Please try again.'});
            setConfirmLoading(false);
        }
    };

    const showDeleteModal = (addressId: string) => {
        console.log("To be deleted address is ", addressId);
        setIsDeleteAddressModalVisible(true);
        setSelectedAddress(addressId);
    }

    const handleSetDefault = async (addressId: string) => {
        try {
            const accountApi = new AddressApi();
            await accountApi.apiAddressesAddressIdSetDefaultPatch(addressId);
            notification.success({message: 'Default address updated successfully!'});
            await fetchAddresses();
        } catch (error) {
            console.error('Error setting default address:', error);
            notification.error({message: 'Failed to set default address. Please try again.'});
        }
    };

    const showModal = (address: DeliveryListResponse | null = null) => {
        if (address) {
            console.log(address);
            setSelectedAddress(address.addressId!);
            setEditingAddress({
                recipientName: address.recipientName,
                phone: address.phone,
                addressType: address.addressType,
                ghnProvinceId: address.ghnProvinceId,
                ghnDistrictId: address.ghnDistrictId,
                ghnWardCode: address.ghnWardCode,
                residence: address.residence,
                isDefault: address.isDefault,
            });
            setIsAddingNewAddress(false);
        } else {
            setEditingAddress(null);
            setIsAddingNewAddress(true);
        }
        setIsModalVisible(true);
    };

    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col span={5}>
                    <NavProfile/>
                </Col>
                <Col span={19}>
                    <Card style={{borderRadius: '10px', boxShadow: '2px 2px 7px #cbc1c1'}}>
                        <Space direction="vertical" style={{width: '100%'}}>
                            <Button type="primary" style={
                                {
                                    backgroundColor: 'black',
                                }
                            } icon={<PlusOutlined/>} onClick={() => showModal()}>
                                Add New Address
                            </Button>
                            {addresses.map(address => (
                                <AddressCard
                                    key={address.addressId}
                                    address={address}
                                    isDefault={address.isDefault || false}
                                    onSetDefault={handleSetDefault}
                                    onEdit={() => showModal(address)}
                                    onDelete={() => showDeleteModal(address.addressId!)}
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
                    setEditingAddress(null);
                }}
                footer={null}
            >
                <AddressForm
                    key={editingAddress ? selectedAddress : 'new'}
                    initialValues={editingAddress!}
                    onFinish={handleAddOrEditAddress}
                    onCancel={() => setIsModalVisible(false)}
                    isAddingNew={isAddingNewAddress}
                    loading={confirmLoading}
                />
            </Modal>

            <Modal
                title={"Delete Address"}
                open={isDeleteAddressModalVisible}
                onCancel={() => setIsDeleteAddressModalVisible(false)}
                confirmLoading={
                    confirmLoading
                }
                onOk={
                    async () => {
                        await handleDelete(selectedAddress!)
                    }
                }
            >
                <p>Are you sure you want to delete this address?</p>
            </Modal>
        </Card>
    );
};

export default AddressManagementPage;