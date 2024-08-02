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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import {
  CategoryApi,
  CategoryTreeNode,
  CategoryTreeResult,
  FashionItemApi,
  FashionItemDetailResponse,
} from "../../api";
import backgroundImageUrl from "../../components/Assets/shutterstock_455310238.jpg";
import ProductCard from "../../components/commons/ProductCard";

const Men: React.FC = () => {
  const { dispatch, isItemInCart } = useCart();
  const [products, setProducts] = useState<FashionItemDetailResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryTreeNode[]>([]); // State to hold categories
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null); // State to hold selected category ID
  const pageSize = 12;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage);
    fetchCategories(); // Fetch categories on component mount
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
        const categoryApi = new CategoryApi();
        const rootCategoryId = 'c7c0ba52-8406-47c1-9be5-497cbeea5933'; // Category ID for "Nam"
        const responseCategory = await categoryApi.apiCategoriesTreeGet('', rootCategoryId); // Ensure this method accepts the parameter
        console.log(responseCategory.data.categories);
        
        // Check if the response structure is as expected
        if (responseCategory.data && responseCategory.data.categories) {
            setCategories(responseCategory.data.categories); // Set categories if they exist
        } else {
            console.error("No categories found in the response:", responseCategory);
        }
    } catch (error) {
        console.error("There was an error fetching the categories!", error);
    }
};
const handleCategoryClick = (categoryId: string) => {
  setSelectedCategoryId(categoryId); // Set the selected category ID
  setCurrentPage(1); // Reset to the first page
  fetchProducts(1); // Fetch products for the selected category
};

const renderMenuItems = (categories: CategoryTreeNode[]) => {
  return categories.map((category) => (
      <Menu.SubMenu key={category.categoryId} title={category.name}>
          {category.children && category.children.length > 0 ? (
              renderMenuItems(category.children) // Recursively render children
          ) : (
              <Menu.Item key={category.categoryId} onClick={() => handleCategoryClick(category.categoryId!)}>
                {category.name}
              </Menu.Item>
          )}
      </Menu.SubMenu>
  ));
};

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem("userId") || "null");
      console.log(userId)
      const fashionItemApi = new CategoryApi;

      const response = await fashionItemApi.apiCategoriesCategoryIdFahsionitemsGet(
        selectedCategoryId!,
        null!,
        page,
        pageSize,
        userId,
        ["Available"],
        ["ItemBase", "ConsignedForSale"],
        null!,
        "Male"
      );
      console.log(response.data.data)

      console.debug(response);
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
      console.log("Adding item to cart with itemId:", product.itemId);
    }
  };

  const formatBalance = (sellingPrice: any) => {
    return new Intl.NumberFormat("de-DE").format(sellingPrice);
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
        minHeight: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0)",
        overflow: "hidden",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <Sider width={200} style={{ background: "#fff", marginTop: "20px" }}>
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
              {renderMenuItems(categories)} {/* Render categories */}
            </Menu>
          </Sider>
        </Col>
        <Col span={20}>
          <Layout style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>
            <Content style={{ padding: "20px", overflow: "hidden" }}>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "15px",
                  backgroundColor: "rgba(255, 255, 255, 0)",
                }}
              >
                <h1>Men Collection</h1>
                {isLoading && (
                  <Spin style={{ textAlign: "center" }} size="large" />
                )}
              </div>
              <Row gutter={[16, 16]}>
                {products.map((product: FashionItemDetailResponse) => (
                  <Col key={product.itemId} xs={22} sm={12} md={6} lg={6}>
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

export default Men;
