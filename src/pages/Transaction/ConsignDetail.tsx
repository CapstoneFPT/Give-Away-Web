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
  message,
  Modal,
} from "antd";
import { Link, useParams } from "react-router-dom";
import NavProfile from "../../components/NavProfile/NavProfile";
import {
  ConsignLineItemApi,
  ConsignSaleApi,
  ConsignSaleLineItemsListResponse,
} from "../../api";

// Mock API function for submitting user's decision on deal price
const mockSubmitDealDecision = (
  itemId: string,
  decision: "accept" | "reject"
): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: Math.random() > 0.1 }); // 90% success rate
    }, 1000);
  });
};

const ConsignDetail = () => {
  const [consignLineItems, setConsignLineItems] = useState<
    ConsignSaleLineItemsListResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [consignInformation, setConsignInformation] = useState<any>(null);
  const [processingDecision, setProcessingDecision] = useState<{
    [key: string]: boolean;
  }>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] =
    useState<ConsignSaleLineItemsListResponse | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchConsignDetails = async () => {
      setLoading(true);
      try {
        const consignApi = new ConsignSaleApi();
        const response =
          await consignApi.apiConsignsalesConsignsaleIdConsignlineitemsGet(
            params.consignId!
          );
        setConsignLineItems(response.data || []);
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
        const responseInfoamtionConsign =
          await consignInfomationApi.apiConsignsalesConsignSaleIdGet(
            params!.consignId!
          );
        setConsignInformation(responseInfoamtionConsign.data);
      } catch (error) {
        console.error("Failed to fetch consign information", error);
      }
    };

    if (params) {
      fetchConsignInformation();
      fetchConsignDetails();
    }
  }, [params]);

  const handleDealDecision = async (
    itemId: string,
    decision: "accept" | "reject"
  ) => {
    setProcessingDecision((prev) => ({ ...prev, [itemId]: true }));
    try {
      const consignSaleLineItemApi = new ConsignLineItemApi();
      let response;
      if (decision === "accept") {
        response =
          await consignSaleLineItemApi.apiConsignlineitemsConsignLineItemIdAprroveNegotiationPut(
            itemId
          );
      } else {
        response =
          await consignSaleLineItemApi.apiConsignlineitemsConsignLineItemIdRejectNegotiationPut(
            itemId
          );
      }

      if (response.status === 200) {
        message.success(
          `Deal ${
            decision === "accept" ? "accepted" : "rejected"
          } successfully!`
        );
        setConsignLineItems((items) =>
          items.map((item) =>
            item.consignSaleLineItemId === itemId
              ? {
                  ...item,
                  dealDecision: decision,
                }
              : item
          )
        );
        setModalVisible(false);
      } else {
        message.error(`Failed to ${decision} deal. Please try again.`);
      }
    } catch (error) {
      console.error(`Error ${decision}ing deal:`, error);
      message.error("An error occurred. Please try again.");
    } finally {
      setProcessingDecision((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const openDecisionModal = (item: ConsignSaleLineItemsListResponse) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }

  const formatBalance = (price: number): string => {
    return new Intl.NumberFormat("de-DE").format(price);
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
                  <Descriptions.Item label="Consign Code">
                    {consignInformation.consignSaleCode}
                    <Tag
                      color={
                        consignInformation.status === "Sold" ? "green" : "blue"
                      }
                      style={{ marginLeft: "10px" }}
                    >
                      {consignInformation.status}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Consignor">
                    {consignInformation.consginer}
                  </Descriptions.Item>
                  <Descriptions.Item label="Created Date">
                    {new Date(consignInformation.createdDate).toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Start Date">
                    {new Date(consignInformation.startDate) >
                    new Date(-8640000000000000)
                      ? new Date(consignInformation.startDate).toLocaleString()
                      : "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="End Date">
                    {new Date(consignInformation.endDate!) >
                    new Date(-8640000000000000)
                      ? new Date(consignInformation.endDate!).toLocaleString()
                      : "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Consign Sale Method">
                    {consignInformation.consignSaleMethod}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    {consignInformation.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {consignInformation.email}
                  </Descriptions.Item>
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
                    {item.productName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Expected Price">
                    <strong>
                      {formatBalance(item.expectedPrice || 0)} VND
                    </strong>
                  </Descriptions.Item>
                  <Descriptions.Item label="Deal Price">
                    <strong>{formatBalance(item.dealPrice || 0)} VND</strong>
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
                  <Descriptions.Item label="Note">
                    {item.note}
                  </Descriptions.Item>
                  <Descriptions.Item label="Shop Response">
                    {item.shopResponse ? item.shopResponse : "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Size">
                    {item.size}
                  </Descriptions.Item>
                  <Descriptions.Item label="Color">
                    {item.color}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag>{item.status}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Deal Status">
                    {item.confirmedPrice ? (
                      <Tag color={item.confirmedPrice ? "green" : "orange"}>
                        {item.confirmedPrice
                          ? "Deal Accepted"
                          : "Deal Rejected"}
                      </Tag>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => openDecisionModal(item)}
                        loading={
                          processingDecision[item.consignSaleLineItemId!]
                        }
                        disabled={
                          (item.dealPrice == null) ||
                          processingDecision[item.consignSaleLineItemId!] 
                        }
                      >
                        Decide on Deal Price
                      </Button>
                    )}
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

      <Modal
        title="Decide on Deal Price"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedItem && (
          <>
            <p>
              Expected Price: {formatBalance(selectedItem.expectedPrice || 0)}{" "}
              VND
            </p>
            <p>Deal Price: {formatBalance(selectedItem.dealPrice || 0)} VND</p>
            <Button
              type="primary"
              onClick={() =>
                handleDealDecision(
                  selectedItem.consignSaleLineItemId!,
                  "accept"
                )
              }
              style={{ marginRight: "10px" }}
            >
              Accept Deal
            </Button>
            <Button
              onClick={() =>
                handleDealDecision(
                  selectedItem.consignSaleLineItemId!,
                  "reject"
                )
              }
              style={{ marginRight: "10px" }}
            >
              Reject Deal
            </Button>
          </>
        )}
      </Modal>
    </Card>
  );
};

export default ConsignDetail;
