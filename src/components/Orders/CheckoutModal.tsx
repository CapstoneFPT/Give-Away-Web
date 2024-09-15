import React, { useEffect, useState } from "react";
import {
  Modal,
  Row,
  Col,
  Card,
  Typography,
  Button,
  Divider,
  Spin,
  Space,
  Tag,
  notification,
} from "antd";
import { OrderListResponse, PaymentMethod, DeliveryListResponse, DeliveryRequest, OrderLineItemListResponse, CheckoutAuctionRequest, OrderApi } from "../../api";
import { useAddresses } from "../../hooks/useAddresses";
import { AddressSelectionModal } from "../Cart/AddressSelectionModal";
import { ShoppingOutlined, DollarOutlined, CarOutlined } from "@ant-design/icons";
import { useCheckoutAuctionOrder } from "../../hooks/orderHooks";
import { useQuery } from "@tanstack/react-query";

const { Title, Text } = Typography;

interface CheckoutModalProps {
  visible: boolean;
  onCancel: () => void;
  onCancelOrder: () => Promise<void>;
  selectedOrder: OrderListResponse | null;
  onCheckout: (paymentMethod: PaymentMethod, addressId?: string) => void;
  orderLineItems: OrderLineItemListResponse[];
  isLoading: boolean;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  visible,
  onCancel,
  selectedOrder,
  orderLineItems,
  onCheckout,
  onCancelOrder,
  isLoading,
}) => {
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const { addresses, isLoading: isLoadingAddresses, addNewAddress } = useAddresses(userId);
  const [selectedAddress, setSelectedAddress] = useState<DeliveryListResponse | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const checkoutAuctionOrderMutation = useCheckoutAuctionOrder();



  const { data: shippingFeeData, isLoading: isCalculatingShippingFee, refetch } = useQuery({
    queryKey: ["shippingFee", selectedOrder?.orderId, selectedAddress?.ghnDistrictId, selectedAddress?.ghnWardCode, selectedAddress?.ghnProvinceId],
    queryFn: async () => {
      if (!selectedOrder || !selectedAddress) {
        return null;
      }
      console.log("Selected address query:", selectedAddress);
      console.log("Selected order query:", selectedOrder);
      console.log("Order line items query:", orderLineItems);
      const orderApi = new OrderApi();
      const response = await orderApi.apiOrdersCalculateShippingFeeGet(
        orderLineItems.map(item => item.itemId!),
        selectedAddress?.ghnDistrictId
      );
      return response.data.shippingFee!;
    },
    enabled: visible && !!selectedOrder && !!selectedAddress,
  });

  useEffect(() => {
    if (visible && selectedOrder) {
      console.log("Selected order:", selectedOrder);
      console.log("Selected address:", selectedAddress);
      if (!selectedAddress && addresses.length > 0) {
        console.log("Addresses:", addresses);
        const defaultAddress = addresses.find((address) => address.isDefault) || addresses[0];
        console.log("Default address:", defaultAddress);
        setSelectedAddress(defaultAddress);
        refetch();
      } else if (selectedAddress) {
        console.log("Refetching shipping fee...");
        refetch();
      }
    }
  }, [visible, selectedOrder, selectedAddress, addresses, refetch]);

  const handleCheckout = () => {
    if (selectedOrder?.isAuctionOrder) {
      if (!selectedAddress) {
        notification.error({ message: "Please select a shipping address" });
        return;
      }
      const checkoutAuctionRequest: CheckoutAuctionRequest = {
        address: selectedAddress.residence,
        ghnDistrictId: selectedAddress.ghnDistrictId,
        ghnWardCode: selectedAddress.ghnWardCode,
        ghnProvinceId: selectedAddress.ghnProvinceId,
        addressType: selectedAddress.addressType,
        recipientName: selectedAddress.recipientName,
        phone: selectedAddress.phone,
        shippingFee: shippingFeeData || 0,
        discount: selectedOrder.discount,
        memberId: userId
      };
      checkoutAuctionOrderMutation.mutate(
        { orderId: selectedOrder.orderId!, checkoutAuctionRequest },
        {
          onSuccess: () => {
            notification.success({ message: "Auction order checked out successfully" });
            onCancel();
          },
          onError: (error) => {
            notification.error({ message: "Checkout failed", description: error.message });
          }
        }
      );
    } else {
      onCheckout(selectedOrder?.paymentMethod!, selectedAddress?.addressId);
    }
  };
  const handleCancel = () => {
    setSelectedAddress(null);
    onCancel();
  };
  const handleAddNewAddress = async (value: DeliveryRequest) => {
    await addNewAddress(value);
    setShowAddressModal(false);
  };

  const formatBalance = (balance: number) => new Intl.NumberFormat("de-DE").format(balance);

  const renderShippingInformation = () => {
    if (selectedOrder?.isAuctionOrder) {
      return (
        <>
          <Title level={5}>
            <CarOutlined /> Shipping Information
          </Title>
          <Button onClick={() => setShowAddressModal(true)} type="primary" ghost>
            {selectedAddress ? "Change Address" : "Select Address"}
          </Button>
          <Divider />
          {selectedAddress ? (
            <Space direction="vertical">
              <Text strong>Recipient Name: {selectedAddress.recipientName}</Text>
              <Text>Phone: {selectedAddress.phone}</Text>
              <Text>Address Type: {selectedAddress.addressType}</Text>
              <Text>Residence: {selectedAddress.residence}</Text>
            </Space>
          ) : (
            <Text type="secondary">Please select a shipping address</Text>
          )}
        </>
      );
    } else {
      return (
        <>
          <Title level={5}>
            <CarOutlined /> Shipping Information
          </Title>
          <Space direction="vertical">
            <Text strong>Recipient Name: {selectedOrder?.recipientName}</Text>
            <Text>Phone: {selectedOrder?.contactNumber}</Text>
            <Text>Address: {selectedOrder?.address}</Text>
          </Space>
        </>
      );
    }
  };

  useEffect(() => {
    if (visible && selectedOrder) {
      if (!selectedAddress && addresses.length > 0) {
        const defaultAddress = addresses.find((address) => address.isDefault) || addresses[0];
        setSelectedAddress(defaultAddress);
      } else if (selectedAddress) {
        refetch();
      }
    }
  }, [visible, selectedOrder, selectedAddress, addresses, refetch]);

  return (
    <Modal
      title={<Title level={3}><ShoppingOutlined /> Order Details</Title>}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={1200}
      style={{ top: 20 }}
    >
      {isLoading || orderLineItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        selectedOrder && (
          <Row gutter={[24, 24]}>
            <Col span={14}>
              <Card
                title={<Title level={4}>Products</Title>}
                bordered={false}
                styles={{
                  body: {
                    maxHeight: '60vh',
                    overflowY: 'auto',
                    overflowX: 'hidden'
                  }
                }}
              >
                {orderLineItems.length > 0 ? (
                  orderLineItems.map((product) => (
                    <Card
                      key={product.orderLineItemId}
                      style={{ marginBottom: "16px" }}
                      hoverable
                    >
                      <Row gutter={16} align="middle">
                        <Col span={8}>
                          <img
                            style={{
                              width: "100%",
                              height: "auto",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                            src={product.itemImage![0]!}
                            alt={product.itemName!}
                          />
                        </Col>
                        <Col span={16}>
                          <Space direction="vertical" size="small">
                            <Text strong>{product.itemName || "N/A"}</Text>
                            <Text type="secondary">Price: {formatBalance(product.unitPrice || 0)} VND</Text>
                            <Space>
                              {product.itemColor && <Tag color="blue">{product.itemColor}</Tag>}
                              {product.itemSize && <Tag color="green">{product.itemSize}</Tag>}
                              {product.itemGender && <Tag color="magenta">{product.itemGender}</Tag>}
                            </Space>
                            <Text type="secondary">Brand: {product.itemBrand || "N/A"}</Text>
                            <Text type="secondary">Condition: {product.condition || "N/A"}</Text>
                          </Space>
                        </Col>
                      </Row>
                    </Card>
                  ))
                ) : (
                  <Text type="secondary">No products available</Text>
                )}
              </Card>
            </Col>
            <Col span={10}>
              <Card bordered={false}>
                {renderShippingInformation()}
                <Divider />
                <Title level={5}>
                  <DollarOutlined /> Payment Method
                </Title>
                <Text>{selectedOrder.paymentMethod}</Text>
                <Divider />
                <Title level={5}>Order Summary</Title>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Row justify="space-between">
                    <Text>Subtotal:</Text>
                    <Text strong>{formatBalance(selectedOrder.totalPrice || 0)} VND</Text>
                  </Row>
                  <Row justify="space-between">
                    <Text>Shipping Fee:</Text>
                    {isCalculatingShippingFee ? (
                      <Spin size="small" />
                    ) : (
                      <Text strong>{formatBalance((shippingFeeData || 0) || (selectedOrder.shippingFee || 0))} VND</Text>
                    )}
                  </Row>
                  <Row justify="space-between">
                    <Text>Discount:</Text>
                    <Text strong style={{ color: '#52c41a' }}>-{formatBalance(selectedOrder.discount || 0)} VND</Text>
                  </Row>
                </Space>
                <Divider />
                <Row justify="space-between" align="middle">
                  <Title level={4}>Total:</Title>
                  <Title level={4} style={{ color: 'black' }}>
                    {formatBalance((selectedOrder.totalPrice || 0) + (shippingFeeData || selectedOrder.shippingFee || 0) - (selectedOrder.discount || 0))} VND
                  </Title>
                </Row>
                <Row gutter={16} style={{ marginTop: '20px' }}>
                  <Col span={12}>
                    <Button
                      danger
                      type="primary"
                      onClick={onCancelOrder}
                      loading={isLoading}
                      block
                    >
                      Cancel Order
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                      }}
                      onClick={handleCheckout}
                      loading={isLoading || checkoutAuctionOrderMutation.isPending}
                      disabled={isLoading || checkoutAuctionOrderMutation.isPending || (selectedOrder.isAuctionOrder && !selectedAddress)}
                      block
                    >
                      Checkout
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        )
      )}
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
    </Modal>
  );
};

export default CheckoutModal;