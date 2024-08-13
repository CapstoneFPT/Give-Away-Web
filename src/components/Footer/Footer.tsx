import React from "react";
import "./Footer.css"; // Update styles as needed
import footer_logo from "../Assets/logo_big.png";
import secondhand_clothes_image from "../Assets/hero_image.png"; // Add your image here
import { Col, Row, Typography, Space, Input, Button } from "antd";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const Footer = () => {
  return (
    <div style={{ backgroundColor: "black", width: '100%', padding: '40px 0', overflow: 'hidden' }}>
      <Row gutter={[16, 16]} justify="space-between" style={{ padding: '0 40px' }}>
        <Col xs={24} sm={12} md={8}>
          <Space direction="horizontal" align="center">
            <img style={{ width: "70%", maxWidth: "150px" }} src={footer_logo} alt="Logo" />
            <div>
              <Title level={2} style={{ color: 'white', margin: 0 }}>Give Away</Title>
              <Space direction="vertical" size="small">
                <Text style={{ color: 'white', fontSize: '16px' }}><PhoneOutlined /> +123 456 7890</Text>
                <Text style={{ color: 'white', fontSize: '16px' }}><MailOutlined /> info@giveaway.com</Text>
              </Space>
             
            </div>
          </Space>
         
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Title level={4} style={{ color: 'white' }}>Customer Service</Title>
          <ul style={{ listStyleType: 'disc', padding: '0 0 0 20px', color: 'white', fontSize: '16px' }}>
            <li>FAQ</li>
            <li>Shipping Info</li>
            <li>Returns</li>
            <li>Privacy Policy</li>
          </ul>
          
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Title level={4} style={{ color: 'white' }}>Follow Us</Title>
          <Space direction="horizontal" size="large">
            <InstagramOutlined style={{ color: 'white', fontSize: '30px' }} />
            <FacebookOutlined style={{ color: 'white', fontSize: '30px' }} />
            <TwitterOutlined style={{ color: 'white', fontSize: '30px' }} />
          </Space>
          <Title level={4} style={{ color: 'white', marginTop: '20px' }}>Subscribe to Our Newsletter</Title>
          <Input placeholder="Enter your email" style={{ padding: '10px', width: '80%', marginBottom: '10px' }} />
          <Button type="primary" style={{ padding: '10px 20px', backgroundColor: 'white', color: 'black' }}>Subscribe</Button>
        </Col>
      </Row>
      <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px 0', backgroundColor: 'black' }}>
        <Paragraph style={{ color: 'white' }}>© 2024 Give Away - All Rights Reserved</Paragraph>
      </div>
    
    </div>
  );
};

export default Footer;
