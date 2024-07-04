import React from "react";
import { useState } from "react";
import { Button, Card } from "antd";
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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
          // size='small'

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
              placeholder="Username"
              prefix={<UserOutlined />}
            />
          </div>

          <div style={styles.inputContainer}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </div>
          <div style={styles.inputContainer}>
            <Input prefix={<PhoneOutlined />} placeholder="phone" />
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
            />
          </div>
          <div style={styles.inputContainer}>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              size="large"
              placeholder="Confirm Password"
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <Button style={styles.buttonRegisterModalLayout}> Register </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Register;
