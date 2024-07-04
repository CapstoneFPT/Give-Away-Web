import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import {
  Button,
  Card,
  Dropdown,
  Pagination,
  Space,
  Typography,
  Layout,
  Menu,
  Spin,
} from "antd";
import DisplayItem from "../components/ItemsDisplay/ItemsDisplay";
interface FashionItem {
  itemId: string;
  type: string;
  sellingPrice: number;
  name: string;
  note: string;
  value: number;
  condition: string;
  consignDuration: number;
  status: string;
  shopAddress: string;
  shopId: string;
  startDate: string;
  endDate: string;
  consigner: string;
  categoryName: string;
  size: string;
  color: string;
  brand: string;
  gender: string;
}
interface ShopData {
  shopId: string;
  address: string;
  staffId: string;
  phone: string;
}
const Branches: React.FC = () => {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [branches, setBranches] = useState("");
  const [fashionItems, setFashionItems] = useState<FashionItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [shops, setShops] = useState<ShopData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryAPI = await fetch(
          "http://103.177.111.181:8080/api/categories"
        );
        const fashionItemAPI = await fetch(
          "http://103.177.111.181:8080/api/fashionitems?Status=Available"
        );
        const shopAPI = await fetch("http://103.177.111.181:8080/api/shops");
        const category = await categoryAPI.json();
        const fashionItemData = await fashionItemAPI.json();
        const shop = await shopAPI.json();

        setTotalCount(fashionItemData.data.totalCount);
        setFashionItems(fashionItemData.data.items); // Updated to setFashionItems with data.data.items
        console.log(shop);
        setShops(shop.data);
        console.log(category);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    setIsLoading(true);
    if (items) {
      const selectedItem = items.find((item) => item && item.key === key);
      if (
        selectedItem &&
        "label" in selectedItem &&
        selectedItem.label &&
        selectedItem.label !== "All"
      ) {
        setBranches(selectedItem.label as string);
        setSelectedShopId(selectedItem.key as string);
        setCurrentPage(1);
      } else if (
        selectedItem &&
        "label" in selectedItem &&
        selectedItem.label &&
        selectedItem.label === "All"
      ) {
        setBranches("");
        setSelectedShopId(null);
        setCurrentPage(1);
      }
    }
    const filter = async () => {
      try {
        const response = await fetch(
          `http://103.177.111.181:8080/api/fashionitems?Status=Available&ShopId=${key}`
        );
        const data = await response.json();

        setTotalCount(data.data.totalCount);
        setFashionItems(data.data.items);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        setIsLoading(false);
      }
    };
    filter();
  };

  const items: MenuProps["items"] = shops!.map((shop) => ({
    key: shop!.shopId,
    label: shop!.address,
  }));
  items.unshift({ key: "", label: "All" });
  const pageChange = (page: number, pageSize: number) => {
    setIsLoading(true);
    const stateApiLink = selectedShopId ? `&ShopId=${selectedShopId}` : "";

    const fetchItems = async () => {
      try {
        const response = await fetch(
          `http://103.177.111.181:8080/api/fashionitems?Status=Available&pageNumber=${page}&pageSize=${pageSize}` +
            stateApiLink
        );
        const data = await response.json();
        console.log(data);
        setTotalCount(data.data.totalCount);
        setFashionItems(data.data.items);
        setCurrentPage(page);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        setIsLoading(false);
      }
    };
    fetchItems();
  };
  const handleAdd = (itemId: string) => {
    console.log(`Item with ID ${itemId} added`);
    // Implementation for adding an item
  };

  const { Header, Sider, Content } = Layout;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          padding: 0,
          background: "#fff",
          height: "100px",
        }}
      >
        <Card
          className="branches-header"
          style={{
            width: "100%",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "flex-start",
            left: 0,
          }}
        >
          <Space direction="horizontal" size={300}>
            <Dropdown menu={{ items, onClick }} placement="bottom">
              <Button
                onClick={(e) => e.preventDefault()}
                style={{ width: "400px" }}
              >
                {branches || "Choose a branch"}
              </Button>
            </Dropdown>

            <Typography.Text style={{ color: "white", fontSize: "20px" }}>
              {branches}
            </Typography.Text>
          </Space>
        </Card>
      </Header>
      <Layout hasSider className="site-layout" style={{ width: "100%" }}>
        <Sider
          trigger={null}
          width="15%"
          style={{
            overflow: "hidden",
            height: "100vh",
            display: "flex",
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "#fff",
          }}
        >
          <div>
            <h3>Men</h3>
            <Menu
              theme="light"
              mode="vertical"
              style={{
                backgroundColor: "#fff",
                width: "100%",
              }}
            >
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
            </Menu>
          </div>
          <div>
            <h3>Women</h3>
            <Menu
              theme="light"
              mode="vertical"
              style={{
                backgroundColor: "#fff",
                overflow: "hidden",
              }}
            >
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
            </Menu>
          </div>
        </Sider>
        <Content
          style={{
            overflow: "initial",
            display: "relative",
            width: "85%",
            padding: 15,
          }}
        >
          <Card className="item-display" style={{ maxHeight: "100vh" }}>
            <Typography.Title
              style={{
                fontSize: 50,
                justifyContent: "center",
                display: "flex",
              }}
              level={3}
            >
              Branch Inventory
            </Typography.Title>
            <div
              style={{
                marginTop: "20px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "100vh",
                height: "80vh",
                border: "3px solid #f0f0f0",
              }}
            >
              {isLoading && (
                <div
                  style={{
                    gridColumn: "4",
                  }}
                >
                  <Spin size="large" />
                </div>
              )}
              {!isLoading &&
                fashionItems.map((item) => (
                  <DisplayItem
                    key={item.itemId}
                    item={item}
                    onAdd={() => handleAdd(item.itemId)}
                  />
                ))}
            </div>
            <Pagination
              onChange={pageChange}
              current={currentPage}
              style={{ justifyContent: "center", display: "flex" }}
              defaultCurrent={1}
              total={totalCount}
              showSizeChanger={false}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Branches;
