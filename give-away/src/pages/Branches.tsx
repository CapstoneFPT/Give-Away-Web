import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown, Pagination, Space, Typography, Layout, Menu, Spin } from "antd";
import type { MenuProps } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import DisplayItem from "../components/ItemsDisplay/ItemsDisplay";
import { icons } from "antd/es/image/PreviewGroup";
import { BASE_URL } from "../api/config";

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

interface Category {
  categoryId: string;
  name: string;
  parentId: string | null;
  children?: Category[];
}

const Branches: React.FC = () => {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [branches, setBranches] = useState("");
  const [fashionItems, setFashionItems] = useState<FashionItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [shops, setShops] = useState<ShopData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  console.log(selectedShopId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, fashionItemResponse, shopResponse] = await Promise.all([
          fetch(`${BASE_URL + "/api"}/categories/tree?shopId=${selectedShopId || ''}`),
          fetch(`${BASE_URL + "/api"}/fashionitems?Status=Available&Type=Itembase&Type=ConsignedForSale&ShopId=${selectedShopId || ''}`),
          fetch(`${BASE_URL + "/api"}/shops`),
        ]);
        console.log(selectedShopId);
        if (!categoryResponse.ok || !fashionItemResponse.ok || !shopResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoriesData = await categoryResponse.json();
        const fashionItemData = await fashionItemResponse.json();
        const shopData = await shopResponse.json();
        console.log('shopData', shopData);
        console.log('fashionItemData', fashionItemData);
        console.log('categoriesData', categoriesData);

        setCategories(categoriesData.categories);
        setShops(shopData.data);
        setTotalCount(fashionItemData.data.totalCount);
        setFashionItems(fashionItemData.data.items);
        setIsLoading(false);
        console.log(categoriesData);

      } catch (error) {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedShopId]); // Add selectedShopId as a dependency

  const onClickBranch: MenuProps["onClick"] = ({ key }) => {
    setIsLoading(true);
    const selectedItem = items?.find((item) => item && item.key === key);
    if (selectedItem && "label" in selectedItem && selectedItem.label && selectedItem.label !== "All") {
      setBranches(selectedItem.label as string);
      setSelectedShopId(selectedItem.key as string);
      setSelectedCategoryId(null); // Reset category when branch changes
      setCurrentPage(1);
    } else if (selectedItem && "label" in selectedItem && selectedItem.label && selectedItem.label === "All") {
      setBranches("");
      setSelectedShopId(null);
      setSelectedCategoryId(null); // Reset category when branch changes
      setCurrentPage(1);
    }
    const filter = async () => {
      try {
        const response = await fetch(`${BASE_URL}/fashionitems?Status=Available&Type=Itembase&Type=ConsignedForSale&ShopId=${key}`);
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

  const onClickCategory = ({ key }: { key: string }) => {
    console.log("Clicked Category ID:", key);
    setIsLoading(true);
    setSelectedCategoryId(key);
    filterByCategory(key);
  };

  const filterByCategory = async (categoryId: string) => {
    try {
      const shopIdParam = selectedShopId ? `${selectedShopId}` : "";
      const response = await fetch(`${BASE_URL}/categories/${categoryId}/fahsionitems?ShopId=${shopIdParam}`);
      
      const data = await response.json();
      console.log('cate',categoryId)
      console.log('shopid',shopIdParam)
      console.log("123:", data); // Log fetched data
      setTotalCount(data.data.totalCount);
      setFashionItems(data.data.items);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      setIsLoading(false);
    }
  };

  const items: MenuProps["items"] = shops.map((shop) => ({
    key: shop.shopId,
    label: shop.address,
  }));
  items.unshift({ key: "", label: "All" });

  const categoryItems = categories.map((category) => ({
    key: category.categoryId,
    label : (
      <Button style={{color:"black", width:"90px"}} type="link" onClick={() => onClickCategory({ key: category.categoryId })}>
        {category.name}
      </Button>
    ),
    children: category.children?.map((sub1) => ({
      key: sub1.categoryId,
      label: (
        <Button style={{color:"black", width:"100px"}} type="link" onClick={() => onClickCategory({ key: sub1.categoryId })}>
          {sub1.name}
        </Button>
      ),
      children: sub1.children?.map((sub2) => ({
        key: sub2.categoryId,
        label: (
          <Button style={{color:"black", width:"110px"}} type="link" onClick={() => onClickCategory({ key: sub2.categoryId })}>
            {sub2.name}
          </Button>
        ),
        children: sub2.children?.map((sub3) => ({
          key: sub3.categoryId,
          label: (
            <Button style={{color:"black"}} type="link" onClick={() => onClickCategory({ key: sub3.categoryId })}>
              {sub3.name}
            </Button>
          ),
          children: sub3.children?.map((sub4) => ({
            key: sub4.categoryId,
            icon: <CaretDownOutlined />,
            label: (
              
              <Button style={{color:"black"}} type="link" onClick={() => onClickCategory({ key: sub4.categoryId })}>
                {sub4.name}
              </Button>
            ),
          })),
        })),
      })),
    })),
  }));

  const pageChange = (page: number, pageSize: number) => {
    setIsLoading(true);
    const stateApiLink = selectedShopId ? `&ShopId=${selectedShopId}` : "";
    const categoryApiLink = selectedCategoryId ? `&CategoryId=${selectedCategoryId}` : "";

    const fetchItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}/fashionitems?Status=Available&Type=Itembase&Type=ConsignedForSale&pageNumber=${page}&pageSize=${pageSize}${stateApiLink}${categoryApiLink}`);
        const data = await response.json();

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
        <Header style={{ padding: 0, background: "#fff", height: "100px" }}>
          <Card className="branches-header" style={{ width: "100%", backgroundColor: "white ", display: "flex", justifyContent: "flex-start", left: 0 }}>
            <Space direction="horizontal" size={200}>
              <Dropdown menu={{ items, onClick: onClickBranch }} placement="bottomRight">
                <Button onClick={(e) => e.preventDefault()} style={{ width: "100px", backgroundColor: 'black', color: 'white' }}>
                  <CaretDownOutlined />
                  Branch
                </Button>
              </Dropdown>
              <Typography.Text style={{ color: "black", fontSize: "30px ", fontWeight: 'bolder' }}>
                Address:
                {branches}
              </Typography.Text>
            </Space>
          </Card>
        </Header>

        <Layout hasSider className="site-layout" style={{ width: "100%" }}>
          <Sider trigger={null}
           width="22%"

            style={{ overflow: "hidden",
             height: "100vh",
              display: "flex",
              overflowY: "auto",
              overflowX: "hidden",
              left: 0,
              top: 0, 
              bottom: 0,
              
              backgroundColor: "#fff"
                  }}>

            <Menu  mode="inline" items={categoryItems} />
          </Sider>
          <Content style={{ overflow: "initial", display: "relative", width: "85%", padding: 15 }}>
            <Card className="item-display" style={{ maxHeight: "100vh" }}>
              <Typography.Title style={{ fontSize: 50, justifyContent: "center", display: "flex" }} level={3}>
                Branch Inventory
              </Typography.Title>
              <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", justifyContent: "center", alignItems: "center", maxHeight: "100vh", height: "80vh", border: "3px solid #f0f0f0" }}>
                {isLoading && (
                  <div style={{ gridColumn: "4" }}>
                    <Spin size="large" />
                  </div>
                )}
                {!isLoading && fashionItems.map((item) => (
                  <DisplayItem key={item.itemId} item={item} onAdd={() => handleAdd(item.itemId)} />
                ))}
              </div>
              <Pagination onChange={pageChange} current={currentPage} style={{ justifyContent: "center", display: "flex" }} defaultCurrent={1} total={totalCount} showSizeChanger={false} />
            </Card>
          </Content>
        </Layout>
      </Card>
    </Layout>
  );
};

export default Branches;