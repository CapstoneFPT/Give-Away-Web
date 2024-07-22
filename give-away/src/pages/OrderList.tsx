import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Button, Tag } from "antd";
import NavProfile from "../components/NavProfile/NavProfile";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/config";

const OrderList = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = JSON.parse(localStorage.getItem("userId") || "null");
      console.log(userId);

      if (!userId) {
        setError('User ID not found in localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/accounts/${userId}/orders`);
        console.log(response.data); // Log the API response for debugging

        // Check if response.data is an array or adjust if nested
        const orders = Array.isArray(response.data.data) ? response.data.data : response.data.data.items || [];
        setData(orders);
      } catch (err) {
        console.error(err); // Log detailed error for debugging
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    {
      title: 'Code Orders',
      dataIndex: 'orderCode',
      key: 'orderCode',
    },
    {
      title: 'Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice' ,
    },
    {
      title: 'Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Completed' ? 'green' : status === 'awaiting payment' ? 'yellow' : status === 'on delivery' ? 'blue' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: any) => (
        <Link to={`/order-detail/${record.id}`}>
          <Button
            type="primary"
            style={{
              backgroundColor: 'black',
              borderColor: 'black',
              width: '100px',
              height: '35px',
            }}
          >
            Detail
          </Button>
        </Link>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
              Order List
            </h3>
            <Table
              dataSource={data}
              columns={columns}
              rowKey="id" // Ensure `id` exists in your data objects
              pagination={{ pageSize: 4 }}
              style={{ marginTop: '20px' }}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderList;
