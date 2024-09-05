import React from "react";
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
} from "antd";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavProfile from "../components/NavProfile/NavProfile";
import { FashionItemStatus, OrderApi, OrderLineItemListResponse } from "../api";
import { useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";

const { Title, Text, Paragraph } = Typography;

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
          <Space direction="vertical" size={8} align="start">
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
          </Space>
        </>
      ),
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      align: "center",
      render: (price: number) => <strong>{formatBalance(price)} VND</strong>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      align: "center",
    },
    { title: "Condition", dataIndex: "condition", key: "condition", align:"center" },
    {
      title: "Shop",
      dataIndex: "shopAddress",
      key: "shopId",
      width: 200,
      align: "center",
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text: any, record: OrderLineItemListResponse) =>
        record.itemStatus === FashionItemStatus.Refundable && (
          <Button
            type="primary"
            style={{
              backgroundColor: "black",
              borderColor: "black",
              width: "100px",
              height: "35px",
            }}
            onClick={() => handleRefundClick(record, record.orderLineItemId!)}
          >
            Refund
          </Button>
        ),
    },
  ];

  return (
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
                Order Detail
                <Tag
                  color={
                    orderDetail?.status === "Completed"
                      ? "green"
                      : orderDetail?.status === "AwaitingPayment"
                      ? "yellow"
                      : orderDetail?.status === "OnDelivery"
                      ? "blue"
                      : "red"
                  }
                >
                  {orderDetail?.status
                    ? orderDetail?.status.toUpperCase()
                    : "N/A"}
                </Tag>
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
                        {orderDetail?.paymentMethod}
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
                      <Descriptions.Item label="Sub Total">
                        {formatBalance(orderDetail?.subtotal || 0)} VND
                      </Descriptions.Item>
                      <Descriptions.Item label="Shipping Fee">
                        {formatBalance(orderDetail?.shippingFee || 0)} VND
                      </Descriptions.Item>
                      <Descriptions.Item label="Discount">
                        -{formatBalance(orderDetail?.discount || 0)} VND
                      </Descriptions.Item>
                      <Descriptions.Item label="Total">
                        <strong>
                          {formatBalance(orderDetail?.totalPrice || 0)} VND{" "}
                        </strong>
                      </Descriptions.Item>
                      <Descriptions.Item label="Created At">
                        {new Date(orderDetail?.createdDate || 0).toLocaleString()}
                      </Descriptions.Item>
                      <Descriptions.Item label="Payment Date">
                        {new Date(orderDetail?.paymentDate || 0).toLocaleString()}
                      </Descriptions.Item>
                      <Descriptions.Item label="Completed Date">
                        {new Date(orderDetail?.completedDate || 0).toLocaleString()}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
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
  );
};

export default OrderDetail;