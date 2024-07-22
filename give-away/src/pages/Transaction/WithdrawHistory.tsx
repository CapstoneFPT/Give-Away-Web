import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table } from "antd";
import NavProfile from "../../components/NavProfile/NavProfile";
import axios from "axios";
import { BASE_URL } from "../../api/config";

const WithdrawHistory = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  console.log(userId);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/accounts/${userId}/withdraws`);
        const transactions = response.data.items; // Extracting transactions array from the response object
        setData(transactions);
        console.log(transactions)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const columns = [
    {
      title: 'Amount ',
      dataIndex: 'amount',
      key: 'amount',
    },
    
    {
      title: 'Created Date ',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Bank Account ',
      dataIndex: 'bankAccountNumber',
      key: 'bankAccountNumber',
    },
    {
      title: 'Bank Name ',
      dataIndex: 'bankAccountName',
      key: 'bankAccountName',
    },
    {
      title: 'Bank ',
      dataIndex: 'bank',
      key: 'bank',
    },

   
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <NavProfile/>
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
              Withdraw history
            </h3>
            <Table
              dataSource={data}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 4 }}
              style={{ marginTop: '20px' }}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

export default WithdrawHistory;
