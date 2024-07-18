import React, { useState, useEffect } from "react";
import { Card, Button, Divider, Row, Col, Typography, Select, Form, Input, Modal, message } from "antd";
import { useCart } from "./CartContext";
import { DeleteOutlined } from '@ant-design/icons';
import Checkbox from "antd/es/checkbox/Checkbox";
import axios from 'axios';

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
      dispatch({ type: 'REMOVE_FROM_CART', payload: { itemId } });
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

  const handleCheckOut = () => {
    form.validateFields().then((values) => {
      if (!userId) {
        console.error("User ID not found in localStorage");
        console.log('hihi',userId)
        return;
      }

      if (selectedItems.length === 0) {
        message.error("Please select at least one item.");
        return;
      }

      const orderData = {
        paymentMethod: values.paymentMethod,
        recipientName: values.recipientName,
        address: values.address,
        phone: values.phone,
        listItemId: selectedItems, // This is now an array of strings
      };
      console.log('Order Data:', orderData);

      axios.post(`http://giveawayproject.jettonetto.org:8080/api/accounts/${userId}/orders`, orderData)
        .then(response => {
          console.log('Order placed successfully:', response);
          message.success('Order placed successfully');
        })
        .catch(error => {
          console.error('Error placing order:', error);
          message.error('Error placing order');
        });
    }).catch((errorInfo) => {
      console.error('Validation Failed:', errorInfo);
    });
  };

  const calculateTotalPrice = () => {
    return state.cartItems
      .filter((item) => selectedItems.includes(item.itemId))
      .reduce((total, item) => total + item.sellingPrice, 0);
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
                <Col span={4} style={{ display: "flex", justifyContent: "space-between" }}>
                  <Checkbox
                    checked={selectedItems.includes(item.itemId)}
                    onChange={() => handleCheckboxChange(item.itemId)}
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
          <Form layout="vertical" form={form} onValuesChange={() => form.validateFields()}>
            <Form.Item
              label="Payment Method"
              name="paymentMethod"
              rules={[{ required: true, message: "Please select a payment method" }]}
              style={{ marginBottom: "10px" }}
            >
              <Select placeholder="Select payment method" style={{ width: 150 }}>
                <Option value="QRCode">QRCode</Option>
                <Option value="COD">COD</Option>
                <Option value="Wallet points">Wallet points</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Recipient Name"
              name="recipientName"
              rules={[{ required: true, message: "Please enter recipient name" }]}
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
                <Typography style={{ color: 'orange', fontSize: '20px' }}>
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
