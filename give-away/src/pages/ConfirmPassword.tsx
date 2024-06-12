import React, { CSSProperties } from "react";
import { useState } from "react";
import { Button, Card } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Input } from "antd";

type TextAlign =
  | "left"
  | "right"
  | "center"
  | "justify"
  | "initial"
  | "inherit";

const ConfirmPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const styles: {
    inputContainer: CSSProperties;
    registerTitle: CSSProperties;
    buttonConfirmPassword: CSSProperties;
    buttonLoginModal: CSSProperties;
  } = {
    inputContainer: {
      width: "60%",
      marginBottom: "42px",
      marginLeft: "130px",
    },
    registerTitle: {
      fontSize: "40px",
      fontWeight: "bold",
      textAlign: "center" as TextAlign,
      marginBottom: "10px",
    },
    buttonConfirmPassword: {
      textAlign: "center" as TextAlign,
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
            Change New Password
          </h3>
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
            <Button style={styles.buttonConfirmPassword}> Confirm </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ConfirmPassword;
