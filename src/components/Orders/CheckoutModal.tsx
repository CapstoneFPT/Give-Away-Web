import React, { useState } from "react";
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
} from "antd";
import { OrderListResponse, PaymentMethod, DeliveryListResponse, DeliveryRequest, OrderLineItemListResponse } from "../../api";
import { useAddresses } from "../../hooks/useAddresses";
import { AddressSelectionModal } from "../Cart/AddressSelectionModal";
import { ShoppingOutlined, DollarOutlined, CarOutlined } from "@ant-design/icons";

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

  const handleCheckout = () => {
    onCheckout(selectedOrder?.paymentMethod!, selectedAddress?.addressId);
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

  return (
    <Modal
      title={<Title level={3}><ShoppingOutlined /> Order Details</Title>}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1200}
      style={{ top: 20 }}
    >
      {isLoading ? (
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
                    <Text strong>{formatBalance(selectedOrder.shippingFee || 0)} VND</Text>
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
                    {formatBalance((selectedOrder.totalPrice || 0) + (selectedOrder.shippingFee || 0) - (selectedOrder.discount || 0))} VND
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
                      type="primary"
                      onClick={handleCheckout}
                      loading={isLoading}
                      disabled={isLoading || (selectedOrder.isAuctionOrder && !selectedAddress)}
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