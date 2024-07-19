import React, { useState, useEffect, useContext } from "react";
import { Layout, Menu, Button, Row, Col, Card, Pagination, Spin } from "antd";
import Sider from "antd/es/layout/Sider";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/config";

interface Product {
  itemId: any;
  name: string;
  sellingPrice: number;
}

const Women = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/fashionitems?PageSize=12&Status=Available&Type=ItemBase&Type=ConsignedForSale&GenderType=Female`,{
          headers :{
            "ngrok-skip-browser-warning": "6942"
          }
        }
      )
      .then((response) => {
        const data = response.data;
        console.log("Products fetched:", data);
        if (data && data.data.items && Array.isArray(data.data.items)) {
          setProducts(data.data.items);
        } else {
          console.error("Data is not in expected format:", data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const pageChange = (page: number, pageSize: number) => {
    setIsLoading(true);
    axios
      .get(
        `${BASE_URL}/fashionitems?Status=Available&Type=ItemBase&Type=ConsignedForSale&pageNumber&pageSize=12&GenderType=Female` ,{
          headers :{
            "ngrok-skip-browser-warning": "6942"
          }
        }
      )
      .then((response) => {
        const data = response.data;
        setTotalCount(data.data.totalCount);
        setProducts(data.data.items);
        setCurrentPage(page); // Update current page without Math.min
      })
      .catch((error) => {
        console.error("Failed to fetch women items:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleAddToCart = (product: Product) => {
    // addToCart({ ...product, price: product.sellingPrice });
    console.log("Adding item to cart with itemId:", product.itemId);
  };

  const goToDetailPage = (itemId: any) => {
    console.log("Navigating to itemDetail with itemId:", itemId);
    navigate(`/itemDetail/${itemId}`);
  };
  return (
    <Layout>
      <Sider width={210} style={{ background: "#fff", marginTop: "20px" }}>
        <Button
          style={{
            width: "100px",
            color: "white",
            backgroundColor: "black",
            marginBottom: "20px",
            marginTop: "10px",
            marginLeft: "10px",
          }}
        ></Button>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1">Category 1</Menu.Item>
          <Menu.Item key="2">Category 2</Menu.Item>
          <Menu.Item key="3">Category 3</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content>
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <h1> Women Collection</h1>
            <div> {isLoading && <Spin size="large" />}</div>
          </div>
          <Row gutter={[16, 16]}>
            {products.map((product: Product) => (
              <Col key={product.itemId} xs={22} sm={12} md={8} lg={4}>
                <Card hoverable onClick={() => goToDetailPage(product.itemId)}>
                  <Card.Meta
                    title={product.name}
                    description={`${product.sellingPrice} VND`}
                  />
                </Card>
                <div style={{ textAlign: "center" }}>
                  <Button
                    type="primary"
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                      backgroundColor: "#000000",
                      color: "white",
                      width: "170px",
                      height: "35px",
                      border: "2px solid black",
                      padding: "10px 20px",
                      borderRadius: "15px",
                      fontSize: "16px",
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                    <ShoppingCartOutlined />
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
          <Pagination
            onChange={pageChange}
            current={currentPage}
            style={{
              justifyContent: "center",
              display: "flex",
              marginTop: "50px",
            }}
            defaultCurrent={1}
            pageSize={pageSize}
            total={totalCount}
            showSizeChanger={false}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Women;
