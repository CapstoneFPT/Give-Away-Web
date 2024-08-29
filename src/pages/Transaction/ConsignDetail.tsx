import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Spin,
  Tag,
  Image,
  Divider,
  Descriptions,
} from "antd";
import {Link, useParams} from "react-router-dom";
import NavProfile from "../../components/NavProfile/NavProfile";
import {
  ConsignSaleApi,
  ConsignSaleLineItemsListResponse,
} from "../../api";

const ConsignDetail = () => {
  const [consignLineItems, setConsignLineItems] = useState<ConsignSaleLineItemsListResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [consignInformation, setConsignInformation] = useState<any>(null); // State to store consign information
  const params = useParams();

  useEffect(() => {
    const fetchConsignDetails = async () => {
      setLoading(true);
      try {
        console.log(params);
        const consignApi = new ConsignSaleApi();
        const response = await consignApi.apiConsignsalesConsignsaleIdConsignlineitemsGet(params.consignId!);
        setConsignLineItems(response.data || []);
        console.log("Consign Details: ", response);
      } catch (error) {
        console.error("Failed to fetch order details", error);
        setConsignLineItems([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchConsignInformation = async () => {
      try {
        const consignInfomationApi = new ConsignSaleApi();
        const responseInfoamtionConsign = await consignInfomationApi.apiConsignsalesConsignSaleIdGet(params!.consignId!);
        setConsignInformation(responseInfoamtionConsign.data); // Update state with consign information
        console.log(responseInfoamtionConsign.data);
      } catch (error) {
        console.error("Failed to fetch consign information", error);
      }
    };

    if (params) {
      fetchConsignInformation();
      fetchConsignDetails();
    }
  }, [params]);

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }
  const formatBalance = (sellingPrice: number): string => {
    return new Intl.NumberFormat("de-DE").format(sellingPrice);
  };
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
                  <Descriptions.Item label="Created Date">{new Date(consignInformation.createdDate).toLocaleString()}</Descriptions.Item>
                  <Descriptions.Item label="Start Date">{new Date(consignInformation.startDate) > new Date(-8640000000000000) ? new Date(consignInformation.startDate).toLocaleString() : "N/A"}</Descriptions.Item>
                  <Descriptions.Item label="End Date">{new Date(consignInformation.endDate!) > new Date(-8640000000000000) ? new Date(consignInformation.endDate!).toLocaleString() : "N/A"}</Descriptions.Item>
                  <Descriptions.Item label="Consign Sale Method">{consignInformation.consignSaleMethod}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{consignInformation.phone}</Descriptions.Item>
                  <Descriptions.Item label="Email">{consignInformation.email}</Descriptions.Item>
                </Descriptions>
              )}
            </Card>

            {consignLineItems.map((item, index) => (
              <Card
                key={index}
                title={item.productName}
                bordered={false}
                style={{ marginBottom: "20px" }}
              >
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="Image">
                    <Image.PreviewGroup>
                      {item.images!.map((img, index) => (
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
                    {item!.productName}
                    {/*<Tag*/}
                    {/*  color={item.status === "Sold" ? "green" : "blue"}*/}
                    {/*  style={{ marginLeft: "10px" }}*/}
                    {/*>*/}
                    {/*  {item.fashionItem!.status}*/}
                    {/*</Tag>*/}
                  </Descriptions.Item>
                  <Descriptions.Item label="Deal Price">
                    <strong>
                      {formatBalance(item.dealPrice || 0)} VND
                    </strong>
                  </Descriptions.Item>
                  <Descriptions.Item label="Confirmed Price">
                  <strong>
                      {formatBalance(item.confirmedPrice || 0)} VND
                    </strong>
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender">
                    {item.gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="Brand">
                    {item.brand}
                  </Descriptions.Item>
                  <Descriptions.Item label="Condition">
                    {item.condition}
                  </Descriptions.Item>
                  <Descriptions.Item label="Size">
                    {item.size}
                  </Descriptions.Item>
                  <Descriptions.Item label="Color">
                    {item.color}
                  </Descriptions.Item>
                  {/*<Descriptions.Item label="Shop Address">*/}
                  {/*  {item.shopAddress}*/}
                  {/*</Descriptions.Item>*/}
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
