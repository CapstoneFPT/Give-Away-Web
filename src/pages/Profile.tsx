import React, { useEffect, useState } from "react";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Row,
  Col,
  Form,
  Input,
  notification,
  Modal,
  Select,
} from "antd";
import img from "../components/Assets/nam2.png";
import NavProfile from "../components/NavProfile/NavProfile";
import "./CSS/Profile.css";
import { AccountApi } from "../api";

const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    if (userId) {
      async function fetchUserData() {
        try {
          const accountApi = new AccountApi();
          const response = await accountApi.apiAccountsIdGet(userId);

          setUserData(response.data);
          form.setFieldsValue({
            fullname: response.data?.data?.fullname!,
            phone: response.data?.data?.phone!,
            email: response.data.data?.email,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data. Please try again later.");
        }
      }

      fetchUserData();
    } else {
      setError("User ID not found in local storage.");
    }
  }, [form]);

  const handleSave = () => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to save the changes?",
      okText: "Confirm",
      okButtonProps: { className: "custom-confirm-button" },
      cancelButtonProps: { className: "custom-cancel-button" },
      onOk: async () => {
        const userId = JSON.parse(localStorage.getItem("userId") || "null");
        if (userId) {
          const result = await form.validateFields();
          const accountApi = new AccountApi();

          try {
            await accountApi.apiAccountsAccountIdPut(userId, {
              fullname: result.fullname,
              phone: result.phone,
            });

            notification.success({
              message: "Success",
              description: "User data updated successfully!",
            });
            setIsFormChanged(false);
          } catch (error) {
            console.error("There was an error updating the user data!", error);
            notification.error({
              message: "Error",
              description:
                "Failed to update user data. Please try again later.",
            });
          }
        }
      },
    });
  };

  const handleAddAddress = () => {
    setIsModalVisible(true); // Show modal when clicking add address
  };

  const handleOk = () => {
    // Logic to save the new address
    console.log("New Address:", newAddress);
    setIsModalVisible(false);
    setNewAddress(""); // Reset new address
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <NavProfile />
        </Col>
        <Col span={19}>
          <Card
            style={{
              borderRadius: "10px",
              boxShadow: "2px 2px 7px #cbc1c1",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={7}>
                <Card title="Profile">
                  <img src={img} style={{ width: "40%" }} alt="" />
                </Card>
              </Col>
              <Col span={16}>
                <Card>
                  {error ? (
                    <p style={{ color: "red" }}>{error}</p>
                  ) : (
                    <Form
                      form={form} // Bind form instance
                      name="trigger"
                      style={{ maxWidth: 600, marginTop: "50px" }}
                      layout="vertical"
                      autoComplete="off"
                      onValuesChange={() => setIsFormChanged(true)} // Track form changes
                    >
                      <Form.Item
                        hasFeedback
                        label="Name"
                        name="fullname"
                        validateTrigger="onBlur"
                        initialValue={userData?.fullname}
                      >
                        <Input
                          value={userData?.fullname}
                          prefix={<UserOutlined />}
                        />
                      </Form.Item>

                      <Form.Item
                        hasFeedback
                        label="Phone"
                        name="phone"
                        initialValue={userData?.phone}
                      >
                        <Input
                          placeholder="{phone}"
                          prefix={<PhoneOutlined />}
                          maxLength={10}
                          onInput={handlePhoneInput}
                        />
                      </Form.Item>

                      <Form.Item
                        hasFeedback
                        label="Email"
                        name="email"
                        validateFirst
                        initialValue={userData?.email}
                        rules={[
                          {
                            type: "email",
                            message: "The input is not valid E-mail!",
                          },
                          {
                            required: true,
                            message: "Please input your E-mail!",
                          },
                        ]}
                      >
                        <Input
                          readOnly
                          value={userData?.email}
                          prefix={<MailOutlined />}
                        />
                      </Form.Item>

                      <Form.Item
                        hasFeedback
                        label="Address"
                        name="address"
                        validateFirst
                      >
                        
                        <Select
                          style={{width:'75%'}}
                          placeholder="Select an address"
                          onChange={(value) => console.log(value)} // Handle address change
                        >
                          <Select.Option value="address1">
                            Address 1
                          </Select.Option>
                          <Select.Option value="address2">
                            Address 2
                          </Select.Option>
                         
                        </Select>
                        <Button
                          type="link" // Thay đổi type thành "dashed" cho nút thêm địa chỉ
                          onClick={handleAddAddress}
                          style={{ marginLeft: "10px", color:'black' }}
                          icon={<PlusOutlined />} // Sử dụng icon cho nút
                        >
                          Add Address
                        </Button>
                        
                      </Form.Item>

                      <Button
                        style={{
                          backgroundColor: "black",
                          width: "120px",
                          height: "40px",
                          color: "white",
                          marginTop: "25px",
                          // marginLeft:'480px'
                        }}
                        onClick={handleSave}
                        disabled={!isFormChanged}
                      >
                        Save
                      </Button>
                    </Form>
                  )}
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Add New Address"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "black", color: "white" } }} // Đổi màu nút OK thành đen

      >
        <Input
          placeholder="Enter new address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)} // Update new address
        />
      </Modal>
    </Card>
  );
};

export default Profile;
