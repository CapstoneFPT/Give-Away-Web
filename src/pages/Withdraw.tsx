import React, { useState } from "react"; // Thêm useState
import {
  Button,
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import NavProfile from "../components/NavProfile/NavProfile";
import { AccountApi } from "../api";

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

const Withdraw =  () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  console.log(userId);
  
  const [form] = Form.useForm(); // Khởi tạo form
  const [amount, setAmount] = useState(0); // State để lưu số tiền

  const handleSubmit = async (values: any) => {
    // Xác nhận số tiền cần rút
    const confirmWithdraw = window.confirm(`Bạn có chắc chắn muốn rút ${values.amount} không?`);
    if (!confirmWithdraw) return;

    try {
      // Tạo body dữ liệu theo định dạng yêu cầu
      const requestBody = {
        amount: values.amount,
        bank: values.bank,
        bankAccountNumber: values.bankAccount,
        bankAccountName: values.bankName,
      };

      // Gọi API để rút tiền với userId
      // const response = await axios.post(
      //   `${BASE_URL}/accounts/${userId}/withdraws`,
      //   requestBody // Truyền dữ liệu vào body
      // );

      const accountApi = new AccountApi();
      const response = await accountApi.apiAccountsAccountIdWithdrawsPost(
        userId,
        requestBody
      )
      message.success("Refund request sent successfully!");
      console.log("Form values: ", values);
      console.log("API response: ", response); // Log phản hồi từ API

      // Reset form sau khi gửi thành công
      form.resetFields();
    } catch (error) {
      message.error("Send refund request failed. Please check your information!");
      console.error("API error: ", error); // Log lỗi từ API
    }
  };

  const handleSubmitFailed = (errorInfo: any) => {
    // Handle form submission failure
    message.error("Send refund request failed. Please check your information!");
    console.log("Failed:", errorInfo);
  };

  // const vietqr = new VietQR();

  // const bankResponse = await vietqr.getBanks();
  // console.log(bankResponse)
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
              form={form} // Gán form vào component
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
                    message: "Please enter the bank name!",
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
                  onChange={(e) => setAmount(Number(e.target.value))} // Cập nhật số tiền
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