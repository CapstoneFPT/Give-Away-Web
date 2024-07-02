import React, { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Button, Card, Row, Col, Form, Input, message } from "antd";
import NavProfile from '../components/NavProfile/NavProfile';

const ChangePassword = () => {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onFinish = (values:any) => {
    message.success('Password changed successfully!');
    console.log('Success:', values);
  };

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <NavProfile />
        </Col>
        <Col span={19}>
          <Card style={{ borderRadius: "10px", boxShadow: "2px 2px 7px #cbc1c1" ,alignItems: "center", display:'flex', flexDirection: "column" }} >
            <h3 style={{ fontSize: "40px", fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>Change Password</h3>
            <Form
              name="change_password"
              style={{ maxWidth: '800px', marginTop: "40px"}}
              layout="vertical"
              autoComplete="off"
              onFinish={onFinish}
            >
              <Form.Item
                hasFeedback
                label="Your Password"
                name="currentPassword"
                rules={[{ required: true, message: 'Please input your current password!' }]}
              >
                <Input
                  type={currentPasswordVisible ? "text" : "password"}
                  prefix={
                    currentPasswordVisible ? 
                      <EyeInvisibleOutlined onClick={() => setCurrentPasswordVisible(false)} /> : 
                      <EyeOutlined onClick={() => setCurrentPasswordVisible(true)} />
                  }
                />
              </Form.Item>

              <Form.Item
                hasFeedback
                label="New Password"
                name="newPassword"
                rules={[{ required: true, message: 'Please input your new password!' }]}
              >
                <Input
                  type={newPasswordVisible ? "text" : "password"}
                  prefix={
                    newPasswordVisible ? 
                      <EyeInvisibleOutlined onClick={() => setNewPasswordVisible(false)} /> : 
                      <EyeOutlined onClick={() => setNewPasswordVisible(true)} />
                  }
                />
              </Form.Item>

              <Form.Item
                hasFeedback
                label="Confirm New Password"
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your new password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input
                  type={confirmPasswordVisible ? "text" : "password"}
                  prefix={
                    confirmPasswordVisible ? 
                      <EyeInvisibleOutlined onClick={() => setConfirmPasswordVisible(false)} /> : 
                      <EyeOutlined onClick={() => setConfirmPasswordVisible(true)} />
                  }
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: "black",
                    width: "120px",
                    height: "40px",
                    color: "white",
                    marginLeft: "480px",
                  }}
                >
                  Change
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Card>
  )
}

export default ChangePassword;
