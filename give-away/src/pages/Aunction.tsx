import React, { useState } from "react";
import { Card, Row, Col, Button, Typography, List, Select } from "antd";
import  Footer  from "../components/Footer/Footer";
import { useParams } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface Product {
  id: number;
  name: string;
  description: string;
  currentBid: number;
  images: string[];
}

interface Bid {
  value: number;
  label: string;
  timestamp: string;
}

const product: Product = {
  id: 1,
  name: "Product Name",
  description: " This is the description of Product 1. It is a very interesting item that many people would like to have.",
  currentBid: 100,
  images: [
    "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fe3%2Fa3%2Fe3a34886763ec21da77ead5a9d1eeb9df4a2ed96.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bkids_olderboys_clothing_tshirtsshirts_shirts_linen%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
    "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fd1%2F07%2Fd10730d0351139ba61c7c02c34f8cdbceea245fe.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVEDETAIL%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
    "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa9%2F4c%2Fa94cb6af4e37b45a9e618c70bba6c017773d9e01.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_shirt_dressed_slimfit%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]"
  ]
};

const Auction: React.FC = () => {
  const { auctionID } = useParams();
  console.log(auctionID);
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [selectedBid, setSelectedBid] = useState<number | undefined>(undefined);

  const initialBid = product.currentBid;
  const highestBid = bids.length > 0 ? Math.max(...bids.map(bid => bid.value)) : initialBid;

  const generateBidOptions = (highestBid: number) => {
    const options = [];
    for (let i = 1; i <= 3; i++) {
      options.push({ value: highestBid + i * 50, label: `VND ${highestBid + i * 50}`, timestamp: "" });
    }
    return options;
  };

  const availableBidOptions = generateBidOptions(highestBid);

  const handlePlaceBid = () => {
    if (selectedBid !== undefined && selectedBid > highestBid) {
      const newBidObject: Bid = {
        value: selectedBid,
        label: `${selectedBid} VND`,
        timestamp: new Date().toLocaleString()
      };
      setBids([...bids, newBidObject]);
      setSelectedBid(undefined); 
    }
  };

  return (
    <Card>
      <Card><h1 style={{  textAlign: 'center', fontSize: '40px' }}>Auction</h1>
      <Row gutter={[16, 16]} style={{ margin: '10px' }}>
        <Col span={4}>
          <Row gutter={[10, 8]}>
            {product.images.map((image, index) => (
              <Col span={24} key={index}>
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  style={{ width: "90%", height: '230px', cursor: "pointer", border: selectedImage === image ? "2px solid #1890ff" : "none" }}
                  onClick={() => setSelectedImage(image)}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={12}>
          <img src={selectedImage} alt={product.name} style={{ width: "90%", height: '750px' }} />
        </Col>
        <Col span={8}>
          <Card title="Product Details">
            <Title level={3}>{product.name}</Title>
            <Paragraph>
            <strong>Brand:</strong> 
               
            </Paragraph>
            <Paragraph>
            <strong>Category:</strong> 
               
            </Paragraph>
            

            <Paragraph>
            <strong>Size:</strong> 
               
            </Paragraph>
            

            <Paragraph>
              <strong>Description:</strong> 
              {product.description}
              </Paragraph>

            <Paragraph style={{ color: '#32b94b',fontSize:'20px' }}><strong >Current Bid:</strong> {highestBid} VND</Paragraph>
          </Card>
          <Card title="Bids History">
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
              {availableBidOptions.map((bid) => (
                <Option key={bid.value} value={bid.value}>{bid.label}</Option>
              ))}
            </Select>
            <Button type="primary" onClick={handlePlaceBid} style={{ marginTop: "10px", backgroundColor:'black', width:'100%' }}>
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
    <Footer/>
    </Card>
      
    </Card>
  );
};

export default Auction;



