import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item/Item";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Typography, Row, Col, Card, Layout, Menu } from "antd";
import { Product } from "../context/ShopContext";

const { Title } = Typography;
const { Sider, Content } = Layout;

interface Props {
  category: string;
}

const ShopCategory: React.FC<Props> = (props) => {
  const { getAllProduct } = useContext(ShopContext)!;
  let all_product: Product[] = [];
  const [filteredProducts, setFilteredProducts] = useState(all_product);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const navigate = useNavigate();
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };
  const onFilterChange = (selectedCategories: string[]) => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(all_product);
    } else {
      setFilteredProducts(
        all_product.filter((product: any) =>
          selectedCategories.includes(product.clothType)
        )
      );
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      let genderType = 'Male';
      if (props.category === 'women') {
        genderType = 'Female'
        ;
      }
      const products = await getAllProduct(genderType);
      all_product = products;
      setFilteredProducts(products);
    };
    fetchProducts();
  }, []);

  const handleMenuClick = (e: any) => {
    // Handle menu item click
    console.log("Menu item clicked:", e.key);
  };

  const addToCart = (item: any) => {
    // Handle add to cart logic
    console.log("Added to cart:", item);
  };

  return (
    <Layout>
      <Sider width={210} style={{ background: "#fff", marginTop: "20px" }}>
        <Button
          style={{ width: "100px", color: "white", backgroundColor: "black", marginBottom: "20px", marginTop: "10px", marginLeft: "10px" }}
          onClick={toggleFilters}
        >
          {filtersVisible ? "HIDE FILTERS" : "SHOW FILTERS"}
        </Button>
        
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1">Category 1</Menu.Item>
          <Menu.Item key="2">Category 2</Menu.Item>
          <Menu.Item key="3">Category 3</Menu.Item>
          {/* Add more categories as needed */}
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content>
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <Title level={1}>
              {props.category.charAt(0).toUpperCase() + props.category.slice(1)}{" "}
              Collection
            </Title>
          </div>

          <div>
            {filtersVisible && (
              <div style={{ marginBottom: "20px" }}>
                {/* Add your filter components here */}
              </div>
            )}
            <Row gutter={[16, 16]}>
              {filteredProducts.map((item: any) => {
                if (props.category === item.category) {
                  return (
                    <Col key={item.id} xs={22} sm={12} md={8} lg={4} >
                      <Card
                        hoverable
                        onClick={() =>
                          navigate(
                            `/${item.category}/${item.clothType}/${item.name}`
                          )
                        }
                        cover={<img alt={item.name} src={item.image} />}
                      >
                        <Card.Meta
                          title={item.name}
                          description={`New Price: ${item.new_price} - Old Price: ${item.old_price}`}
                        />
                        <Button
                          type="primary"
                          style={{
                            marginTop: "10px",
                            color: "white",
                            backgroundColor: "black",
                            width: "100%",
                            height: "30px",
                          }}
                          onClick={() => addToCart(item)}
                        >
                          Add to Cart
                        </Button>
                      </Card>
                    </Col>
                  );
                } else {
                  return null;
                }
              })}
            </Row>
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button type="primary">Explore more</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ShopCategory;