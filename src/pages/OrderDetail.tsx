import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Spin,
  Tag,
  Image,
  Typography,
  Divider,
  Descriptions,
  Table,
  Space,
  notification,
  Modal,
  Input,
} from "antd";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavProfile from "../components/NavProfile/NavProfile";
import {
  FashionItemDetailResponse,
  FashionItemStatus,
  FeedbackApi,
  FeedbackResponse,
  OrderApi,
  OrderLineItemListResponse,
  OrderStatus,
} from "../api";
import { useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { getOrderStatus, getStatusColor } from "../utils/types";
import { useCart } from "./CartContext";

const { Title, Text, Paragraph } = Typography;

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch, isItemInCart } = useCart();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isModalCancelVisible, setIsModalCancelVisible] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState("");
  const [feedbacks, setFeedbacks] = React.useState<FeedbackResponse[]>([]);
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);

  const orderApi = new OrderApi();

  const { data: orderLineItems, isLoading: isOrderLineItemsLoading } = useQuery(
    {
      queryKey: ["orderLineItems", id],
      queryFn: () => orderApi.apiOrdersOrderIdOrderlineitemsGet(id!),
      select: (response) => response.data?.items || [],
    }
  );

  const { data: orderDetail, isLoading: isOrderDetailLoading } = useQuery({
    queryKey: ["orderDetail", id],
    queryFn: () => orderApi.apiOrdersOrderIdGet(id!),
    select: (response) => response.data,
  });
  useEffect(() => {
    const fetchFeedbacks = async () => {
    
        if (!orderDetail?.orderId) {
          throw new Error("Order ID is not available");
        }
        const response = await feedbackAPI.apiFeedbacksGet(
          null!,
          null!,
          orderDetail.orderId // Ensure orderId is valid
        );
        setFeedbacks(response.data.items || []); // Update feedbacks state
     
    };

    fetchFeedbacks(); // Call the function to fetch feedbacks
  }, [orderDetail]);

  const itemType = orderLineItems?.[0]?.itemType;

  const isLoading = isOrderLineItemsLoading || isOrderDetailLoading;

  if (isLoading) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }

  if (!orderLineItems) {
    return <p>Order not found</p>;
  }

  const isRefundEligible = (refundExpirationDate: string | null) => {
    if (!refundExpirationDate) return false;
    const expirationDate = new Date(refundExpirationDate);
    const currentDate = new Date();
    return expirationDate > currentDate;
  };
  const handleAddToCart = (product: FashionItemDetailResponse) => {
    if (product.isOrderedYet) {
      notification.error({
        message: "Already Ordered",
        description: `The item "${product.name}" has already been ordered.`,
      });
    } else if (isItemInCart(product.itemId!)) {
      notification.warning({
        message: "Already in Cart",
        description: `The item "${product.name}" is already in your cart.`,
      });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: { ...product } });
      notification.success({
        message: "Added to Cart",
        description: `The item "${product.name}" has been added to your cart.`,
      });
      console.log("Product to add to cart: ", product);
      console.log("Adding item to cart with itemId:", product.itemId);
    }
  };
  const handleFeedbackClick = (itemId: string) => {
    setIsModalVisible(true);
  };
  const feedbackAPI = new FeedbackApi();

  const handleSendFeedback = () => {
    const orderId = orderDetail?.orderId; // Assuming orderId is part of orderDetail
    const reqFeedback = feedbackAPI.apiFeedbacksPost({
      orderId,
      content: feedbackText, // Pass the feedback text here
    });
    console.log("Sending feedback:", feedbackText);
    // Reset feedback text and close modal
    setFeedbackText("");
    setIsModalVisible(false);
  };
  const handleCancelClick = (orderId: string) => {
    setIsModalCancelVisible(true);
  };

  const handleCancel = async () => {
    try {
      const orderId = orderDetail?.orderId;
      if (!orderId) {
        notification.error({
          message: 'Order ID Missing',
          description: 'Unable to find the Order ID for cancellation.',
        });
        return;
      }
      setIsLoadingCancel(true);
  
      await orderApi.apiOrdersOrderIdCancelPut(orderId);
  
      notification.success({
        message: 'Order Cancelled',
        description: `Order ${orderDetail.orderCode} has been successfully cancelled.`,
      });
      setIsModalCancelVisible(false);
      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Cancellation Failed',
        description: 'An error occurred while trying to cancel the order. Please try again later.',
      });
    }
  };

  const handleRefundClick = (
    orderLineItem: OrderLineItemListResponse,
    orderDetailId: string
  ) => {
    navigate("/refunds", { state: { items: [orderLineItem], orderDetailId } });
  };
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("de-DE").format(balance);
  };

  const columns: ColumnsType<OrderLineItemListResponse> = [
    {
      title: "Product",
      dataIndex: "itemImage",
      align: "center",
      key: "itemImage",
      render: (images: string[], record: OrderLineItemListResponse) => (
        <>
          <Paragraph
            strong
            style={{
              fontSize: "16px",
            }}
          ></Paragraph>
          <Image
            src={images[0]}
            alt="Product"
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: "16px",
              }}
            >
              Name: {record.itemName}
            </Text>
          </Paragraph>
          <Paragraph>
            <Text>
              <strong>{record.itemCode}</strong>
            </Text>
          </Paragraph>
        </>
      ),
    },
    {
      title: "Product Details",
      dataIndex: "itemName",
      key: "itemName",
      align: "center",
      render: (text: string, record: OrderLineItemListResponse) => (
        <>
          <Space
            style={{ width: "150px" }}
            direction="vertical"
            size={10}
            align="baseline"
          >
            <div>
              <Typography>
                <strong>Brand: </strong>{" "}
                <Tag color="black">{record.itemBrand}</Tag>
              </Typography>
            </div>
            <div>
              <Typography>
                <strong>Size: </strong>
                <Tag color="black">{record.itemSize}</Tag>
              </Typography>
            </div>

            <div>
              <Typography>
                <strong>Gender: </strong>
                {record.itemGender}
              </Typography>
            </div>
            <div>
              <Typography>
                <strong>Color: </strong>
                {record.itemColor}
              </Typography>
            </div>
            <div>
              <Typography>
                <strong>Quantity: </strong>
                {1}
              </Typography>
            </div>
          </Space>
        </>
      ),
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      align: "center",
      render: (price: number) => (
        <>
          <div style={{ width: "100px" }}>
            <strong>{formatBalance(price)} VND</strong>
          </div>
        </>
      ),
    },

    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
      align: "center",
    },
    {
      title: "Shop",
      dataIndex: "shopAddress",
      key: "shopId",
      width: 200,
      align: "center",
    },
    {
      title: "Resevred Expiration",
      dataIndex: "reservedExpirationDate",
      key: "reservedExpirationDate",
      render: (reservedExpirationDate: string | null) => {
        const expirationDate = new Date(reservedExpirationDate || 0);
        const currentDate = new Date();
        if (expirationDate.getFullYear() === 1970) return "N/A";
        if (expirationDate.getTime() < currentDate.getTime()) {
          return <span style={{ color: "red" }}>Expired</span>;
        }
        return expirationDate.getTime() === new Date(null!).getTime()
          ? "N/A"
          : expirationDate.toLocaleString();
      },
    },
    {
      title: "Refund Expiration",
      dataIndex: "refundExpirationDate",
      key: "refundExpirationDate",
      render: (refundExpirationDate: string | null) => {
        console.log(refundExpirationDate);
        const expirationDate = new Date(refundExpirationDate || 0);
        console.log(expirationDate);
        const currentDate = new Date();
        if (expirationDate.getFullYear() === 1970) return "N/A";
        if (expirationDate.getTime() < currentDate.getTime()) {
          return <span style={{ color: "red" }}>Expired</span>;
        }
        return expirationDate.getTime() === new Date(null!).getTime()
          ? "N/A"
          : expirationDate.toLocaleString();
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text: any, record: OrderLineItemListResponse) => (
        <>
          {record.itemStatus === FashionItemStatus.Refundable &&
            orderDetail?.status === OrderStatus.Completed && (
              <Button
                type="primary"
                style={{
                  backgroundColor: "black",
                  borderColor: "black",
                  width: "100px",
                  height: "35px",
                }}
                onClick={() =>
                  handleRefundClick(record, record.orderLineItemId!)
                }
              >
                Refund
              </Button>
            )}
          {record.itemStatus === FashionItemStatus.Reserved && (
            <Button
              type="default"
              style={{
                width: "100px",
                height: "35px",
                marginLeft: "10px",
              }}
              onClick={() => {
                // Create a new object of type FashionItemDetailResponse
                const product: FashionItemDetailResponse = {
                  itemId: record.itemId!,
                  name: record.itemName,
                  // Set this based on your logic
                  images: record.itemImage!,
                  brand: record.itemBrand,
                  size: record.itemSize,
                  gender: record.itemGender,
                  color: record.itemColor,
                  sellingPrice: record.unitPrice,
                  condition: record.condition,
                  status: record.itemStatus,

                  // Assuming this is the correct mapping
                  // Add other necessary properties from record to match FashionItemDetailResponse
                };
                handleAddToCart(product);
              }}
            >
              Add to Cart
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Card
        style={{
          borderRadius: "10px",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
          padding: "20px",
        }}
      >
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <NavProfile />
          </Col>
          <Col span={18}>
            <Card
              title={
                <>
                  <h3>Order Detail</h3>

                  <Typography>
                    <strong>Status Order: </strong>
                    <Tag
                      style={{ marginRight: "10px" }}
                      color={getOrderStatus(orderDetail?.status!)}
                    >
                      {" "}
                      {orderDetail?.status!}
                    </Tag>
                  </Typography>
                </>
              }
            >
              <Card bordered={false} style={{ borderRadius: "10px" }}>
                <Title
                  level={2}
                  style={{ textAlign: "center", marginBottom: "20px" }}
                >
                  Order Detail
                </Title>
                <Card
                  title="Recipient Information"
                  bordered={false}
                  style={{ borderRadius: "10px", marginBottom: "20px" }}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label="Order Code">
                          {orderDetail?.orderCode}
                        </Descriptions.Item>
                        <Descriptions.Item label="Payment Method">
                          {orderDetail?.paymentMethod === 'Banking' ? 'VNPay' : orderDetail?.paymentMethod}
                        </Descriptions.Item>
                        <Descriptions.Item label="Recipient Name">
                          {orderDetail?.reciepientName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Customer Name">
                          {orderDetail?.customerName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address">
                          {orderDetail?.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address Type">
                          {orderDetail?.addressType}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone Number">
                          {orderDetail?.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                          {orderDetail?.email}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col span={12}>
                      <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label="Purchase Type">
                          {
                            <Typography>
                              {itemType == "ConsignedForAuction" &&
                                "Auction Product"}
                              {itemType == "ConsignedForSale" &&
                                "Purchase Product"}
                              {itemType == "ItemBase" && "Purchase Product"}
                            </Typography>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item label="Sub Total">
                          <strong>
                            {formatBalance(orderDetail?.subtotal || 0)} VND
                          </strong>
                        </Descriptions.Item>
                        <Descriptions.Item label="Shipping Fee">
                          <strong>
                            {" "}
                            {formatBalance(orderDetail?.shippingFee || 0)} VND
                          </strong>
                        </Descriptions.Item>
                        <Descriptions.Item label="Discount">
                          <strong style={{ color: "green" }}>
                            {" "}
                            -{formatBalance(orderDetail?.discount || 0)} VND
                          </strong>
                        </Descriptions.Item>
                        <Descriptions.Item label="Total">
                          <strong>
                            {formatBalance(orderDetail?.totalPrice || 0)} VND{" "}
                          </strong>
                        </Descriptions.Item>
                        <Descriptions.Item label="Create At">
                          {new Date(orderDetail?.createdDate || 0).getTime() ===
                          new Date("0001-01-01T00:00:00").getTime()
                            ? "N/A"
                            : new Date(
                                orderDetail?.createdDate || ""
                              ).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Payment Date">
                          {new Date(orderDetail?.paymentDate || 0).getTime() ===
                          new Date("0001-01-01T00:00:00").getTime()
                            ? "N/A"
                            : new Date(
                                orderDetail?.paymentDate || ""
                              ).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Completed Date">
                          {new Date(
                            orderDetail?.completedDate || 0
                          ).getTime() ===
                          new Date("0001-01-01T00:00:00").getTime()
                            ? "N/A"
                            : new Date(
                                orderDetail?.completedDate || ""
                              ).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Customer Feedback">
                          <>
                            <Text style={{ color: "orange", fontWeight: "bold" }}>
                              Feedback Date: {feedbacks.length > 0 ? new Date(feedbacks[0].createDate!).toLocaleString() : "N/A"}{" "}
                            </Text>
                            <Input.TextArea
                              rows={4}
                              value={feedbacks
                                .map(
                                  (feedback: FeedbackResponse) =>
                                    feedback.content
                                )
                                .join("\n")} // Join feedbacks into a single string
                              readOnly // Make the TextArea read-only
                            />
                          </>
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                  {feedbacks.length === 0 &&
                    orderDetail?.status === OrderStatus.Completed && (
                      <Button
                        type="default"
                        style={{
                          width: "100px",
                          height: "35px",
                          margin: "30px",
                          color: "white",
                          backgroundColor: "black",
                        }}
                        onClick={() =>
                          handleFeedbackClick(orderDetail.orderId!)
                        }
                      >
                        Feedback
                      </Button>
                    )}
                    {feedbacks.length === 0 &&
                    orderDetail?.status === OrderStatus.Pending && (
                      <Button
                        type="default"
                        style={{
                          width: "100px",
                          height: "35px",
                          margin: "30px",
                          color: "white",
                          backgroundColor: "red",
                        }}
                        onClick={() =>
                          handleCancelClick(orderDetail.orderId!)
                        }
                      >
                        Cancel
                      </Button>
                    )}
                </Card>
                <Table
                  columns={columns}
                  dataSource={orderLineItems}
                  rowKey="orderDetailId"
                  pagination={false}
                />
                <Divider />
                <Link to="/order-list">
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "black",
                      borderColor: "black",
                      width: "100px",
                      height: "35px",
                      marginTop: "20px",
                    }}
                  >
                    Back
                  </Button>
                </Link>
              </Card>
            </Card>
          </Col>
        </Row>
      </Card>
      <Modal
        title="Feedback"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSendFeedback}>
            Send
          </Button>,
        ]}
      >
        <Input.TextArea
          rows={4}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Enter your feedback here"
        />
      </Modal>
      <Modal
        title="Cancel Order"
        visible={isModalCancelVisible}
        onCancel={() => setIsModalCancelVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalCancelVisible(false)}>
           Close
          </Button>,
          <Button key="submit" type="primary" onClick={handleCancel} loading={isLoadingCancel}>
            Cancel
          </Button>,
        ]}
      >
        <p>Do you want cancel Order <strong>{orderDetail?.orderCode}</strong></p>
        
      </Modal>
    </>
  );
};

export default OrderDetail;
