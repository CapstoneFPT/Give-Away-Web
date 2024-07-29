import React, {  useState } from "react";
import {  Card, Row, Col, Table } from "antd";
import NavProfile from "../../components/NavProfile/NavProfile";

const AuctionHistory = () => {

  const [data] = useState([
    {
      id: '1',
      itemName: 'Áo da lộn',
      auctionDate: '2024-06-01',
      bidPrice: '200 USD',
      seller: 'Nguyễn Văn A',
      image: 'https://img.freepik.com/free-psd-premium/3d-illustration-concept-with-background-pattern_24877-7475.jpg?size=338&ext=jpg&ga=GA1.1&semt=sph',
      status: 'Won'
    },
    {
      id: '2',
      itemName: 'Giày tây',
      auctionDate: '2024-05-15',
      bidPrice: '1500 USD',
      seller: 'Trần Thị B',
      image: 'https://img.freepik.com/free-psd-premium/3d-illustration-concept-with-background-pattern_24877-7475.jpg?size=338&ext=jpg&ga=GA1.1&semt=sph',
      status: 'Won'
    },
    {
      id: '3',
      itemName: 'Áo lông cừu',
      auctionDate: '2024-04-22',
      bidPrice: '300 USD',
      seller: 'Lê Văn C',
      image: 'https://img.freepik.com/free-psd-premium/3d-illustration-concept-with-background-pattern_24877-7475.jpg?size=338&ext=jpg&ga=GA1.1&semt=sph',
      status: 'Won'
    },
    {
      id: '4',
      itemName: 'Giày da cá sấu',
      auctionDate: '2024-03-30',
      bidPrice: '500 USD',
      seller: 'Phạm Thị D',
      image: 'https://img.freepik.com/free-psd-premium/3d-illustration-concept-with-background-pattern_24877-7475.jpg?size=338&ext=jpg&ga=GA1.1&semt=sph',
      status: 'Won'
    },
    {
      id: '5',
      itemName: 'Quần lông gấu',
      auctionDate: '2024-02-18',
      bidPrice: '700 USD',
      seller: 'Nguyễn Văn E',
      image: 'https://img.freepik.com/free-psd-premium/3d-illustration-concept-with-background-pattern_24877-7475.jpg?size=338&ext=jpg&ga=GA1.1&semt=sph',
      status: 'Won'
    },
    {
      id: '6',
      itemName: 'Áo khoác lông ngỗng',
      auctionDate: '2024-01-25',
      bidPrice: '450 USD',
      seller: 'Trần Thị F',
      image: 'https://img.freepik.com/free-psd-premium/3d-illustration-concept-with-background-pattern_24877-7475.jpg?size=338&ext=jpg&ga=GA1.1&semt=sph',
      status: 'Won'
    },
  ]);
  const columns = [
    {
      title: 'Product name',
      dataIndex: 'itemName',
      key: 'itemName',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img src={image} alt="Product Image" style={{ width: '100px', height: '100px' }} />
      ),
    },
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
