import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Modal, notification, Row, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AccountApi, AddressApi, DeliveryListResponse, UpdateDeliveryRequest } from "../api";
import { useAddresses } from "../hooks/useAddresses";
import { useModal } from "../hooks/useModal";
import NavProfile from "../components/NavProfile/NavProfile";
import AddressCard from "../components/Profile/AddressCard";
import AddressForm from "../components/Profile/AddressForm";

const AddressManagementPage: React.FC = () => {
    const userId = useMemo(() => JSON.parse(localStorage.getItem('userId') || 'null'), []);
    const { addresses, fetchAddresses } = useAddresses(userId);
    const formModal = useModal();
    const deleteModal = useModal();

    const [isLoading, setIsLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<DeliveryListResponse | null>(null);

    const updateAddresses = useCallback(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    useEffect(() => {
        updateAddresses();
    }, [updateAddresses]);

    const handleAddOrEditAddress = useCallback(async (values: UpdateDeliveryRequest) => {
        setIsLoading(true);
        try {
            const accountApi = new AccountApi();
            if (selectedAddress) {
                await accountApi.apiAccountsAccountIdDeliveriesDeliveryIdPut(selectedAddress.addressId!, userId, values);
                notification.success({ message: 'Address updated successfully!' });
            } else {
                await accountApi.apiAccountsAccountIdDeliveriesPost(userId, {
                    recipientName: values.recipientName!,
                    phone: values.phone!,
                    residence: values.residence!,
                    addressType: values.addressType!,
                    ghnProvinceId: values.ghnProvinceId!,
                    ghnDistrictId: values.ghnDistrictId!,
                    ghnWardCode: values.ghnWardCode!,
                });
                notification.success({ message: 'Address added successfully!' });
            }
            formModal.hideModal();
            updateAddresses();
        } catch (e) {
            console.error('Error saving address:', e);
            notification.error({ message: 'Failed to add or edit address. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    }, [selectedAddress, userId, formModal.hideModal, updateAddresses]);

    const handleDelete = useCallback(async () => {
        if (!selectedAddress) return;
        setIsLoading(true);
        try {
            const accountApi = new AccountApi();
            await accountApi.apiAccountsAccountIdDeliveriesDeliveryIdDelete(selectedAddress.addressId!, userId);
            notification.success({ message: 'Address deleted successfully!' });
            deleteModal.hideModal();
            updateAddresses();
        } catch (e) {
            console.error("Error deleting address:", e);
            notification.error({ message: 'Failed to delete address. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    }, [selectedAddress, userId, deleteModal.hideModal, updateAddresses]);

    const handleSetDefault = useCallback(async (addressId: string) => {
        try {
            const addressApi = new AddressApi();
            await addressApi.apiAddressesAddressIdSetDefaultPatch(addressId);
            notification.success({ message: 'Default address updated successfully!' });
            updateAddresses();
        } catch (error) {
            console.error('Error setting default address:', error);
            notification.error({ message: 'Failed to set default address. Please try again.' });
        }
    }, [updateAddresses]);

    const openAddressForm = useCallback((address: DeliveryListResponse | null = null) => {
        setSelectedAddress(address);
        formModal.showModal();
    }, [formModal.showModal]);

    const sortedAddresses = useMemo(() => {
        return [...addresses].sort((a, b) => (a.isDefault === b.isDefault) ? 0 : a.isDefault ? -1 : 1);
    }, [addresses]);

    const renderAddressCards = useMemo(() => (
        sortedAddresses.map(address => (
            <AddressCard
                key={address.addressId}
                address={address}
                isDefault={address.isDefault || false}
                onSetDefault={handleSetDefault}
                onEdit={() => openAddressForm(address)}
                onDelete={() => {
                    setSelectedAddress(address);
                    deleteModal.showModal();
                }}
            />
        ))
    ), [sortedAddresses, handleSetDefault, openAddressForm, deleteModal.showModal]);

    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col span={5}>
                    <NavProfile />
                </Col>
                <Col span={19}>
                    <Card style={{ borderRadius: '10px', boxShadow: '2px 2px 7px #cbc1c1' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button
                                type="primary"
                                style={{ backgroundColor: 'black' }}
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    if (addresses.length === 5) {
                                        notification.error({ message: 'You cannot add more than 5 addresses!' });
                                        return;
                                    }
                                    openAddressForm();
                                }}
                            >
                                Add New Address
                            </Button>
                            {renderAddressCards}
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Modal
                title={selectedAddress ? "Edit Address" : "Add New Address"}
                open={formModal.isOpen}
                onCancel={formModal.hideModal}
                footer={null}
            >
                <AddressForm
                    key={selectedAddress?.addressId || 'new'}
                    initialValues={selectedAddress || undefined}
                    onFinish={handleAddOrEditAddress}
                    onCancel={formModal.hideModal}
                    isAddingNew={!selectedAddress}
                    loading={isLoading}
                />
            </Modal>

            <Modal
                title="Delete Address"
                open={deleteModal.isOpen}
                onCancel={deleteModal.hideModal}
                confirmLoading={isLoading}
                onOk={handleDelete}
            >
                <p>Are you sure you want to delete this address?</p>
            </Modal>
        </Card>
    );
};

export default AddressManagementPage;