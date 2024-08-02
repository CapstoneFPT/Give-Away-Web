import React, { useEffect, useState } from "react";
import { FashionItemApi, FashionItemDetailResponse } from "../../api";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCart } from "../CartContext";
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
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import backgroundImageUrl from "../../components/Assets/719789-apparel-hanger-top-shirt-t-shirt-fashion-rack.jpg";
import ProductCard from "../../components/commons/ProductCard";
const Search: React.FC = () => {
  const { dispatch, isItemInCart } = useCart();
  const [products, setProducts] = useState<FashionItemDetailResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pageSize = 12;

  useParams();
  useEffect(() => {
    fetchProducts(currentPage, searchParams.get("q"));
  }, [currentPage, searchParams]);

  const fetchProducts = async (
    page: number,
    searchParam: string | null,
    categoryId?: string
  ) => {
    setIsLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem("userId") || "null");
      const fashionItemApi = new FashionItemApi();
      const response = await fashionItemApi.apiFashionitemsGet(
        searchParam!,
        page,
        pageSize,
        userId,
        categoryId,
        ["Available"],
        ["ConsignedForSale", "ItemBase"]
      );

      console.debug(response);
      const data = response.data;
      if (data && data.data?.items && Array.isArray(data.data.items)) {
        setProducts(data.data.items);
        setTotalCount(data.data.totalCount!);
      } else {
        console.error("Data is not in expected format:", data);
      }
    } catch (error) {
      console.error("There was an error fetching the products!", error);
    } finally {
      setIsLoading(false);
    }
  };
  const formatBalance = (sellingPrice: any) => {
    return new Intl.NumberFormat("de-DE").format(sellingPrice);
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
      console.log("Adding item to cart with itemId:", product.itemId);
    }
  };

  const goToDetailPage = (itemId: any) => {
    console.log("Navigating to itemDetail with itemId:", itemId);
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
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={4}></Col>
        <Col span={20}>
          <Layout
            style={{
              padding: "0 24px 24px",
              backgroundColor: "rgba(255, 255, 255, 0)",
            }}
          >
            <Content>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "15px",
                  backgroundColor: "rgba(255, 255, 255, 0)",
                }}
              >
                <h1>Search Results for "{searchParams.get("q")}"</h1>
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
                  fetchProducts(page, searchParams.get("q"));
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

export default Search;
