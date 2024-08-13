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
} from "antd";
import Footer from "../components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import {
  AuctionApi,
  AuctionItemDetailResponse,
  BidDetailResponse,
  CreateBidRequest,
} from "../api";
import signalRService from "../pages/service/signalrService";
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
  const [bids, setBids] = useState<BidDetailResponse[]>([]);
  const [nextBidAmount, setNextBidAmount] = useState<number | undefined>(
    undefined
  );
  const [deadline, setDeadline] = useState<number>(0);

  const addBid = useCallback((newBid: BidDetailResponse) => {
    setBids((prevBids) => [newBid, ...prevBids]);
    setNextBidAmount(newBid.nextAmount);
  }, []);
  const onFinish = () => {
    console.log("Auction ended!");
    alert("Auction has ended");
    navigate("/");
  };
  const fetchData = async () => {
    try {
      const auctionDetailApi = new AuctionApi();
      const auctionDetailResponse = await auctionDetailApi.apiAuctionsIdGet(
        auctionId!
      );
      console.log(auctionDetailResponse);
      const fetchedProduct = auctionDetailResponse.data.auctionItem;
      console.log(fetchedProduct);

      const latestBidResponse =
        await auctionDetailApi.apiAuctionsIdBidsLatestGet(auctionId!);
      console.log(latestBidResponse.data);

      const productData: AuctionItemDetailResponse = {
        initialPrice: fetchedProduct?.initialPrice,
        images: fetchedProduct?.images,
        category: fetchedProduct?.category,
        condition: fetchedProduct?.condition,
        brand: fetchedProduct?.brand,
        color: fetchedProduct?.color,
        description: fetchedProduct?.description,
        fashionItemType: fetchedProduct?.fashionItemType,
        gender: fetchedProduct?.gender,
        itemId: fetchedProduct?.itemId,
        note: fetchedProduct?.note,
        sellingPrice: fetchedProduct?.sellingPrice,
        size: fetchedProduct?.size,
        status: fetchedProduct?.status,
        name: fetchedProduct?.name,
        shop: {
          address: fetchedProduct?.shop?.address,
        },
      };

      setProduct(productData);
      setSelectedImage(fetchedProduct!.images![0]!.imageUrl!);

      const initialBidAmount = fetchedProduct?.initialPrice || 0;
      console.log(initialBidAmount);
      if (latestBidResponse.data) {
        addBid(latestBidResponse.data);
      } else {
        setNextBidAmount(initialBidAmount);
      }

      const serverTimeApi = new AuctionApi();
      const responseServerTime =
        await serverTimeApi.apiAuctionsCurrentTimeGet();
      const currentTime = new Date(responseServerTime.data!);
      const startTime = new Date(auctionDetailResponse.data.startDate!);
      const endTime = new Date(auctionDetailResponse.data.endDate!);

      if (currentTime < startTime) {
        setDeadline(startTime.getTime());
      } else {
        setDeadline(endTime.getTime());
      }

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
                  <strong>Category:</strong> {product.category?.categoryName}
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
