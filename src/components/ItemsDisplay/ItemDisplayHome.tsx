import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Card,
  Pagination,
  Spin,
  notification,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../pages/CartContext";

import { FashionItemApi, FashionItemDetailResponse, MasterItemListResponse, MasterItemResponse } from "../../api";
import backgroundImageUrl from "../Assets/freepik_5229782.jpg";
import ProductCard from "../commons/ProductCard";

interface Product {
  itemId: any;
  images: string;
  name: string;
  size: string;
  color: string;
  gender: string;
  brand: string;
  sellingPrice: number;
  shopAddress: string;
}

const ItemDisplayHome: React.FC = () => {
  const { state, dispatch, isItemInCart } = useCart();
  const [products, setProducts] = useState<MasterItemListResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 24;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  console.log(userId);
  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    try {
      const fashionItemApi = new FashionItemApi();
      const response = await fashionItemApi.apiFashionitemsMasterItemsGet(
        null!,
        null!,
        page,
        pageSize,
        null!,
       
       
      );

      console.log(response);
      const data = response.data;
      if (data && data.items && Array.isArray(data.items)) {
        setProducts(data.items!);
        setTotalCount(data.totalCount || 0);
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
    if (isItemInCart(product.itemId)) {
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
      console.log("Adding item to cart with itemId:", product.itemId);
    }
  };
  const formatBalance = (sellingPrice: any) => {
    return new Intl.NumberFormat("de-DE").format(sellingPrice);
  };

  const goToListProducts = (masterItemsId: string) => {
    console.log("Navigating to ListItem with itemId:", masterItemsId);
    navigate(`/listItems/${masterItemsId}`);
  };

  return (
    <Card
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Layout
        style={{
          padding: "0 24px 24px",
          backgroundColor: "rgb(225, 225, 225, 0.1)",
        }}
      >
        <Content>
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <h1>Collection</h1>
            {isLoading && <Spin style={{ textAlign: "center" }} size="large" />}
          </div>
          <Row gutter={[20, 10]} justify="center">
            {products.map((product) => (
              <Col key={product.masterItemId} xs={24} sm={12} md={8} lg={6}>
                <ProductCard
                  product={product}
                  formatBalance={formatBalance}
                  onAddToCart={handleAddToCart}
                  onCardClick={()=>goToListProducts(product.masterItemId!)}
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
    </Card>
  );
};

export default ItemDisplayHome;
