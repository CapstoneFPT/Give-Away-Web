import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Typography, Image } from "antd";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { FashionItemApi, FashionItemDetailResponse } from "../api";

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


const DetailProductAunction: React.FC = () => {
  const { auctionItemID } = useParams<{ auctionItemID: string }>();
  console.log(auctionItemID);
  const [product, setProduct] = useState<FashionItemDetailResponse | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | undefined>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fashionItemAuction = new FashionItemApi();
        const response = await fashionItemAuction.apiFashionitemsItemIdGet(auctionItemID!)
        setProduct(response.data.data!);
        setSelectedImage(response.data.data?.images![0]);
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
                {product.images?.map((image, index) => (
                  <Col span={24} key={index}>
                    <img
                      src={image}
                      alt={`Thumnail : ${index}`}
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
              <Image
                src={selectedImage}
                alt={product.name!}
                style={{ width: "90%", height: "750px" }}
              />
            </Col>
            <Col span={8}>
              <Card title="Product Details">
              <Title level={4}>Product Code: {product.itemCode}</Title>
                <Row gutter={[16,16]}>
                  <Col span={12}>
                  <Paragraph>
                  <strong>Product Name:</strong> {product.name}
                </Paragraph>
                <Paragraph>
                  <strong>Brand:</strong> {product.brand}
                </Paragraph>
                <Paragraph>
                  <strong>Category:</strong> {product.categoryName}
                </Paragraph>
                
                  </Col>

                  <Col span={12}>
                  <Paragraph>
                  <strong>Gender:</strong> {product.gender}
                </Paragraph>
                <Paragraph>
                  <strong>Size:</strong> {product.size}
                </Paragraph>
                <Paragraph>
                  <strong>Color:</strong> {product.color}
                </Paragraph>
                
                  </Col>
                  <Paragraph>
                  <strong>Condition:</strong> {product.condition}
                </Paragraph>  

                  <Paragraph>
                  <strong>Shop Address:</strong> {product.shopAddress}
                </Paragraph>
                 
                </Row>
                <Paragraph>
                  <strong>Description:</strong> {product.description}
                </Paragraph>
                <Paragraph>
                  <strong>Note:</strong> {product.note}
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
            
          </Row>
        </Card>
      </Card>
      <Footer />
    </>
  );
};

export default DetailProductAunction;
