import React, {useState} from "react";
import {Button, Card, Form, Input, message, notification} from "antd"; // Import message from antd
import {LockOutlined, MailOutlined, PhoneOutlined, UserOutlined,} from "@ant-design/icons";
import {AuthApi, RegisterRequest} from "../api";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [form] = Form.useForm<RegisterRequest>();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleRegister = async (values: RegisterRequest) => {
        setIsLoading(true)
        if (values.password !== values.confirmPassword) {
            message.error("Passwords do not match!");
            return;
        }

        try {
            const authApi = new AuthApi();
            const response = await authApi.apiAuthRegisterPost(values);

            if (response.data.resultStatus === "Success") {
                notification.success({
                    message: "Registration successful!",
                    description: "You have successfully registered. Check your email to verify your account.",
                });

                setTimeout(() => {
                    navigate("/");
                }, 1000)
            } else {
                message.error("Registration failed!");
            }
        } catch (error) {
            console.log(error);
            // @ts-expect-error This should return a result type
            message.error(error.response.data.messages);
        } finally {
            setIsLoading(false);
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
            backgroundColor: "#000000",
            color: "white",
            width: "15%",
        },
    };

    return (
        <div style={{justifyContent: "center", display: "flex"}}>
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
                <Form form={form} onFinish={handleRegister} layout="vertical">
                    <Form.Item
                        name="fullname"
                        rules={[{required: true, message: "Please input your full name!"}]}
                        style={styles.inputContainer}
                    >
                        <Input size="large" placeholder="Full Name" prefix={<UserOutlined/>}/>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {required: true, message: "Please input your email!"},
                            {type: "email", message: "Please enter a valid email!"},
                        ]}
                        style={styles.inputContainer}
                    >
                        <Input placeholder="Email" prefix={<MailOutlined/>}/>
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        rules={[{required: true, message: "Please input your phone number!"},{
                            pattern:/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, message: 'Please enter a valid phone number!'
                        }]}
                        style={styles.inputContainer}
                    >
                        <Input placeholder="Phone" prefix={<PhoneOutlined/>}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: "Please input your password!"},{
                            min: 6, message: 'Password must be at least 6 characters!'
                        },{
                            pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, message: 'Password must contain at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character!'
                        }]}
                        style={styles.inputContainer}
                    >
                        <Input.Password
                            placeholder="Password"
                            prefix={<LockOutlined/>}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {required: true, message: "Please confirm your password!"},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("The two passwords do not match!"));
                                },
                            }),
                        ]}
                        style={styles.inputContainer}
                    >
                        <Input.Password prefix={<LockOutlined/>} placeholder="Confirm Password"/>
                    </Form.Item>

                    <Form.Item style={{textAlign: "center"}}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={styles.buttonRegisterModalLayout}
                            loading={isLoading}
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Register;
