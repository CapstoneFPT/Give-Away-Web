import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Spin, Tag, Image, Typography, Divider, Descriptions, Table } from "antd";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import NavProfile from "../components/NavProfile/NavProfile";
import { FashionItemStatus, OrderApi, OrderDetailsResponse } from "../api";

const { Title } = Typography;

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [orderDetails, setOrderDetails] = useState<OrderDetailsResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentMethod, recipientName, address, contactNumber, totalPrice, statusOder, createdDate } = location.state || {};

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const orderApi = new OrderApi();
        const response = await orderApi.apiOrdersOrderIdOrderdetailsGet(id!);
        setOrderDetails(response.data?.data!.items || []);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch order details", error);
        setOrderDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }

  if (!orderDetails) {
    return <p>Order not found</p>;
  }

  const isRefundEligible = (refundExpirationDate: string | null) => {
    if (!refundExpirationDate) return true;
    const expirationDate = new Date(refundExpirationDate);
    const currentDate = new Date();
    return expirationDate > currentDate;
  };

  const handleRefundClick = (orderDetail: OrderDetailsResponse, orderDetailId: string) => {
    navigate("/refunds", { state: { items: [orderDetail], orderDetailId } });
  };
  const formatBalance = (balance:number) => {
    return new Intl.NumberFormat('de-DE').format(balance);
  };


  const columns = [
    {
      title: 'Product',
      dataIndex: 'itemImage',
      key: 'itemImage',
      render: (images: string[]) => (
        <Image.PreviewGroup>
          <Image src={images[0]} alt="Product Image" style={{ width: '100px', height: 'auto', borderRadius: '10px' }} />
        </Image.PreviewGroup>
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'itemName',
      key: 'itemName',
      render: (text: string, record: OrderDetailsResponse) => (
        <>
          {text}
          <Tag color={record.itemStatus === FashionItemStatus.Sold ? 'green' : 'blue'} style={{ marginLeft: '10px' }}>
            {record.itemStatus}
          </Tag>
        </>
      ),
    },
    { title: 'Unit Price', dataIndex: 'unitPrice', key: 'unitPrice', render: (price: number) => <strong>{formatBalance(price)} VND</strong> },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Color', dataIndex: 'itemColor', key: 'itemColor' },
    { title: 'Size', dataIndex: 'itemSize', key: 'itemSize' },
    { title: 'Gender', dataIndex: 'itemGender', key: 'itemGender' },
    { title: 'Brand', dataIndex: 'itemBrand', key: 'itemBrand' },
    { title: 'Condition', dataIndex: 'condition', key: 'condition' },
    { title: 'Shop', dataIndex: 'shopAddress', key: 'shopId' },

    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: OrderDetailsResponse) => (
        isRefundEligible(record.refundExpirationDate!) && record.itemStatus === FashionItemStatus.Refundable && (
          <Button
            type="primary"
            style={{ backgroundColor: 'black', borderColor: 'black', width: '100px', height: '35px' }}
            onClick={() => handleRefundClick(record, record.orderDetailId!)}
          >
            Refund
          </Button>
        )
      ),
    },
  ];

  return (
    <Card style={{ borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)', padding: '20px' }}>
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <NavProfile />
        </Col>
        <Col span={18}>
        <Card title={
          <>
            Order Detail
            <Tag
          color={
            statusOder === "Completed"
              ? "green"
              : statusOder === "AwaitingPayment"
              ? "yellow"
              : statusOder === "OnDelivery"
              ? "blue"
              : "red"
          }
        >
          {statusOder.toUpperCase()}
        </Tag>
          </>
        }>
        <Card bordered={false} style={{ borderRadius: '10px' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Order Detail</Title>
            <Card title="Recipient Information"  bordered={false} style={{ borderRadius: '10px', marginBottom: '20px' }}>
              <Descriptions column={1} bordered size="small">
                
                <Descriptions.Item label="Payment Method">{paymentMethod}</Descriptions.Item>
                <Descriptions.Item label="Recipient Name">{recipientName}</Descriptions.Item>
                <Descriptions.Item label="Address">{address}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{contactNumber}</Descriptions.Item>
                <Descriptions.Item label="Total"><strong>{formatBalance(totalPrice)} VND </strong></Descriptions.Item>
                <Descriptions.Item label="Created At">{createdDate}</Descriptions.Item>

              </Descriptions>
            </Card>
            <Table
              columns={columns}
              dataSource={orderDetails}
              rowKey="orderDetailId"
              pagination={false}
            />
            <Divider />
            <Link to="/order-list">
              <Button
                type="primary"
                style={{
                  backgroundColor: 'black',
                  borderColor: 'black',
                  width: '100px',
                  height: '35px',
                  marginTop: '20px',
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
