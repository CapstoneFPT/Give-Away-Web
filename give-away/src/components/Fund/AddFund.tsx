import React from "react";
import { Card, Button } from "antd";
import "./AddFund.css";
import { Row, Col, Modal } from "antd";
import { useState } from "react";
import { SmileOutlined as Icon } from "@ant-design/icons";
type Package = {
  id: number;
  points: number;
  price: string;
};

const packages: Package[] = [
  { id: 1, points: 100, price: "$10" },
  { id: 2, points: 200, price: "$18" },
  { id: 3, points: 500, price: "$40" },
  { id: 4, points: 500, price: "$40" },
  { id: 5, points: 500, price: "$40" },
  { id: 6, points: 500, price: "$40" },
  { id: 7, points: 500, price: "$40" },
  { id: 8, points: 500, price: "$40" },
  { id: 9, points: 500, price: "$40" },
  { id: 10, points: 500, price: "$40" },
  { id: 11, points: 500, price: "$40" },
  { id: 12, points: 500, price: "$40" },
  { id: 13, points: 500, price: "$40" },
  // Add more packages as needed
];

const PointPackageShop = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const handleBuy = (id: number) => {
    console.log(`Buying package with id: ${id}`);
    // Handle buying logic here
  };

  const handleIconClick = (pkg: Package) => {
    setIsModalVisible(true);
    setSelectedPackage(pkg);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="fund-container">
      <Row gutter={24}>
        {packages.map((pkg) => (
          <Col span={12} key={pkg.id}>
            <Card
              title={`${pkg.points} Points`}
              extra={
                <Icon type="info-circle" onClick={() => handleIconClick(pkg)} />
              }
            >
              <p>Price: {pkg.price}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        {selectedPackage && (
          <div>
            <h2>{selectedPackage.points} Points</h2>
            <p>Price: {selectedPackage.price}</p>
            <p>Note: This cannot be refund</p>
            <Button
              type="primary"
              onClick={() => handleBuy(selectedPackage.id)}
            >
              Buy Now
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PointPackageShop;
