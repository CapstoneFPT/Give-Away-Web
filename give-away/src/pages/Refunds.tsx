import React, { useState } from 'react';
import { Button, Card, Row, Col, Form, Input, Upload, message, Table, UploadFile } from 'antd';
import { UploadOutlined, SendOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import NavProfile from '../components/NavProfile/NavProfile';
import { CreateRefundRequest, RefundApi } from '../api';
import { storage } from './Firebase/firebase-config'; // Import the storage instance from Firebase config
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const styles = {
  buttonRefunds: {
    marginLeft: '80%',
    backgroundColor: '#000000',
    color: 'white',
    width: '20%',
    height: '50px',
    border: '2px solid black',
    padding: '10px 20px',
  },
  formContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
};

const Refunds = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, orderDetailId } = location.state || { items: [] };
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false); // State to manage uploading status
  const [error, setError] = useState<string | null>(null); // State to store error messages
  const [success, setSuccess] = useState<string | null>(null); // State to store success messages

  const handleUpload = async (file: File | null) => {
    if (file) {
      const storageRef = ref(storage, `refunds/${file.name}`); // Reference to the location in Firebase Storage

      setUploading(true); // Start uploading
      setError(null); // Clear previous errors
      setSuccess(null); // Clear previous success messages

      try {
        await uploadBytes(storageRef, file); // Upload the file
        const downloadURL = await getDownloadURL(storageRef); // Get the download URL
        return downloadURL; // Return the download URL
      } catch (error) {
        setError('Upload failed: ' + (error as Error).message); // Set error message
        throw error; // Re-throw error to be caught in handleSubmit
      } finally {
        setUploading(false); // End uploading
      }
    } else {
      setError('No file selected.'); // Set error if no file is selected
      throw new Error('No file selected'); // Throw error to be caught in handleSubmit
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const imageUrls = await Promise.all(fileList.map((file: UploadFile) => handleUpload(file.originFileObj!)));
  
      // Wrap requestData in an array if the API expects an array
      const requestData: CreateRefundRequest[] = [{
        orderDetailIds: orderDetailId,
        description: values.reason,
        images: imageUrls,
      }];
  
      console.log(requestData);
  
      const refundApi = new RefundApi();
      await refundApi.apiRefundsPost(requestData);
  
      message.success("Refund request sent successfully!");
    } catch (error) {
      message.error("Send refund request failed. Please check your information!");
      console.error("Failed to submit refund request:", error);
    }
  };

  const handleSubmitFailed = (errorInfo: any) => {
    message.error('Send refund request failed. Please check your information!');
    console.log('Failed:', errorInfo);
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'images',
      key: 'images',
      render: (text: string) => <img src={text} alt="item" style={{ width: '150px', height: '150px' }} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Selling Price',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
    },
  ];

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <NavProfile />
        </Col>
        <Col span={19}>
          <Card style={{ borderRadius: '10px', boxShadow: '2px 2px 7px #cbc1c1' }}>
            <h3
              style={{
                fontSize: '40px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '10px',
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
                style={{ marginBottom: '20px' }}
              />

              <Form.Item
                name="reason"
                label="Reason Refunds"
                rules={[{ required: true, message: 'Please enter the reason for refund!' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item
                name="productImage"
                label="Product Image"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e && e.fileList;
                }}
                rules={[{ required: true, message: 'Please upload the image of the product!' }]}
              >
                <Upload
                  name="productImage"
                  listType="picture"
                  beforeUpload={() => false}
                  onChange={({ fileList }) => setFileList(fileList)}
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button
                  style={styles.buttonRefunds}
                  type="primary"
                  htmlType="submit"
                  disabled={uploading}
                  loading={uploading}
                >
                  Send request
                  <SendOutlined />
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
