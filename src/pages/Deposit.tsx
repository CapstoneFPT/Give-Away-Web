import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, message, Card, Col, Row, Descriptions,  Modal,  Typography, Image, Divider } from 'antd';
import { AuctionApi, AuctionListResponse } from '../api';
import moment from 'moment';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import backgroundImageUrl from "../components/Assets/freepik_27798571.jpg";


const Deposit = () => {
  const query = new URLSearchParams(useLocation().search);
  const [userId, setUserId] = useState<string | null>(null); 
  const [data, setData] = useState<AuctionListResponse | null>(null);
  const [fetchedData, setFetchedData] = useState<AuctionListResponse[]>([]);
  const [hasDeposit, setHasDeposit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { auctionId } = useParams<{ auctionId: string }>();
  // console.log('auction',auctionId)
  // console.log('user',userId)

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
        
        const auctionData = fetchedData.find(item => item.auctionId === auctionId) || null;
        setData(auctionData);
        setFetchedData(fetchedData); // Store all fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [auctionId]);

  useEffect(() => {
    const checkUserDeposit = async () => {
      const userIdFromStorage = JSON.parse(localStorage.getItem("userId") || "null");
      setUserId(userIdFromStorage);
      if (auctionId && userIdFromStorage) {
        const depositApi = new AuctionApi();
        const response = await depositApi.apiAuctionsAuctionIdDepositsHasDepositGet(auctionId, userIdFromStorage);
        setHasDeposit(response.data.hasDeposit!); 
      }
    };
    checkUserDeposit();
  }, [auctionId]);

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('de-DE').format(balance);
  };

  const handleDeposit = async (auctionId: string, ) => {
    console.log('auction',auctionId)
    console.log('user',userId)
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
    <div
    
     style={{ width: '100%', margin: '0 auto', paddingTop: '50px', backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: '67%' }}>
      <h1 style={{ textAlign: 'center' }}>Deposit for Auction Product</h1>
      {data ? (
        <Card style={{ backgroundColor: "rgba(255, 255, 255, 0)",}}>
          <Row gutter={16}>
            <Col span={8} >
              <Card>
              <Image
                src={data.imageUrl!}
                alt="Product"
                style={{ width: "300px", height: "auto", alignItems:'center' }}
              />
              </Card>
            </Col>
            <Col span={16}>
              <Card><Descriptions column={2} title="Auction Product Details" bordered>
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
                <Descriptions.Item label="Innitial Price">
                  <strong>{formatBalance(data.initialPrice!)} VND</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Product Code">
                  <strong>{data.itemCode}</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <strong>{data.status}</strong>
                </Descriptions.Item>
               
                <Descriptions.Item label="Action">
                  {!hasDeposit ? (
                    <Button style={{ backgroundColor: 'black', color: 'white' }} type="primary" onClick={() => handleDeposit(data.auctionId!)}>
                      Submit Deposit
                    </Button>
                  ) : (
                    <span style={{color:'brown'}}>Deposit already placed</span>
                  )}
                </Descriptions.Item>
              </Descriptions></Card>
              <Card
            style={{ marginTop: "20px" }}
             headStyle={{ backgroundColor: "black", color: "white" }}
            title="Policy Auction"
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Typography>
                  <Title level={5}>Auction Participation Requirements</Title>
                  <Paragraph>
                    To participate in an auction, a deposit is required before
                    the auction starts. The deposit must be made within the
                    specified timeframe before the auction begins.
                  </Paragraph>
                  <Divider />

                  <Title level={5}>Deposit Forfeiture Policy</Title>
                  <Paragraph>
                    If you place a deposit but do not participate in the
                    auction, the deposit will be forfeited. For unsuccessful
                    bidders, the deposit will be refunded in the form of system
                    points.
                  </Paragraph>
                  <Divider />

                  <Title level={5}>Deposit and Bid Increments</Title>
                  <Paragraph>
                    The deposit fee is based on the value of the item. The bid
                    increments will be calculated as a percentage of the initial
                    value of the item and multiplied by the percentage you have
                    chosen.
                  </Paragraph>
                  <Divider />
                </Typography>
              </Col>
              <Col span={12}>
                <Title level={5}>Payment and Deposit Deduction</Title>
                <Paragraph>
                  If you win the auction, the deposit will be deducted from the
                  total amount you need to pay for the item. Please note that
                  the auction only accepts payment in system points.
                </Paragraph>
                <Divider />

                <Title level={5}>Shipping and Delivery</Title>
                <Paragraph>
                  Once the auctioned item is paid for, the shop will package and
                  deliver the item to the address provided in the order. The
                  customer can inspect the item upon receipt and has 7 days to
                  request a refund if there is any discrepancy.
                </Paragraph>
                <Divider />
              </Col>
            </Row>
            <Title level={4} style={{ textAlign: "center" }}>
              Thank you from Give Away!
            </Title>
          </Card>
            </Col>
          </Row>
           
        </Card>
      ) : (
        <div><h2>No auction data found for the specified auction ID.</h2></div>
       
      )}
    </div>
  );
};

export default Deposit;