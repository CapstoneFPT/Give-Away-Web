import React from "react";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Row, Col, Form, Input } from "antd";

import img from "../components/Assets/nam2.png";
import NavProfile from "../components/NavProfile/NavProfile";

const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

const Profile: React.FC = () => {
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
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Validate required onBlur"
                      />
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
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="Validate one by one"
                      />
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
