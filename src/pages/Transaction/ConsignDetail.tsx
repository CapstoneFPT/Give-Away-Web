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
import { Link, useLocation } from "react-router-dom"; 
import NavProfile from "../../components/NavProfile/NavProfile";
import {
  ConsignSaleApi,
  ConsignSaleDetail,
  ConsignSaleDetailResponse,
} from "../../api";

const ConsignDetail = () => {
  const [consignDetail, setConsignDetail] = useState<ConsignSaleDetailResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [consignInformation, setConsignInformation] = useState<any>(null); // State to store consign information
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const consignSaleId = queryParams.get("consignSaleId");

  useEffect(() => {
    const fetchConsignDetails = async () => {
      setLoading(true);
      try {
        const consignApi = new ConsignSaleApi();
        const response = await consignApi.apiConsginsalesConsignsaleIdConsignsaledetailsGet(consignSaleId!);
        setConsignDetail(response.data.data!);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch order details", error);
        setConsignDetail([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchConsignInformation = async () => {
      try {
        const consignInfomationApi = new ConsignSaleApi();
        const responseInfoamtionConsign = await consignInfomationApi.apiConsginsalesConsignsaleIdGet(consignSaleId!);
        setConsignInformation(responseInfoamtionConsign.data.data); // Update state with consign information
        console.log(responseInfoamtionConsign.data.data);
      } catch (error) {
        console.error("Failed to fetch consign information", error);
      }
    };

    if (consignSaleId) {
      fetchConsignInformation();
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
              title="Consign Information"
              bordered={false}
              style={{ borderRadius: "10px", marginBottom: "20px" }}
            >
              {consignInformation && (
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="Consign Code">{consignInformation.consignSaleCode}
                  <Tag
                      color={consignInformation.status === "Sold" ? "green" : "blue"}
                      style={{ marginLeft: "10px" }}
                    >
                      {consignInformation.status}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Consignor">{consignInformation.consginer}</Descriptions.Item>
                  <Descriptions.Item label="Created Date">{consignInformation.createdDate}</Descriptions.Item>
                  <Descriptions.Item label="Start Date">{consignInformation.startDate}</Descriptions.Item>
                  <Descriptions.Item label="Confirmed Price">{consignInformation.endDate}</Descriptions.Item>
                  <Descriptions.Item label="Consign Sale Method">{consignInformation.consignSaleMethod}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{consignInformation.phone}</Descriptions.Item>
                  <Descriptions.Item label="Email">{consignInformation.email}</Descriptions.Item>
                </Descriptions>
              )}
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
                  <Descriptions.Item label="Deal Price">
                    ${item.dealPrice}
                  </Descriptions.Item>
                  <Descriptions.Item label="Confirmed Price">
                    ${item.confirmedPrice}
                  </Descriptions.Item>
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
