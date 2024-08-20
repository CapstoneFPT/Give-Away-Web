import React, { useEffect, useState } from "react";
import {
  AccountApi,
  GetTransactionsResponse,
} from "../../api";
import { Card, Col, Row, Table } from "antd";
import NavProfile from "../../components/NavProfile/NavProfile.tsx";

const RefundHistory = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [data, setData] = useState<GetTransactionsResponse[]>([]); // Thêm trạng thái để lưu dữ liệu
  useEffect(() => {
    const fetchDepositHistory = async () => {
      const DepositListApi = new AccountApi();
      try {
        const response =
          await DepositListApi.apiAccountsAccountIdTransactionsGet(
            userId,
            null!,
            null!,
            ["Refund"]
          );
        console.log(response.data.items);

        setData(response.data.items || []); // Lưu dữ liệu vào trạng thái
      } catch (error) {
        console.error("Error fetching deposit history:", error);
      }
    };

    fetchDepositHistory();
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => <strong>{formatBalance(amount)} VND</strong>,
    },

    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createdDate: string) =>
        new Date(createdDate).toLocaleDateString(),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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
              rowKey="id"
              pagination={{ pageSize: 4 }}
              style={{ marginTop: "20px" }}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default RefundHistory;
