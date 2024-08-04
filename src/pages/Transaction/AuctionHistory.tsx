import React, {  useEffect, useState } from "react";
import {  Card, Row, Col, Table } from "antd";
import NavProfile from "../../components/NavProfile/NavProfile";
import { AccountApi, OrderStatus } from "../../api";

const AuctionHistory = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [data, setData] = useState<any[]>([]); // Thêm trạng thái để lưu dữ liệu
  useEffect(() => {
    const fetchDepositHistory = async () => {
      const DepositListApi = new AccountApi();
      try {
        const response = await DepositListApi.apiAccountsAccountIdOrdersGet(
          userId,
          null!,
          null!,
          null!,
          null!,
          null!,
          "false",
         
        );
        setData(response.data.data?.items!); // Lưu dữ liệu vào trạng thái
      } catch (error) {
        console.error("Error fetching deposit history:", error);
      }
    };

    fetchDepositHistory();
  }, [userId]);

  const columns = [
    {
      title: 'Product name',
      dataIndex: 'itemName',
      key: 'itemName',
    },
    // {
    //   title: 'Image',
    //   dataIndex: 'image',
    //   key: 'image',
    //   render: (image: string) => (
    //     <img src={image} alt="Product Image" style={{ width: '100px', height: '100px' }} />
    //   ),
    // },
    {
      title: 'Auction date',
      dataIndex: 'auctionDate',
      key: 'auctionDate',
    },
    {
      title: 'Successful bid price',
      dataIndex: 'bidPrice',
      key: 'bidPrice',
    },
    {
      title: 'Shop',
      dataIndex: 'seller',
      key: 'seller',
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
              Auction history
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

export default AuctionHistory;
