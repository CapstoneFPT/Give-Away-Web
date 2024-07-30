import React, { useEffect, useState } from "react";
import { Card, Row, Col, Descriptions, Button, Spin, Tag } from "antd";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavProfile from "../components/NavProfile/NavProfile";
import {
  FashionItem,
  FashionItemDetailResponse,
  FashionItemDetailResponseOrderDetailResponse,
  FashionItemOrderDetailResponse,
  FashionItemStatus,
  OrderApi,
} from "../api";

interface OrderDetail {
  orderDetailId: string;
  unitPrice: number;
  orderId: string;
  refundExpirationDate: string | null;
  fashionItemDetail: FashionItem;
}

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [orderDetails, setOrderDetails] = useState<
    FashionItemOrderDetailResponse[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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

  // const handleRefundClick = (fashionItem: FashionItemDetailResponseOrderDetailResponse) => {
  //   navigate("/refunds", { state: [fashionItem]     });
  // };
  const handleRefundClick = (fashionItem: FashionItem, orderDetailId: string) => {
    navigate("/refunds", { state: { items: [fashionItem], orderDetailId } });
};

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
              Order Detail
            </h3>
            {orderDetails.map((detail) => (
              <Card key={detail.orderDetailId} style={{ marginTop: 16 }}>
                <Descriptions bordered>
                  <Descriptions.Item label="Item Name" span={3}>
                    {detail.fashionItemDetail?.name}
                    <Tag
                      color={
                        detail.fashionItemDetail?.status ===
                        FashionItemStatus.Sold
                          ? "green"
                          : "blue"
                      }
                      style={{ marginLeft: "10px" }}
                    >
                      {detail.fashionItemDetail?.status}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    {detail.fashionItemDetail?.sellingPrice}
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
                {isRefundEligible(detail.refundExpirationDate!) &&
                  detail.fashionItemDetail?.status ===
                    FashionItemStatus.Refundable && (
                    <>
                      
                      <Button
                        type="primary"
                        style={{
                          marginTop: "10px",
                          backgroundColor: "black",
                          borderColor: "black",
                          width: "100px",
                          height: "35px",
                        }}
                        onClick={() =>
                          handleRefundClick(detail.fashionItemDetail!, detail.orderDetailId!)
                        }
                      >
                        Refund
                      </Button>
                    </>
                  )}
              </Card>
            ))}
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
