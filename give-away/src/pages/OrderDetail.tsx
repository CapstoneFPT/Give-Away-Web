import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Spin, Tag, Image, Typography, Divider, Descriptions } from "antd";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import NavProfile from "../components/NavProfile/NavProfile";
import {
  FashionItem,
  FashionItemOrderDetailResponse,
  FashionItemStatus,
  OrderApi,
} from "../api";

const { Title } = Typography;

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [orderDetails, setOrderDetails] = useState<FashionItemOrderDetailResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentMethod, recipientName, address, contactNumber } = location.state || {};

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

  const handleRefundClick = (fashionItem: FashionItem, orderDetailId: string) => {
    navigate("/refunds", { state: { items: [fashionItem], orderDetailId } });
  };

  return (
    <Card style={{ borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)", padding: "20px" }}>
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <NavProfile />
        </Col>
        <Col span={18}>
          <Card bordered={false} style={{ borderRadius: "10px" }}>
            <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>Order Detail</Title>
            {orderDetails.map((detail) => (
              <Row gutter={[16, 16]} key={detail.orderDetailId} style={{ marginBottom: "20px" }}>
                <Col span={12}>
                  <Card style={{ borderRadius: "10px" }}>
                    <Image.PreviewGroup>
                      {detail.fashionItemDetail?.images?.map((image, index) => (
                        image.url ? (
                          <Image
                            key={index}
                            src={image.url}
                            alt={`Fashion item ${index}`}
                            style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                          />
                        ) : null
                      ))}
                    </Image.PreviewGroup>
                    <Descriptions column={1} bordered size="small" style={{ marginTop: "10px" }}>
                      <Descriptions.Item label="Item Name">
                        {detail.fashionItemDetail?.name}
                        <Tag
                          color={
                            detail.fashionItemDetail?.status === FashionItemStatus.Sold
                              ? "green"
                              : "blue"
                          }
                          style={{ marginLeft: "10px" }}
                        >
                          {detail.fashionItemDetail?.status}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Price">
                        ${detail.fashionItemDetail?.sellingPrice}
                      </Descriptions.Item>
                      <Descriptions.Item label="Color">
                        {detail.fashionItemDetail?.color}
                      </Descriptions.Item>
                      <Descriptions.Item label="Size">
                        {detail.fashionItemDetail?.size}
                      </Descriptions.Item>
                      <Descriptions.Item label="Gender">
                        {detail.fashionItemDetail?.gender}
                      </Descriptions.Item>
                      <Descriptions.Item label="Brand">
                        {detail.fashionItemDetail?.brand}
                      </Descriptions.Item>
                      <Descriptions.Item label="Condition">
                        {detail.fashionItemDetail?.condition}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
                <Col span={12}>
                  <Divider>
                    <Card title="Recipient Information" bordered={false} style={{ borderRadius: "10px" }}>
                      <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label="Payment Method">{paymentMethod}</Descriptions.Item>
                        <Descriptions.Item label="Recipient Name">{recipientName}</Descriptions.Item>
                        <Descriptions.Item label="Address">{address}</Descriptions.Item>
                        <Descriptions.Item label="Phone Number">{contactNumber}</Descriptions.Item>
                      </Descriptions>
                      {isRefundEligible(detail.refundExpirationDate!) &&
                        detail.fashionItemDetail?.status === FashionItemStatus.Refundable && (
                          <Button
                            type="primary"
                            style={{
                              marginTop: "10px",
                              backgroundColor: "black",
                              borderColor: "black",
                              width: "100px",
                              height: "35px",
                            }}
                            onClick={() => handleRefundClick(detail.fashionItemDetail!, detail.orderDetailId!)}
                          >
                            Refund
                          </Button>
                        )}
                    </Card>
                  </Divider>
                </Col>
              </Row>
            ))}
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
        </Col>
      </Row>
    </Card>
  );
};

export default OrderDetail;
