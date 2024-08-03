import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, message, Table, Space } from 'antd';
import axios from 'axios';
import { AuctionApi, AuctionListResponse } from '../api';
import moment from 'moment';
import Column from 'antd/es/table/Column';

const Deposit = () => {
  const query = new URLSearchParams(useLocation().search);
  const auctionId = query.get('auctionId');
  const [userId, setUserId] = useState<string | null>(null); 
  const [data, setData] = useState<AuctionListResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    setUserId(userId);
    console.log(userId);
  }, []);

  useEffect(() => {
    const auctionApi = new AuctionApi();
    
    const fetchData = async () => {
      try {
        const response = await auctionApi.apiAuctionsGet();
        const fetchedData: AuctionListResponse[] = response.data.items
          ? response.data.items.map((item: any) => ({
              ...item,
              startDate: moment(item.startDate).format("YYYY-MM-DD HH:mm"),
              endDate: moment(item.endDate).format("YYYY-MM-DD HH:mm"),
            }))
          : ([] as AuctionListResponse[]);
        console.log(fetchedData);
        const auctionData = fetchedData.find(item => item.auctionId === auctionId) || null;
        setData(auctionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [auctionId]);

  const handleDeposit = async (auctionId: string) => {
    try {
      const depositApi = new AuctionApi();
      const deposit = await depositApi.apiAuctionsAuctionIdDepositsPlaceDepositPost(auctionId, {
        memberId: userId!
      });

      if (deposit.status) {
        message.success('Deposit successful!');
        // navigate(`/auction/${auctionId}`);
      }
    } catch (error) {
      message.error('Deposit failed. Please try again.',);
      console.error('Error making deposit:', error);
    }
  };

  return (
    <div style={{ width: '100%', margin: '0 auto', paddingTop: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Deposit for Auction Item</h1>
      {data ? (
        <Table 
          style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }} 
          pagination={false} 
          dataSource={[data]} 
          rowKey="auctionId"
        >
          <Column
            title="Product"
            dataIndex="imageUrl"
            key="imageUrl"
            render={(_, record: { imageUrl: string }) => (
              <Space size="middle">
                <img
                  src={record.imageUrl}
                  alt="Product"
                  style={{ width: "150px", height: "150px" }}
                />
              </Space>
            )}
          />
          <Column title="Auction ID" dataIndex="auctionId" key="auctionId" />
          <Column title="Title" dataIndex="title" key="title" />
          <Column title="Start Date" dataIndex="startDate" key="startDate" />
          <Column title="End Date" dataIndex="endDate" key="endDate" />
          <Column title="Deposit Fee" dataIndex="depositFee" key="depositFee" />
          <Column title="Shop ID" dataIndex="shopId" key="shopId" />
          <Column title="Auction Item ID" dataIndex="auctionItemId" key="auctionItemId" />
          <Column title="Status" dataIndex="status" key="status" />
          <Column title="Step Increment" dataIndex="stepIncrement" key="stepIncrement" />
          <Column
            title="Action"
            key="action"
            render={(_, record: AuctionListResponse) => (
              <Button type="primary" onClick={() => handleDeposit(record.auctionId!)}>
                Submit Deposit
              </Button>
            )}
          />
        </Table>
      ) : (
        <p>No auction data found for the specified auction ID.</p>
      )}
    </div>
  );
};

export default Deposit;
