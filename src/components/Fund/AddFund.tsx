import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal, Spin, message } from "antd";
import { SmileOutlined as Icon } from "@ant-design/icons";
import {
  PointPackageApi,
  PointPackageListResponse,
} from "../../api";

type Package = {
  pointPackageId: string;
  points: number;
  price: string;
};

const PointPackageShop = () => {
  const [packages, setPackages] = useState<PointPackageListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PointPackageListResponse | null>(null);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    async function fetchPointPackages() {
      const pointPackageApi = new PointPackageApi();
      const response = await pointPackageApi.apiPointpackagesGet(null!, null!, ["Active"]);
      setPackages(response.data.items || []);
      setIsLoading(false);
    }
    fetchPointPackages();
  }, []);

  const handleBuy = async (pkg: PointPackageListResponse) => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    if (!userId) {
      message.error("User ID not found. Please log in again.");
      return;
    }
    const pointPackageApi = new PointPackageApi();
    try {
      const response = await pointPackageApi.apiPointpackagesPointPackageIdPurchasePost(
        pkg.pointPackageId!,
        { memberId: userId },
      );
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        message.error("Failed to get payment URL. Please try again.");
      }
    } catch (error) {
      console.error("Point package purchase error", error);
      message.error("Point package purchase error");
    }
  };

  const handleIconClick = (pkg: PointPackageListResponse) => {
    setIsModalVisible(true);
    setSelectedPackage(pkg);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getPackageColor = (points: number) => {
    switch (points) {
      case 50000:
        return "rgb(255, 228, 225)"; // Light Pink
      case 100000:
        return "rgb(255, 218, 185)"; // Peach Puff
      case 200000:
        return "rgb(255, 239, 213)"; // Papaya Whip
      case 500000:
        return "rgb(240, 255, 240)"; // Honeydew
      case 1000000:
        return "rgb(224, 255, 255)"; // Light Cyan
      case 2000000:
        return "rgb(230, 230, 250)"; // Lavender
      default:
        return "rgb(255, 255, 255)"; // White
    }
  };
  const formatBalance = (balance:any) => {
    return new Intl.NumberFormat('de-DE').format(balance);
  };
  return (
    <div className="fund-container">
      <Card>
        <h1 style={{ marginBottom: "10px", textAlign: "center" }}>Add Fund</h1>
        <Row gutter={24}>
          <Col span={16}>
            <Row gutter={[24, 24]}>
              {isLoading ? (
                <Spin size="large" />
              ) : packages.length > 0 ? (
                packages.map((pkg) => (
                  <Col span={12} key={pkg.pointPackageId}>
                    <Card
                      style={{ width: "100%", backgroundColor: getPackageColor(pkg.points!) }}
                      title={`${formatBalance(pkg.price)} Points`}
                      extra={<Icon onClick={() => handleIconClick(pkg)} />}
                    >
                      <strong>Price: {formatBalance(pkg.price)} VND</strong>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No packages available</p>
              )}
            </Row>
          </Col>
          <Col span={8}>
            <Card title="Total">
              {selectedPackage && (
                <div>
                  <p>Points: {formatBalance(selectedPackage.points)}</p>
                  <p>Price: {formatBalance(selectedPackage.price)}</p>
                </div>
              )}
              <Button
                onClick={() => selectedPackage && handleBuy(selectedPackage)}
              >
                Checkout
              </Button>
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
          <Button
            key="buy"
            type="primary"
            onClick={() => selectedPackage && handleBuy(selectedPackage)}
          >
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
