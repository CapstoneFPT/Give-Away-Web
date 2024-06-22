import React, { useState } from "react";
import {
  AppstoreOutlined,
  LogoutOutlined,
  MailOutlined,
  KeyOutlined,
  DollarOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Button, Menu, Card, Row, Col, Form, Input } from "antd";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import img from "../components/Assets/nam2.png";

type MenuItem = Required<MenuProps>["items"][number];

const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

const MenuItemWithButton = ({ key, icon, label, to }: { key: string; icon: React.ReactNode; label: string; to: string }) => {
  const navigate = useNavigate();
  return (
    <Menu.Item key={key} icon={icon}>
      <Button type="link" onClick={() => navigate(to)}>
        {label}
      </Button>
    </Menu.Item>
  );
};

const Profile: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    { key: "1", icon: <UserOutlined />, label: "Profile", to: "/profile" },
    { key: "2", icon: <KeyOutlined />, label: "Change Password", to: "/change-password" },
    { key: "sub1", icon: <MailOutlined />, label: "Refunds", to: "/refunds" },
    {
      key: "sub2",
      icon: <AppstoreOutlined />,
      label: "Transaction",
      children: [
        { key: "9", label: "Withdraw", to: "/transaction/withdraw" },
        { key: "10", label: "My orders", to: "/transaction/orders" },
        { key: "11", label: "My consign", to: "/transaction/consign" },
        { key: "12", label: "My auction", to: "/transaction/auction" },
      ],
    },
    { key: "3", icon: <LogoutOutlined />, label: "Logout", to: "/logout" },
  ];

  return (
    
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={5}>
            <Card
              title="Wallet points"
              style={{
                borderRadius: "10px",
                boxShadow: "2px 5px 10px #cbc1c1",
              }}
            >
              <div
                style={{
                  fontSize: "35px",
                  color: "#e5ef36",
                  fontWeight: "bolder",
                  textAlign: "center",
                }}
              >
                225 <DollarOutlined />
              </div>
            </Card>
            <Card
              style={{
                borderRadius: "10px",
                boxShadow: "2px 5px 10px #cbc1c1",
                marginTop: "10px",
              }}
            >
              <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
              >
                {items.map((item) =>
                  item.children ? (
                    <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                      {item.children.map((child) => (
                        <MenuItemWithButton key={child.key} icon={null} label={child.label} to={child.to} />
                      ))}
                    </Menu.SubMenu>
                  ) : (
                    <MenuItemWithButton key={item.key} icon={item.icon} label={item.label} to={item.to} />
                  )
                )}
              </Menu>
            </Card>
          </Col>
          <Col span={19}>
            <Card
              style={{
                borderRadius: "10px",
                boxShadow: "2px 2px 7px #cbc1c1",
              }}
            >
              <Row gutter={[16, 16]}>
                <Col span={7}>
                  <Card title="Profile">
                    <img src={img} style={{ width: "40%" }} alt="" />
                  </Card>
                </Col>
                <Col span={16}>
                  <Card>
                    <Form
                      name="trigger"
                      style={{ maxWidth: 600, marginTop: "50px" }}
                      layout="vertical"
                      autoComplete="off"
                    >
                      <Form.Item
                        hasFeedback
                        label="Name"
                        name="field_a"
                        validateTrigger="onBlur"
                        initialValue={"wiwi"}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Validate required onBlur" />
                      </Form.Item>

                      <Form.Item
                        hasFeedback
                        label="Phone"
                        name="field_b"
                        initialValue={"0949601014"}
                      >
                        <Input
                          prefix={<PhoneOutlined />}
                          placeholder="10 numbers"
                          maxLength={10}
                          onInput={handlePhoneInput}
                        />
                      </Form.Item>

                      <Form.Item
                        hasFeedback
                        label="Email"
                        name="field_c"
                        validateFirst
                        rules={[
                          {
                            type: "email",
                            message: "The input is not valid E-mail!",
                          },
                          {
                            required: true,
                            message: "Please input your E-mail!",
                          },
                        ]}
                        initialValue={"wiwinov152000@gmail.com"}
                      >
                        <Input prefix={<MailOutlined />} placeholder="Validate one by one" />
                      </Form.Item>
                      <Button
                        style={{
                          backgroundColor: "black",
                          width: "120px",
                          height: "40px",
                          color: "white",
                          marginLeft: "480px",
                        }}
                      >
                        Save
                      </Button>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>

      
  );
};


export default Profile;
