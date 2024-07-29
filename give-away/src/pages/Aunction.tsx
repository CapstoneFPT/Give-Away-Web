import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Typography, List, Select } from "antd";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { AuctionApi, AuctionFashionItem, AuctionItemDetailResponse, AuctionItemImage } from "../api";

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface Bid {
  currentBid: number;
  value: number;
  label: string;
  timestamp: string;
}

const Auction: React.FC = () => {
  const { auctionId } = useParams<{ auctionId: string }>();
  console.log(auctionId)
  const [product, setProduct] = useState<AuctionItemDetailResponse | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [bids, setBids] = useState<Bid[]>([]);
  const [selectedBid, setSelectedBid] = useState<number | undefined>(undefined);

  // const highestBid = bids.length > 0 ? Math.max(...bids.map(bid => bid.value)) : (product?.currentBid || 0);

  useEffect(() => {
    const auctionDetailApi = new AuctionApi();
    const fetchData = async () => {
      try {
        const response = await auctionDetailApi.apiAuctionsIdGet(auctionId!);
        console.log(response);
        const fetchedProduct = response.data.auctionItem;

        const productData: AuctionItemDetailResponse = { 
          initialPrice: fetchedProduct?.initialPrice,
          images: fetchedProduct?.images,
          category: fetchedProduct?.category,
          condition: fetchedProduct?.condition,
          name: fetchedProduct?.name,
          shop: {
            address : fetchedProduct?.shop?.address
          }
          

        }
        setProduct(productData);
        setSelectedImage(fetchedProduct!.images![0]!.imageUrl!);
      } catch (error) {
        console.error("Error fetching auction details:", error);
      }
    };
    fetchData();
  }, [auctionId]);

  const generateBidOptions = (highestBid: number) => {
    const options = [];
    for (let i = 1; i <= 3; i++) {
      options.push({ value: highestBid + i * 50, label: `VND ${highestBid + i * 50}`, timestamp: "" });
    }
    return options;
  };

  // const availableBidOptions = generateBidOptions(highestBid);

  // const handlePlaceBid = () => {
  //   if (selectedBid !== undefined && selectedBid > highestBid) {
  //     const newBidObject: Bid = {
  //       value: selectedBid,
  //       label: `${selectedBid} VND`,
  //       timestamp: new Date().toLocaleString()
  //     };
  //     setBids([...bids, newBidObject]);
  //     setSelectedBid(undefined);
  //   }
  // };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Card><h1 style={{ textAlign: 'center', fontSize: '40px' }}>Auction</h1>
        <Row gutter={[16, 16]} style={{ margin: '10px' }}>
          <Col span={4}>
            <Row gutter={[10, 8]}>
              {product.images?.map((image, index) => (
                <Col span={24} key={index}>
                  <img
                    src={image.imageUrl!}
                    alt={`Thumbnail ${index}`}
                    style={{ width: "90%", height: '230px', cursor: "pointer", border: selectedImage === image.imageUrl ? "2px solid #1890ff" : "none" }}
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
                <Col span={12}>
                  {/* <Paragraph>
                    <strong>Brand:</strong> {product.brand}
                  </Paragraph> */}
                </Col>
                <Paragraph>
                  <strong>Description:</strong> {product.note}
                </Paragraph>
                
              </Row>
              <Paragraph style={{ color: '#32b94b', fontSize: '20px' }}><strong>Current Bid:</strong>   VND</Paragraph>
              {/* {highestBid} */}
            </Card>
            <Card title="Bids History" style={{ marginTop: '10px' }}>
              <List
                style={{ maxHeight: '200px', overflowY: 'auto' }}
                dataSource={bids}
                renderItem={bid => (
                  <List.Item>
                    <List.Item.Meta
                      title={bid.label}
                      description={bid.timestamp}
                    />
                  </List.Item>
                )}
              />
              <Select
                value={selectedBid}
                onChange={(value: number) => setSelectedBid(value)}
                placeholder="Select bid amount"
                style={{ width: '100%', marginTop: '10px' }}
              >
                {/* {availableBidOptions.map((bid) => (
                  <Option key={bid.value} value={bid.value}>{bid.label}</Option>
                ))} */}
              </Select>
              <Button type="primary"  style={{ marginTop: "10px", backgroundColor: 'black', width: '100%' }}>
              {/* onClick={handlePlaceBid} */}
                Place Bid
              </Button>
            </Card>
          </Col>
          <Card>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia vel fuga iusto? Modi eius ratione delectus? Ullam natus debitis pariatur fugiat vitae error voluptas explicabo ex! Ipsum, magni. Quidem, numquam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia vel fuga iusto? Modi eius ratione delectus? Ullam natus debitis pariatur fugiat vitae error voluptas explicabo ex! Ipsum, magni. Quidem, numquam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia vel fuga iusto? Modi eius ratione delectus? Ullam natus debitis pariatur fugiat vitae error voluptas explicabo ex! Ipsum, magni. Quidem, numquam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia vel fuga iusto? Modi eius ratione delectus? Ullam natus debitis pariatur fugiat vitae error voluptas explicabo ex! Ipsum, magni. Quidem, numquam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia vel fuga iusto? Modi eius ratione delectus? Ullam natus debitis pariatur fugiat vitae error voluptas explicabo ex! Ipsum, magni. Quidem, numquam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia vel fuga iusto? Modi eius ratione delectus? Ullam natus debitis pariatur fugiat vitae error voluptas explicabo ex! Ipsum, magni. Quidem, numquam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia vel fuga iusto? Modi eius ratione delectus? Ullam natus debitis pariatur fugiat vitae error voluptas explicabo ex! Ipsum, magni. Quidem, numquam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia vel fuga iusto? Modi eius ratione delectus? Ullam natus debitis pariatur fugiat vitae error voluptas explicabo ex! Ipsum, magni. Quidem, numquam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia vel fuga iusto? Modi eius ratione delectus? Ullam natus debitis pariatur fugiat vitae error voluptas explicabo ex! Ipsum, magni. Quidem, numquam.
          </Card>
        </Row>
      </Card>
      <Footer />
    </Card>
  );
};

export default Auction;
