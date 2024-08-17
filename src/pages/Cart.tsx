import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Divider,
  Row,
  Col,
  Typography,
  Select,
  Form,
  Input,
  Modal,
  message,
  notification,
  Table,
  Image,
} from "antd";
import { useCart } from "./CartContext";
import { DeleteOutlined } from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";
import {
  AccountApi,
  AddressApi,
  CartRequest,
  GHNDistrictResponse,
  GHNProvinceResponse,
  GHNWardResponse,
  OrderApi,
} from "../api";
import { useNavigate } from "react-router-dom";
import Column from "antd/es/table/Column";

const { Option } = Select;

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
 
  const [provinces, setProvinces] = useState<GHNProvinceResponse[]>([]);
  const [districts, setDistricts] = useState<GHNDistrictResponse[]>([]);
  const [wards, setWards] = useState<GHNWardResponse[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedDistricts, setSelectedDistricts] = useState<number | null>(
    null
  );
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  console.log(userId)
  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const addressApi = new AddressApi();
        const provinceResponse = await addressApi.apiAddressesProvincesGet();
        setProvinces(provinceResponse.data.data!);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchAddressData();
  }, []);

  const handleDeleteItem = (item: any) => {
    setItemToRemove(item);
    setShowConfirm(true);
  };

  const handleSelectProvince = async (provinceId: number) => {
    setSelectedProvince(provinceId);
    console.log(provinceId);
    try {
      const addressApi = new AddressApi();
      const districtResponse = await addressApi.apiAddressesDistrictsGet(
        provinceId
      );
      setDistricts(districtResponse.data.data!);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleSelectDistricts = async (districtsId: number) => {
    setSelectedProvince(districtsId);
    console.log(districtsId);
    try {
      const addressApi = new AddressApi();
      const wardResponse = await addressApi.apiAddressesWardsGet(districtsId);
      setWards(wardResponse.data.data!);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      const { itemId } = itemToRemove;
      dispatch({ type: "REMOVE_FROM_CART", payload: { itemId } });
      setShowConfirm(false);
      setItemToRemove(null);
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((id) => id !== itemId)
      );
    }
  };

  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId];
      console.log("Selected item:", itemId);
      return updatedSelectedItems;
    });
  };

  const handleCheckOut = async () => {
    try {
      const validateResult = await form.validateFields();
      if (!userId) {
        notification.error({
          message: "Error",
          description: "User ID not found. Please log in and try again.",
        });
        return;
      }

      if (selectedItems.length === 0) {
        message.error("Please select at least one item.");
        return;
      }

      const orderData: CartRequest = {
        paymentMethod: validateResult.paymentMethod,
        recipientName: validateResult.recipientName,
        address: validateResult.address,
        phone: validateResult.phone,
        itemIds: selectedItems,
      };

      console.log("Order Data:", orderData);

      const accountApi = new AccountApi();

      const response = await accountApi.apiAccountsAccountIdOrdersPost(
        userId,
        orderData
      );

      notification.success({
        message: "Success",
        description: "Order placed successfully",
      });
      selectedItems.forEach((itemId) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { itemId } });
      });
      setSelectedItems([]);

      const orderId = response.data?.data?.orderId;
      if (!orderId) {
        throw new Error("Order ID not returned from the server");
      }

      const orderApi = new OrderApi();

      switch (validateResult.paymentMethod) {
        case "QRCode":
          try {
            const response = await orderApi.apiOrdersOrderIdPayVnpayPost(
              orderId,
              {
                memberId: userId,
              }
            );

            const paymentUrl = response.data.paymentUrl;

            if (paymentUrl) {
              window.location.href = paymentUrl;
            } else {
              throw new Error("Payment URL not received");
            }
          } catch (error) {
            console.error("Error during QR Code payment:", error);
            notification.error({
              message: "Payment Error",
              description:
                "An error occurred during QR Code payment. Please try again.",
            });
          }
          break;
        case "Point":
          try {
            await orderApi.apiOrdersOrderIdPayPointsPost(orderId, {
              memberId: userId,
            });
            notification.success({
              message: "Success",
              description: "Payment with points successful",
            });
          } catch (error) {
            console.error("Error during Point payment:", error);
            notification.error({
              message: "Payment Error",
              description:
                "An error occurred during Point payment. Please try again.",
            });
          }
          break;
        case "COD":
          notification.success({
            message: "Success",
            description: "Cash on Delivery order placed successfully",
          });
          break;
        default:
          notification.error({
            message: "Error",
            description: "Invalid payment method selected",
          });
          return;
      }
      navigate("/");
    } catch (error) {
      console.error("Error during checkout:", error);
      notification.error({
        message: "Checkout Error",
        description: "An error occurred during checkout. Please try again.",
      });
    }
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("de-DE").format(balance);
  };

  const calculateTotalPrice = () => {
    return state.cartItems
      .filter((item) => selectedItems.includes(item.itemId!))
      .reduce((total, item) => total + (item.sellingPrice || 0), 0);
  };

  return (
    <Row>
      <Col span={16}>
        <Card style={{ maxHeight: "calc(120vh - 100px)", overflowY: "auto" }}>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            SHOPPING BAG
          </h1>
          {state.cartItems.map((item) => (
            <Card style={{ maxHeight: "calc(120vh - 100px)", overflowY: "auto" }}>
            <Table dataSource={state.cartItems} rowKey="itemId" pagination={false}>
              <Column title="Image" dataIndex="images" render={(images) => (
                <Image
                  style={{ height: "150px", width: "150px" }}
                  src={images && Array.isArray(images) ? images[0] : "N/A"}
                  alt="Product"
                />
              )} />
              <Column title="Product Name" dataIndex="name" render={(name) => name || "N/A"} />
              <Column title="Price" dataIndex="sellingPrice" render={(sellingPrice) => formatBalance(sellingPrice || 0) + " VND"} />
              <Column title="Size" dataIndex="size" render={(size) => size || "N/A"} />
              <Column title="Color" dataIndex="color" render={(color) => color || "N/A"} />
              <Column title="Brand" dataIndex="brand" render={(brand) => brand || "N/A"} />
              <Column title="Gender" dataIndex="gender" render={(gender) => gender || "N/A"} />
              <Column title="Condition" dataIndex="condition" render={(condition) => condition || "N/A"} />
              <Column
                title="Actions"
                render={(item) => (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Checkbox
                      checked={selectedItems.includes(item.itemId!)}
                      onChange={() => handleCheckboxChange(item.itemId!)}
                    />
                    <Button
                      type="link"
                      danger
                      onClick={() => handleDeleteItem(item)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                )}
              />
            </Table>
          </Card>
          ))}
          <Modal
            title="Confirm Removal"
            visible={showConfirm}
            onOk={handleConfirmRemove}
            onCancel={() => setShowConfirm(false)}
            okText="Remove"
            okButtonProps={{ danger: true }}
          >
            <p>Are you sure you want to remove this item?</p>
          </Modal>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Typography.Title level={4}>Delivery Information</Typography.Title>
          <Form layout="vertical" form={form}>
            <Form.Item
              name="recipientName"
              label="Recipient Name"
              rules={[{ required: true, message: "Please enter recipient name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="province"
              label="Province"
              rules={[{ required: true, message: "Please select a province" }]}
            >
              <Select
                showSearch
                placeholder="Select a province"
                onChange={handleSelectProvince}
                filterOption={(input, option) =>
                  (option?.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {provinces.map((province) => (
                  <Option key={province.provinceId} value={province.provinceId}>
                    {province.provinceName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="district"
              label="District"
              rules={[{ required: true, message: "Please select a district" }]}
            >
              <Select
                showSearch
                placeholder="Select a district"
                onChange={handleSelectDistricts}
                filterOption={(input, option) =>
                  (option?.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {districts.map((district) => (
                  <Option
                    key={district.districtId}
                    value={district.districtId}
                  >
                    {district.districtName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="Wards"
              label="Ward"
              rules={[{ required: true, message: "Please select a ward" }]}
            >
              <Select
                showSearch
                placeholder="Select a ward"
                filterOption={(input, option) =>
                  (option?.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {wards.map((ward) => (
                  <Option key={ward.wardCode} value={ward.wardCode}>
                    {ward.wardName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="paymentMethod"
              label="Payment Method"
              rules={[
                { required: true, message: "Please select a payment method" },
              ]}
            >
              <Select placeholder="Select payment method">
                <Option value="QRCode">QRCode</Option>
                <Option value="Point">Point</Option>
                <Option value="COD">COD</Option>
              </Select>
            </Form.Item>
          </Form>
          <Divider />
          <Typography.Title level={4}>
            Total Price: {formatBalance(calculateTotalPrice())} VND
          </Typography.Title>
          <Button
            type="primary"
            block
            onClick={handleCheckOut}
            disabled={selectedItems.length === 0}
          >
            Check Out
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
