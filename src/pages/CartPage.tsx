import React, { useCallback, useEffect, useState } from "react";
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
import { Product, useCart } from "./CartContext";
import {
  AccountApi,
  CartRequest,
  DeliveryListResponse,
  DeliveryRequest,
  OrderApi,
  PaymentMethod,
} from "../api";
import { useAddresses } from "../hooks/useAddresses";
import { AddressSelectionModal } from "../components/Cart/AddressSelectionModal";
import { useNavigate } from "react-router-dom";
import Cart from "../components/Cart/Cart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../components/Auth/Auth";

const { Option } = Select;

const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<Product | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { currentUser } = useAuth();
  const userId = currentUser?.id || "";
  const {
    addresses,
    isLoading: isLoadingAddresses,
    addNewAddress,
  } = useAddresses(userId);
  const [selectedAddress, setSelectedAddress] =
    useState<DeliveryListResponse | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const navigate = useNavigate();
  const [isModalDiscount, setIsModalDiscount] = useState(false);

  const showDiscountPolicy = () => {
    setIsModalDiscount(true);
  };
  const handleCancel = () => {
    setIsModalDiscount(false);
  };

  const [form] = Form.useForm();
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddress =
        addresses.find((address) => address.isDefault) || addresses[0];
      setSelectedAddress(defaultAddress);
    }
  }, [addresses, selectedAddress]);
  const { data: shippingFeeData, isLoading: isCalculatingShippingFee } =
    useQuery({
      queryKey: ["shippingFee", selectedItems, selectedAddress?.ghnDistrictId],
      queryFn: async () => {
        if (selectedItems.length === 0 || !selectedAddress) {
          return null;
        }
        const orderApi = new OrderApi();
        const response = await orderApi.apiOrdersCalculateShippingFeeGet(
          selectedItems,
          selectedAddress.ghnDistrictId
        );
        return response.data.shippingFee!;
      },
      enabled: selectedItems.length > 0 && !!selectedAddress,
    });

  const checkoutMutation = useMutation({
    mutationFn: async (orderData: CartRequest) => {
      const accountApi = new AccountApi();
      return await accountApi.apiAccountsAccountIdOrdersPost(userId, orderData);
    },
    onSuccess: async (response, variables) => {
      notification.success({
        message: "Success",
        description: "Order placed successfully",
      });
      selectedItems.forEach((itemId) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { itemId } });
      });
      setSelectedItems([]);

      const orderId = response.data?.data?.orderId;
      if (!orderId) {
        throw new Error("Order ID not returned from the server");
      }

      await handlePayment(variables.paymentMethod!, orderId);
      navigate("/");
    },
    onError: (error) => {
      console.error("Error during checkout:", error);
      notification.error({
        message: "Checkout Error",
        description: "An error occurred during checkout. Please try again.",
      });
    },
  });

  const handleDeleteItem = (item: Product) => {
    setItemToRemove(item);
    setShowConfirm(true);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: { itemId: itemToRemove.itemId },
      });
      setSelectedItems((prev) =>
        prev.filter((id) => id !== itemToRemove.itemId)
      );
      setShowConfirm(false);
      setItemToRemove(null);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(
      checked ? state.cartItems!.map((item) => item.itemId!) : []
    );
  };

  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
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
        address: selectedAddress?.residence || "",
        phone: selectedAddress?.phone,
        cartItems: selectedItems.map((item) => ({ itemId: item })),
        addressType: selectedAddress?.addressType,
        ghnProvinceId: selectedAddress?.ghnProvinceId,
        ghnDistrictId: selectedAddress?.ghnDistrictId,
        ghnWardCode: selectedAddress?.ghnWardCode,
        discount: discount || 0,
        shippingFee: shippingFeeData || 0,
      };

      checkoutMutation.mutate(orderData);
    } catch (error) {
      console.error("Error during checkout:", error);
      notification.error({
        message: "Checkout Error",
        description: "An error occurred during checkout. Please try again.",
      });
    }
  };

  const handlePayment = async (
    paymentMethod: PaymentMethod,
    orderId: string
  ) => {
    const orderApi = new OrderApi();
    switch (paymentMethod) {
      case PaymentMethod.Banking:
        const response = await orderApi.apiOrdersOrderIdPayVnpayPost(orderId, {
          memberId: userId,
        });
        if (response.data.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          throw new Error("Payment URL not received");
        }
        break;
      case "Point":
        await orderApi.apiOrdersOrderIdPayPointsPost(orderId, {
          memberId: userId,
        });
        notification.success({
          message: "Success",
          description: "Payment with points successful",
        });
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
    }
  };

  const calculateDiscount = useCallback(() => {
    const totalItemPrice = state.cartItems
      .filter((item) => selectedItems.includes(item.itemId!))
      .reduce((total, item) => total + (item.sellingPrice || 0), 0);

    if (totalItemPrice >= 1000000) return totalItemPrice * 0.1;
    if (totalItemPrice >= 500000) return totalItemPrice * 0.05;
    return 0;
  }, [state.cartItems, selectedItems]);

  const discount = calculateDiscount();

  const formatBalance = (balance: number) =>
    new Intl.NumberFormat("de-DE").format(balance);

  const calculateTotalItemPrice = () =>
    state.cartItems
      .filter((item) => selectedItems.includes(item.itemId!))
      .reduce((total, item) => total + (item.sellingPrice || 0), 0);

  const calculateTotalPrice = () =>
    calculateTotalItemPrice() + (shippingFeeData || 0) - (discount || 0);

  const handleAddNewAddress = async (value: DeliveryRequest) => {
    await addNewAddress(value);
    setShowAddressModal(false);
  };

  return (
    <Row>
      <Col span={16}>
        <Card style={{ maxHeight: "calc(120vh - 100px)", overflowY: "auto" }}>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
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
            okButtonProps={{ danger: true }}
          >
            <p>Are you sure you want to remove this item?</p>
          </Modal>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Typography.Title level={4}>Delivery Information</Typography.Title>
          <Button onClick={() => setShowAddressModal(true)}>
            {selectedAddress ? "Change Address" : "Select Address"}
          </Button>

          <Divider />
          {selectedAddress && (
            <div>
              <Typography>
                <strong>Recipient Name:</strong> {selectedAddress.recipientName}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {selectedAddress.phone}
              </Typography>
              <Typography>
                <strong>Address Type:</strong> {selectedAddress.addressType}
              </Typography>
              <Typography>
                <strong>Residence:</strong> {selectedAddress.residence}
              </Typography>
            </div>
          )}
          <Divider />
          <Form layout="vertical" form={form}>
            <Form.Item
              name="paymentMethod"
              label="Payment Method"
              rules={[
                { required: true, message: "Please select a payment method!" },
              ]}
            >
              <Select placeholder="Select payment method">
                <Option value={PaymentMethod.Banking}>Banking</Option>
                <Option value={PaymentMethod.Point}>Point</Option>
                <Option value={PaymentMethod.Cod}>COD</Option>
              </Select>
            </Form.Item>
          </Form>
          <Divider />
          <Typography.Title level={5}>
            Sub Total: {formatBalance(calculateTotalItemPrice())} VND
          </Typography.Title>
          <Divider />
          <Typography.Title level={5}>
            Shipping Fee:{" "}
            {isCalculatingShippingFee ? (
              <Spin size="small" />
            ) : shippingFeeData !== null ? (
              `${formatBalance(shippingFeeData || 0)} VND`
            ) : (
              "N/A"
            )}
          </Typography.Title>
          <Divider />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Typography.Title level={5} style={{ marginRight: "210px" }}>
              Discount:{" "}
              {isCalculatingShippingFee ? (
                <Spin size="small" />
              ) : discount !== 0 ? (
                `-${formatBalance(discount)} VND`
              ) : (
                "0 VND"
              )}
            </Typography.Title>
            <Button
          type="link"
          onClick={showDiscountPolicy}
          style={{  color: 'black', textDecoration: 'underline' }}
        >
          <strong>Discount policy</strong>
        </Button>
          </div>
          <Divider />
          <Typography.Title level={4}>
            Total Price: {formatBalance(calculateTotalPrice())} VND
          </Typography.Title>
          <Button
            style={{
              marginTop: "10px",
              backgroundColor:
                selectedItems.length === 0 ||
                !selectedAddress ||
                shippingFeeData === null ||
                isCalculatingShippingFee
                  ? "gray"
                  : "black",
              color: "white",
            }}
            type="primary"
            block
            onClick={handleCheckOut}
            disabled={
              selectedItems.length === 0 ||
              !selectedAddress ||
              shippingFeeData === null ||
              isCalculatingShippingFee
            }
          >
            Check Out
          </Button>
        </Card>
        <Modal
        title=""
        visible={isModalDiscount}
        onCancel={handleCancel}
        footer={null}
        width={800}
       
      >
        
        <div>
      {/* Title for Discounts */}
      <Typography.Title level={3}>Giveaway Discounts for Customers</Typography.Title>
      <Typography.Paragraph>
        - For orders <strong>equal to or greater than <strong style={{color:'yellowgreen'}}>1,000,000 VND</strong></strong>, a <strong style={{color:'yellowgreen'}}>10%</strong> discount is applied to the total order amount.
      </Typography.Paragraph>
      <Typography.Paragraph>
        - For orders <strong>equal to or greater than <strong style={{color:'yellowgreen'}}>500,000 VND</strong></strong>, a <strong style={{color:'yellowgreen'}}>5%</strong> discount is applied to the total order amount.
      </Typography.Paragraph>

      {/* Title for Shipping Fees */}
      <Typography.Title level={4}>Shipping Fees</Typography.Title>
      <Typography.Paragraph>
        - For orders containing items from multiple shops, the shipping fee will be calculated based on the distance from the customer's address to each shop and summed up.
      </Typography.Paragraph>
    </div>
        
       
      </Modal>
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
        isLoading={isLoadingAddresses}
      />
    </Row>
    
  );
};

export default CartPage;
