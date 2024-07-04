import React, { useEffect, useState } from "react";
import { Card, Row, Col, Descriptions, Button, Spin, Tag } from "antd";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavProfile from "../components/NavProfile/NavProfile";

interface Item {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  color: string;
  size: string;
  gender: string;
  brand: string;
}

interface Shop {
  id: string;
  name: string;
  deliveryDate: string;
  shopStatus: string;
  items: Item[];
}

interface Order {
  id: string;
  codeOrders: string;
  date: string;
  orderStatus: string;
  shops: Shop[];
}

const sampleData: Order[] = [
  {
    id: '1',
    codeOrders: 'ORD001',
    date: '2024-06-01',
    orderStatus: 'Cancelled',
    shops: [
      {
        id: 'shop1',
        name: 'Branch HCM',
        shopStatus: 'delivered',
        deliveryDate: '2024-07-08',
        items: [
          { id: 'item1', name: 'Switter', price: '300.000 VND', imageUrl: 'https://helishop.vn/images/detailed/2/d51e3bfa1155f60baf44.jpg', color: 'Blue', size: 'M', gender: 'Men', brand: 'Dickies' },
          { id: 'item2', name: 'Switter', price: '500.000 VND', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQhXPI0aQvyFVKeiZtF-kXG6zPh-8ZAbXxEeNv452abHyNcUy7mjoIDvkDpNOvawKG4Kg&usqp=CAU', color: 'Black', size: 'L', gender: 'Men', brand: 'Dickies' },
        ],
      },
      {
        id: 'shop2',
        name: 'Furniture Shop',
        shopStatus: 'pending',
        deliveryDate: '2024-08-07',
        items: [
          { id: 'item3', name: 'Table', price: '200 USD', imageUrl: 'https://via.placeholder.com/150', color: 'Brown', size: 'Large', gender: 'Unisex', brand: 'Brand C' },
          { id: 'item4', name: 'Chair', price: '100 USD', imageUrl: 'https://via.placeholder.com/150', color: 'Black', size: 'Medium', gender: 'Unisex', brand: 'Brand D' },
        ],
      },
    ],
  },
  {
    id: '2',
    codeOrders: 'ORD002',
    date: '2024-05-15',
    orderStatus: 'awaiting payment',
    shops: [
      {
        id: 'shop3',
        name: 'Book Shop',
        shopStatus: 'delivered',
        deliveryDate: '2024-02-07',
        items: [
          { id: 'item5', name: 'Book A', price: '20 USD', imageUrl: 'https://helishop.vn/images/detailed/2/d51e3bfa1155f60baf44.jpg', color: 'Red', size: 'Standard', gender: 'Unisex', brand: 'Brand E' },
          { id: 'item6', name: 'Book B', price: '30 USD', imageUrl: 'https://via.placeholder.com/150', color: 'Blue', size: 'Standard', gender: 'Unisex', brand: 'Brand F' },
        ],
      },
    ],
  },
  {
    id: '3',
    codeOrders: 'ORD003',
    date: '2024-05-15',
    orderStatus: 'on delivery',

    shops: [
      {
        id: 'shop4',
        name: 'Book Shop',
        deliveryDate: '2024-07-12',
        shopStatus: 'delivered',
        items: [
          { id: 'item7', name: 'Book A', price: '20 USD', imageUrl: 'https://helishop.vn/images/detailed/2/d51e3bfa1155f60baf44.jpg', color: 'Red', size: 'Standard', gender: 'Unisex', brand: 'Brand E' },
          { id: 'item8', name: 'Book B', price: '30 USD', imageUrl: 'https://via.placeholder.com/150', color: 'Blue', size: 'Standard', gender: 'Unisex', brand: 'Brand F' },
        ],
      },
    ],
  },
  // Thêm các đơn hàng khác tương tự
];

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const foundOrder = sampleData.find(order => order.id === id);
      setOrder(foundOrder || null);
      setLoading(false);
    }, 2000);
  }, [id]);

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  }

  if (!order) {
    return <p>Order not found</p>;
  }

  const isRefundEligible = (orderStatus: string, deliveryDate: string, shopStatus: string) => {
    const deliveryDateObj = new Date(deliveryDate);
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
    return orderStatus !== 'cancelled' && deliveryDateObj < sevenDaysAgo && shopStatus === 'delivered';
  };

  const handleRefundClick = (items: Item[]) => {
    navigate("/refunds", { state: { items } });
  };

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
              Order Detail
            </h3>
            <Descriptions bordered>
              <Descriptions.Item label="Code Orders">{order.codeOrders}</Descriptions.Item>
              <Descriptions.Item label="Date">{order.date}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={order.orderStatus === 'Completed' ? 'green' : order.orderStatus === 'awaiting payment' ? 'yellow' : order.orderStatus === 'on delivery' ? 'blue' : 'red'}>
                  {order.orderStatus.toUpperCase()}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
            {order.shops.map(shop => (
              <Card key={shop.id} style={{ marginTop: 16 }}>
                <Descriptions bordered>
                  <Descriptions.Item label="Shop" span={3}>
                    {shop.name} 
                    <Tag color={shop.shopStatus === 'delivered' ? 'green' : shop.shopStatus === 'pending' ? 'yellow' : 'red'} style={{ marginLeft: '10px' }}>
                      {shop.shopStatus.toUpperCase()}
                    </Tag>
                  </Descriptions.Item>
                  {shop.items.map(item => (
                    <Descriptions.Item key={item.id} span={3}>
                      <Row>
                        <Col span={4}>
                          <img src={item.imageUrl} alt={item.name} style={{ width: '100%' }} />
                        </Col>
                        <Col span={20}>
                          <Descriptions bordered column={1}>
                            <Descriptions.Item label="Delivery Date">{shop.deliveryDate}</Descriptions.Item>
                            <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
                            <Descriptions.Item label="Price">{item.price}</Descriptions.Item>
                            <Descriptions.Item label="Color">{item.color}</Descriptions.Item>
                            <Descriptions.Item label="Size">{item.size}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{item.gender}</Descriptions.Item>
                            <Descriptions.Item label="Brand">{item.brand}</Descriptions.Item>
                          </Descriptions>
                        </Col>
                      </Row>
                    </Descriptions.Item>
                  ))}
                </Descriptions>
                {isRefundEligible(order.orderStatus, shop.deliveryDate, shop.shopStatus) && (
                  <Button
                    type="primary"
                    style={{ marginTop: '10px', backgroundColor: 'black', borderColor: 'black', width: '100px', height: '35px' }}
                    onClick={() => handleRefundClick(shop.items)}
                  >
                    Refund
                  </Button>
                )}
              </Card>
            ))}
            <Link to="/order-list">
              <Button
                type="primary"
                style={{
                  backgroundColor: 'black',
                  borderColor: 'black',
                  width: '100px',
                  height: '35px',
                  marginTop: '20px',
                }}
              >
                Back
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderDetail;