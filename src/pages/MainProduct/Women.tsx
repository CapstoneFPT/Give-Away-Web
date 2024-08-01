import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Card,
  Pagination,
  Spin,
  notification,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { FashionItemApi, FashionItemDetailResponse } from "../../api";
import backgroundImageUrl from "../../components/Assets/freepik_5229782.jpg";
import ProductCard from "../../components/commons/ProductCard";

const Women: React.FC = () => {
  const { dispatch, isItemInCart } = useCart();
  const [products, setProducts] = useState<FashionItemDetailResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 12;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem("userId") || "null");
      const fashionItemApi = new FashionItemApi();
      const response = await fashionItemApi.apiFashionitemsGet(
        null!,
        page,
        pageSize,
        userId,
        ["Available"],
        ["ItemBase", "ConsignedForSale"],
        null!,
        "Female"
      );
      const data = response.data;
      if (data && data.data?.items && Array.isArray(data.data.items)) {
        setProducts(data.data.items);
        setTotalCount(data.data.totalCount || 0);
      } else {
        console.error("Data is not in expected format:", data);
      }
    } catch (error) {
      console.error("There was an error fetching the products!", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: FashionItemDetailResponse) => {
    if (product.isOrderedYet) {
      notification.error({
        message: "Already Ordered",
        description: `The item "${product.name}" has already been ordered.`,
      });
    } else if (isItemInCart(product.itemId)) {
      notification.warning({
        message: "Already in Cart",
        description: `The item "${product.name}" is already in your cart.`,
      });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: { ...product } });
      notification.success({
        message: "Added to Cart",
        description: `The item "${product.name}" has been added to your cart.`,
      });
    }
  };
  const formatBalance = (balance: any) => {
    return new Intl.NumberFormat("de-DE").format(balance);
  };

  const goToDetailPage = (itemId: any) => {
    navigate(`/itemDetail/${itemId}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0)",
        overflow: "hidden",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={4}>
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
            >
              Filter
            </Button>
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
        </Col>
        <Col span={20}>
          <Layout
            style={{
              padding: "0 24px 24px",
              backgroundColor: "rgba(255, 255, 255, 0)",
              overflow: "hidden",
            }}
          >
            <Content style={{ overflow: "hidden" }}>
              <div style={{ textAlign: "center", marginBottom: "15px" }}>
                <h1>Women Collection</h1>
                {isLoading && (
                  <Spin style={{ textAlign: "center" }} size="large" />
                )}
              </div>
              <Row gutter={[16, 16]}>
                {products.map((product: FashionItemDetailResponse) => (
                  <Col key={product.itemId} xs={22} sm={12} md={8} lg={6}>
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      formatBalance={formatBalance}
                      onCardClick={goToDetailPage}
                    />
                  </Col>
                ))}
              </Row>
              <Pagination
                onChange={(page) => {
                  setCurrentPage(page);
                  fetchProducts(page);
                }}
                current={currentPage}
                style={{
                  justifyContent: "center",
                  display: "flex",
                  marginTop: "50px",
                }}
                pageSize={pageSize}
                total={totalCount}
                showSizeChanger={false}
              />
            </Content>
          </Layout>
        </Col>
      </Row>
    </div>
  );
};

export default Women;
