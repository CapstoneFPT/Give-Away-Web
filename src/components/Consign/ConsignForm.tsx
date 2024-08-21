import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Upload,
  Select,
  message,
  notification,
  Row,
  Col,
  Typography,
} from "antd";
import type {
  FormListFieldData,
  FormListOperation,
} from "antd/lib/form/FormList";
import { DeleteOutlined } from "@ant-design/icons";
import { storage } from "../../pages/Firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./ConsignForm.css";
import {
  AccountApi,
  ConsignSaleType,
  CreateConsignSaleRequest,
  ResultStatus,
  ShopApi,
  SizeType,
} from "../../api";
import RuleConsign from "../../pages/RuleConsign";

const normFile = (e: any) => {
  // Kiểm tra nếu e là một mảng hoặc có fileList
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList ? e.fileList : []; // Trả về mảng rỗng nếu không có fileList
};

const ConsignForm = () => {
  const [fileLists, setFileLists] = useState<{ [key: number]: any[] }>({});
  const [uploading, setUploading] = useState<boolean>(false);
  const [branches, setBranches] = useState<any[]>([]);
  const shopApi = new ShopApi();
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [form] = Form.useForm(); // Form instance for resetting fields

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await shopApi.apiShopsGet();
        if (response.data.resultStatus !== ResultStatus.Success) {
          throw new Error(`HTTP error! Status: ${response.data.resultStatus}`);
        }
        setBranches(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch branches:", error);
        setBranches([]);
      }
    };
    fetchBranches();
  }, []);

  const handleFileChange = (key: number, info: any) => {
    setFileLists((prev) => ({
      ...prev,
      [key]: info.fileList,
    }));
  };

  const onFinish = async (values: any) => {
    setUploading(true);
    message.loading({ content: "Uploading...", key: "upload" });

    try {
      const itemsWithUrls = await Promise.all(
        values.items.map(async (item: any, index: number) => {
          const fileUrls = await Promise.all(
            (fileLists[index] || []).map(async (file: any) => {
              if (file.originFileObj) {
                const storageRef = ref(storage, `images/${file.name}`);
                const metadata = { contentType: file.type };
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
          return {
            name: item.productName,
            note: item.note,
            dealPrice: item.dealPrice,
            condition: item.conditionPercentage,
            size: item.size,
            color: item.color,
            brand: item.brand,
            gender: item.gender,
            images: fileUrls,
          };
        })
      );

      const consignData: CreateConsignSaleRequest = {
        shopId: values.userInfo.clothBranches,
        type: values.userInfo.type as ConsignSaleType, // Updated to use the new type
        consignDetailRequests: itemsWithUrls,
        address: values.userInfo.address,
        consignorName: values.userInfo.name,
        phone: values.userInfo.phone,
      };

      const consignApi = new AccountApi();
      const response = await consignApi.apiAccountsAccountIdConsignsalesPost(
        userId,
        consignData
      );

      if (response.data.resultStatus === ResultStatus.Success) {
        notification.success({
          message: "Success",
          description: "Upload successful!",
          duration: 2,
        });
        form.resetFields(); // Reset form fields
        setFileLists({}); // Clear file lists
      } else {
        notification.error({
          message: "Error",
          description: "Upload failed!",
          duration: 2,
        });
      }
    } catch (error) {
      console.error("Backend error:", error);
      notification.error({
        message: "Error",
        description: "An error occurred during the upload.",
        duration: 2,
      });
    }

    setUploading(false);
  };

  return (
    <Card
      className="consign-form-container"
      style={{ justifyContent: "center", display: "flex" }}
    >
      <Row gutter={[16, 16]}>
        <Col span={8}>
        <RuleConsign />
        </Col>
        <Col span={16}>
        <Form
            form={form}
            className="consign-form"
            name="dynamic_form"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Card style={{ width: "970px", border: "1px solid #aeacac", }}>
              {/* <div style={{ width: "1000px" }}> */}
              <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
                Consign/Sale Form
              </h1>

              <Form.Item
                name={["userInfo", "clothBranches"]}
                rules={[{ required: true, message: "Missing cloth branches" }]}
              >
                <Typography>Select branch to Consign/Sale*: </Typography>
                <Select style={{ width: "70%" }} placeholder=" Branches">
                  {branches.map((data: any) => (
                    <Select.Option key={data.shopId} value={data.shopId}>
                      {data.address}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={["userInfo", "type"]}
                rules={[{ required: true, message: "Missing type" }]}
              >
                <Typography>Select type to Consign/Sale*: </Typography>
                <Select
                  placeholder="Type Consign/Sale"
                  style={{ width: "21%" }}
                >
                  {Object.values(ConsignSaleType).map(
                    (
                      type // Render options from the type
                    ) => (
                      <Select.Option key={type} value={type}>
                        {type}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
              {/* </div> */}
              <Form.List name="items">
                {(
                  fields: FormListFieldData[],
                  { add, remove }: FormListOperation
                ) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {fields.map(({ key, name, ...restField }) => (
                      <Card
                      title='Products Infomation'
                      headStyle={{ backgroundColor: 'black', color: 'white' }}
                        key={key}
                        style={{
                          marginBottom: "10px",
                          position: "relative",
                          padding: "10px",
                          width: "400px",
                          border: "1px solid #aeacac",
                        }}
                      >
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, "productName"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing product name",
                                },
                              ]}
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
                                onChange={(info) => handleFileChange(key, info)}
                              >
                                <div>
                                  <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                              </Upload>
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "gender"]}
                              rules={[
                                { required: true, message: "Missing gender" },
                              ]}
                            >
                              <Select
                                placeholder="Gender"
                                style={{ width: "50%" }}
                              >
                                <Select.Option value="male">Male</Select.Option>
                                <Select.Option value="female">
                                  Female
                                </Select.Option>
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "description"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing description",
                                },
                              ]}
                            >
                              <Input.TextArea placeholder="Description" />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, "dealPrice"]}
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
                              name={[name, "size"]}
                              rules={[
                                { required: true, message: "Missing size" },
                              ]}
                            >
                              <Select
                                placeholder="Size"
                                style={{ width: "50%" }}
                              >
                                {Object.values(SizeType).map((size) => (
                                  <Select.Option key={size} value={size}>
                                    {size}
                                  </Select.Option>
                                ))}
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
                                {
                                  type: "number",
                                  min: 0,
                                  max: 100,
                                  transform(value) {
                                    return Number(value);
                                  },
                                },
                              ]}
                            >
                              <Input
                                placeholder="Condition Percentage"
                                onKeyPress={(event) => {
                                  // Prevent non-numeric input

                                  {
                                  }
                                }}
                              />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "color"]}
                              rules={[
                                { required: true, message: "Missing color" },
                              ]}
                            >
                              <Input placeholder="Color" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "brand"]}
                              rules={[
                                { required: true, message: "Missing brand" },
                              ]}
                            >
                              <Input placeholder="Brand" />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Button
                          icon={<DeleteOutlined style={{ color: "white" }} />}
                          style={{
                            position: "absolute",
                            right: 25,
                            top: 30,
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
              <div>
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
                    I have read and agree to the terms and rules
                  </Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={uploading}
                    style={{
                      width: "15%",
                      backgroundColor: "black",
                      color: "white",
                    }}
                  >
                    {uploading ? "Uploading..." : "Submit"}
                  </Button>
                </Form.Item>
              </div>
            </Card>
          </Form>
         
        </Col>
      </Row>
    </Card>
  );
};

export default ConsignForm;
