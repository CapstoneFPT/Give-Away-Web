import React, {useEffect, useState} from "react";
import {Button, Card, Checkbox, Col, Form, Input, message, notification, Row, Select,} from "antd";
import type {FormListFieldData, FormListOperation,} from "antd/lib/form/FormList";
import {storage} from "../../pages/Firebase/firebase-config";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import "./ConsignForm.css";
import {
    AccountApi,
    ConsignSaleType,
    CreateConsignSaleRequest,
    ResultStatus,
    ShopApi,
    ShopDetailResponse,
} from "../../api";
import RuleConsign from "../../pages/RuleConsign";
import ConsignFormList from "./ConsignFormList";
import backgroundImageUrl from "../../components/Assets/travel-accessories-white-table.jpg";



const ConsignForm = () => {
    const [fileLists, setFileLists] = useState<{ [key: number]: any[] }>({});
    const [uploading, setUploading] = useState<boolean>(false);
    const [branches, setBranches] = useState<ShopDetailResponse[]>([]);
    const shopApi = new ShopApi();
    const [form] = Form.useForm<CreateConsignSaleRequest>(); // Form instance for resetting fields
    const userId = JSON.parse(localStorage.getItem("userId") || "null");

    console.log(userId);
    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await shopApi.apiShopsGet();
                if (response.data.resultStatus !== ResultStatus.Success) {
                    throw new Error(`HTTP error! Status: ${response.data.resultStatus}`);
                }
                setBranches(response.data.data || []);
                console.log(response);
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

    const onFinish = async (values: CreateConsignSaleRequest) => {
        setUploading(true);
        message.loading({content: "Uploading...", key: "upload"});
        console.log("Form values, ", values);
        console.log(fileLists);
        try {
            const itemsWithUrls: any[] = await Promise.all(
                values.consignDetailRequests.map(async (item: any, index: number) => {
                    console.log("Consign Item: ", item);
                    const fileUrls = await Promise.all(
                        item.picture.map(async (file: any) => {
                            console.log("File: ", file);
                            if (file.originFileObj) {
                                const storageRef = ref(storage, `images/${file.name}`);
                                const metadata = {contentType: file.type};
                                try {
                                    console.log("Uploading file:", file.originFileObj);
                                    await uploadBytes(storageRef, file.originFileObj, metadata);
                                    const downloadURL = await getDownloadURL(storageRef);
                                    console.log("Download URL:", downloadURL);
                                    return downloadURL;
                                } catch (error) {
                                    console.log("Upload error:", error);
                                    return "";
                                }
                            }
                            return "";
                        })
                    );


                    return {
                        productName: item.productName,
                        note: item.note,
                        expectedPrice: item.expectedPrice,
                        condition: item.conditionPercentage,
                        size: item.size,
                        color: item.color,
                        brand: item.brand,
                        gender: item.gender,
                        imageUrls: fileUrls,
                    };
                })
            );



            const consignData: CreateConsignSaleRequest = {
                shopId: values.shopId,
                type: values.type, // Updated to use the new type
                consignDetailRequests: itemsWithUrls.map((item) => ({
                    brand: item.brand,
                    color: item.color,
                    conditionPercentage: item.condition,
                    gender: item.gender,
                    note: item.note,
                    productName: item.productName,
                    size: item.size,
                    condition: item.condition,
                    imageUrls: item.imageUrls,
                    expectedPrice: item.expectedPrice,
                })),
                address: values.address,
                consignorName: values.consignorName,
                phone: values.phone,
            };

            console.log("Consign Data: ", consignData);

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
        <Card style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            minHeight: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0)",
            overflow: "hidden",
            justifyContent: "center", display: "flex"
        }}
            className="consign-form-container"
           
        >
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <RuleConsign/>
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
                        <Card style={{width: "970px", border: "1px solid #aeacac"}}>
                            {/* <div style={{ width: "1000px" }}> */}
                            <h1 style={{textAlign: "center", marginBottom: "10px"}}>
                                Consign/Sale Form
                            </h1>
                            <Card
                                style={{marginBottom: "20px", border: "1px solid #aeacac"}}
                            >
                                <Row gutter={[16, 16]}>
                                    <Col span={16}>
                                        <Form.Item
                                            label="Select branch to Consign/Sale*:"
                                            name="shopId"
                                            rules={[{required: true, message: "Missing cloth branches"}]}
                                            labelCol={{ span: 24 }} // Ensure label takes full width
                                            wrapperCol={{ span: 16 }} // Ensure input takes full width
                                        >
                                            <Select style={{width: "100%"}} placeholder="Branches">
                                                {branches.map((data) => (
                                                    <Select.Option key={data.shopId} value={data.shopId}>
                                                        {data.address}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            name="type"
                                            label="Select type to Consign/Sale*:"
                                            rules={[{required: true, message: "Missing type"}]}
                                            labelCol={{ span: 24 }} // Ensure label takes full width
                                            wrapperCol={{ span: 10 }} // Ensure input takes full width
                                        >
                                            <Select
                                                placeholder="Type Consign/Sale"
                                                style={{width: "100%"}}
                                            >
                                                {Object.values(ConsignSaleType).map((type) => (
                                                    <Select.Option key={type} value={type}>
                                                        {type}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            style={{width: "100%"}}
                                            name="consignorName"
                                            label="Consignor Name"
                                            rules={[{required: true, message: "Missing your consignor name"}]}
                                            labelCol={{ span: 24 }} // Ensure label takes full width
                                            wrapperCol={{ span: 16 }} // Ensure input takes full width
                                        >
                                            <Input placeholder="Consignor Name"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            style={{width: "100%"}}
                                            name="address"
                                            label="Your address*:"
                                            rules={[{required: true, message: "Missing your address"}]}
                                            labelCol={{ span: 24 }} // Ensure label takes full width
                                            wrapperCol={{ span: 24 }} // Ensure input takes full width
                                        >
                                            <Input.TextArea placeholder="Your address"/>
                                        </Form.Item>

                                        <Form.Item
                                            style={{width: "100%"}}
                                            name="phone"
                                            label="Phone"
                                            rules={[
                                                {required: true, message: "Missing your phone"},
                                                {
                                                    pattern: /^[0-9]{10}$/,
                                                    message: "Phone number must be exactly 10 digits and numeric only",
                                                },
                                            ]}
                                            labelCol={{ span: 24 }} // Ensure label takes full width
                                            wrapperCol={{ span: 24 }} // Ensure input takes full width
                                        >
                                            <Input 
                                                placeholder="Phone" 
                                                maxLength={10} 
                                                onKeyPress={(e) => {
                                                    if (!/[0-9]/.test(e.key)) {
                                                        e.preventDefault(); // Prevent non-numeric input
                                                    }
                                                }} 
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>

                            {/* </div> */}
                            <Form.List name="consignDetailRequests">
                                {(
                                    fields: FormListFieldData[],
                                    {add, remove}: FormListOperation
                                ) => (
                                    <>
                                        <ConsignFormList
                                            fields={fields}
                                            fileLists={[]} // Provide the appropriate file list if needed
                                            handleFileChange={handleFileChange}
                                            add={add}
                                            remove={remove}
                                        />
                                    </>
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
