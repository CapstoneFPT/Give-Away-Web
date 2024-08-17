import {Button, Card, Modal, Space, Typography} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined, StarFilled, StarOutlined} from "@ant-design/icons";
import AddressForm from "./AddressForm.tsx";
import React from "react";
import {DeliveryListResponse, DeliveryRequest} from "../../api";
// <Modal
//     title="Add New Address"
//     open={isModalVisible}
//     onOk={handleModalOk}
//     onCancel={() => setIsModalVisible(false)}
//     okButtonProps={{style: {backgroundColor: 'black', color: 'white'}}}
//     footer={
//         <Button
//             style={{backgroundColor: 'black', color: 'white'}}
//             onClick={handleModalOk}
//             loading={isSaveButtonLoading}
//         >
//             Add
//         </Button>
//     }
// >
//     <AddressForm form={addressForm}/>
// </Modal>
// <Button
//     type="link"
//     onClick={handleAddAddress}
//     style={{marginLeft: '10px', color: 'black'}}
//     icon={<PlusOutlined/>}
// >
//     Add Address
// </Button>

type AddressProps = {
    address: DeliveryListResponse;
    isDefault: boolean;
    onSetDefault: (id: string) => void;
    onEdit: (address: DeliveryListResponse) => void;
    onDelete: (id: string) => void;
}

const AddressCard = ({address, isDefault, onSetDefault, onEdit, onDelete} : AddressProps) => (
    <Card
        style={{marginBottom: 16, borderColor: isDefault ? '#1890ff' : undefined}}
        actions={[
            <Button type="text" icon={<EditOutlined/>} onClick={() => onEdit(address)}>Edit</Button>,
            <Button type="text" icon={<DeleteOutlined/>} onClick={() => onDelete(address.addressId!)}>Delete</Button>,
            isDefault ? (
                <Button type="text" icon={<StarFilled/>} style={{color: '#1890ff'}}>Default</Button>
            ) : (
                <Button type="text" icon={<StarOutlined/>} onClick={() => onSetDefault(address.addressId!)}>Set as
                    Default</Button>
            ),
        ]}
    >
        <Space direction="vertical">
            <Typography.Text strong>{address.recipientName}</Typography.Text>
            <Typography.Text>{address.phone}</Typography.Text>
            <Typography.Text>{address.residence}</Typography.Text>
        </Space>
    </Card>
);

export default AddressCard