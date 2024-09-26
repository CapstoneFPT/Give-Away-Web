import React, { useEffect, useState } from "react";
import { Button, Card, Space, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuctionApi, AuctionListResponse } from "../api";
import backgroundImageUrl from "../components/Assets/adobestock_573340270.jpg";
import { useAuth } from "../components/Auth/Auth";

const { Title, Text } = Typography;

const AuctionList = () => {
  const [data, setData] = useState<AuctionListResponse[]>([]);
  const { currentUser } = useAuth();
  const userId = currentUser?.id || '';

  useEffect(() => {
    const auctionApi = new AuctionApi();

    const fetchData = async () => {
      try {
        const response = await auctionApi.apiAuctionsGet(null!, false, [
          "Approved",
          "OnGoing"
        ]);
        const fetchedData: AuctionListResponse[] = response.data.items
          ? response.data.items.map((item: any) => ({
            ...item,
            startDate: moment(item.startDate).format("YYYY-MM-DD HH:mm"),
            endDate: moment(item.endDate).format("YYYY-MM-DD HH:mm")
          }))
          : ([] as AuctionListResponse[]);
        setData(
          fetchedData.sort((a: any, b: any) =>
            moment(a.auctionTime).diff(moment(b.auctionTime))
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAuctionButtonClick = async (
    auctionId: string,
    auctionItemId: string
  ) => {
    try {
      const depositApi = new AuctionApi();
      const depositStatus = await depositApi.apiAuctionsAuctionIdDepositsHasDepositGet(
        auctionId,
        userId!
      );

      window.location.href = `/auction/${auctionId}?item=${auctionItemId}`;




    } catch (error) {
      console.error("Error checking deposit status:", error);
    }
  };
  const handleDepositButtonClick = async (
    auctionId: string,
    auctionItemId: string
  ) => {
    try {
      const depositApi = new AuctionApi();
      const depositStatus = await depositApi.apiAuctionsAuctionIdDepositsHasDepositGet(
        auctionId,
        userId!
      );
      // Sửa đổi URL để sử dụng "&" thay vì "?" cho tham số truy vấn
      window.location.href = `/deposit/${auctionId}`;

    } catch (error) {
      console.error("Error checking deposit status:", error);
    }
  };
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('de-DE').format(balance);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
      }}
    >
      <Title level={2} style={{ textAlign: "center", margin: "30px 0", color: "CaptionText" }}>
        Auction List
      </Title>
      <Row gutter={[16, 16]}>
        {data.map((auction) => (
          <Col xs={24} sm={12} md={8} lg={6} key={auction.auctionId}>
            <Card
              cover={
                <img
                  alt="Product"
                  src={auction.imageUrl!}
                  style={{ height: "300px", width: '100%', objectFit: "cover", textAlign: 'center' }}
                />
              }
              style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
            >
              <Title level={4}>{auction.title}</Title>
              <Text strong>Start: </Text><Text>{auction.startDate}</Text><br />
              <Text strong>End: </Text><Text>{auction.endDate}</Text><br />
              <Text strong>Deposit Fee: </Text><Text>{formatBalance(auction.depositFee!)}VND </Text><br />
              <Text strong>Status: </Text><Text>{auction.status == 'Approved' ? 'Upcoming' : auction.status == 'OnGoing' ? 'On Going' : 'Ended'}</Text><br />
              <Space style={{ marginTop: "10px" }}>
                <Link to={`/detailProductAuction/${auction.auctionItemId}`}>
                  <Button style={{ backgroundColor: 'black', color: 'white' }} type="primary">Detail</Button>
                </Link>
                <Button
                  style={{ backgroundColor: 'black', color: 'white' }}
                  type="default"
                  onClick={() => handleAuctionButtonClick(auction.auctionId!, auction.auctionItemId!)}
                  disabled={auction.status !== "OnGoing"}
                >
                  Auction
                </Button>
                <Button
                  style={{ backgroundColor: 'black', color: 'white' }}
                  type="default"
                  onClick={() => handleDepositButtonClick(auction.auctionId!, auction.auctionItemId!)}
                  disabled={auction.status === "OnGoing"}
                >
                  Deposit
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AuctionList;
