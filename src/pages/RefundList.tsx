import React, { useEffect, useState } from "react";
import { RefundApi, RefundResponse, RefundStatus } from "../api";
import { Card, Col, Row, Table, Button, Tag } from "antd";
import NavProfile from "../components/NavProfile/NavProfile.tsx";
import { getRefundStatus } from "../utils/types.ts";
import { useNavigate } from "react-router-dom";

const RefundList = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [data, setData] = useState<RefundResponse[]>([]);
  const navigate = useNavigate();

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
          onClick={() => navigate(`/refundDetail/${record.refundId}`)}
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
    </Card>
  );
};

export default RefundList;
