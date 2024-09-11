import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  List,
  Image,
  Statistic,
  message
} from "antd";
import Footer from "../components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import {
  AuctionApi,
  AuctionItemDetailResponse,
  BidDetailResponse,
  CreateBidRequest,
} from "../api";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuctionData, usePlaceBid } from "../hooks/auctionHooks";
import { useSignalRSetup } from "../hooks/useSignalRSetup";

const { Title, Paragraph } = Typography;

const Auction: React.FC = () => {
  const { auctionId } = useParams<{ auctionId: string }>();
  const { auctionItemId } = useParams<{ auctionItemId: string }>();

  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [bids, setBids] = useState<BidDetailResponse[]>([]);
  const [nextBidAmount, setNextBidAmount] = useState<number | undefined>(
    undefined
  );
  const [deadline, setDeadline] = useState<number>(0);

  const { data, isLoading, error } = useAuctionData(auctionId!, auctionItemId!);
  const placeBidMutation = usePlaceBid(auctionId!);

  const addBid = useCallback((newBid: BidDetailResponse) => {
    setBids((prevBids) => {
      const updatedBids = [newBid, ...prevBids];
      const latestBid = updatedBids[0];
      setNextBidAmount(latestBid.amount || 0 + (data?.auctionDetail.stepIncrement || 0)); 
      return updatedBids;
    });
  }, []);

  useEffect(() => {
    if (data) {
      const { product, latestBid, auctionDetail, serverTime } = data;
      
      setSelectedImage(product.images![0]!);
      
      if (latestBid) {
        addBid(latestBid);
      } else {
        setNextBidAmount(product.initialPrice || 0);
      }

      const currentTime = new Date(serverTime!);
      const startTime = new Date(auctionDetail.startDate!);
      const endTime = new Date(auctionDetail.endDate!);

      if (currentTime < startTime) {
        setDeadline(startTime.getTime());
      } else {
        setDeadline(endTime.getTime());
      }
    }
  }, [data, addBid]);

  const handleBid = async () => {
    if (!nextBidAmount) return;
    const bidRequest: CreateBidRequest = {
      memberId: userId,
      amount: nextBidAmount,
    };
    try {
      await placeBidMutation.mutateAsync(bidRequest);
    } catch (error) {
      console.error("Bid Error: ", error);
    }
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("de-DE").format(balance);
  };

  const onFinish = () => {
    message.info("Auction has ended");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const { product } = data;

  useSignalRSetup(auctionId!, addBid, navigate);

  return (
    <Card>
      <h1 style={{ textAlign: "center", fontSize: "40px" }}>Auction</h1>
      <Row gutter={[16, 16]} style={{ margin: "10px" }}>
        <Col span={4}>
          <Row gutter={[10, 8]}>
            {product.images?.map((image, index) => (
              <Col span={24} key={index}>
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  style={{
                    width: "90%",
                    height: "230px",
                    cursor: "pointer",
                    border:
                      selectedImage === image
                        ? "2px solid #1890ff"
                        : "none",
                  }}
                  onClick={() => setSelectedImage(image)}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={12}>
          <div className="zoom-container">
            <Image
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
                  <strong>Category:</strong> {product.categoryName}
                </Paragraph>
                <Paragraph>
                  <strong>Condition:</strong> {product.condition}%
                </Paragraph>
                <Paragraph>
                  <strong>Size:</strong> {product.size}
                </Paragraph>
              </Col>
              <Col span={10}>
                <Paragraph>
                  <strong>Brand:</strong> {product.brand}
                </Paragraph>
                <Paragraph>
                  <strong>Color:</strong> {product.color}
                </Paragraph>
                <Paragraph>
                  <strong>Gender:</strong> {product.gender}
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
              <strong>Description:</strong> {product.description}
            </Paragraph>
            <Paragraph style={{ color: "#32b94b", fontSize: "20px" }}>
              <strong>Current Bid: {nextBidAmount} VND </strong>
            </Paragraph>
            <Statistic.Countdown
              title="Auction Ends In"
              value={deadline}
              onFinish={onFinish}
              format="D [days] HH:mm:ss"
            />
          </Card>
          <Card title="Bids History" style={{ marginTop: "10px" }}>
            <List
              style={{ maxHeight: "200px", overflowY: "auto" }}
              dataSource={bids}
              renderItem={(bid) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <span
                        style={{
                          color:
                            bid.memberId === userId ? "#ff5151" : "inherit",
                        }}
                      >
                        {bid.amount} VND
                      </span>
                    }
                    description={new Date(bid.createdDate!).toLocaleString()}
                  />
                </List.Item>
              )}
            />
            <div style={{ marginTop: "10px" }}>
              <p>
                <strong>Next Bid Amount: {nextBidAmount} VND </strong>{" "}
              </p>
              <Button
                disabled={bids[0]?.memberId === userId}
                type="primary"
                style={{
                  marginTop: "10px",
                  backgroundColor:
                    bids[0]?.memberId === userId ? "gray" : "#000000",
                  width: "100%",
                }}
                onClick={handleBid}
              >
                Place Bid
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Card>
  );
};

export default Auction;


