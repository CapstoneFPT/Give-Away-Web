import React, {useCallback, useEffect, useState} from "react";
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    message,
    Modal,
    notification,
    Row,
    Select,
    Spin,
    Typography,
} from "antd";
import {Product, useCart} from "./CartContext";
import {AccountApi, CartRequest, DeliveryListResponse, DeliveryRequest, ErrorResponse, OrderApi} from "../api";
import {useAddresses} from "../hooks/useAddresses.tsx";
import {AddressSelectionModal} from "../components/Cart/AddressSelectionModal.tsx";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import Cart from "../components/Cart/Cart.tsx";

const {Option} = Select;

const CartPage: React.FC = () => {
    const {state, dispatch} = useCart();
    const [showConfirm, setShowConfirm] = useState(false);
    const [itemToRemove, setItemToRemove] = useState<Product>(null!);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    const {fetchAddresses, addresses} = useAddresses(userId)
    const [selectedAddress, setSelectedAddress] = useState<DeliveryListResponse | null>(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [addressListVersion, setAddressListVersion] = useState(0);
    const [shippingFee, setShippingFee] = useState<number | null>(null);
    const [discount, setDiscount] = useState<number | null>(null);
    const [isCalculatingShippingFee, setIsCalculatingShippingFee] = useState(false);
    const navigate = useNavigate();

    console.log(userId)

    const [form] = Form.useForm();

    const updateAddresses = useCallback(() => {
        fetchAddresses();
        setAddressListVersion(prev => prev + 1);
    }, [fetchAddresses]);

    useEffect(() => {
        updateAddresses();
    }, []);

    useEffect(() => {
        if (addresses.length > 0) {
            const defaultAddress = addresses.find(address => address.isDefault) || addresses[0];
            setSelectedAddress(defaultAddress)
        }
    }, [addresses]);

    const handleDeleteItem = (item: Product) => {
        setItemToRemove(item);
        setShowConfirm(true);
    };

    const handleConfirmRemove = () => {
        if (itemToRemove) {
            const {itemId} = itemToRemove;
            dispatch({type: "REMOVE_FROM_CART", payload: {itemId}});
            setShowConfirm(false);
            setItemToRemove(null!);
            setSelectedItems((prevSelectedItems) =>
                prevSelectedItems.filter((id) => id !== itemId)
            );
        }
    };

    const handleSelectAll = (checked : boolean) => {
        if (checked) {
            setSelectedItems(state.cartItems!.map(item => item.itemId!));
        } else {
            setSelectedItems([]);
        }
    };

    const calculateShippingFees = useCallback(async () => {
        if (selectedItems.length === 0 || !selectedAddress) {
            setShippingFee(null);
            return;
        }

        setIsCalculatingShippingFee(true)
        try {
            const orderApi = new OrderApi();
            console.log(state.cartItems
                .filter((item) => selectedItems.includes(item.itemId!))
                .map((item) => item.itemId!), selectedAddress?.ghnDistrictId);
            const response = await orderApi.apiOrdersCalculateShippingFeeGet(state.cartItems
                .filter((item) => selectedItems.includes(item.itemId!))
                .map((item) => item.itemId!), selectedAddress?.ghnDistrictId)


            const shippingFeeResult = response.data.shippingFee;
            setShippingFee(shippingFeeResult!);
        } catch (e) {
            console.error("Error calculating shipping fee:", e);
            if (e instanceof AxiosError) {
                const errorResponse: ErrorResponse = e.response?.data as ErrorResponse

                if (errorResponse.errorCode === 'UnsupportedShipping') {
                    notification.error({
                        message: "Unsupported Shipping Address",
                        description: errorResponse.message,
                    });
                }
            } else {
                notification.error({
                    message: "Error",
                    description: "Failed to calculate shipping fee. Please try again.",
                });
            }
            setShippingFee(null);
        } finally {
            setIsCalculatingShippingFee(false)
        }


    }, [selectedItems, selectedAddress]);


    useEffect(() => {
        calculateShippingFees();
    }, [calculateShippingFees]);

    const handleCheckboxChange = (itemId: string) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = prevSelectedItems.includes(itemId)
                ? prevSelectedItems.filter((id) => id !== itemId)
                : [...prevSelectedItems, itemId];
            console.log("Selected item:", itemId);


            return updatedSelectedItems;
        });
    };

    const handleCheckOut = async () => {
        try {
            const validateResult = await form.validateFields();
            if (!userId) {
                notification.error({
                    message: "Error",
                    description: "User ID not found. Please log in and try again.",
                });
                return;
            }

            if (selectedItems.length === 0) {
                message.error("Please select at least one item.");
                return;
            }

            const orderData: CartRequest = {
                paymentMethod: validateResult.paymentMethod,
                recipientName: selectedAddress?.recipientName,
                address: selectedAddress?.residence || null!,
                phone: selectedAddress?.phone,
                cartItems: selectedItems.map((item) => {return {
                    itemId: item,
                    quantity: 1
                }}),
                addressType: selectedAddress?.addressType,
                ghnProvinceId: selectedAddress?.ghnProvinceId,
                ghnDistrictId: selectedAddress?.ghnDistrictId,
                ghnWardCode: selectedAddress?.ghnWardCode,
            };

            console.log("Order Data:", orderData);

            const accountApi = new AccountApi();

            const response = await accountApi.apiAccountsAccountIdOrdersPost(
                userId,
                orderData
            );

            notification.success({
                message: "Success",
                description: "Order placed successfully",
            });
            selectedItems.forEach((itemId) => {
                dispatch({type: "REMOVE_FROM_CART", payload: {itemId}});
            });
            setSelectedItems([]);

            const orderId = response.data?.data?.orderId;
            if (!orderId) {
                throw new Error("Order ID not returned from the server");
            }

            const orderApi = new OrderApi();

            switch (validateResult.paymentMethod) {
                case "QRCode":
                    try {
                        const response = await orderApi.apiOrdersOrderIdPayVnpayPost(
                            orderId,
                            {
                                memberId: userId,
                            }
                        );

                        const paymentUrl = response.data.paymentUrl;

                        if (paymentUrl) {
                            window.location.href = paymentUrl;
                        } else {
                            throw new Error("Payment URL not received");
                        }
                    } catch (error) {
                        console.error("Error during QR Code payment:", error);
                        notification.error({
                            message: "Payment Error",
                            description:
                                "An error occurred during QR Code payment. Please try again.",
                        });
                    }
                    break;
                case "Point":
                    try {
                        await orderApi.apiOrdersOrderIdPayPointsPost(orderId, {
                            memberId: userId,
                        });
                        notification.success({
                            message: "Success",
                            description: "Payment with points successful",
                        });
                    } catch (error) {
                        console.error("Error during Point payment:", error);
                        notification.error({
                            message: "Payment Error",
                            description:
                                "An error occurred during Point payment. Please try again.",
                        });
                    }
                    break;
                case "COD":
                    notification.success({
                        message: "Success",
                        description: "Cash on Delivery order placed successfully",
                    });
                    break;
                default:
                    notification.error({
                        message: "Error",
                        description: "Invalid payment method selected",
                    });
                    return;
            }
            navigate("/");
        } catch (error) {
            console.error("Error during checkout:", error);
            notification.error({
                message: "Checkout Error",
                description: "An error occurred during checkout. Please try again.",
            });
        }
    };

    const calculateDiscount = useCallback(() => {
        const totalItemPrice = state.cartItems
            .filter((item) => selectedItems.includes(item.itemId!))
            .reduce((total, item) => total + (item.sellingPrice || 0), 0);

        if (totalItemPrice >= 100000) {
            return totalItemPrice * 0.1; // 10% discount for orders 100,000 VND and above
        } else if (totalItemPrice >= 50000) {
            return totalItemPrice * 0.05; // 5% discount for orders between 50,000 VND and 99,999 VND
        } else {
            return 0; // No discount for orders below 50,000 VND
        }
    }, [state.cartItems, selectedItems]);

    useEffect(() => {
        const newDiscount = calculateDiscount();
        setDiscount(newDiscount);
    }, [selectedItems, calculateDiscount]);

    const formatBalance = (balance: number) => {
        return new Intl.NumberFormat("de-DE").format(balance);
    };

    const calculateTotalItemPrice = () => {
        return state.cartItems
            .filter((item) => selectedItems.includes(item.itemId!))
            .reduce((total, item) => total + (item.sellingPrice || 0), 0);
    };


    const calculateTotalPrice = () => {
        const itemTotal = calculateTotalItemPrice();
        return itemTotal + (shippingFee || 0) - (discount || 0);
    }

    const handleAddNewAddress = async (value: DeliveryRequest) => {
        try {
            const accountApi = new AccountApi();
            await accountApi.apiAccountsAccountIdDeliveriesPost(userId, {
                recipientName: value.recipientName,
                phone: value.phone,
                addressType: value.addressType,
                ghnProvinceId: value.ghnProvinceId,
                ghnDistrictId: value.ghnDistrictId,
                ghnWardCode: value.ghnWardCode,
                residence: value.residence,
            });
        } catch (error) {
            console.error('Error adding new address:', error);
            notification.error({
                message: "Error",
                description: "An error occurred while adding new address. Please try again.",
            });
        }
    }
    return (
        <Row>
            <Col span={16}>
                <Card style={{maxHeight: "calc(120vh - 100px)", overflowY: "auto"}}>
                    <h1 style={{textAlign: "center", marginBottom: "20px"}}>
                        SHOPPING BAG
                    </h1>
                    <Cart
                        cartItems={state.cartItems}
                        selectedItems={selectedItems}
                        onSelect={handleCheckboxChange}
                        onRemove={handleDeleteItem}
                        onSelectAll={handleSelectAll}
                    />
                    <Modal
                        title="Confirm Removal"
                        open={showConfirm}
                        onOk={handleConfirmRemove}
                        onCancel={() => setShowConfirm(false)}
                        okText="Remove"
                        okButtonProps={{danger: true}}
                    >
                        <p>Are you sure you want to remove this item?</p>
                    </Modal>
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Typography.Title level={4}>Delivery Information</Typography.Title>
                    <Button onClick={() => setShowAddressModal(true)}>
                        {selectedAddress ? 'Change Address' : 'Select Address'}
                    </Button>
                    <Divider/>
                    {
                        selectedAddress && (
                            <div>
                                <Typography><strong>Recipient Name:</strong> {selectedAddress.recipientName}</Typography>
                                <Typography> <strong>Phone: </strong>{selectedAddress.phone}</Typography>
                                <Typography><strong>Address Type: </strong>{selectedAddress.addressType}</Typography>
                                <Typography><strong>Residence: </strong>{selectedAddress.residence}</Typography>
                            </div>
                        )
                    }
                    <Divider/>
                    <Form
                        layout={"vertical"}
                        form={form}>
                        <Form.Item
                            name={"paymentMethod"}
                            label={"Payment Method"}
                            rules={[{required: true, message: "Please select a payment method!"}]}>
                            <Select placeholder="Select payment method">
                                <Option value="QRCode">QRCode</Option>
                                <Option value="Point">Point</Option>
                                <Option value="COD">COD</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                    <Divider/>
                    <Typography.Title level={5}>
                        Sub Total: {formatBalance(calculateTotalItemPrice())} VND
                    </Typography.Title>
                    <Divider/>
                    <Typography.Title level={5}>
                        Shipping Fee : {
                        isCalculatingShippingFee ? (
                            <Spin size={"small"}/>
                        ) : (
                            shippingFee !== null ? formatBalance(shippingFee) + " VND" : "N/A"
                        )
                    }
                    </Typography.Title>
                    <Divider/>
                    <Typography.Title level={5}>
                        Discount : {
                        isCalculatingShippingFee ? (
                            <Spin size={"small"}/>
                        ) : (
                            discount !== 0 ? "-" + formatBalance(discount!) + " VND" : 0 + " VND"
                        )
                    }
                    </Typography.Title>
                    <Divider/>
                    <Typography.Title level={4}>
                        Total Price: {formatBalance(calculateTotalPrice())} VND
                    </Typography.Title>
                    <Button
                        style={{
                            marginTop: '10px', backgroundColor: (selectedItems.length === 0 || !selectedAddress
                                || shippingFee === null || isCalculatingShippingFee) ? 'gray' : 'black', color: 'white'
                        }}
                        type="primary"
                        block
                        onClick={handleCheckOut}
                        disabled={selectedItems.length === 0 || !selectedAddress
                            || shippingFee === null || isCalculatingShippingFee}
                    >
                        Check Out
                    </Button>
                </Card>
            </Col>
            <AddressSelectionModal
                visible={showAddressModal}
                onCancel={() => setShowAddressModal(false)}
                onSelect={(address) => {
                    setSelectedAddress(address);
                    setShowAddressModal(false);
                }}
                addresses={addresses}
                selectedAddressId={selectedAddress?.addressId || null}
                onAddNewAddress={handleAddNewAddress}
                key={addressListVersion}
            />
        </Row>
    );
};

export default CartPage;
