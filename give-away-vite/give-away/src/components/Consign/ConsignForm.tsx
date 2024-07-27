import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Card, Upload, Select } from "antd";
import type {
  FormListFieldData,
  FormListOperation,
} from "antd/lib/form/FormList";
import { DeleteOutlined } from "@ant-design/icons";
import { storage } from "../../pages/Firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./ConsignForm.css";
// import { BASE_URL } from "../../api/config";
import {
  AccountApi,
  CreateConsignSaleRequest,
  ResultStatus,
  ShopApi,
} from "../../api";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const ConsignForm = () => {
  const [fileList, setFileList] = useState<any[]>([]); // State to store file list
  const [uploading, setUploading] = useState<boolean>(false); // State to manage uploading status
  const [branches, setBranches] = useState<any[]>([]); // State to store branch options
  const shopApi = new ShopApi();
  const userId = JSON.parse(localStorage.getItem("userId") || "null");

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    console.log(userId);
    const fetchBranches = async () => {
      try {
        const response = await shopApi.apiShopsGet();
        console.log(response);

        if (response.data.resultStatus !== ResultStatus.Success) {
          throw new Error(`HTTP error! Status: ${response.data.resultStatus}`);
        }
        console.log("Fetched data:", response); // Kiểm tra dữ liệu nhận được
        const data = response.data;

        setBranches(data.data || []);
      } catch (error) {
        console.error("Failed to fetch branches:", error);
        setBranches([]); // Đặt branches thành mảng rỗng nếu có lỗi
      }
    };

    fetchBranches();
  }, []);

  const handleFileChange = (info: any) => {
    setFileList(info.fileList); // Update file list
  };

  const onFinish = async (values: CreateConsignSaleRequest) => {
    setUploading(true); // Start uploading

    // Process image uploads
    const itemsWithUrls = await Promise.all(
      values.fashionItemForConsigns!.map(async (item) => {
        const fileUrls = await Promise.all(
          fileList.map(async (file) => {
            if (file.originFileObj) {
              const storageRef = ref(storage, `images/${file.name}`);
              const metadata = {
                contentType: file.type,
              };
              try {
                await uploadBytes(storageRef, file.originFileObj, metadata);
                const downloadURL = await getDownloadURL(storageRef);
                return downloadURL;
              } catch (error) {
                console.error("Upload error:", error);
                return "";
              }
            }
            return "";
          })
        );
        return { ...item, picture: fileUrls };
      })
    );

    // Send form data including image URLs to the backend
    try {
      const consignApi = new AccountApi();
      const response = await consignApi.apiAccountsAccountIdConsignsalesPost(
        userId,
        values
      );
      console.log("Backend response:", response);
    } catch (error) {
      console.error("Backend error:", error);
    }

    setUploading(false); // End uploading
  };

  return (
    <Card
      className="consign-form-container"
      style={{ justifyContent: "center", display: "flex" }}
    >
      <Form
        className="consign-form"
        name="dynamic_form"
        onFinish={onFinish}
        autoComplete="off"
        size="large"
      >
        <Card
          className="user-info-card"
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div style={{ width: "1000px" }}>
            <h1> Consign Form</h1>
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
                {branches.map((data: any) => (
                  <Select.Option key={data} value={data.shopId}>
                    {data.address}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={["userInfo", "Type"]}
              // rules={[{ required: true, message: "Missing Consgin Type" }]}
            >
              <Select style={{ width: "20%" }}>
                <label>Consigned For Auction</label>
                <label>Consigned For Sale</label>
              </Select>
            </Form.Item>
          </div>
        </Card>
        <Card>
          <Form.List name="items">
            {(
              fields: FormListFieldData[],
              { add, remove }: FormListOperation
            ) => (
              <div
                className="form-container"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {fields.map(({ key, name, ...restField }, index) => (
                  <Card
                    key={key}
                    style={{
                      marginBottom: "10px",
                      position: "relative",
                      padding: "10px",
                    }}
                  >
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
                      name={[name, "picture"]}
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
                        listType="picture-card"
                        onChange={handleFileChange}
                      >
                        <div>
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
                      <Select style={{ width: "50%" }}>
                        <label>Male</label>
                        <label>Female</label>
                      </Select>
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
                      name={[name, " dealPrice"]}
                      rules={[
                        { required: true, message: "Missing price" },
                        {
                          pattern: /^\d+(\.\d{1,2})?$/,
                          message: "Invalid price",
                        },
                      ]}
                    >
                      <Input placeholder="Deal Price" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, " confirmedPrice"]}
                      rules={[
                        { required: true, message: "Missing price" },
                        {
                          pattern: /^\d+(\.\d{1,2})?$/,
                          message: "Invalid price",
                        },
                      ]}
                    >
                      <Input placeholder="Confirmed Price" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "condition"]}
                      rules={[
                        { required: true, message: "Missing product material" },
                      ]}
                      className="form-item"
                    >
                      <Input placeholder="Material" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      rules={[
                        { required: true, message: "Missing description" },
                      ]}
                    >
                      <Select style={{ width: "50%" }}>
                        <label>XS</label>
                        <label>S</label>
                        <label>M</label>
                        <label>L</label>
                        <label>XL</label>
                        <label>2XL</label>
                      </Select>
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
                      <Input placeholder="Color" />
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
                      <Input placeholder="brand" />
                    </Form.Item>
                    <Button
                      icon={<DeleteOutlined style={{ color: "red" }} />}
                      style={{
                        position: "absolute",
                        right: 20,
                        top: 20,
                        transform: "translate(50%, -50%)",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() => remove(name)}
                    />
                  </Card>
                ))}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  {fields.length < 5 && (
                    <Button
                      style={{
                        width: "10%",
                        marginTop: "20px",
                        backgroundColor: "black",
                        color: "white",
                      }}
                      onClick={() => add()}
                    >
                      Add Item
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Form.List>
        </Card>
        <Form.Item
          name="termsAndRules"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Should accept terms and rules"),
            },
          ]}
        >
          <Checkbox>
            I have read and agree to the <a href="">terms and rules</a>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={uploading}
            style={{ width: "100%" }}
          >
            {uploading ? "Uploading..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ConsignForm;
