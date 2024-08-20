import {DeliveryListResponse} from "../../api";
import React, {useEffect, useState} from "react";
import {Button, List, Modal, notification} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import AddressForm from "../Profile/AddressForm.tsx";

interface AddressSelectionModalProps {
    visible: boolean
    onCancel: () => void
    onSelect: (address: DeliveryListResponse) => void
    addresses: DeliveryListResponse[]
    selectedAddressId: string | null
    onAddNewAddress: (values: any) => Promise<void>
}

export const AddressSelectionModal:
    React.FC<AddressSelectionModalProps>
    = ({
           visible,
           onSelect,
           onAddNewAddress,
           onCancel,
           addresses,
           selectedAddressId
       }) => {
    const [showAddressForm, setShowAddressForm] = useState(false);


    const handleAddNewAddress = () => {
        if(addresses.length === 5){
            notification.error({
                message: "Cannot add more than 5 addresses",
            })
            return
        }
        setShowAddressForm(true)
    }

    const handleAddressFormCancel = () => {
        setShowAddressForm(false)
    }

    const handleAddressFormSubmit = async (values: any) => {
        await onAddNewAddress(values);
        setShowAddressForm(false)
    }

    return (
        <Modal
            title={"Select Address"}
            open={visible}
            onCancel={onCancel}
            footer={null}>
            <List
                dataSource={addresses}
                renderItem=
                    {(address) =>
                        (
                            <List.Item
                                actions={[
                                    <Button
                                        type={address.addressId === selectedAddressId ? "primary" : "default"}
                                        disabled={address.addressId === selectedAddressId}
                                        onClick={() => onSelect(address)}>
                                        Select
                                    </Button>
                                ]}>
                                <List.Item.Meta
                                    title={address.recipientName}
                                    description={address.residence}
                                />
                            </List.Item>
                        )
                    }
            />
            <Button
                type={"dashed"}
                onClick={handleAddNewAddress}
                style={{width: "100%", marginTop: 16}}
                icon={<PlusOutlined/>}
            >
                Add New Address
            </Button>

            <Modal
                title="Add New Address"
                open={showAddressForm}
                onOk={handleAddressFormSubmit}
                onCancel={handleAddressFormCancel}
                okButtonProps={{style: {backgroundColor: 'black', color: 'white'}}}
                footer={null}
            >
                <AddressForm
                    onFinish={handleAddressFormSubmit}
                    onCancel={handleAddressFormCancel}
                    isAddingNew={true}
                    loading={false}/>
            </Modal>

        </Modal>
    );
};