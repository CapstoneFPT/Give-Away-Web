import React, { useEffect, useState } from "react";
import { Card, Row, Col, Table, Button } from "antd";
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
      title: 'consignSaleCode',
      dataIndex: 'consignSaleCode',
      key: 'consignSaleCode',
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'createdDate',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'consignSaleMethod',
      dataIndex: 'consignSaleMethod',
      key: 'consignSaleMethod',
    },
    {
      title: 'totalPrice',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'consginer',
      dataIndex: 'consginer',
      key: 'consginer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action', // Thêm cột cho button
      key: 'action',
      render: (text: any, record: any) => (
        <Button onClick={() => handleDetail(record.consignSaleId)}>Detail</Button>
      ),
    },
  ];

  const handleDetail = (consignSaleId: string) => {
    navigate(`/ConsignDetail?consignSaleId=${consignSaleId}`); 
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