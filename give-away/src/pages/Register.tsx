import React from "react";
import { useState } from "react";
import { Button, Card, message } from "antd"; // Import message from antd
import {
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://giveawayproject.jettonetto.org:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        message.success("Registration successful!");
      } else {
        message.error("Registration failed!");
      }
    } catch (error) {
      message.error("An error occurred!");
    }
  };

  const styles = {
    inputContainer: {
      width: "90%",
      marginBottom: "40px",
      marginLeft: "40px",
    },
    registerTitle: {
      fontSize: "40px",
      fontWeight: "bold",
      textAlign: "center" as const,
      marginBottom: "10px",
    },
    buttonRegisterModalLayout: {
      textAlign: "center" as const,
      backgroundColor: "#000000",
      color: "white",
      width: "15%",
    },
    buttonLoginModal: {
      backgroundColor: "#434040",
    },
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
          <h2 style={styles.registerTitle}>Give Away</h2>
          <h3
            style={{
              textAlign: "center",
              marginBottom: "30px",
              color: "#a19696",
            }}
          >
            Register
          </h3>
          <div style={styles.inputContainer}>
            <Input
              size="large"
              placeholder="Full Name"
              prefix={<UserOutlined />}
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div style={styles.inputContainer}>
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.inputContainer}>
            <Input
              prefix={<PhoneOutlined />}
              placeholder="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.inputContainer}>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              size="large"
              placeholder="Password"
              prefix={
                isPasswordVisible ? (
                  <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                ) : (
                  <EyeOutlined onClick={togglePasswordVisibility} />
                )
              }
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.inputContainer}>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              size="large"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <Button style={styles.buttonRegisterModalLayout} onClick={handleRegister}>
              Register
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Register;