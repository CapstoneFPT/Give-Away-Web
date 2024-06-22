import React from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import type {
  FormListFieldData,
  FormListOperation,
} from "antd/lib/form/FormList";
import { PlusOutlined } from "@ant-design/icons";
import { InputNumber, Select } from "antd";
import { Upload } from "antd";
import "./ConsignForm.css";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
interface FormValues {
  userInfo: { fullName: string; phone: string };
  items: {
    productName: string;
    quantity: number;
    picture: string;
    description: string;
    price: string;
    clothBranches: string;
    conditionPercentage: string;
  }[];
  termsAndRules: boolean;
}

const ConsignForm = () => {
  const onFinish = (values: FormValues) => {
    console.log("Received values of form:", values);
  };

  return (
    <Card>
      <Form
        name="dynamic_form"
        onFinish={onFinish}
        autoComplete="off"
        size="large"
      >
        <div style={{ borderBottom: "5px solid #000", paddingBottom: "10px" }}>
          <Form.Item
            name={["userInfo", "fullName"]}
            rules={[{ required: true, message: "Missing full name" }]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            name={["userInfo", "phone"]}
            rules={[{ required: true, message: "Missing phone" }]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item
            name={["userInfo", "clothBranches"]}
            rules={[{ required: true, message: "Missing cloth branches" }]}
          >
            <Select placeholder="Cloth Branches">
              <Select.Option value="branch1">Branch 1</Select.Option>
              <Select.Option value="branch2">Branch 2</Select.Option>
              <Select.Option value="branch3">Branch 3</Select.Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
        </div>
        <div
          style={{
            margin: "40px",
            borderBottom: "5px solid #000",
            paddingBottom: "10px",
          }}
        >
          <Form.List name="items">
            {(fields: FormListFieldData[], { add }: FormListOperation) => (
              <div
                className="form-container"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ marginBottom: "10px" }}>
                    <Form.Item
                      {...restField}
                      name={[name, "productName"]}
                      rules={[
                        { required: true, message: "Missing product name" },
                      ]}
                      className="form-item"
                    >
                      <Input placeholder="Product Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      rules={[{ required: true, message: "Missing quantity" }]}
                    >
                      <InputNumber placeholder="Quantity" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "pictures"]}
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      rules={[
                        {
                          required: true,
                          message: "Please upload at least one picture",
                        },
                      ]}
                    >
                      <Upload
                        className="upload-box"
                        name="pictures"
                        multiple={true}
                        action="/upload.do"
                        listType="picture-card"
                      >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      rules={[
                        { required: true, message: "Missing description" },
                      ]}
                    >
                      <Input.TextArea placeholder="Description" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "price"]}
                      rules={[
                        { required: true, message: "Missing price" },
                        {
                          pattern: /^\d+(\.\d{1,2})?$/,
                          message: "Invalid price",
                        },
                      ]}
                    >
                      <Input placeholder="Price" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "conditionPercentage"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing condition percentage",
                        },
                      ]}
                    >
                      <Input placeholder="Condition Percentage" />
                    </Form.Item>
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  className="form-button"
                >
                  Add item
                </Button>
              </div>
            )}
          </Form.List>
        </div>
        <Form.Item
          name="termsAndRules"
          valuePropName="checked"
          rules={[
            { required: true, message: "Please agree to the terms and rules" },
          ]}
        >
          <Checkbox>I agree to the terms and rules</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default ConsignForm;
