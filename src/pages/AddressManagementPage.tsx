import {useCallback, useEffect, useMemo, useState} from "react";
import {Button, Card, Col, Modal, notification, Row, Space} from "antd";
import {AccountApi, AddressApi, DeliveryListResponse, UpdateDeliveryRequest} from "../api";
import NavProfile from "../components/NavProfile/NavProfile.tsx";
import {PlusOutlined} from "@ant-design/icons";
import AddressCard from "../components/Profile/AddressCard.tsx";
import AddressForm from "../components/Profile/AddressForm.tsx";
import {useAddresses} from "../hooks/useAddresses.tsx";
import {useModal} from "../hooks/useModal.tsx";

const AddressManagementPage = () => {
    const userId = useMemo(() => JSON.parse(localStorage.getItem('userId') || 'null'), []);
    const {addresses, fetchAddresses} = useAddresses(userId);
    const {isOpen: isFormModalOpen, showModal: showFormModal, hideModal: hideFormModal} = useModal();
    const {
        isOpen: isDeleteAddressModalOpen,
        showModal: showDeleteAddressModal,
        hideModal: hideDeleteAddressModal
    } = useModal();

    const [isLoading, setIsLoading] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [editingAddress, setEditingAddress] = useState<UpdateDeliveryRequest | null>(null);
    const [addressListVersion, setAddressListVersion] = useState(0);

    const updateAddresses = useCallback(() => {
        fetchAddresses();
        setAddressListVersion(prev => prev + 1);
    }, [fetchAddresses]);

    useEffect(() => {
        updateAddresses();
    }, [updateAddresses]);

    const handleAddOrEditAddress = useCallback(async (values: UpdateDeliveryRequest) => {
        setIsLoading(true);
        try {
            const accountApi = new AccountApi();
            if (editingAddress) {
                await accountApi.apiAccountsAccountIdDeliveriesDeliveryIdPut(selectedAddressId!, userId, values);
                notification.success({message: 'Address updated successfully!'});
            } else {

                await accountApi.apiAccountsAccountIdDeliveriesPost(userId, {
                    recipientName: values.recipientName!,
                    addressType: values.addressType!,
                    ghnProvinceId: values.ghnProvinceId!,
                    ghnDistrictId: values.ghnDistrictId!,
                    ghnWardCode: values.ghnWardCode!,
                    residence: values.residence!,
                    phone: values.phone!,
                });
                notification.success({message: 'Address added successfully!'});
            }

            hideFormModal();
            updateAddresses();
        } catch (e) {
            console.error('Error saving address:', e);
            notification.error({message: 'Failed to add or edit address. Please try again.'});
        } finally {
            setIsLoading(false);
        }
    }, [editingAddress, selectedAddressId, userId, hideFormModal, fetchAddresses])


    const handleDelete = useCallback(async () => {
        setIsLoading(true);
        try {
            const accountApi = new AccountApi();
            await accountApi.apiAccountsAccountIdDeliveriesDeliveryIdDelete(selectedAddressId!, userId);
            notification.success({message: 'Address deleted successfully!'});
            hideDeleteAddressModal();
            updateAddresses();
        } catch (e) {
            console.error("Error deleting address:", e);
            notification.error({message: 'Failed to delete address. Please try again.'});
        } finally {
            setIsLoading(false);
        }
    }, [selectedAddressId, userId, hideDeleteAddressModal, fetchAddresses])


    const handleSetDefault = useCallback(async (addressId: string) => {
        try {
            const accountApi = new AddressApi();
            await accountApi.apiAddressesAddressIdSetDefaultPatch(addressId);
            notification.success({message: 'Default address updated successfully!'});
            updateAddresses()
        } catch (error) {
            console.error('Error setting default address:', error);
            notification.error({message: 'Failed to set default address. Please try again.'});
        }
    }, [fetchAddresses]);

    const openAddressForm = (address: DeliveryListResponse | null = null) => {
        if(addresses.length == 5){
            notification.error({message: 'You can not add more than 5 addresses!'});
            return;
        }
        if (address) {
            setSelectedAddressId(address.addressId!);
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
        } else {
            setSelectedAddressId(null);
            setEditingAddress(null);
        }
        showFormModal();
    }


    const renderAddressCards = useMemo(() => (
        addresses.map(address => (
            <AddressCard
                key={address.addressId}
                address={address}
                isDefault={address.isDefault || false}
                onSetDefault={handleSetDefault}
                onEdit={() => openAddressForm(address)}
                onDelete={() => {
                    setSelectedAddressId(address.addressId!)
                    showDeleteAddressModal()
                }}
            />
        ))
    ), [addresses, handleSetDefault, openAddressForm, showDeleteAddressModal])

    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col span={5}>
                    <NavProfile/>
                </Col>
                <Col span={19}>
                    <Card style={{borderRadius: '10px', boxShadow: '2px 2px 7px #cbc1c1'}}>
                        <Space direction="vertical" style={{width: '100%'}}>
                            <Button type="primary"
                                    style=
                                        {
                                            {
                                                backgroundColor: 'black',
                                            }
                                        }
                                    icon={<PlusOutlined/>}
                                    onClick={()=>openAddressForm()}>
                                Add New Address
                            </Button>
                            {renderAddressCards}
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Modal
                title={editingAddress ? "Edit Address" : "Add New Address"}
                open={isFormModalOpen}
                onCancel={hideFormModal}
                footer={null}
            >
                <AddressForm
                    key={`${editingAddress ? selectedAddressId : 'new'}-${addressListVersion}`}
                    initialValues={editingAddress!}
                    onFinish={handleAddOrEditAddress}
                    onCancel={hideFormModal}
                    isAddingNew={!editingAddress}
                    loading={isLoading}
                />
            </Modal>

            <Modal
                title={"Delete Address"}
                open={isDeleteAddressModalOpen}
                onCancel={hideDeleteAddressModal}
                confirmLoading={isLoading}
                onOk={handleDelete}
            >
                <p>Are you sure you want to delete this address?</p>
            </Modal>
        </Card>
    );
};

export default AddressManagementPage;