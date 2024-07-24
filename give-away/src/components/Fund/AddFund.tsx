import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Modal, Spin, message } from "antd";
import { SmileOutlined as Icon } from "@ant-design/icons";
import {
  PointPackageApi,
  PointPackageListResponse,
  PointPackageListResponseFromJSON,
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
    console.log(userId);
    // axios
    //   .get(`${BASE_URL}/pointpackages`, {
    //     headers: {
    //       "ngrok-skip-browser-warning": "6942",
    //     },
    //   })
    //   .then((response) => {
    //     const data = response.data.items;
    //     if (Array.isArray(data)) {
    //       setPackages(data);
    //     } else {
    //       message.error("Data is not in expected format");
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("There was an error fetching the packages!", error);
    //     setIsLoading(false);
    //   });

    async function fetchPointPackages() {
      const pointPackageApi = new PointPackageApi();
      const response = await pointPackageApi.apiPointpackagesGet(
        {},
        {
          headers: {
            "ngrok-skip-browser-warning": "6942",
          },
        }
      );

      setPackages(response.items || []);
      setIsLoading(false);
    }

    fetchPointPackages()
  }, []);

  const handleBuy = async (pkg: PointPackageListResponse) => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    if (!userId) {
      message.error("User ID not found. Please log in again.");
      return;
    }

    // axios
    //   .post(`${BASE_URL}/pointpackages/${pkg.pointPackageId}/purchase`, {
    //     memberId: userId,

    //   },{
    //     headers :{
    //       "ngrok-skip-browser-warning": "6942"
    //     }
    //   })
    //   .then((response) => {
    //     const { data } = response;
    //     if (data && data.paymentUrl) {
    //       window.location.href = data.paymentUrl; // Redirect to payment URL
    //     } else {
    //       message.error("Failed to get payment URL. Please try again.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("There was an error purchasing the package!", error);
    //     message.error("There was an error purchasing the package!");
    //   });

    const pointPackageApi = new PointPackageApi();
    try {
      console.log(pkg.pointPackageId);
      console.log(userId)
      const response =
        await pointPackageApi.apiPointpackagesPointPackageIdPurchasePost({
          pointPackageId: pkg.pointPackageId!,
          purchasePointPackageRequest: {
            memberId: userId,
          },
        });

      if (response.paymentUrl) {
        window.location.href = response.paymentUrl;
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
    console.log(pkg.pointPackageId);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
        open={isModalVisible}
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
