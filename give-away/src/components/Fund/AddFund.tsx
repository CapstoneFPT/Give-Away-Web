import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Modal, Spin, message } from "antd";
import { SmileOutlined as Icon } from "@ant-design/icons";

type Package = {
  pointPackageId: number;
  points: number;
  price: string;
};

const PointPackageShop = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    console.log(userId);
    axios
      .get("http://giveawayproject.jettonetto.org:8080/api/pointpackages")
      .then((response) => {
        const data = response.data.items;
        if (Array.isArray(data)) {
          setPackages(data);
        } else {
          message.error("Data is not in expected format");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the packages!", error);
        setIsLoading(false);
      });
  }, []);

  const handleBuy = (pkg: Package) => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    if (!userId) {
      message.error("User ID not found. Please log in again.");
      return;
    }

    axios.post(`http://giveawayproject.jettonetto.org:8080/api/pointpackages/${pkg.pointPackageId}/purchase`, {memberId: userId })
      .then((response) => {
        const { data } = response;
        if (data && data.paymentUrl) {
          window.location.href = data.paymentUrl; // Redirect to payment URL
        } else {
          message.error("Failed to get payment URL. Please try again.");
        }
      })
      .catch((error) => {
        console.error("There was an error purchasing the package!", error);
        message.error("There was an error purchasing the package!");
      });
  };

  const handleIconClick = (pkg: Package) => {
    setIsModalVisible(true);
    setSelectedPackage(pkg);
    console.log(pkg.pointPackageId)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="fund-container">
      <Card>
        <h1 style={{ marginBottom: '10px', textAlign: 'center' }}>Add Fund</h1>
        <Row gutter={24}>
          <Col span={16}>
            <Row gutter={[24, 24]}>
              {isLoading ? (
                <Spin size="large" />
              ) : (
                packages.length > 0 ? (
                  packages.map((pkg) => (
                    <Col span={12} key={pkg.pointPackageId}>
                      <Card
                        style={{ width: "100%" }}
                        title={`${pkg.points} Points`}
                        extra={<Icon onClick={() => handleIconClick(pkg)} />}
                      >
                        <p>Price: {pkg.price}</p>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p>No packages available</p>
                )
              )}
            </Row>
          </Col>
          <Col span={8}>
            <Card title="Total">
              {selectedPackage && (
                <div>
                  <p>Points: {selectedPackage.points}</p>
                  <p>Price: {selectedPackage.price}</p>
                </div>
              )}
              <Button onClick={() => selectedPackage && handleBuy(selectedPackage)}>Checkout</Button>
            </Card>
          </Col>
        </Row>
      </Card>

      <Modal
        title="Package Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="buy" type="primary" onClick={() => selectedPackage && handleBuy(selectedPackage)}>
            Buy
          </Button>,
        ]}
      >
        {selectedPackage && (
          <div>
            <p>Points: {selectedPackage.points}</p>
            <p>Price: {selectedPackage.price}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PointPackageShop;
