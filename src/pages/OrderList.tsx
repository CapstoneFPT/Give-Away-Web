import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Tag,
  Modal,
  Form,
  Select,
  Input,
  notification,
  Spin,
  Typography,
} from "antd";
import NavProfile from "../components/NavProfile/NavProfile";
import { useNavigate } from "react-router-dom";
import {
  OrderApi,
  OrderLineItemListResponse,
  OrderResponse,
  PaymentMethod,
  OrderStatus,
  PurchaseType,
  OrderListResponse,
} from "../api";
import useOrders from "../hooks/useOrders";
import { useCheckoutOrder, useCheckoutVnpay, useCancelOrder } from '../hooks/orderHooks';
import CheckoutModal from "../components/Orders/CheckoutModal";
import { useAuth } from "../components/Auth/Auth";

const { Option } = Select;

const OrderList: React.FC = () => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id || '';
  const [selectedOrder, setSelectedOrder] = useState<OrderListResponse | null>(null);
  const [orderLineItems, setOrderLineItems] = useState<OrderLineItemListResponse[]>([]);
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false);
  const [loadingCheckout, setLoadingCheckout] = useState<boolean>(false);
  const [loadingCancel, setLoadingCancel] = useState<boolean>(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [queryParams, setQueryParams] = useState({
    pageNumber: 1,
    pageSize: 10,
    status: undefined as OrderStatus | undefined,
    paymentMethod: undefined as PaymentMethod | undefined,
    orderCode: undefined as string | undefined,
  });


  const { data: ordersData, isLoading, isError, error, refetch } = useOrders({
    accountId: userId!,
    ...queryParams,
  });

  const checkoutOrderMutation = useCheckoutOrder(userId!);
  const checkoutVnpayMutation = useCheckoutVnpay(userId!);
  const cancelOrderMutation = useCancelOrder();

  const handleSearch = (changedValues: any, allValues: any) => {
    setQueryParams(prev => ({
      ...prev,
      ...allValues,
      pageNumber: 1,
    }));
  };

  const handleTableChange = (pagination: any) => {
    setQueryParams(prev => ({
      ...prev,
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };

  const fetchOrderLineItems = async (orderId: string) => {
    setDetailsLoading(true);
    try {
      const orderApi = new OrderApi();
      const response = await orderApi.apiOrdersOrderIdOrderlineitemsGet(orderId);
      setOrderLineItems(response.data.items || []);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      setOrderLineItems([]);
    } finally {
      setDetailsLoading(false);
    }
  };

  const openCheckoutModal = async (order: OrderResponse) => {
    setDetailsLoading(true);
    try {
      const orderApi = new OrderApi();
      const response = await orderApi.apiOrdersOrderIdOrderlineitemsGet(order.orderId!);
      setOrderLineItems(response.data.items || []);
      setSelectedOrder(order);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      notification.error({
        message: "Error",
        description: "Failed to load order details. Please try again.",
      });
    } finally {
      setDetailsLoading(false);
    }
  };
  const handleCheckout = async () => {
    if (!selectedOrder || !userId) {
      notification.error({
        message: "Checkout Error",
        description: "Missing order information or user ID. Please try again.",
      });
      return;
    }

    setLoadingCheckout(true); // Start loading
    try {
      switch (selectedOrder.paymentMethod) {
        case PaymentMethod.Point: {
          await checkoutOrderMutation.mutateAsync(selectedOrder.orderId!);
          notification.success({
            message: "Checkout Successful",
            description: "Order has been paid with points.",
          });
          break;
        }
        case PaymentMethod.Banking: {
          const response = await checkoutVnpayMutation.mutateAsync(selectedOrder.orderId!);
          const paymentUrl = response.paymentUrl;

          if (paymentUrl) {
            notification.success({
              message: "Checkout Successful",
              description: "Redirecting to payment page...",
            });
            window.location.href = paymentUrl;
          } else {
            throw new Error("Payment URL not received");
          }
          break;
        }
        default:
          throw new Error("Unsupported payment method");
      }
    } catch (error) {
      console.error("Failed to process checkout:", error);
      notification.error({
        message: "Checkout Error",
        description: "Failed to process checkout. Please try again later.",
      });
    } finally {
      setLoadingCheckout(false); // End loading
      handleCloseModal(); // Close modal after processing
    }
  };

  const handleCancel = async () => {
    if (!selectedOrder) return;

    Modal.confirm({
      title: "Confirm Cancellation",
      content: "Are you sure you want to cancel this order?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        setLoadingCancel(true); // Start loading
        try {
          await cancelOrderMutation.mutateAsync(selectedOrder.orderId!);
          notification.success({
            message: "Order Canceled",
            description: "Your order has been successfully canceled.",
          });
          refetch();
          setSelectedOrder(null);
        } catch (error) {
          console.error("Failed to cancel order:", error);
          notification.error({
            message: "Cancellation Error",
            description: "Failed to cancel the order. Please try again later.",
          });
        } finally {
          setLoadingCancel(false); // End loading
          handleCloseModal(); // Close modal after processing
        }
      },
    });
  };

  const formatBalance = (sellingPrice: number): string => {
    return new Intl.NumberFormat("de-DE").format(sellingPrice);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setOrderLineItems([]);
  };

  const handleDetail = (record: OrderResponse) => {
    navigate(`/order-detail/${record.orderId}`, {
      state: {
        paymentMethod: record.paymentMethod,
        recipientName: record.recipientName,
        address: record.address,
        contactNumber: record.contactNumber,
        totalPrice: record.totalPrice,
        statusOder: record.status,
        createdDate: record.createdDate,
      },
    });
  };

  const columns = [
    {
      title: "Code Orders",
      dataIndex: "orderCode",
      key: "orderCode",
    },
    {
      title: "Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createdDate: string) => {
        const date = new Date(createdDate);
        return date.toLocaleString();
      }
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice: number) => (
        <strong>{formatBalance(totalPrice)} VND</strong>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod: string, record: OrderResponse) => (
        record.paymentMethod === 'Banking' ? 'VNPay' : record.paymentMethod
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "AwaitingPayment"
                ? "yellow"
                : status === "OnDelivery"
                  ? "blue"
                  : "red"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: OrderResponse) => (
        <>
          {record.status === "AwaitingPayment" ? (
            <Button type="primary" onClick={() => openCheckoutModal(record)}>
              Checkout
            </Button>
          ) : (
            <Button
              type="primary"
              style={{
                backgroundColor: "black",
                borderColor: "black",
                width: "100px",
                height: "35px",
              }}
              onClick={() => handleDetail(record)}
            >
              Detail
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <NavProfile />
        </Col>
        <Col span={19}>
          <Card
            style={{
              borderRadius: "10px",
              boxShadow: "2px 2px 7px #cbc1c1",
            }}
          >
            <h3
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Order List
            </h3>
            <Form layout="inline" onValuesChange={handleSearch}>
              <Form.Item name="orderCode">
                <Input placeholder="Order Code" />
              </Form.Item>
              <Form.Item name="status">
                <Select placeholder="Status" allowClear>
                  {Object.values(OrderStatus).map(status => (
                    <Option key={status} value={status}>{status}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="paymentMethod">
                <Select placeholder="Payment Method" allowClear>
                  {Object.values(PaymentMethod).filter(method => method !== 'Cash').map(method => (
                    <Option key={method} value={method}>{method}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
            <Table
              dataSource={ordersData?.items || []}
              columns={columns}
              rowKey="orderId"
              loading={isLoading}
              pagination={{
                current: queryParams.pageNumber,
                pageSize: queryParams.pageSize,
                total: ordersData?.totalCount,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
              onChange={handleTableChange}
              style={{ marginTop: "20px" }}
            />
          </Card>
        </Col>
      </Row>

      {/* <Modal
        title="Checkout"
        open={!!selectedOrder}
        onCancel={handleCloseModal}
        footer={null}
        width={1100}
        style={{ top: 20, height: "80vh" }}
      >
        {detailsLoading ? (
          <Spin size="large" />
        ) : (
          selectedOrder && (
            <Row>
              <Col span={16}>
                <Card title="Product" style={{ marginRight: "20px" }}>
                  <Row>
                    <Col span={24}>
                      {orderLineItems.length > 0 ? (
                        orderLineItems.map((product) => (
                          <Card
                            key={product.orderLineItemId}
                            style={{ marginBottom: "10px" }}
                          >
                            <Row>
                              <Col span={12}>
                                <img style={{
                                  width: "180px",
                                  height: "180px",
                                }} src={product.itemImage![0]!} alt={product.itemName!} />
                              </Col>
                              <Col span={12}>
                                <Typography>
                                  Product Name:{" "}
                                  <strong>{product.itemName || "N/A"}</strong>
                                </Typography>
                                <p>
                                  Price:{" "}
                                  <strong>
                                    {formatBalance(product.unitPrice || 0)} VND
                                  </strong>
                                </p>
                                <p>Color: {product.itemColor || "N/A"}</p>
                                <p>Size: {product.itemSize || "N/A"}</p>
                                <p>Gender: {product.itemGender || "N/A"}</p>
                                <p>Brand: {product.itemBrand || "N/A"}</p>
                                <p>Condition: {product.condition || "N/A"}</p>
                              </Col>
                            </Row>
                          </Card>
                        ))
                      ) : (
                        <p>No products available</p>
                      )}
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Information to Receiving">
                  <Form
                    layout="vertical"
                    initialValues={{
                      paymentMethod: selectedOrder.paymentMethod,
                      recipientName: selectedOrder.recipientName,
                      address: selectedOrder.address,
                      contactNumber: selectedOrder.contactNumber,
                    }}
                  >
                    <Form.Item label="Payment Method" name="paymentMethod">
                      <Select
                        placeholder="Select payment method"
                        style={{ width: 150 }}
                        disabled
                      >
                        <Option value="QRCode">QRCode</Option>
                        <Option value="COD">COD</Option>
                        <Option value="Point">Point</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Recipient Name" name="recipientName">
                      <Input placeholder="Recipient Name" disabled />
                    </Form.Item>
                    <Form.Item label="Address" name="address">
                      <Input placeholder="Address" disabled />
                    </Form.Item>
                    <Form.Item label="Contact Number" name="contactNumber">
                      <Input placeholder="Phone" disabled />
                    </Form.Item>
                  </Form>
                </Card>
                <Card title="Total">
                  <p
                    style={{
                      marginBottom: "10px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#d1d124",
                    }}
                  >
                    Discount : {formatBalance(selectedOrder.discount || 0)}{" "}
                    VND
                  </p>
                  <p
                    style={{
                      marginBottom: "10px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#d1d124",
                    }}
                  >
                    Total Price: {formatBalance(selectedOrder.totalPrice || 0)}{" "}
                    VND
                  </p>
                  <div style={{ marginTop: '10px' }}>
                    <Button style={{ color: 'white', backgroundColor: 'black' }} type="primary" onClick={handleCheckout} loading={loadingCheckout}>
                      Checkout
                    </Button>
                    <Button type="primary" style={{ color: 'white', backgroundColor: 'red', marginLeft: '135px' }} onClick={handleCancel} loading={loadingCancel}>
                      Cancel
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          )
        )}
      </Modal> */}
      <CheckoutModal
        visible={!!selectedOrder}
        onCheckout={handleCheckout}
        onCancel={handleCloseModal}
        onCancelOrder={handleCancel}
        selectedOrder={selectedOrder}
        orderLineItems={orderLineItems}
        isLoading={loadingCheckout}
      />
    </Card>
  );
};

export default OrderList;