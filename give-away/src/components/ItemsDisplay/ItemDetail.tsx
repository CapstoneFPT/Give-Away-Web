import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Typography, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { useParams } from "react-router-dom";
import { FashionItemApi, FashionItemDetailResponse } from "../../api";

const { Title, Paragraph } = Typography;

const styles = {
  para: {
    fontSize: "18px",
    color: "black",
  },
  price: {
    color: "#d1d124",
    fontSize: "30px",
  },
};

interface Product {
  itemId: string;
  brand: string;
  categoryName: string;
  color: string;
  gender: string;
  name: string;
  note: string;
  sellingPrice: number;
  shopAddress: string;
  size: string;
  images: string[];
}


const ItemDetail: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [product, setProduct] = useState<FashionItemDetailResponse | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  console.log(product);
  useEffect(() => {
    if (itemId !== undefined) {
    

      async function fetchFashionItemDetails() {
        try {
          const fashionItemApi = new FashionItemApi();
          const response = await fashionItemApi.apiFashionitemsIdGet(
           itemId!
          );
          console.debug(itemId, response.data);
          setProduct(response.data.data!);
        } catch (error) {
          console.error(
            "There was an error fetching the product details!",
            error
          );
          message.error("Failed to fetch product details.");
        }
      }
      fetchFashionItemDetails();
    }
    

  }, []);
  const formatBalance = (sellingPrice:any) => {
    return new Intl.NumberFormat('de-DE').format(sellingPrice);
  };

  if (!product) {
    return <p>...Loading</p>;
  }

  return (
    <Card>
      <Card>
        <h1 style={{ textAlign: "center", fontSize: "40px" }}>
          Product Detail
        </h1>
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
                          selectedImage === image ? "2px solid #1890ff" : "none",
                      }}
                    onClick={() => setSelectedImage(image)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={11}>
            <img
              src={selectedImage}
              alt={product.name? product.name : "N/A"}
              style={{ width: "90%", height: "750px" }}
            />
          </Col>
          <Col span={9}>
            <Card>
              <Paragraph style={styles.para}>
                <strong>Product Name: </strong> {product.name}
              </Paragraph>
              <Paragraph style={styles.para}>
                <strong>Brand:</strong> {product.brand}
              </Paragraph>
              <Paragraph style={styles.para}>
                <strong>Category:</strong> {product.categoryName}{" "}
                <strong style={{ marginLeft: "50px" }}>Gender:</strong>{" "}
                {product.gender}
              </Paragraph>
              <Paragraph style={styles.para}>
                <strong>Size:</strong> {product.size}{" "}
                <strong style={{ marginLeft: "150px" }}>Color:</strong>{" "}
                {product.color}
              </Paragraph>
              <Paragraph style={styles.para}>
                <strong>Shop Address:</strong> {product.shopAddress}
              </Paragraph>
              <Paragraph style={styles.para}>
                <strong style={styles.price}>
                  Price: {formatBalance(product.sellingPrice)} VND
                </strong>
              </Paragraph>

              <Button
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  backgroundColor: "#000000",
                  color: "white",
                  width: "170px",
                  height: "50px",
                  border: "2px solid black",
                  padding: "10px 20px",
                  borderRadius: "30px",
                  fontSize: "18px",
                }}
              >
                Add to cart
                <ShoppingCartOutlined
                  style={{ fontSize: "25px", color: "white" }}
                />
              </Button>
            </Card>
          </Col>
        </Row>
        <Card style={{ marginTop: "20px" }}>
          <Paragraph style={styles.para}>
            <strong>Description:</strong> {product.note}
          </Paragraph>
        </Card>
      </Card>
    </Card>
  );
};

export default ItemDetail;
