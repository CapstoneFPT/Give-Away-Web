import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Card, Dropdown, Space, Typography } from "antd";
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

const Branches: React.FC = () => {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [branches, setBranches] = useState("");
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (items) {
      const selectedItem = items.find((item) => item && item.key === key);
      if (selectedItem && "label" in selectedItem && selectedItem.label) {
        setBranches(selectedItem.label as string);
        setSelectedShopId(selectedItem.key as string);
      }
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "4f85e564-1234-4562-b3fc-2c963f66afa6", // Use shopId as key for simplicity
      label: "15/14A Trung Yen 2, Trung Hoa Ward",
    },
    {
      key: "5f85e564-2345-4562-b3fc-2c963f66afa7", // Use shopId as key for simplicity
      label: "176 Phan Ngoc Hien, Ward 6",
    },
    // Add more shops with their IDs as keys if needed
  ];

  const fashionItems: FashionItem[] = [
    {
      itemId: "4f85e564-1234-4562-b3fc-2c963f66afa6",
      type: "ItemBase",
      sellingPrice: 200,
      name: "Elegant Silk Dress",
      note: "Perfect for evening events",
      value: 250,
      condition: "New",
      consignDuration: 60,
      status: "Available",
      shopAddress: "200 Fashion Blvd, Style City",
      shopId: "4f85e564-1234-4562-b3fc-2c963f66afa6",
      startDate: "2024-07-01T00:00:00.000Z",
      endDate: "2024-08-30T00:00:00.000Z",
      consigner: "Jane Doe",
      categoryName: "Dresses",
      size: "M",
      color: "Red",
      brand: "Gucci",
      gender: "Female",
    },
    {
      itemId: "5f85e564-2345-4562-b3fc-2c963f66afa7",
      type: "ItemBase",
      sellingPrice: 150,
      name: "Classic Leather Jacket",
      note: "A timeless wardrobe essential",
      value: 200,
      condition: "Like New",
      consignDuration: 90,
      status: "Available",
      shopAddress: "202 Fashion Blvd, Style City",
      shopId: "5f85e564-2345-4562-b3fc-2c963f66afa7",
      startDate: "2024-07-02T00:00:00.000Z",
      endDate: "2024-09-30T00:00:00.000Z",
      consigner: "Alex Smith",
      categoryName: "Outerwear",
      size: "L",
      color: "Black",
      brand: "Saint Laurent",
      gender: "Unisex",
    },
    // Add 8 more items following the same pattern
  ];

  const filteredItemsbyShopID = selectedShopId
    ? fashionItems.filter((item) => item.shopId === selectedShopId)
    : fashionItems;

  const handleAdd = (itemId: string) => {
    console.log(`Item with ID ${itemId} added`);
    // Implementation for adding an item
  };

  return (
    <Card className="container">
      <Card
        className="branches-header"
        style={{
          width: "100%",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "flex-start",
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
          <Typography.Text style={{ color: "white", fontSize: "30px" }}>
            {branches}
          </Typography.Text>
        </Space>
      </Card>
      <Card className="item-display" style={{ backgroundColor: "red" }}>
        <div style={{ marginTop: "20px" }}>
          {filteredItemsbyShopID.map((item) => (
            <DisplayItem
              key={item.itemId}
              item={item} // Pass the filtered item object
              onAdd={() => handleAdd(item.itemId)}
            />
          ))}
        </div>
      </Card>
    </Card>
  );
};

export default Branches;
