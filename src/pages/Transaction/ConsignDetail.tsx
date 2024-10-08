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
  Typography,
} from "antd";
import { Link, useParams } from "react-router-dom";
import NavProfile from "../../components/NavProfile/NavProfile";
import {
  ConsignLineItemApi,
  ConsignSaleApi,
  ConsignSaleLineItemsListResponse,
  ConsignSaleStatus,
} from "../../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ConsignDetail = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] =
    useState<ConsignSaleLineItemsListResponse | null>(null);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState<boolean>(false);
  const [confirmationAction, setConfirmationAction] = useState<
    "continue" | "cancel" | null
  >(null);
  const params = useParams();
  const queryClient = useQueryClient();

  const consignSaleApi = new ConsignSaleApi();
  const consignLineItemApi = new ConsignLineItemApi();

  const { data: consignLineItems, isLoading: lineItemsLoading } = useQuery({
    queryKey: ["consignLineItems", params.consignId],
    queryFn: () =>
      consignSaleApi.apiConsignsalesConsignsaleIdConsignlineitemsGet(
        params.consignId!
      ),
    select: (response) => response.data || [],
  });

  const { data: consignInformation, isLoading: informationLoading } = useQuery({
    queryKey: ["consignInformation", params.consignId],
    queryFn: () =>
      consignSaleApi.apiConsignsalesConsignSaleIdGet(params.consignId!),
    select: (response) => response.data,
  });

  const dealDecisionMutation = useMutation({
    mutationFn: async ({
      itemId,
      decision,
    }: {
      itemId: string;
      decision: "accept" | "reject";
    }) => {
      decision === "accept"
        ? await consignLineItemApi.apiConsignlineitemsConsignLineItemIdAprroveNegotiationPut(
          itemId
        )
        : await consignLineItemApi.apiConsignlineitemsConsignLineItemIdRejectNegotiationPut(
          itemId
        );

        return decision;
    },
    onSuccess: (decision) => {
      queryClient.invalidateQueries({ queryKey: ["consignLineItems"] });
      queryClient.invalidateQueries({ queryKey: ["consignInformation"] });
      message.success(
        `Deal ${decision === "accept" ? "accepted" : "rejected"} successfully!`
      );
      setModalVisible(false);
    },
    onError: () => {
      message.error(`Failed to ${confirmationAction} deal. Please try again.`);
    },
  });

  const continueConsignMutation = useMutation({
    mutationFn: () =>
      consignSaleApi.apiConsignsalesConsignsaleIdContinueConsignsalePut(
        consignInformation!.consignSaleId!
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consignInformation"] });
      message.success("Consignment continued successfully!");
      setConfirmationModalVisible(false);
    },
    onError: () => {
      message.error("Failed to continue consignment. Please try again.");
    },
  });

  const cancelConsignMutation = useMutation({
    mutationFn: () =>
      consignSaleApi.apiConsignsalesConsignsaleIdCancelAllConsignsalelinePut(
        consignInformation!.consignSaleId!
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consignInformation"] });
      message.success("Consignment cancelled successfully!");
      setConfirmationModalVisible(false);
    },
    onError: () => {
      message.error("Failed to cancel consignment. Please try again.");
    },
  });

  const handleDealDecision = (
    itemId: string,
    decision: "accept" | "reject"
  ) => {
    dealDecisionMutation.mutate({ itemId, decision });
  };

  const openDecisionModal = (item: ConsignSaleLineItemsListResponse) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const openConfirmationModal = (action: "continue" | "cancel") => {
    setConfirmationAction(action);
    setConfirmationModalVisible(true);
  };

  const handleConfirmation = () => {
    if (confirmationAction === "continue") {
      continueConsignMutation.mutate();
    } else if (confirmationAction === "cancel") {
      cancelConsignMutation.mutate();
    }
  };

  const renderDealStatus = (item: ConsignSaleLineItemsListResponse, consignInformation: any) => {
    if (item.isApproved == null || item.isApproved == undefined) {
      if (item.status === 'Negotiating') return (
        <Button
          type="primary"
          onClick={() => openDecisionModal(item)}
          disabled={
            consignInformation?.status !== "Negotiating" ||
            item.status !== 'Negotiating'
          }
        >
          Decide on Deal Price
        </Button>
      )
    }
    else if (item.isApproved == false) {
      return (
        <Tag color="red">Deal Rejected</Tag>
      )
    }
    else if (item.isApproved == true) {
      return (
        <Tag color="green">Deal Accepted</Tag>
      )
    }
  };

  if (lineItemsLoading || informationLoading) {
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

            <div style={{ marginBottom: '40px' }}>
              <h2>Consgin Detail</h2>
              {consignInformation && (

                <Descriptions column={2} bordered size="small">
                  <Descriptions.Item label="Consign Code">
                    {consignInformation.consignSaleCode}
                  </Descriptions.Item>
                  <Descriptions.Item label="Consignor">
                    {consignInformation.consginer}
                  </Descriptions.Item>
                  <Descriptions.Item label="Created Date">
                    {new Date(consignInformation.createdDate!).toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Start Date">
                    {new Date(consignInformation.startDate!) >
                      new Date(null!)
                      ? new Date(consignInformation.startDate!).toLocaleString()
                      : "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="End Date">
                    {new Date(consignInformation.endDate!) >
                      new Date(null!)
                      ? new Date(consignInformation.endDate!).toLocaleString()
                      : "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Consign Sale Method">
                    {consignInformation.consignSaleMethod}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    {consignInformation.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Shop Adress">
                    {consignInformation.shopAddress}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {consignInformation.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Consign Status">
                    <Typography>

                      <Tag
                        color={
                          consignInformation.status! === "Completed"
                            ? "green"
                            : "blue"
                        }
                        style={{ marginLeft: "10px" }}
                      >
                        {consignInformation.status}
                      </Tag>
                    </Typography>
                  </Descriptions.Item>
                  <Descriptions.Item label="Consignor Recieved">
                    <strong>{formatBalance(consignInformation.memberReceivedAmount! ||0)}VND</strong>
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Sold Price">
                    <strong>{formatBalance(consignInformation.soldPrice||0)}VND</strong>
                  </Descriptions.Item>
                 
                </Descriptions>
              )}
            </div>


            {consignLineItems &&
              consignLineItems.map((item, index) => (
                <Card
                  key={index}
                  title={item.productName}
                  bordered={false}
                  style={{ marginBottom: "20px" }}
                >
                  <Descriptions column={2} bordered size="small">
                    <Descriptions.Item label="Product">
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
                   
                    <Descriptions.Item label="Deal Status">
                      {renderDealStatus(item, consignInformation)}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              ))}

            <Divider />
            <Row justify="space-between">
              <Col>
                <Link to="/transaction/My-consign">
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "black",
                      borderColor: "black",
                      width: "100px",
                      height: "35px",
                    }}
                  >
                    Back
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button
                  onClick={() => openConfirmationModal("continue")}
                  disabled={
                    !(consignInformation?.status === ConsignSaleStatus.Negotiating && consignLineItems?.every(item => item.isApproved !== null))
                  }
                  style={{ marginRight: "10px" }}
                >
                  Continue Consign
                </Button>
                <Button onClick={() => openConfirmationModal("cancel")}
                  disabled={(consignInformation!.status! !== ConsignSaleStatus.Negotiating
                    && consignInformation!.status! !== ConsignSaleStatus.Pending
                    && consignInformation!.status !== ConsignSaleStatus.AwaitDelivery
                    && consignInformation!.status !== ConsignSaleStatus.Processing)
                  } danger>
                  Cancel Consign
                </Button>
              </Col>
            </Row>
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

      <Modal
        title={`Confirm ${confirmationAction === "continue" ? "Continue" : "Cancel"
          } Consignment`}
        open={confirmationModalVisible}
        onOk={handleConfirmation}
        onCancel={() => setConfirmationModalVisible(false)}
      >
        <p>
          Are you sure you want to{" "}
          {confirmationAction === "continue" ? "continue" : "cancel"} this
          consignment?
        </p>
      </Modal>
    </Card>
  );
};

export default ConsignDetail;
