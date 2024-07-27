import React, { useState } from "react";
import { Button, Card, Row, Col, Form, Input, Upload, message, Table, Checkbox } from "antd";
import { UploadOutlined, SendOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import NavProfile from "../components/NavProfile/NavProfile";

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
  checkbox: {
    color: 'black',
  },
};

const Refunds = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items } = location.state || { items: [] };
  const [form] = Form.useForm();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

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

  const handleItemSelect = (item: any, checked: boolean) => {
    const newSelectedItems = checked
      ? [...selectedItems, item]
      : selectedItems.filter((i) => i.id !== item.id);
    setSelectedItems(newSelectedItems);
    const totalAmount = newSelectedItems.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^0-9.-]+/g, "")), 0);
    form.setFieldsValue({ amount: totalAmount });
    setSelectAll(newSelectedItems.length === items.length);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelectedItems = checked ? items : [];
    setSelectedItems(newSelectedItems);
    const totalAmount = newSelectedItems.reduce((sum: number, item: any) => sum + parseFloat(item.price.replace(/[^0-9.-]+/g, "")), 0);
    form.setFieldsValue({ amount: totalAmount });
    setSelectAll(checked);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text: string) => <img src={text} alt="item" style={{ width: '50px', height: '50px' }} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Select',
      key: 'select',
      render: (text: any, record: any) => (
        <Checkbox
          onChange={(e) => handleItemSelect(record, e.target.checked)}
          checked={selectedItems.some((item) => item.id === record.id)}
          style={styles.checkbox}
        />
      ),
    },
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
              Refunds
            </h3>

            <Form
              form={form}
              style={styles.formContainer}
              name="refundForm"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              onFinishFailed={handleSubmitFailed}
            >
              <Table
                dataSource={items}
                columns={columns}
                rowKey="id"
                pagination={false}
                style={{ marginBottom: "20px" }}
              />
              <Checkbox
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={selectAll}
                style={{ marginBottom: "20px", color: 'black' }}
              >
                Select All
              </Checkbox>
              <Form.Item
                name="amount"
                label="Amount"
              
              >
                <Input
                  type="text"
                  style={{ marginLeft: "7%", width: "93%" }}
                  placeholder="Your refund amount"
                  value={selectedItems.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^0-9.-]+/g, "")), 0)}
                  readOnly
                />
              </Form.Item>
              <Form.Item
                name="reason"
                label="Reason Refunds"
                rules={[
                  { required: true, message: "Please enter the reason for refund!" },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item
                name="productImage"
                label="Product Image"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
                rules={[
                  { required: true, message: "Please upload the image of the product!" },
                ]}
              >
                <Upload
                  name="productImage"
                  listType="picture"
                  beforeUpload={() => false}
                >
                                    <Button icon={<UploadOutlined />}>
                    Upload Image
                  </Button>
                </Upload>
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
              <Form.Item>
                <Button
                  style={{ backgroundColor: 'black', color: 'white', width: '100px', height: '35px', marginTop: '20px' }}
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default Refunds;