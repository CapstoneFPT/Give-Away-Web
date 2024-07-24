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
import axios from "axios";
import { BASE_URL } from "../api/config";
import { AccountApi, OrderApi } from "../api";

const { Option } = Select;

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    setUserId(userId);
    console.log(userId);
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
      console.log(itemId);
      return updatedSelectedItems;
    });
  };

  const handleCheckOut = async () => {
    // form
    //   .validateFields()
    //   .then((values) => {
    //     if (!userId) {
    //       console.error("User ID not found in localStorage");
    //       console.log("hihi", userId);
    //       return;
    //     }

    //     if (selectedItems.length === 0) {
    //       message.error("Please select at least one item.");
    //       return;
    //     }

    //     const orderData = {
    //       paymentMethod: values.paymentMethod,
    //       recipientName: values.recipientName,
    //       address: values.address,
    //       phone: values.phone,
    //       listItemId: selectedItems, // This is now an array of strings
    //     };
    //     console.log("Order Data:", orderData);

    //     axios
    //       .post(`${BASE_URL}/accounts/${userId}/orders`, orderData, {
    //         headers: {
    //           "ngrok-skip-browser-warning": "6942",
    //         },
    //       })
    //       .then((response) => {
    //         console.log("Order placed successfully:", response);
    //         notification.success({
    //           message: "Success",
    //           description: "Order placed successfully",
    //         });
    //         selectedItems.forEach((itemId) => {
    //           dispatch({ type: "REMOVE_FROM_CART", payload: { itemId } });
    //         });
    //         setSelectedItems([]);

    //         const orderId = response.data.data.orderId;
    //         if (values.paymentMethod === "QRCode") {
    //           axios
    //             .post(
    //               `${BASE_URL}/orders/${orderId}/pay/vnpay`,
    //               { memberId: userId },
    //               {
    //                 headers: {
    //                   "ngrok-skip-browser-warning": "6942",
    //                 },
    //               }
    //             )
    //             .then((response) => {
    //               console.log("Payment successful:", response);
    //               notification.success({
    //                 message: "Payment Success",
    //                 description: "Payment was successful",
    //               });
    //               const paymentUrl = response.data.paymentUrl;
    //               if (paymentUrl) {
    //                 window.location.href = paymentUrl;
    //               }
    //             })
    //             .catch((error) => {
    //               console.error("Error during payment:", error);
    //               notification.error({
    //                 message: "Payment Error",
    //                 description: "Error during payment",
    //               });
    //             });
    //         } else if (values.paymentMethod === "Point") {
    //           axios
    //             .post(
    //               `${BASE_URL}/orders/${orderId}/pay/points`,
    //               { memberId: userId },
    //               {
    //                 headers: {
    //                   "ngrok-skip-browser-warning": "6942",
    //                 },
    //               }
    //             )
    //             .then((response) => {
    //               console.log("Payment successful:", response);
    //               notification.success({
    //                 message: "Payment Success",
    //                 description: "Payment was successful",
    //               });
    //             })
    //             .catch((error) => {
    //               console.error("Error during payment:", error);
    //               notification.error({
    //                 message: "Payment Error",
    //                 description: "Error during payment",
    //               });
    //             });
    //         }
    //       })
    //       .catch((error) => {
    //         console.error("Error placing order:", error);
    //         notification.error({
    //           message: "Error",
    //           description: "Error placing order",
    //         });
    //       });
    //   })
    //   .catch((errorInfo) => {
    //     console.error("Validation Failed:", errorInfo);
    //   });

    try {
      const validateResult = await form.validateFields();
      if (!userId) {
        console.error("User ID not found in localStorage");
        console.log("hihi", userId);
        return;
      }

      if (selectedItems.length === 0) {
        message.error("Please select at least one item.");
        return;
      }

      const orderData = {
        paymentMethod: validateResult.paymentMethod,
        recipientName: validateResult.recipientName,
        address: validateResult.address,
        phone: validateResult.phone,
        listItemId: selectedItems, // This is now an array of strings
      };
      console.log("Order Data:", orderData);

      const accountApi = new AccountApi();

      const response = await accountApi.apiAccountsAccountIdOrdersPost(
        {
          accountId: userId,
          cartRequest: orderData,
        }
      );

      notification.success({
        message: "Success",
        description: "Order placed successfully",
      });
      selectedItems.forEach((itemId) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { itemId } });
      });
      setSelectedItems([]);

      const orderId = response.data?.orderId;

      const orderApi = new OrderApi();

      switch (validateResult.paymentMethod) {
        case "QRCode":
          try {
            const response = await orderApi.apiOrdersOrderIdPayVnpayPost({
              orderId: orderId!,
              purchaseOrderRequest: {
                memberId: userId,
              },
            });

            const paymentUrl = response.paymentUrl;

            if (paymentUrl) {
              window.location.href = paymentUrl;
            }
          } catch (error) {
            notification.error({
              message: "Error",
              description: "Error during payment",
            });
          }
          break;
        case "Point":
          try {
            const response = await orderApi.apiOrdersOrderIdPayPointsPost({
              orderId: orderId!,
              purchaseOrderRequest: {
                memberId: userId,
              },
            });
          } catch (error) {
            notification.error({
              message: "Error",
              description: "Error during payment",
            });
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error)
      notification.error({
        message: "Error",
        description: "Error placing order",
      });
    }
  };
  const calculateTotalPrice = () => {
    return state.cartItems
      .filter((item) => selectedItems.includes(item.itemId!))
      .reduce((total, item) => total + item.sellingPrice!, 0);
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
                  <Typography>{item.name}</Typography>
                </Col>
                <Col span={12}>
                  <Typography>Price: {item.sellingPrice} VND</Typography>
                  <Typography>Size: {item.size}</Typography>
                  <Typography>Branch: {item.shopAddress}</Typography>
                  <Typography>Color: {item.color}</Typography>
                  <Typography>Brand: {item.brand}</Typography>
                  <Typography>Gender: {item.gender}</Typography>
                </Col>
                <Col
                  span={4}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Checkbox
                    checked={selectedItems.includes(item.itemId!)}
                    onChange={() => handleCheckboxChange(item.itemId!)}
                  ></Checkbox>
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
                <Typography style={{ color: "orange", fontSize: "20px" }}>
                  Total price: {calculateTotalPrice()} VND
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
