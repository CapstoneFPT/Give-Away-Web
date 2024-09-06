import React, { useEffect, useState } from "react";
import { RefundApi, RefundResponse, RefundStatus } from "../../api";
import {
  Card,
  Col,
  Row,
  Table,
  Modal,
  Button,
  Image,
  Typography,
  Tag,
} from "antd";
import NavProfile from "../../components/NavProfile/NavProfile.tsx";
import { getRefundStatus } from "../../utils/types.ts";
import TextArea from "antd/es/input/TextArea";

const RefundHistory = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [data, setData] = useState<RefundResponse[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<RefundResponse | null>(
    null
  );

  useEffect(() => {
    const fetchRefundHistory = async () => {
      const Refund = new RefundApi();
      try {
        const response = await Refund.apiRefundsGet(
          null!,
          null!,
          null!,
          null!,
          null!,
          userId
        );

        if (response && response.data && response.data.items) {
          setData(response.data.items);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching refund history:", error);
      }
    };

    fetchRefundHistory();
  }, [userId]);

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("de-DE").format(balance);
  };

  const showModal = async (refundId: string) => {
    const Refund = new RefundApi();
    try {
      const response = await Refund.apiRefundsRefundIdGet(refundId);
      if (response.data) {
        setSelectedRefund(response.data);
        setIsModalVisible(true);
        console.log(response)
      } else {
        console.error("No data found for the provided refund ID");
      }
    } catch (error) {
      console.error("Error fetching refund details:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRefund(null);
  };

  const columns = [
    {
      title: "Order Code",
      dataIndex: "orderCode",
      key: "orderCode",
    },
    {
      title: "Item Code",
      dataIndex: "itemCode",
      key: "itemCode",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Amount",
      dataIndex: "unitPrice",
      key: "amount",
      render: (unitPrice: number) => (
        <strong>{formatBalance(unitPrice)} VND</strong>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createdDate: string) =>
        new Date(createdDate).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "refundStatus",
      key: "status",
      render: (refundStatus: RefundStatus) => (
        <Tag
          style={{ marginRight: "10px" }}
          color={getRefundStatus(refundStatus!)}
        >
          {refundStatus!}
        </Tag>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Detail",
      key: "detail",
      render: (text: string, record: RefundResponse) => (
        <Button
          style={{ backgroundColor: "black", color: "white" }}
          type="default"
          onClick={() => showModal(record.refundId!)}
        >
          Detail
        </Button>
      ),
    },
  ];

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
              Refund History
            </h3>
            <Table
              dataSource={data}
              columns={columns}
              rowKey="refundId"
              pagination={{ pageSize: 4 }}
              style={{ marginTop: "20px" }}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Refund Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={1200}
        footer={null}
      >
        {selectedRefund && (
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Typography>
                  <strong>Order Code:</strong> {selectedRefund.orderCode}
                </Typography>
                <Typography>
                  <strong>Item Code:</strong> {selectedRefund.itemCode}
                </Typography>
                <Typography>
                  <strong>Item Name:</strong> {selectedRefund.itemName}
                </Typography>
                <Typography>
                  <strong>Amount:</strong>{" "}
                  {formatBalance(selectedRefund.unitPrice!)} VND
                </Typography>
                <Typography>
                  <strong>Refund Amount:</strong>{" "}
                  {selectedRefund.refundAmount || "N/A"}
                </Typography>
                <Typography>
                  <strong>Refund Percentage: </strong>
                  {selectedRefund.refundPercentage || "N/A"}%
                </Typography>
                <Typography>
                  <strong>Response From Shop:</strong>
                  <TextArea
                    value={selectedRefund.responseFromShop || "N/A"}
                    readOnly
                    rows={3}
                  />
                </Typography>
              </Col>
              <Col span={12}>
                <Typography>
                  <strong>Customer Name:</strong> {selectedRefund.customerName}
                </Typography>
                <Typography>
                  <strong>Customer Phone:</strong>{" "}
                  {selectedRefund.customerPhone}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {selectedRefund.customerEmail}
                </Typography>
                <Typography>
                  <strong>Refund Date:</strong>{" "}
                  {new Date(selectedRefund.createdDate!).toLocaleDateString()}
                </Typography>
                <Typography>
                  <strong>Status: </strong>
                  <Tag color={getRefundStatus(selectedRefund.refundStatus!)}>
                    {selectedRefund.refundStatus!}
                  </Tag>
                </Typography>
                <Typography style={{ marginTop: "20px" }}>
                  <strong>Response From Customer:</strong>
                  <TextArea
                    value={selectedRefund.description || "N/A"}
                    readOnly
                    rows={3}
                  />
                </Typography>
              </Col>
            </Row>

            <Row style={{ marginTop: "20px" }} gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Product Images">
                  <div>
                    {selectedRefund.itemImages?.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`refund-image-${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          marginRight: "5px",
                        }}
                      />
                    ))}
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Image Customer Response">
                  <div>
                    {selectedRefund.imagesForCustomer?.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`refund-image-${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          marginRight: "5px",
                        }}
                      />
                    ))}
                  </div>
                </Card>
              </Col>
            </Row>
            <div style={{ margin: "20px" }}>
              <Button style={{ backgroundColor: "red", color: "white" }}>
                Cancel
              </Button>
              <Button style={{ backgroundColor: "black", color: "white" }}>
                Update Refund
              </Button>
            </div>
          </Card>
        )}
      </Modal>
    </Card>
  );
};

export default RefundHistory;
