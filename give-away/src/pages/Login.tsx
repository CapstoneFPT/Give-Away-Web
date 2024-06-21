import React from "react";
import { useState } from "react";
import { Button, Modal } from "antd";
import {
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Input, Dropdown } from "antd";
import type { MenuProps } from "antd";

import { ApiAuthLoginPostRequest, AuthApi } from "../api/apis/AuthApi";

const Login = () => {
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  console.log(user);
  console.log(password);
  const handleLogout = () => {
    setUser(false); // remove user state
    setDropdownVisible(false); // hide dropdown
    setIsModalLoginOpen(false); // hide modal
  };

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropDownItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/consign">Consign</Link>,
    },
    {
      key: "2",
      label: <Link to="/add-fund">Add Fund</Link>,
    },
    {
      key: "3",
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "4",
      label: (
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      ),
    },
  ];

  const showModalLogin = () => {
    // your logic here
    setIsModalLoginOpen(true); // show modal
    setDropdownVisible(true); // show dropdown
  };

  const handleOk = () => {
    setIsModalLoginOpen(false);
  };
  // const history = useHistory
  const onClickRegister = () => {
    setIsModalLoginOpen(false);
  };
  const onClickForgotPassword = () => {
    setIsModalLoginOpen(false);
  };
  const handleCancel = () => {
    setIsModalLoginOpen(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleLogin = async () => {
    try {
      const request: ApiAuthLoginPostRequest = {
        loginRequest: {
          email: email,
          password: password,
        },
      };

      const authApi = new AuthApi();
      const response = await authApi.apiAuthLoginPost(request);

      if (response.resultStatus === "Success") {
        console.log("Login successfully");

        setUser(true); // set user state here
        setIsModalLoginOpen(false); // hide modal after login
      } else {
        console.error("Failed to login");
      }
    } catch (error) {
      console.error("An error occurred while trying to login:", error);
    }
  };
  const styles: { [key: string]: React.CSSProperties } = {
    buttonLogin: {
      backgroundColor: "#000000",
      color: "white",
      border: "2px solid black",
      padding: "10px 20px",
      fontSize: "16px",
      width: "100px",
      height: "40px",
      fontFamily: "Arial, sans-serif",
    },
    modalLogin: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    inputContainer: {
      width: "90%",
      textAlign: "center",
      marginBottom: "40px",
      marginLeft: "25px",
    },
    loginTitle: {
      fontSize: "40px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "10px",
    },
    buttonLoginModalLayout: {
      textAlign: "center",
      backgroundColor: "#000000",
      color: "white",
      width: "90%",
    },
    buttonLoginModal: {
      backgroundColor: "#434040",
    },
    buttonMenu: {
      backgroundColor: "#000000",
      color: "white",
      border: "2px solid black",
      padding: "10px 20px",
      fontSize: "16px",
      width: "100px",
      height: "40px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "30px",
    },
  };

  return (
    <>
      {user && isDropdownVisible ? (
        <div style={styles.container}>
          <Dropdown menu={{ items: dropDownItems }}>
            <Button type="primary" style={styles.buttonLogin}>
              Menu
            </Button>
          </Dropdown>
        </div>
      ) : (
        <Button
          style={styles.buttonLogin}
          type="primary"
          onClick={showModalLogin}
        >
          Login
        </Button>
      )}
      <Modal
        centered
        width={500}
        footer={null}
        onCancel={handleCancel}
        onOk={handleOk}
        open={isModalLoginOpen}
      >
        <div style={{ height: "550px" }}>
          <h2 style={styles.loginTitle}>Give Away</h2>
          <h3
            style={{
              textAlign: "center",
              marginBottom: "30px",
              color: "#a19696",
            }}
          >
            Login with your email & password
          </h3>
          <div style={styles.inputContainer}>
            <Input
              size="large"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<UserOutlined />}
            />
          </div>
          <div style={styles.inputContainer}>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              size="large"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              prefix={
                isPasswordVisible ? (
                  <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                ) : (
                  <EyeOutlined onClick={togglePasswordVisibility} />
                )
              }
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button style={styles.buttonLoginModalLayout} onClick={handleLogin}>
              {" "}
              Login{" "}
            </Button>
          </div>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <p>-------Or-------</p>
            <Button type="primary" style={{ width: "90%", marginTop: "30px" }}>
              <GoogleOutlined />
              Login with Google
            </Button>
          </div>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <div style={{ marginBottom: "10px" }}>
              Don't have any account?
              <Link onClick={onClickRegister} to={"/register"}>
                {" "}
                Register
              </Link>
            </div>
            <div>
              <Link onClick={onClickForgotPassword} to="/forgotPassword">
                {" "}
                Forgot password
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Login;
