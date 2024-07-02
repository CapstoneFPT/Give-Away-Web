import React from "react";

import {
  Button,
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined, SendOutlined } from "@ant-design/icons";
import NavProfile from "../components/NavProfile/NavProfile";
const { Option } = Select;
const styles = {
  buttonRefunds: {
    marginLeft: "80%",
    backgroundColor: "#000000",
    color: "white",
    width: "20%",
    height: "50px",
    border: "2px solid black",
    padding: "10px 20px",
    borderRadius: "30px",
  },
  formContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
};
const Withdraw = () => {
  const handleSubmit = (values: any) => {
    // Simulate a successful form submission
    message.success("Refund request sent successfully!");
    console.log("Form values: ", values);
  };

  const handleSubmitFailed = (errorInfo: any) => {
    // Handle form submission failure
    message.error("Send refund request failed. Please check your information!");
    console.log("Failed:", errorInfo);
  };
  const banks = [
    "Vietcombank",
    "Techcombank",
    "BIDV",
    "VietinBank",
    "Agribank",
    "ACB",
    "Sacombank",
    "VPBank",
    "MB Bank",
    "TPBank",
    // Add more banks as needed
  ];

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <NavProfile />
        </Col>
        <Col span={19}>
          <Card
            style={{ borderRadius: "10px", boxShadow: "2px 2px 7px #cbc1c1" }}
          >
            <h3
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Withdraw
            </h3>

            <Form
              style={styles.formContainer}
              name="refundForm"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              onFinishFailed={handleSubmitFailed}
            >
              <Form.Item
                name="bankAccount"
                label="Bank Account"
                rules={[
                  {
                    required: true,
                    message: "Please enter your bank account number!",
                  },
                ]}
              >
                <Input
                  type="text"
                  style={{ width: "93%" }}
                  placeholder="Enter your bank account number"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                name="bankName"
                label="Bank Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the amount to be refunded!",
                  },
                ]}
              >
                <Input
                  type="text"
                  style={{ marginLeft: "2%", width: "91%" }}
                  placeholder="Enter your bank name"
                />
              </Form.Item>
              <Form.Item
                name="bank"
                label="Bank"
                rules={[
                  {
                    required: true,
                    message: "Please select or enter your bank!",
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ marginLeft: "8%", width: "86%" }}
                  placeholder="Select or enter your bank"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    typeof option?.children === "string" &&
                    (option.children as string)
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {banks.map((bank) => (
                    <Option key={bank} value={bank}>
                      {bank}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[
                  {
                    required: true,
                    message: "Please enter the amount to be refunded!",
                  },
                ]}
              >
                <Input
                  type="text"
                  style={{ marginLeft: "5%", width: "89%" }}
                  placeholder="Enter the amount to be refunded"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  style={styles.buttonRefunds}
                  type="primary"
                  htmlType="submit"
                >
                  Send request
                  {<SendOutlined />}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default Withdraw;
