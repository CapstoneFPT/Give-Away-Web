import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Card, Upload, Select, message } from "antd";
import type { FormListFieldData, FormListOperation } from "antd/lib/form/FormList";
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

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const ConsignForm = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [branches, setBranches] = useState<any[]>([]);
  const shopApi = new ShopApi();
  const userId = JSON.parse(localStorage.getItem("userId") || "null");

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
  }, [shopApi]);

  const handleFileChange = (info: any) => {
    setFileList(info.fileList);
  };

  const onFinish = async (values: any) => {
    setUploading(true);
    message.loading({ content: "Uploading...", key: "upload" });

    try {
      const itemsWithUrls = await Promise.all(
        values.items.map(async (item: any) => {
          const fileUrls = await Promise.all(
            fileList.map(async (file: any) => {
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
        consignorName: values.userInfo.fullName,
        phone: values.userInfo.phone,
        fashionItemForConsigns: itemsWithUrls,
      };

      const consignApi = new AccountApi();
      const response = await consignApi.apiAccountsAccountIdConsignsalesPost(
        userId,
        consignData
      );

      if (response.data.resultStatus === ResultStatus.Success) {
        message.success({ content: "Upload successful!", key: "upload", duration: 2 });
      } else {
        message.error({ content: "Upload failed!", key: "upload", duration: 2 });
      }
    } catch (error) {
      console.error("Backend error:", error);
      message.error({ content: "An error occurred during the upload.", key: "upload", duration: 2 });
    }

    setUploading(false);
  };

  return (
    <Card className="consign-form-container" style={{ justifyContent: "center", display: "flex" }}>
      <Form className="consign-form" name="dynamic_form" onFinish={onFinish} autoComplete="off" size="large">
        <Card className="user-info-card" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
          <div style={{ width: "1000px" }}>
            <h1>Consign Form</h1>
            <Form.Item name={["userInfo", "fullName"]} rules={[{ required: true, message: "Missing full name" }]}>
              <Input placeholder="Full Name" />
            </Form.Item>
            <Form.Item name={["userInfo", "phone"]} rules={[{ required: true, message: "Missing phone" }]}>
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item name={["userInfo", "clothBranches"]} rules={[{ required: true, message: "Missing cloth branches" }]}>
              <Select placeholder="Cloth Branches">
                {branches.map((data: any) => (
                  <Select.Option key={data.shopId} value={data.shopId}>
                    {data.address}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={["userInfo", "type"]} rules={[{ required: true, message: "Missing type" }]}>
              <Select style={{ width: "21%" }}>
                {Object.values(ConsignSaleType).map((type) => ( // Render options from the type
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Card>
        <Card>
          <Form.List name="items">
            {(fields: FormListFieldData[], { add, remove }: FormListOperation) => (
              <div className="form-container" style={{ display: "flex", flexDirection: "row", gap: "10px", flexWrap: "wrap" }}>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} style={{ marginBottom: "10px", position: "relative", padding: "10px" }}>
                    <Form.Item {...restField} name={[name, "productName"]} rules={[{ required: true, message: "Missing product name" }]}>
                      <Input placeholder="Product Name" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "picture"]} valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: "Please upload at least one picture" }]}>
                      <Upload className="upload-box" name="pictures" multiple={true} listType="picture-card" onChange={handleFileChange}>
                        <div>
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "gender"]} rules={[{ required: true, message: "Missing gender" }]}>
                      <Select style={{ width: "50%" }}>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "description"]} rules={[{ required: true, message: "Missing description" }]}>
                      <Input.TextArea placeholder="Description" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "dealPrice"]} rules={[{ required: true, message: "Missing price" }, { pattern: /^\d+(\.\d{1,2})?$/, message: "Invalid price" }]}>
                      <Input placeholder="Deal Price" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "size"]} rules={[{ required: true, message: "Missing size" }]}>
                      <Select style={{ width: "50%" }}>
                        {Object.values(SizeType).map((size) => (
                          <Select.Option key={size} value={size}>
                            {size}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "conditionPercentage"]} rules={[{ required: true, message: "Missing condition percentage" }]}>
                      <Input placeholder="Condition Percentage" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "color"]} rules={[{ required: true, message: "Missing color" }]}>
                      <Input placeholder="Color" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "brand"]} rules={[{ required: true, message: "Missing brand" }]}>
                      <Input placeholder="Brand" />
                    </Form.Item>
                    <Button
                      icon={<DeleteOutlined style={{ color: "red" }} />}
                      style={{ position: "absolute", right: 20, top: 20, transform: "translate(50%, -50%)", backgroundColor: "transparent", border: "none" }}
                      onClick={() => remove(name)}
                    />
                  </Card>
                ))}
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
                  {fields.length < 5 && (
                    <Button style={{ width: "10%", marginTop: "20px", backgroundColor: "black", color: "white" }} onClick={() => add()}>
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
          <Button type="primary" htmlType="submit" loading={uploading} style={{ width: "100%" }}>
            {uploading ? "Uploading..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ConsignForm;
