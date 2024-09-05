import React, { useEffect, useState } from "react";
import { RefundApi, RefundResponse } from "../../api";
import { Card, Col, Row, Table, Modal, Button } from "antd";
import NavProfile from "../../components/NavProfile/NavProfile.tsx";

const RefundHistory = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [data, setData] = useState<RefundResponse[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<RefundResponse | null>(null);

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

        setData(response.data.items || []);
        console.log(response);
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
      setSelectedRefund(response.data.data!);
      setIsModalVisible(true);
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
        <Button type="primary" onClick={() => showModal(record.refundId!)}>
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
        footer={null}
      >
        {selectedRefund && (
          <div>
            <p><strong>Order Code:</strong> {selectedRefund.orderCode}</p>
            <p><strong>Item Code:</strong> {selectedRefund.itemCode}</p>
            <p><strong>Item Name:</strong> {selectedRefund.itemName}</p>
            <p><strong>Amount:</strong> {formatBalance(selectedRefund.unitPrice!)} VND</p>
            <p><strong>Created Date:</strong> {new Date(selectedRefund.createdDate!).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {selectedRefund.refundStatus}</p>
            <p><strong>Description:</strong> {selectedRefund.description}</p>
            <p><strong>Customer Name:</strong> {selectedRefund.customerName}</p>
            <p><strong>Customer Phone:</strong> {selectedRefund.customerPhone}</p>
            <p><strong>Customer Email:</strong> {selectedRefund.customerEmail}</p>
            <div><strong>Images:</strong></div>
            <div>
              {selectedRefund.imagesForCustomer!.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`refund-image-${index}`}
                  style={{ width: "50px", height: "50px", marginRight: "5px" }}
                />
              ))}
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default RefundHistory;
