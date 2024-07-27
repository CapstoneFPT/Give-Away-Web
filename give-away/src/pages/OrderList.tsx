import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Button, Tag, Modal, Form, Select, Input } from "antd";
import NavProfile from "../components/NavProfile/NavProfile";
import { useNavigate } from "react-router-dom";
import { AccountApi, OrderApi } from "../api";

const { Option } = Select;

const OrderList = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  console.log(selectedOrder)
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = JSON.parse(localStorage.getItem("userId") || "null");
      console.log(userId);

      if (!userId) {
        setError('User ID not found in localStorage');
        setLoading(false);
        return;
      }

      try {
        const accountApi = new AccountApi();
        const response = await accountApi.apiAccountsAccountIdOrdersGet(userId);
        console.log(response.data);

        const orders = Array.isArray(response.data) ? response.data : response.data?.data?.items || [];
        setData(orders);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const fetchOrderDetails = async (orderId: string) => {
    setDetailsLoading(true);
    try {
      const orderApi = new OrderApi();
      const response = await orderApi.apiOrdersOrderIdOrderdetailsGet(orderId);
      setOrderDetails(response.data?.data!.items || []);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch order details", error);
      setOrderDetails(null!);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCheckout = async (order: any) => {
    setSelectedOrder(order);
    fetchOrderDetails(order.orderId); // Fetch order details when an order is selected
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setOrderDetails([]); // Clear order details when modal is closed
  };

  const columns = [
    {
      title: 'Code Orders',
      dataIndex: 'orderCode',
      key: 'orderCode',
    },
    {
      title: 'Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Completed' ? 'green' : status === 'AwaitingPayment' ? 'yellow' : status === 'OnDelivery' ? 'blue' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: any) => (
        <>
          {record.status === 'AwaitingPayment' ? (
            <Button
              type="primary"
              onClick={() => handleCheckout(record)}
            >
              Checkout
            </Button>
          ) : (
            <Button
              type="primary"
              style={{
                backgroundColor: 'black',
                borderColor: 'black',
                width: '100px',
                height: '35px',
              }}
              onClick={() => navigate(`/order-detail/${record.orderId}`)}
            >
              Detail
            </Button>
          )}
        </>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <NavProfile />
        </Col>
        <Col span={19}>
          <Card
            style={{
              borderRadius: "10px",
              boxShadow: "2px 2px 7px #cbc1c1",
            }}
          >
            <h3
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Order List
            </h3>
            <Table
              dataSource={data}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 4 }}
              style={{ marginTop: '20px' }}
            />
          </Card>
        </Col>
      </Row>
      <div style={{ height: '500px' }}>
        <Modal
          title="Checkout"
          visible={!!selectedOrder}
          onCancel={handleCloseModal}
          footer={null}
          width={1100}
          style={{ top: 20, height: '80vh' }}
        >
          {detailsLoading ? (
            <div>Loading order details...</div>
          ) : (
            selectedOrder && (
              <Row>
                <Col span={16}>
                  <Card title='Product' style={{ marginRight: '20px' }}>
                    <Row>
                      <Col span={24}>
                        {orderDetails.length > 0 ? (
                          orderDetails.map((product) => (
                            <Card key={product.orderDetailId} style={{ marginBottom: '10px' }}>
                              <p>Product Name: {product.fashionItemDetail?.name}</p>
                              <p>Price: {product.fashionItemDetail?.sellingPrice}</p>
                              <p>Color: {product.fashionItemDetail?.color}</p>
                              <p>Size: {product.fashionItemDetail?.size}</p>
                              <p>Gender: {product.fashionItemDetail?.gender}</p>
                              <p>Brand: {product.fashionItemDetail?.brand}</p>
                              <p>Condition: {product.fashionItemDetail?.condition}%</p>
                            </Card>
                          ))
                        ) : (
                          <p>No products available</p>
                        )}
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title='Information to Receiving'>
                    <Form
                      layout="vertical"
                      initialValues={{
                        paymentMethod: selectedOrder.paymentMethod,
                        recipientName: selectedOrder.recipientName,
                        address: selectedOrder.address,
                        contactNumber: selectedOrder.contactNumber                       ,
                      }}
                    >
                      <Form.Item
                        label="Payment Method"
                        name="paymentMethod"
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
                      >
                        <Input placeholder="Recipient Name" disabled />
                      </Form.Item>
                      <Form.Item
                        label="Address"
                        name="address"
                      >
                        <Input placeholder="Address" disabled />
                      </Form.Item>
                      <Form.Item
                        label="contactNumber"
                        name="contactNumber"
                      >
                        <Input placeholder="Phone" disabled />
                      </Form.Item>
                    </Form>
                  </Card>
                  <Card title='Total'>
                    <p>Total Price: {selectedOrder.totalPrice}</p>
                    <Button type="primary">
                      Checkout
                    </Button>
                  </Card>
                </Col>
              </Row>
            )
          )}
        </Modal>
      </div>
    </Card>
  );
};

export default OrderList;