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
} from "antd";
import { Link, useLocation } from "react-router-dom"; // Thêm useLocation
import NavProfile from "../../components/NavProfile/NavProfile";
import {
  ConsignSaleApi,
  ConsignSaleDetail,
  ConsignSaleDetailResponse,
} from "../../api";

const ConsignDetail = () => {
  const [consignDetail, setConsignDetail] = useState<
    ConsignSaleDetailResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation(); // Khởi tạo useLocation
  const queryParams = new URLSearchParams(location.search); // Lấy query params
  const consignSaleId = queryParams.get("consignSaleId"); // Lấy consignSaleId từ query params

  useEffect(() => {
    const fetchConsignDetails = async () => {
      setLoading(true);
      try {
        const consignApi = new ConsignSaleApi();
        const response =
          await consignApi.apiConsginsalesConsignsaleIdConsignsaledetailsGet(
            consignSaleId!
          ); // Gọi API với consignSaleId
        setConsignDetail(response.data.data!);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch order details", error);
        setConsignDetail([]);
      } finally {
        setLoading(false);
      }
    };

    if (consignSaleId) {
      fetchConsignDetails();
    }
  }, [consignSaleId]);

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }

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
          <Card bordered={false} style={{ borderRadius: "10px" }}>
            <Card
              title="Recipient Information"
              bordered={false}
              style={{ borderRadius: "10px", marginBottom: "20px" }}
            >
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Consign Code">ádf</Descriptions.Item>
                <Descriptions.Item label="Deal Price">ádf</Descriptions.Item>
                <Descriptions.Item label="Address">sdf</Descriptions.Item>
                <Descriptions.Item label="Confirmed Price">adf</Descriptions.Item>
                <Descriptions.Item label="Created Date">adf</Descriptions.Item>
                <Descriptions.Item label="Start Date">adf</Descriptions.Item>
                <Descriptions.Item label="Consingor">adf</Descriptions.Item>
                <Descriptions.Item label="Consign Sale Method">adf</Descriptions.Item>
                <Descriptions.Item label="Phone">adf</Descriptions.Item>
                <Descriptions.Item label="Email">adf</Descriptions.Item>
               
              </Descriptions>
            </Card>

            {consignDetail.map((item, index) => (
              <Card
                key={index}
                title={`Item ${index + 1}`}
                bordered={false}
                style={{ marginBottom: "20px" }}
              >
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="Image">
                    <Image.PreviewGroup>
                      {item.fashionItem!.images!.map((img, index) => (
                        <Image
                          key={index}
                          src={img}
                          alt="Product Image"
                          style={{
                            width: "100px",
                            height: "auto",
                            borderRadius: "10px",
                          }}
                        />
                      ))}
                    </Image.PreviewGroup>
                  </Descriptions.Item>
                  <Descriptions.Item label="Item Name">
                    {item.fashionItem!.name}
                    <Tag
                      color={item.fashionItem!.status === "Sold" ? "green" : "blue"}
                      style={{ marginLeft: "10px" }}
                    >
                      {item.fashionItem!.status}
                    </Tag>
                  </Descriptions.Item>
                  {/* <Descriptions.Item label="Consign Sale Code">
                    {item.fashionItem!.}
                  </Descriptions.Item>
                  <Descriptions.Item label="Deal Price">
                    ${item.fashionItem!.}
                  </Descriptions.Item>
                  <Descriptions.Item label="Confirmed Price">
                    ${item.fashionItem!.confirmedPrice}
                  </Descriptions.Item> */}
                  <Descriptions.Item label="Gender">
                    {item.fashionItem!.gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="Brand">
                    {item.fashionItem!.brand}
                  </Descriptions.Item>
                  <Descriptions.Item label="Condition">
                    {item.fashionItem!.condition}
                  </Descriptions.Item>
                  <Descriptions.Item label="Size">
                    {item.fashionItem!.size}
                  </Descriptions.Item>
                  <Descriptions.Item label="Color">
                    {item.fashionItem!.color}
                  </Descriptions.Item>
                  <Descriptions.Item label="Shop Address">
                    {item.fashionItem!.shopAddress}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            ))}

            <Divider />
            <Link to="/transaction/My-consign">
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

export default ConsignDetail;
