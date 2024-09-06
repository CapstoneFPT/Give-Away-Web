import React, { useEffect, useState } from "react";
import { AccountApi, GetTransactionsResponse } from "../../api";
import { Card, Col, Row, Table } from "antd";
import NavProfile from "../../components/NavProfile/NavProfile.tsx";

const AllTransaction = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [data, setData] = useState<GetTransactionsResponse[]>([]);

  useEffect(() => {
    const fetchAllTransaction = async () => {
      const allTransactionApi = new AccountApi();
      try {
        const response = await allTransactionApi.apiAccountsAccountIdTransactionsGet(
          userId,
          null!,
          null!
        );
        setData(response.data.items || []);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };

    fetchAllTransaction();
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
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Recipient Name",
      dataIndex: "recipientName",
      key: "recipientName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice: number) => <strong>{formatBalance(totalPrice)} VND</strong>,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => <strong>{formatBalance(discount)} VND</strong>,
    },
    {
      title: "Shipping Fee",
      dataIndex: "shippingFee",
      key: "shippingFee",
      render: (shippingFee: number) => <strong>{formatBalance(shippingFee)} VND</strong>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createdDate: string) => new Date(createdDate).toLocaleDateString(),
    },
    {
      title: "Completed Date",
      dataIndex: "completedDate",
      key: "completedDate",
      render: (completedDate: string | null) => completedDate ? new Date(completedDate).toLocaleDateString() : "N/A",
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
              Transaction History
            </h3>
            <Table
              dataSource={data}
              columns={columns}
              rowKey="orderId"
              pagination={{ pageSize: 4 }}
              style={{ marginTop: "20px" }}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default AllTransaction;
