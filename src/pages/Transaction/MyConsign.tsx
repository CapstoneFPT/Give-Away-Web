import React, { useEffect, useState } from "react";
import { Card, Row, Col, Table, Button, Tag } from "antd";
import NavProfile from "../../components/NavProfile/NavProfile";
import { AccountApi } from "../../api";
import { useNavigate } from "react-router-dom"; // Thêm import useNavigate

const MyConsign = () => {
  const navigate = useNavigate(); // Khởi tạo navigate
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  console.log(userId);
  const [data, setData] = useState<any[]>([]); // Thêm trạng thái để lưu dữ liệu

  useEffect(() => {
    const fetchDepositHistory = async () => {
      const DepositListApi = new AccountApi();
      try {
        const response = await DepositListApi.apiAccountsAccountIdConsignsalesGet(
          userId,
          null!,
          null!
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
      title: 'ConsignSale Code',
      dataIndex: 'consignSaleCode',
      key: 'consignSaleCode',
    },
    {
      title: 'Consginer',
      dataIndex: 'consginer',
      key: 'consginer',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice: number) => <strong>{formatBalance(totalPrice)} VND</strong> ,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (createdDate: string) => new Date(createdDate).toLocaleDateString(),
    },
    
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'ConsignSale Method',
      dataIndex: 'consignSaleMethod',
      key: 'consignSaleMethod',
    },
   
   
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
                status === "Completed"
              ? "green"
              : status === "AwaitingDelivery"
              ? "yellow"
              : status === "Pending"
              ? "pink"
              : status === "Received"
              ? "orange"
              : status === "OnSale"
              ? "blue"
              : "red"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action', // Thêm cột cho button
      key: 'action',
      render: (text: any, record: any) => (
        <Button style={{ backgroundColor: 'black', borderColor: 'black', width: '100px', height: '35px', color: 'white' }} 
        onClick={() => handleDetail(record.consignSaleId)}>Detail</Button>
      ),
    },
  ];

  const handleDetail = (consignSaleId: string) => {
    navigate(`/ConsignDetail?consignSaleId=${consignSaleId}`); 
  };
  const formatBalance = (balance:any) => {
    return new Intl.NumberFormat('de-DE').format(balance);
  };

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
              Consign history
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
  )
}

export default MyConsign;