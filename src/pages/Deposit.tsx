import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, message, Card, Col, Row, Descriptions, Image, Modal } from 'antd'; // Thêm Modal vào import
import { AuctionApi, AuctionListResponse } from '../api';
import moment from 'moment';

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
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('de-DE').format(balance);
  };

  const handleDeposit = async (auctionId: string) => {
    Modal.confirm({
      title: 'Confirm Deposit',
      content: 'Are you sure you want to deposit for this auction?',
      okText: 'Confirm',
      okType: 'primary',
      cancelText: 'Cancel',
      okButtonProps: {
        style: { backgroundColor: 'black', color: 'white' },
      },
      onOk: async () => {
        try {
          const depositApi = new AuctionApi();
          const deposit = await depositApi.apiAuctionsAuctionIdDepositsPlaceDepositPost(auctionId, {
            memberId: userId!
          });

          if (deposit.status) {
            message.success('Deposit successful!');
             navigate(`/aunctionList`);
          }
        } catch (error) {
          message.error('Deposit failed. Please try again.');
          console.error('Error making deposit:', error);
        }
      },
    });
  };

  return (
    <div style={{ width: '100%', margin: '0 auto', paddingTop: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Deposit for Auction Product</h1>
      {data ? (
        <Card>
          <Row gutter={16}>
            <Col span={4}>
              <Image
              
                src={data.imageUrl!}
                alt="Product"
                style={{  width: "200px", height: "auto" }}
              />
            </Col>
            <Col  span={20}>
              <Descriptions title="Auction Product Details" bordered>
                <Descriptions.Item label="Title">
                  <strong>{data.title}</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Start Date">
                  <strong>{data.startDate}</strong>
                </Descriptions.Item>
                <Descriptions.Item label="End Date">
                  <strong>{data.endDate}</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Deposit Fee">
                  <strong>{formatBalance(data.depositFee!)} VND</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <strong>{data.status}</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Action">
                  <Button style={{backgroundColor:'black', color:'white'}} type="primary" onClick={() => handleDeposit(data.auctionId!)}>
                    Submit Deposit
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
      ) : (
        <p>No auction data found for the specified auction ID.</p>
      )}
    </div>
  );
};

export default Deposit;