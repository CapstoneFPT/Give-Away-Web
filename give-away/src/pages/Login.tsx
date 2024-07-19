import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Dropdown } from "antd";
import {
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { ApiAuthLoginPostRequest, AuthApi } from "../api/apis/AuthApi";
import { useCart } from "../pages/CartContext";

const Login = () => {
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useCart();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setIsLoggedIn(true);
    }
  }, []);

  const showModalLogin = () => {
    setIsModalLoginOpen(true);
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
        const userId = response.data?.id ?? null;
        localStorage.setItem(
          "user",
          JSON.stringify(response.data?.accessToken)
        );
        localStorage.setItem("userId", JSON.stringify(userId));
        localStorage.setItem("role", JSON.stringify(response.data?.role));

        dispatch({ type: "CLEAR_CART" }); // Clear cart on login
        dispatch({ type: "SET_USER", payload: userId });

        setIsModalLoginOpen(false); // hide modal after login
        setIsLoggedIn(true);
      } else {
        console.error("Failed to login");
      }
    } catch (error) {
      console.error("An error occurred while trying to login:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    dispatch({ type: "CLEAR_CART" }); // Clear cart in context
    localStorage.removeItem("cart"); // Clear cart from localStorage
    // localStorage.clear();
    setIsLoggedIn(false);
  };

  const dropDownItems: MenuProps["items"] = [
    { key: "1", label: <Link to="/consign">Consign</Link> },
    { key: "2", label: <Link to="/add-fund">Add Fund</Link> },
    { key: "3", label: <Link to="/profile">Profile</Link> },
    {
      key: "4",
      label: (
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      ),
    },
  ];

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
      {isLoggedIn ? (
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
              Login
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
              Don't have an account?
              <Link to="/register" onClick={handleCancel}>
                {" "}
                Register{" "}
              </Link>
            </div>
            <div>
              <Link to="/forgotPassword" onClick={handleCancel}>
                {" "}
                Forgot password{" "}
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Login;
