import React, { useCallback, useEffect, useState } from "react";
import { Card, Row, Col, Button, Typography, List } from "antd";
import Footer from "../components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import {
  AuctionApi,
  AuctionItemDetailResponse,
  CreateBidRequest,
} from "../api";
import Countdown from "react-countdown";
import signalRService from "../pages/service/signalrService";
import "../pages/Auction.css";
import signalrService from "../pages/service/signalrService";

const { Title, Paragraph } = Typography;

const Auction: React.FC = () => {
  const { auctionId } = useParams<{ auctionId: string }>();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [product, setProduct] = useState<AuctionItemDetailResponse | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [bids, setBids] = useState<CreateBidRequest[]>([]);
  const [nextBidAmount, setNextBidAmount] = useState<number | undefined>(
    undefined
  );
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [timerKey, setTimerKey] = useState<number>(0);
  const [auctionStarted, setAuctionStarted] = useState<boolean>(false);

  const addBid = useCallback((newBid: CreateBidRequest) => {
    setBids((prevBids) => [newBid, ...prevBids]);
    setNextBidAmount(newBid.amount);
  }, []);

  const fetchData = async () => {
    try {
      const auctionDetailApi = new AuctionApi();
      const response = await auctionDetailApi.apiAuctionsIdGet(auctionId!);
      console.log(response);
      const fetchedProduct = response.data.auctionItem;
      console.log(fetchedProduct);

      const productData: AuctionItemDetailResponse = {
        initialPrice: fetchedProduct?.sellingPrice,
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
      console.log(initialBidAmount);
      setNextBidAmount(initialBidAmount);

      const serverTimeApi = new AuctionApi();
      const responseServerTime =
        await serverTimeApi.apiAuctionsCurrentTimeGet();
      const currentTime = new Date(responseServerTime.data!);
      const startTime = new Date(response.data.startDate!);
      const endTime = new Date(response.data.endDate!);

      if (currentTime < startTime) {
        setRemainingTime(
          Math.floor((startTime.getTime() - currentTime.getTime()) / 1000)
        );
        setAuctionStarted(false);
      } else {
        setRemainingTime(
          Math.floor((endTime.getTime() - currentTime.getTime()) / 1000)
        );
        setAuctionStarted(true);
      }

      setTimerKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching auction details:", error);
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleBid = async () => {
    if (!nextBidAmount) return;
    const bidRequest: CreateBidRequest = {
      memberId: userId,
      amount: nextBidAmount,
    };
    console.log(auctionId);
    console.log(bidRequest);
    try {
      await signalrService.placeBid(auctionId!, bidRequest);
    } catch (error) {
      console.error("Bid Error: ", error);
    }
  };

  const renderTime = ({ total }: { total: number }) => {
    if (total <= 0) return <div>Auction Ended</div>;
    const hours = Math.floor(total / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);
    return (
      <div>
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
    );
  };
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("de-DE").format(balance);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <h1 style={{ textAlign: "center", fontSize: "40px" }}>Auction</h1>
      <Row gutter={[16, 16]} style={{ margin: "10px" }}>
        <Col span={4}>
          <Row gutter={[10, 8]}>
            {product.images?.map((image, index) => (
              <Col span={24} key={index}>
                <img
                  src={image.imageUrl!}
                  alt={`Thumbnail ${index}`}
                  style={{
                    width: "90%",
                    height: "230px",
                    cursor: "pointer",
                    border:
                      selectedImage === image.imageUrl
                        ? "2px solid #1890ff"
                        : "none",
                  }}
                  onClick={() => setSelectedImage(image.imageUrl!)}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={12}>
          <div className="zoom-container">
            <img
              src={selectedImage}
              alt={product.name!}
              className="zoom-image"
              style={{ width: "90%", height: "750px" }}
            />
          </div>
        </Col>
        <Col span={8}>
          <Card title="Product Details">
            <Title level={3}>{product.name}</Title>
            <Row gutter={[16, 16]}>
              <Col span={14}>
                <Paragraph>
                  <strong>Category:</strong> {product.category?.categoryName}
                </Paragraph>
                <Paragraph>
                  <strong>Condition:</strong> {product.condition}%
                </Paragraph>
                <Paragraph>
                  <strong>Size:</strong> {product.initialPrice}
                </Paragraph>
              </Col>
              <Col span={10}>
                <Paragraph>
                  <strong>Brand:</strong> {product.initialPrice}
                </Paragraph>
                <Paragraph>
                  <strong>Color:</strong> {product.initialPrice}
                </Paragraph>
                <Paragraph>
                  <strong>Gender:</strong> {product.initialPrice}
                </Paragraph>
              </Col>
              <Paragraph>
                <strong
                  style={{ fontSize: "18px", color: "ThreeDLightShadow" }}
                >
                  Initial Price: {formatBalance(product.initialPrice!)} VND
                </strong>
              </Paragraph>
            </Row>
            <Paragraph>
              <strong>Description:</strong> {product.note}
            </Paragraph>
            <Paragraph style={{ color: "#32b94b", fontSize: "20px" }}>
              <strong>Current Bid: {nextBidAmount} VND </strong>
            </Paragraph>
          </Card>
          <Card title="Bids History" style={{ marginTop: "10px" }}>
            <List
              style={{ maxHeight: "200px", overflowY: "auto" }}
              dataSource={bids}
              renderItem={(bid) => (
                <List.Item>
                  <List.Item.Meta
                    title={` ${bid.amount} VND`}
                    description={new Date().toLocaleString()}
                  />
                </List.Item>
              )}
            />
            <div style={{ marginTop: "10px" }}>
              <p>
                <strong>Next Bid Amount: {nextBidAmount} VND </strong>{" "}
              </p>
              <Button
                type="primary"
                style={{
                  marginTop: "10px",
                  backgroundColor: "black",
                  width: "100%",
                }}
                onClick={handleBid}
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
