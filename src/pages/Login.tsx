import React, {useEffect, useState} from "react";
import type {MenuProps} from "antd";
import {Avatar, Button, Input, Modal, notification} from "antd";
import {
    EyeInvisibleOutlined,
    EyeOutlined,
    GoogleOutlined,
    LogoutOutlined,
    MoneyCollectOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from '../components/Auth/Auth';

import {useCart} from "../pages/CartContext";
import {AuthApi, LoginRequest} from "../api";

const Login = () => {
    const { login } = useAuth();
    const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
            const request: LoginRequest = {
                email,
                password,
            };

            const authApi = new AuthApi();
            const response = await authApi.apiAuthLoginPost(request);

            if (response.data.resultStatus === "Success") {
                const userId = response.data?.data?.id ?? null;
                const accessToken = response.data?.data?.accessToken;

                login(accessToken ?? ''); 

                localStorage.setItem("userId", JSON.stringify(userId));
                localStorage.setItem("role", JSON.stringify(response.data?.data?.role));

                dispatch({type: "CLEAR_CART"}); // Clear cart on login
                dispatch({type: "SET_USER", payload: userId});

                notification.success({
                    message: 'Login Successful',
                    description: 'You have successfully logged in!',
                });

                setIsModalLoginOpen(false); // hide modal after login
                window.location.reload();
            } else {
                notification.error({
                    message: 'Login Failed',
                    description: response.data.resultStatus || 'NotFound' || 'Duplicated' || 'Error',
                });
            }
        } catch (error: any) {
            console.log(error);
            notification.error({
                message: 'Login Failed',
                description: error.response.data.messages,
            });
            console.error("An error occurred while trying to login:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        dispatch({type: "CLEAR_CART"}); // Clear cart in context
        localStorage.removeItem("cart"); // Clear cart from localStorage
        // localStorage.clear();
        setIsLoggedIn(false);
    };

    const dropDownItems: MenuProps["items"] = [
        {
            key: "2",
            icon: <MoneyCollectOutlined style={{fontSize: '23px'}}/>,
            label: <Link to="/add-fund">Add Fund</Link>
        },
        {key: "3", icon: <UserOutlined style={{fontSize: '20px'}}/>, label: <Link to="/profile">Profile</Link>},
        {
            key: "4",
            label: (
                <Link to="/" onClick={handleLogout}>
                    <LogoutOutlined style={{fontSize: '20px', marginLeft: '9px'}}/>
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
            fontSize: "14px",
            width: "80px",
            height: "37px",
            // fontFamily: "Arial, sans-serif",
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

            <Avatar icon={<UserOutlined style={{
                cursor: "pointer",
            }}/>} onClick={showModalLogin} className="navbar-avatar"/>
            <Modal
                centered
                width={500}
                footer={null}
                onCancel={handleCancel}
                open={isModalLoginOpen}
            >
                <div style={{height: "550px"}}>
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
                            prefix={<UserOutlined/>}
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
                                    <EyeInvisibleOutlined onClick={togglePasswordVisibility}/>
                                ) : (
                                    <EyeOutlined onClick={togglePasswordVisibility}/>
                                )
                            }
                        />
                    </div>
                    <div style={{textAlign: "center"}}>
                        <Button loading={isLoading} style={styles.buttonLoginModalLayout} onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                    {/* <div style={{textAlign: "center", marginTop: "30px"}}>
                        <p>-------Or-------</p>
                        <Button type="primary" style={{width: "90%", marginTop: "30px"}}>
                            <GoogleOutlined/>
                            Login with Google
                        </Button>
                    </div> */}
                    <div style={{marginTop: "20px", textAlign: "center"}}>
                        <div style={{marginBottom: "10px"}}>
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