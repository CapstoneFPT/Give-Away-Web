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
  message,
  Modal,
  Table,
  Select
} from "antd";
import Footer from "../components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import {
  AuctionApi,
  AuctionLeaderboardResponse,
  AuctionItemDetailResponse,
  BidDetailResponse,
  CreateBidRequest,
} from "../api";
import { useAuctionData, usePlaceBid } from "../hooks/auctionHooks";
import { useSignalRSetup } from "../hooks/useSignalRSetup";
import LeaderboardModal from "../components/Auction/LeaderboardModal";
import { useAuth } from "../components/Auth/Auth";
import { CgLayoutGrid } from "react-icons/cg";

const { Title, Paragraph } = Typography;

const Auction: React.FC = () => {
  const { auctionId } = useParams<{ auctionId: string }>();

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const userId = currentUser?.id || '';
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [bids, setBids] = useState<BidDetailResponse[]>([]);
  const [nextBidAmount, setNextBidAmount] = useState<number | undefined>(
    undefined
  );
  const [deadline, setDeadline] = useState<number>(0);
  const [leaderboardData, setLeaderboardData] = useState<AuctionLeaderboardResponse | null>(null);
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const [stepIncrementPercentage, setStepIncrementPercentage] = useState<number>(0);

  const { data, isLoading, error } = useAuctionData(auctionId!);
  const placeBidMutation = usePlaceBid(auctionId!);

  const generateBidOptions = useCallback(() => {
    const options = [];
    for (let i = 0; i <= 50; i++) {
      options.push(i * 10);
    }
    return options;
  }, []);

  const addBid = useCallback((newBid: BidDetailResponse) => {
    console.log("New bid: ", newBid);
    setBids((prevBids) => {
      if (prevBids.some(bid => bid.id === newBid.id)) return prevBids;
      const updatedBids = [newBid, ...prevBids];
      return updatedBids;
    });

    const latestBid = newBid.amount || data?.product.initialPrice || 0;

    const baseIncrement = data?.auctionDetail.stepIncrement || 0;
    console.log("Base increment: ", baseIncrement);
    const additionalIncrement = baseIncrement * (stepIncrementPercentage / 100);
    console.log("Additional increment: ", additionalIncrement);
    const nextAmount = latestBid + baseIncrement + additionalIncrement;
    console.log("Next amount: ", nextAmount);
    setNextBidAmount(nextAmount);
  }, [data?.auctionDetail.stepIncrement, stepIncrementPercentage, data?.product.initialPrice]);

  const fetchLeaderboard = async (page: number = 1, pageSize: number = 10) => {
    try {
      const auctionApi = new AuctionApi();
      const response = await auctionApi.apiAuctionsIdLeaderboardGet(auctionId!, page, pageSize);
      console.log(response.data);
      setLeaderboardData(response.data);
      setIsLeaderboardVisible(true);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      message.error("Failed to fetch leaderboard");
    }
  };

  const onFinish = () => {
    message.info("Auction has ended");
    fetchLeaderboard();
  };

  useSignalRSetup(auctionId!, addBid, navigate, onFinish);

  useEffect(() => {
    if (data) {
      const { product, latestBid, auctionDetail, serverTime } = data;

      setSelectedImage(product.images![0]!);

      if (latestBid) {
        console.log("Latest bid: ", latestBid);
        addBid(latestBid);
      } else {
        const baseIncrement = auctionDetail.stepIncrement || 0;
        const additionalIncrement = baseIncrement * (stepIncrementPercentage / 100);
        const initialBidAmount = product.initialPrice || 0;
        setNextBidAmount(initialBidAmount + baseIncrement + additionalIncrement);
      }

      const currentTime = new Date(serverTime.currentTime!);
      const startTime = new Date(auctionDetail.startDate!);
      const endTime = new Date(auctionDetail.endDate!);

      if (currentTime < startTime) {
        setDeadline(startTime.getTime());
      } else {
        setDeadline(endTime.getTime());
      }
    }
  }, [data, addBid, stepIncrementPercentage]);

  const handleBid = async () => {
    if (!nextBidAmount) return;
    const bidRequest: CreateBidRequest = {
      memberId: userId,
      amount: nextBidAmount,
    };
    console.log("Step increment: ", stepIncrementPercentage);
    try {
      await placeBidMutation.mutateAsync(bidRequest);
    } catch (error) {
      console.error("Bid Error: ", error);
    }
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("de-DE").format(balance);
  };

  const bidOptions = generateBidOptions();

  return (
    <Card>
      <h1 style={{ textAlign: "center", fontSize: "40px" }}>Auction</h1>
      <Row gutter={[16, 16]} style={{ margin: "10px" }}>
        <Col span={4}>
          <Row gutter={[10, 8]}>
            {data?.product.images?.map((image, index) => (
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
              alt={data?.product.name!}
              className="zoom-image"
              style={{ width: "90%", height: "750px" }}
            />
          </div>
        </Col>
        <Col span={8}>
          <Card title="Product Details">
            <Title level={3}>{data?.product.name}</Title>
            <Row gutter={[16, 16]}>
              <Col span={14}>
                <Paragraph>
                  <strong>Category:</strong> {data?.product.categoryName}
                </Paragraph>
                <Paragraph>
                  <strong>Condition:</strong> {data?.product.condition}
                </Paragraph>
                <Paragraph>
                  <strong>Size:</strong> {data?.product.size}
                </Paragraph>
              </Col>
              <Col span={10}>
                <Paragraph>
                  <strong>Brand:</strong> {data?.product.brand}
                </Paragraph>
                <Paragraph>
                  <strong>Color:</strong> {data?.product.color}
                </Paragraph>
                <Paragraph>
                  <strong>Gender:</strong> {data?.product.gender}
                </Paragraph>
              </Col>
             
              <Paragraph>
                <strong
                  style={{ fontSize: "18px", color: "ThreeDLightShadow" }}
                >
                  Initial Price: {formatBalance(data?.product.initialPrice!)} VND
                </strong>
              </Paragraph>
              
            </Row>
            <Paragraph>
              <strong>Description:</strong> {data?.product.description}
            </Paragraph>
            <Paragraph>
                <strong>Note:</strong> {data?.product.note}
              </Paragraph>
            <Paragraph style={{ color: "#32b94b", fontSize: "20px" }}>
              <strong>Current Bid: {formatBalance(bids[0]?.amount!)} VND </strong>
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
                      <>
                      <span
                        style={{
                          color:
                            bid.memberId === userId ? "#ff5151" : "inherit",
                        }}
                      >
                        {formatBalance(bid.amount!)} VND
                      </span>
                      </>
                    }
                    description={new Date(bid.createdDate!).toLocaleString()}
                  />
                  <span>
                    {bid.phone ? bid.phone : "N/A"}
                  </span>
                </List.Item>
              )}
            />
            <div style={{ marginTop: "10px" }}>
              <p>
                <strong>Select Step Increment Percentage: </strong>
              </p>
              <Select
                style={{ width: '100%', marginBottom: '10px' }}
                value={stepIncrementPercentage}
                onChange={(value) => {
                  setStepIncrementPercentage(value);
                  const baseIncrement = data?.auctionDetail.stepIncrement || 0;
                  const additionalIncrement = baseIncrement * (value / 100);
                  const latestBid = bids[0]?.amount || data?.product.initialPrice || 0;
                  const newNextBidAmount = latestBid + baseIncrement + additionalIncrement;
                  setNextBidAmount(newNextBidAmount);
                }}
              >
                {bidOptions.map((option) => (
                  <Select.Option key={option} value={option}>
                    +{option}%
                  </Select.Option>
                ))}
              </Select>
              <p>
                <strong>Next Bid Amount: {formatBalance(nextBidAmount!)} VND </strong>
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
                loading={placeBidMutation.isPending}
                onClick={handleBid}
              >
                Place Bid
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Footer />
      <LeaderboardModal
        visible={isLeaderboardVisible}
        onClose={() => setIsLeaderboardVisible(false)}
        leaderboardData={leaderboardData}
        onPageChange={(page, pageSize) => fetchLeaderboard(page, pageSize)}
        onRedirect={() => navigate("/")}
      />
    </Card>
  );
};

export default Auction;


