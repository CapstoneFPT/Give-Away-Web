import React, { useCallback, useMemo, useState } from "react";
import { Button, Card, Col, Modal, Row, Space, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DeliveryListResponse, UpdateDeliveryRequest } from "../api";
import { useAddresses } from "../hooks/useAddresses";
import { useModal } from "../hooks/useModal";
import NavProfile from "../components/NavProfile/NavProfile";
import AddressCard from "../components/Profile/AddressCard";
import AddressForm from "../components/Profile/AddressForm";

const AddressManagementPage: React.FC = () => {
    const userId = useMemo(() => JSON.parse(localStorage.getItem('userId') || 'null'), []);
    const { addresses, isLoading, error, addNewAddress, updateAddress, deleteAddress, setDefaultAddress } = useAddresses(userId);
    const formModal = useModal();
    const deleteModal = useModal();

    const [selectedAddress, setSelectedAddress] = useState<DeliveryListResponse | null>(null);

    const handleAddOrEditAddress = useCallback(async (values: UpdateDeliveryRequest) => {
        if (selectedAddress) {
            await updateAddress(selectedAddress.addressId!, values);
        } else {
            await addNewAddress({
                addressType: values.addressType!,
                ghnDistrictId: values.ghnDistrictId!,
                ghnProvinceId: values.ghnProvinceId!,
                ghnWardCode: values.ghnWardCode!,
                phone: values.phone!,
                recipientName: values.recipientName!,
                residence: values.residence!,
            });
        }
        formModal.hideModal();
    }, [selectedAddress, addNewAddress, updateAddress, formModal.hideModal]);

    const handleDelete = useCallback(async () => {
        if (!selectedAddress) return;
        await deleteAddress(selectedAddress.addressId!);
        deleteModal.hideModal();
    }, [selectedAddress, deleteAddress, deleteModal.hideModal]);

    const handleSetDefault = useCallback(async (addressId: string) => {
        await setDefaultAddress(addressId);
    }, [setDefaultAddress]);

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

    if (error) {
        return <div>Error loading addresses: {error.message}</div>;
    }

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
                                        Modal.error({ 
                                            title: 'Error',
                                            content: 'You cannot add more than 5 addresses!' 
                                        });
                                        return;
                                    }
                                    openAddressForm();
                                }}
                            >
                                Add New Address
                            </Button>
                            {isLoading ? (
                                <div style={{ textAlign: 'center', padding: '20px' }}>
                                    <Spin size="large" />
                                </div>
                            ) : (
                                renderAddressCards
                            )}
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