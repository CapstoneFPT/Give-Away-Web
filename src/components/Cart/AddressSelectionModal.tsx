import { DeliveryListResponse } from "../../api";
import React, { useState } from "react";
import { Button, List, Modal, notification, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddressForm from "../Profile/AddressForm.tsx";

interface AddressSelectionModalProps {
    visible: boolean;
    onCancel: () => void;
    onSelect: (address: DeliveryListResponse) => void;
    addresses: DeliveryListResponse[];
    selectedAddressId: string | null;
    onAddNewAddress: (values: any) => Promise<void>;
    isLoading: boolean; // New prop for loading state
}

export const AddressSelectionModal: React.FC<AddressSelectionModalProps> = ({
    visible,
    onSelect,
    onAddNewAddress,
    onCancel,
    addresses,
    selectedAddressId,
    isLoading // Add this prop
}) => {
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [isAddingAddress, setIsAddingAddress] = useState(false);

    const handleAddNewAddress = () => {
        if (addresses.length === 5) {
            notification.error({
                message: "Cannot add more than 5 addresses",
            });
            return;
        }
        setShowAddressForm(true);
    };

    const handleAddressFormCancel = () => {
        setShowAddressForm(false);
    };

    const handleAddressFormSubmit = async (values: any) => {
        setIsAddingAddress(true);
        try {
            await onAddNewAddress(values);
            setShowAddressForm(false);
        } catch (error) {
            notification.error({
                message: "Failed to add new address",
                description: "An error occurred while adding the new address. Please try again.",
            });
        } finally {
            setIsAddingAddress(false);
        }
    };

    return (
        <Modal
            title="Select Address"
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <List
                        dataSource={addresses}
                        renderItem={(address) => (
                            <List.Item
                                actions={[
                                    <Button
                                        type={address.addressId === selectedAddressId ? "primary" : "default"}
                                        disabled={address.addressId === selectedAddressId}
                                        onClick={() => onSelect(address)}
                                    >
                                        Select
                                    </Button>
                                ]}
                            >
                                <List.Item.Meta
                                    title={address.recipientName}
                                    description={address.residence}
                                />
                            </List.Item>
                        )}
                    />
                    <Button
                        type="dashed"
                        onClick={handleAddNewAddress}
                        style={{ width: "100%", marginTop: 16 }}
                        icon={<PlusOutlined />}
                    >
                        Add New Address
                    </Button>
                </>
            )}

            <Modal
                title="Add New Address"
                open={showAddressForm}
                onCancel={handleAddressFormCancel}
                footer={null}
            >
                <AddressForm
                    onFinish={handleAddressFormSubmit}
                    onCancel={handleAddressFormCancel}
                    isAddingNew={true}
                    loading={isAddingAddress}
                />
            </Modal>
        </Modal>
    );
};;