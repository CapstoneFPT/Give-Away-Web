import React, { useState, useRef } from "react";
import { Button, Card, Form, Input, notification, Modal } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { AuthApi } from "../api";

interface Styles {
  inputContainer: React.CSSProperties;
  buttonSendModalLayout: React.CSSProperties;
  fogotPasswordTitle: React.CSSProperties;
  otpInput: React.CSSProperties;
  modalButton: React.CSSProperties;
}

const ForgotPassword = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const styles: Styles = {
    inputContainer: {
      width: "80%",
      justifyContent: "center",
      marginBottom: "40px",
      marginLeft: "80px",
    },
    buttonSendModalLayout: {
      textAlign: "center",
      backgroundColor: "#000000",
      color: "white",
      width: "20%",
    },
    fogotPasswordTitle: {
      fontSize: "40px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "10px",
    },
    otpInput: {
      width: "40px",
      height: "40px",
      textAlign: "center",
      marginRight: "10px",
    },
    modalButton: {
      backgroundColor: "#000000",
      color: "white",
      border: "none",
      width: "80px",
    },
  };

  const onFinish = async (values: any) => {
    const { email, password, confirmPassword } = values; // Lấy giá trị từ form
    try {
      const fogotPassWordApi = new AuthApi();
      const response = await fogotPassWordApi.apiAuthForgotPasswordGet(email, password, confirmPassword); // Thêm await ở đây
      
      if (response) {
        notification.success({
          message: "Success",
          description:
            "Your password reset request has been sent. Please check your email for the OTP.",
        });
        setIsModalVisible(true);
      } else {
        throw new Error("Failed to send password reset request");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "An error occurred while processing your request.",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    notification.error({
      message: "Error",
      description: "Please fill in all required fields.",
    });
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field if the current one is filled
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpSubmit = async () => {
    const confirmtoken = otp.join(""); // Chuyển mảng OTP thành chuỗi

    if (confirmtoken.length === 6) {
      const confirmOTP = new AuthApi();
      try {
        const response = await confirmOTP.apiAuthResetPasswordPut(confirmtoken); // Sử dụng API call mới

        if (response) {
          notification.success({
            message: "OTP Verified",
            description: "Your OTP has been verified successfully.",
          });
          setIsModalVisible(false);
        } else {
          throw new Error("Failed to verify OTP");
        }
      } catch (error) {
        if (error instanceof Error) {
          notification.error({
            message: "Error",
            description: `An error occurred while verifying your OTP: ${error.message}`,
          });
        } else {
          notification.error({
            message: "Error",
            description: "An unknown error occurred while verifying your OTP.",
          });
        }
      }
    } else {
      notification.error({
        message: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
      });
    }
};

  return (
    <>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Card
          bordered={false}
          style={{
            width: 700,
            marginTop: "30px",
            justifyContent: "center",
          }}
        >
          <h2 style={styles.fogotPasswordTitle}>Give Away</h2>
          <h3
            style={{
              textAlign: "center",
              marginBottom: "30px",
              color: "#a19696",
            }}
          >
            Forgot password
          </h3>

          <Form
            name="forgot_password"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
              style={styles.inputContainer}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your Password!" }]}
              style={styles.inputContainer}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your Password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
              style={styles.inputContainer}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={styles.buttonSendModalLayout}
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      <Modal
        title="Enter your code for reset password"
        visible={isModalVisible}
        footer={[
          <Button
            key="cancel"
            onClick={() => setIsModalVisible(false)}
            style={styles.modalButton}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOtpSubmit}
            style={styles.modalButton}
          >
            OK
          </Button>,
        ]}
        onCancel={() => setIsModalVisible(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          {otp.map((value, index) => (
            <Input
              key={index}
              value={value}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              maxLength={1}
              style={styles.otpInput}
              ref={(el) =>
                (inputRefs.current[index] = el as HTMLInputElement | null)
              }
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ForgotPassword;