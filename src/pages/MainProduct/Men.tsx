import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Pagination,
  Spin,
  notification,
  Card,
} from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import {
  CategoryApi,
  CategoryTreeNode,
  FashionItemApi,
  FashionItemDetailResponse,
  MasterItemListResponse,
} from "../../api";
import backgroundImageUrl from "../../components/Assets/shutterstock_455310238.jpg";
import ProductCard from "../../components/commons/ProductCard";
import SubMenu from "antd/es/menu/SubMenu";

const Men: React.FC = () => {
  const { dispatch, isItemInCart } = useCart();
  const [products, setProducts] = useState<MasterItemListResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryTreeNode[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
  "535d3b90-dc58-41e3-ad32-055e261bd6a7");
  const pageSize = 12;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchProducts(currentPage, selectedCategoryId!);
  }, [currentPage, selectedCategoryId]);

  const fetchCategories = async () => {
    try {
      const categoryApi = new CategoryApi();
      const rootCategoryId = "535d3b90-dc58-41e3-ad32-055e261bd6a7";
      const responseCategory = await categoryApi.apiCategoriesTreeGet(
        null!,
        rootCategoryId
      );
      console.log(responseCategory.data.categories);

      if (responseCategory.data && responseCategory.data.categories) {
        setCategories(responseCategory.data.categories);
      } else {
        console.error("No categories found in the response:", responseCategory);
      }
    } catch (error) {
      console.error("There was an error fetching the categories!", error);
    }
  };

  const renderMenuItems = (categories: CategoryTreeNode[]): React.ReactNode => {
    return categories.map((category) => {
      if (category.children && category.children.length > 0) {
        return (
          <SubMenu
            key={category.categoryId}
            icon={<AppstoreOutlined />}
            title={category.name}
            onTitleClick={({ key }) => handleMenuSelect({ key:key as string })}
          >
            <Menu.Item key={category.categoryId}>All {category.name}</Menu.Item>
            {renderMenuItems(category.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={category.categoryId} icon={<AppstoreOutlined />}>
          {category.name}
        </Menu.Item>
      );
    });
  };

  const fetchProducts = async (page: number, categoryId?: string) => {
    setIsLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem("userId") || "null");
      // console.log(userId);
      
      const fashionItemApi = new FashionItemApi();

      const response = await fashionItemApi.apiFashionitemsMasterItemsFrontpageGet(
        null!,
        null!,
        'Male',
        page,
        pageSize
      );
      // console.log(response.data.data?.items);

      // console.debug(response);
      const data = response.data;
      if (data && data.items && Array.isArray(data.items)) {
        setProducts(data.items);
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
  const handleMenuSelect = ({ key }: { key: string }) => {
    if (key) {
      setSelectedCategoryId(key);
      setCurrentPage(1);
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

  const goToListProducts = (masterItemCode: string) => {
    console.log("Navigating to ListItem with itemId:", masterItemCode);
    navigate(`/listItems/${masterItemCode}`);
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
          <Card title='Category'  style={{ background: "#fff", marginTop: "20px" }}>
           
            <Menu
              mode="horizontal"
              selectedKeys={[selectedCategoryId || ""]}
              defaultOpenKeys={categories.map((cat) => cat.categoryId!)}
              style={{ height: "100%", borderRight: 0 }}
              onSelect={handleMenuSelect}
            >
              {renderMenuItems(categories)}
            </Menu>
          </Card>
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
                {products.map((product) => (
                  <Col key={product.masterItemId} xs={22} sm={12} md={6} lg={6}>
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      formatBalance={formatBalance}
                      onCardClick={() => goToListProducts(product.itemCode!)} // Updated to use an arrow function
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
