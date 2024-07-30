import React, { useCallback, useEffect, useState } from "react";
import { Card, Row, Col, Button, Typography, List } from "antd";
import Footer from "../components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { AuctionApi, AuctionItemDetailResponse, CreateBidRequest } from "../api";
import Countdown from 'react-countdown';
import signalRService from "../pages/service/signalrService";

const { Title, Paragraph } = Typography;

const Auction: React.FC = () => {
  const { auctionId } = useParams<{ auctionId: string }>();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId") || "null");

  const [product, setProduct] = useState<AuctionItemDetailResponse | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [bids, setBids] = useState<CreateBidRequest[]>([]);
  const [selectedBid, setSelectedBid] = useState<number | undefined>(undefined);
  const [nextBidAmount, setNextBidAmount] = useState<number | undefined>(undefined);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [timerKey, setTimerKey] = useState<number>(0);
  const [auctionStarted, setAuctionStarted] = useState<boolean>(false);

  const addBid = useCallback((newBid: CreateBidRequest) => {
    setBids((prevBids) => [newBid, ...prevBids]);
    setNextBidAmount(newBid.amount);
  }, []);

  const formatUTCToLocalTime = (utcTime: string): Date => {
    const localTime = new Date(utcTime);
    return localTime;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auctionDetailApi = new AuctionApi();
        const response = await auctionDetailApi.apiAuctionsIdGet(auctionId!);
        const fetchedProduct = response.data.auctionItem;

        const productData: AuctionItemDetailResponse = {
          initialPrice: fetchedProduct?.initialPrice,
          images: fetchedProduct?.images,
          category: fetchedProduct?.category,
          condition: fetchedProduct?.condition,
          name: fetchedProduct?.name,
          shop: {
            address: fetchedProduct?.shop?.address,
          },
        };

        setProduct(productData);
        setSelectedImage(fetchedProduct!.images![0]!.imageUrl!);

        const initialBidAmount = fetchedProduct?.initialPrice || 0;
        setNextBidAmount(initialBidAmount);

        const serverTimeApi = new AuctionApi();
        const responseServerTime = await serverTimeApi.apiAuctionsCurrentTimeGet();
        const currentTimeUTC = responseServerTime.data;
        const startTimeUTC = response.data.startDate;
        const endTimeUTC = response.data.endDate;

        const currentTime = formatUTCToLocalTime(currentTimeUTC!)
        const startTime = formatUTCToLocalTime(startTimeUTC!)
        const endTime = formatUTCToLocalTime(endTimeUTC!)
        console.log(currentTime)
        if (currentTime < startTime) {
          setRemainingTime(Math.floor((startTime.getMilliseconds() - currentTime.getMilliseconds()) / 1000));
          setAuctionStarted(false);
        } else {
          setRemainingTime(Math.floor((endTime.getMilliseconds() - currentTime.getMilliseconds()) / 1000));
          setAuctionStarted(true);
        }

        setTimerKey((prev) => prev + 1);
      } catch (error) {
        console.error("Error fetching auction details:", error);
      }
    };

    fetchData();
  }, [auctionId]);

  useEffect(() => {
    const setupSignalR = async () => {
      try {
        await signalRService.startConnection();
        signalRService.joinAuctionGroup(auctionId!);
        signalRService.onReceiveBidUpdate(addBid);
        signalRService.onAuctionEnded((id: string) => {
          if (id === auctionId) {
            alert("Auction has ended");
            navigate("/");
          }
        });
      } catch (error) {
        console.error("SignalR Error: ", error);
      }
    };

    setupSignalR();

    return () => {
      signalRService.leaveAuctionGroup(auctionId!);
    };
  }, [auctionId, addBid, navigate]);

  const handlePlaceBid = async () => {
    if (selectedBid !== undefined && selectedBid >= (nextBidAmount || 0)) {
      const newBid: CreateBidRequest = {
        memberId: userId,
        amount: selectedBid,
      };

      try {
        const auctionDetailApi = new AuctionApi();
        await auctionDetailApi.apiAuctionsIdBidsPlaceBidPost(auctionId!, newBid);
        setSelectedBid(undefined);
      } catch (error) {
        console.error("Error placing bid:", error);
      }
    }
  };

  const renderTime = ({ total }: { total: number }) => {
    if (total <= 0) return <div>Auction Ended</div>;
    const hours = Math.floor(total / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);
    return (
      <div>
        {hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </div>
    );
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <h1 style={{ textAlign: 'center', fontSize: '40px' }}>Auction</h1>
      <Row gutter={[16, 16]} style={{ margin: '10px' }}>
        <Col span={4}>
          <Row gutter={[10, 8]}>
            {product.images?.map((image, index) => (
              <Col span={24} key={index}>
                <img
                  src={image.imageUrl!}
                  alt={`Thumbnail ${index}`}
                  style={{
                    width: "90%",
                    height: '230px',
                    cursor: "pointer",
                    border: selectedImage === image.imageUrl ? "2px solid #1890ff" : "none",
                  }}
                  onClick={() => setSelectedImage(image.imageUrl!)}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={12}>
          <img src={selectedImage} alt={product.name!} style={{ width: "90%", height: '750px' }} />
        </Col>
        <Col span={8}>
          <Card title="Product Details">
            <Title level={3}>{product.name}</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Paragraph>
                  <strong>Category:</strong> {product.category?.categoryName}
                </Paragraph>
              </Col>
              <Col span={12}></Col>
              <Paragraph>
                <strong>Description:</strong> {product.note}
              </Paragraph>
            </Row>
            <Paragraph style={{ color: '#32b94b', fontSize: '20px' }}>
              <strong>Current Bid:</strong> VND {nextBidAmount}
            </Paragraph>
          </Card>
          <Card title="Bids History" style={{ marginTop: '10px' }}>
            <List
              style={{ maxHeight: '200px', overflowY: 'auto' }}
              dataSource={bids}
              renderItem={bid => (
                <List.Item>
                  <List.Item.Meta
                    title={` ${bid.amount} VND`}
                    description={new Date().toLocaleString()}
                  />
                </List.Item>
              )}
            />
            <div style={{ marginTop: '10px' }}>
              <p><strong>Next Bid Amount:</strong>  {nextBidAmount} VND</p>
              <Button
                type="primary"
                style={{ marginTop: '10px', backgroundColor: 'black', width: '100%' }}
                onClick={handlePlaceBid}
              >
                Place Bid
              </Button>
            </div>
          </Card>
          <div className="mb-4">
            <Countdown
              key={timerKey}
              date={Date.now() + remainingTime * 1000}
              renderer={renderTime}
            />
          </div>
        </Col>
      </Row>
      <Footer />
    </Card>
  );
};

export default Auction;
