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
} from "antd";
import { useCart } from "./CartContext";
import { DeleteOutlined } from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";
import { AccountApi, CartRequest, OrderApi } from "../api";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    try {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        const parsedUserId = JSON.parse(storedUserId);
        setUserId(parsedUserId);
        console.log("User ID:", parsedUserId);
      } else {
        console.warn("No user ID found in localStorage");
      }
    } catch (error) {
      console.error("Error parsing user ID from localStorage:", error);
      notification.error({
        message: "Error",
        description: "Failed to load user information. Please try logging in again.",
      });
    }
  }, []);

  const handleDeleteItem = (item: any) => {
    setItemToRemove(item);
    setShowConfirm(true);
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
              description: "An error occurred during QR Code payment. Please try again.",
            });
          }
          break;
        case "Point":
          try {
            await orderApi.apiOrdersOrderIdPayPointsPost(
              orderId,
              {
                memberId: userId,
              }
            );
            notification.success({
              message: "Success",
              description: "Payment with points successful",
            });
          } catch (error) {
            console.error("Error during Point payment:", error);
            notification.error({
              message: "Payment Error",
              description: "An error occurred during Point payment. Please try again.",
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
    return new Intl.NumberFormat('de-DE').format(balance);
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
            <Card key={item.itemId} style={{ marginBottom: "10px" }}>
              <Row>
                <Col span={8}>
                  <img
                    style={{ height: "250px", objectFit: "cover" }}
                    src={item.images && Array.isArray(item.images) ? item.images[0] : "N/A"}
                    alt={item.name || "Product image"}
                  />
                </Col>
                <Col span={12}>
                  <Typography style={{fontSize:'17px'}}>
                    <strong>Product Name: </strong>
                    {item.name || "N/A"}
                  </Typography>
                  <Typography style={{fontSize:'18px'}}>
                    <strong> Price: {formatBalance(item.sellingPrice || 0)} VND</strong>
                  </Typography>
                  <Typography style={{fontSize:'17px'}}>
                    <strong>Size: </strong>
                    {item.size || "N/A"}
                  </Typography>
                  <Typography style={{fontSize:'17px'}}>
                    <strong>Color: </strong>
                    {item.color || "N/A"}
                  </Typography>
                  <Typography style={{fontSize:'17px'}}>
                    <strong>Brand:</strong> {item.brand || "N/A"}
                  </Typography>
                  <Typography style={{fontSize:'17px'}}>
                    <strong>Gender: </strong> {item.gender || "N/A"}
                  </Typography>
                </Col>
                <Col
                  span={4}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
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
                </Col>
              </Row>
            </Card>
          ))}
          <Divider />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Receiving Information">
          <Form
            layout="vertical"
            form={form}
            onValuesChange={() => form.validateFields()}
          >
            <Form.Item
              label="Payment Method"
              name="paymentMethod"
              rules={[
                { required: true, message: "Please select a payment method" },
              ]}
              style={{ marginBottom: "10px" }}
            >
              <Select
                placeholder="Select payment method"
                style={{ width: 150 }}
              >
                <Option value="QRCode">QRCode</Option>
                <Option value="COD">COD</Option>
                <Option value="Point">Point</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Recipient Name"
              name="recipientName"
              rules={[
                { required: true, message: "Please enter recipient name" },
              ]}
            >
              <Input placeholder="Recipient Name" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
          </Form>
        </Card>
        <Card title="Order Summary">
          <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ fontSize: "20px" }}>
                  <strong> Total price: {formatBalance(calculateTotalPrice())} VND</strong>
                </Typography>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Estimated Delivery & Handling</p>
              </div>
            </div>
            <Button
              type="primary"
              style={{
                marginTop: "20px",
                width: "40%",
                borderRadius: "10px",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={handleCheckOut}
            >
              Check Out
            </Button>
          </div>
        </Card>
      </Col>
      <Modal
        title="Confirm Delete"
        visible={showConfirm}
        onOk={handleConfirmRemove}
        onCancel={() => setShowConfirm(false)}
      >
        <p>Are you sure you want to remove this item from the cart?</p>
      </Modal>
    </Row>
  );
};

export default Cart;