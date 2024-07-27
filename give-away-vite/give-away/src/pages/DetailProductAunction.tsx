import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/config";

const { Title, Paragraph } = Typography;

interface Product {
  id: number;
  name: string;
  note: string;
  images: string[];
  brand: string;
  categoryName: string;
  size: string;
  gender: string;
  shopAddress: string;
  color: string;
}

const styles = {
  buttonDetail: {
    marginRight: "30px",
    backgroundColor: "#000000",
    color: "white",
    width: "150px",
    height: "50px",
    border: "2px solid black",
    padding: "10px 20px",
    borderRadius: "30px",
  },
};

const DetailProductAunction: React.FC = () => {
  const { auctionItemID } = useParams<{ auctionItemID: string }>();
  console.log(auctionItemID);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/fashionitems/${auctionItemID} `,{
            headers :{
              "ngrok-skip-browser-warning": "6942"
            }
          }
        );
        setProduct(response.data.data);
        // setSelectedImage(response.data.images[0]);
        console.log(response);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [auctionItemID]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card>
        <Card>
          <h1 style={{ textAlign: "center", fontSize: "40px" }}>
            Detail Product Auction
          </h1>
          <Row gutter={[16, 16]} style={{ margin: "10px" }}>
            <Col span={4}>
              <Row gutter={[10, 8]}>
                <Col span={24}>
                  <img
                  // src={image}
                  // alt={`Thumbnail ${index}`}
                  // style={{ width: "90%", height: '230px', cursor: "pointer", border: selectedImage === image ? "2px solid #1890ff" : "none" }}
                  // onClick={() => setSelectedImage(image)}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              {/* <img src={selectedImage} alt={product.name} style={{ width: "90%", height: '750px' }} /> */}
            </Col>
            <Col span={8}>
              <Card title="Product Details">
                <Title level={3}>Product Name: {product.name}</Title>
                <Paragraph>
                  <strong>Brand:</strong> {product.brand}
                </Paragraph>
                <Paragraph>
                  <strong>Category:</strong> {product.categoryName}
                </Paragraph>
                <Paragraph>
                  <strong>Gender:</strong> {product.gender}
                </Paragraph>
                <Paragraph>
                  <strong>Size:</strong> {product.size}
                </Paragraph>
                <Paragraph>
                  <strong>Color:</strong> {product.color}
                </Paragraph>
                <Paragraph>
                  <strong>Shop Address:</strong> {product.shopAddress}
                </Paragraph>
                <Paragraph>
                  <strong>Description:</strong> {product.note}
                </Paragraph>
              </Card>
            </Col>
            <Card>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
              vel fuga iusto? Modi eius ratione delectus? Ullam natus debitis
              pariatur fugiat vitae error voluptas explicabo ex! Ipsum, magni.
              Quidem, numquam. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Officia vel fuga iusto? Modi eius ratione
              delectus? Ullam natus debitis pariatur fugiat vitae error voluptas
              explicabo ex! Ipsum, magni. Quidem, numquam. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Officia vel fuga iusto? Modi
              eius ratione delectus? Ullam natus debitis pariatur fugiat vitae
              error voluptas explicabo ex! Ipsum, magni. Quidem, numquam. Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Officia vel
              fuga iusto? Modi eius ratione delectus? Ullam natus debitis
              pariatur fugiat vitae error voluptas explicabo ex! Ipsum, magni.
              Quidem, numquam. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Officia vel fuga iusto? Modi eius ratione
              delectus? Ullam natus debitis pariatur fugiat vitae error voluptas
              explicabo ex! Ipsum, magni. Quidem, numquam. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Officia vel fuga iusto? Modi
              eius ratione delectus? Ullam natus debitis pariatur fugiat vitae
              error voluptas explicabo ex! Ipsum, magni. Quidem, numquam. Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Officia vel
              fuga iusto? Modi eius ratione delectus? Ullam natus debitis
              pariatur fugiat vitae error voluptas explicabo ex! Ipsum, magni.
              Quidem, numquam. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Officia vel fuga iusto? Modi eius ratione
              delectus? Ullam natus debitis pariatur fugiat vitae error voluptas
              explicabo ex! Ipsum, magni. Quidem, numquam. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Officia vel fuga iusto? Modi
              eius ratione delectus? Ullam natus debitis pariatur fugiat vitae
              error voluptas explicabo ex! Ipsum, magni. Quidem, numquam.
            </Card>
            <div style={{ margin: "30px" }}>
              <Button style={styles.buttonDetail}>Deposit</Button>
              <Button style={styles.buttonDetail}>Auction</Button>
            </div>
          </Row>
        </Card>
      </Card>
      <Footer />
    </>
  );
};

export default DetailProductAunction;
