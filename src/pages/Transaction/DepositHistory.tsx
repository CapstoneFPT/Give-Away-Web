import React, {  useEffect, useState } from "react";
import {  Card, Row, Col, Table, Button } from "antd";
import NavProfile from "../../components/NavProfile/NavProfile";
import { AccountApi } from "../../api";

const DepositHistory = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [data, setData] = useState<any[]>([]); // Thêm trạng thái để lưu dữ liệu

  useEffect(() => {
    const fetchDepositHistory = async () => {
      const DepositListApi = new AccountApi();
      try {
        const response = await DepositListApi.apiAccountsAccountIdTransactionsGet(
          userId,
          null!,
          null!,
         ["AuctionDeposit"]
        );
        setData(response.data.items!); // Lưu dữ liệu vào trạng thái
      } catch (error) {
        console.error("Error fetching deposit history:", error);
      }
    };

    fetchDepositHistory();
  }, [userId]);
    
      const columns = [
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
      
        {
          title: 'Created Date',
          dataIndex: 'createdDate',
          key: 'createdDate',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
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
                  Deposit History
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

export default DepositHistory