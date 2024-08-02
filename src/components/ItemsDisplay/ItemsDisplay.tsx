import React from "react";
import { Button, Card, Typography } from "antd";

// Assuming a fashion item has at least these properties
interface FashionItem {
  itemId: string;
  name: string;
  sellingPrice: number;
}

const DisplayItem: React.FC<{ item: FashionItem; onAdd: () => void }> = ({
  item,
  onAdd,
}) => {
  return (
    <Card
      style={{
        width: "100%",
        backgroundColor: "#f0f2f5",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography.Text style={{ fontSize: "16px" }}>
        {item.name}
      </Typography.Text>
      <Typography.Text style={{ fontSize: "16px" }}>
        ${item.sellingPrice}
      </Typography.Text>
      <Button style={{ backgroundColor: "black", color: "white" }} type="primary" onClick={onAdd}>
        Add
      </Button>
    </Card>
  );
};

export default DisplayItem;
