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
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, fashionItemResponse, shopResponse] =
          await Promise.all([
            fetch("http://giveawayproject.jettonetto.org:8080/api/categories"),
            fetch(
              "http://giveawayproject.jettonetto.org:8080/api/fashionitems?Status=Available&Type=Itembase&Type=ConsignedForSale"
            ),
            fetch("http://giveawayproject.jettonetto.org:8080/api/shops"),
          ]);

        if (
          !categoryResponse.ok ||
          !fashionItemResponse.ok ||
          !shopResponse.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        const categoriesData = await categoryResponse.json();
        categoriesData.data = await Promise.all(
          categoriesData.data.map(async (cate: any) => {
            return {
              ...cate,
              subCate: await (async function () {
                const subCateRes = await fetch(
                  `http://giveawayproject.jettonetto.org:8080/api/categories/${cate.categoryId}`
                );
                const subCate = await subCateRes.json();

                return subCate.data;
              })(),
            };
          })
        );

        const fashionItemData = await fashionItemResponse.json();
        const shopData = await shopResponse.json();
        setCategories(categoriesData.data);
        setShops(shopData.data);
        setTotalCount(fashionItemData.data.totalCount);
        setFashionItems(fashionItemData.data.items);
        setIsLoading(false);
        console.log(categoriesData);
        console.log(branches);
      } catch (error) {
        console.error("Failed to fetch data:", error);
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
          `http://giveawayproject.jettonetto.org:8080/api/fashionitems?Status=Available&Type=Itembase&Type=ConsignedForSale&ShopId=${key}`
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
          `http://giveawayproject.jettonetto.org:8080/api/fashionitems?Status=Available&Type=Itembase&Type=ConsignedForSale&pageNumber=${page}&pageSize=${pageSize}` +
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
      <Card>
        <Card>
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
        </Card>
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
            {/* <Menu mode="inline">
              <Menu.SubMenu key="categories" title="Categories">
                {categories.map((category) => (
                  <Menu.SubMenu
                    key={category.categoryId}
                    title={category.name}
                  >
                    {category.subCate.map(() => (
                      <Menu.Item key={categoryId}>{sub.name}</Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ))}
              </Menu.SubMenu>
            </Menu>
            </Menu> */}
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
      </Card>
    </Layout>
  );
};

export default Branches;
