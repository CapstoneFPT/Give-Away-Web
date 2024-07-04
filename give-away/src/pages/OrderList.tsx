import React, { useState } from "react";
import { Card, Row, Col, Table, Button, Tag } from "antd";
import NavProfile from "../components/NavProfile/NavProfile";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [data] = useState([
    {
      id: '1',
      codeOrders: 'ORD001',
      date: '2024-06-01',
      status: 'Cancelled',
    },
    {
      id: '2',
      codeOrders: 'ORD002',
      date: '2024-05-15',
      status: 'on delivery',
    },
    {
      id: '3',
      codeOrders: 'ORD003',
      date: '2024-04-22',
      status: 'Completed',
    },
    {
      id: '4',
      codeOrders: 'ORD004',
      date: '2024-03-30',
      status: 'awaiting payment',
    },
    {
      id: '5',
      codeOrders: 'ORD005',
      date: '2024-02-18',
      status: 'Completed',
    },
    {
      id: '6',
      codeOrders: 'ORD006',
      date: '2024-01-25',
      status: 'Cancelled',
    },
  ]);

  const columns = [
    {
      title: 'Code Orders',
      dataIndex: 'codeOrders',
      key: 'codeOrders',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
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
              rowKey="id"
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