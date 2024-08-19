import React from "react";
import { useState } from "react";
import { Button, Card, message, notification } from "antd"; // Import message from antd
import {
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { AuthApi } from "../api";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
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
      
      const authApi = new AuthApi()
      const response = await authApi.apiAuthRegisterPost(formData)

      if (response) {
        notification.success({
          message : "Registration successful!",
          description : "You have successfully registered. Check your email to verify your account.",
        });
      } else {
        message.error("Registration failed!");
      }
    } catch (error:any) {
      console.log(error)
      message.error(error.response.data.messages);
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
              name="fullname"
              value={formData.fullname}
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
            <Button
              style={styles.buttonRegisterModalLayout}
              onClick={handleRegister}
            >
              Register
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Register;
