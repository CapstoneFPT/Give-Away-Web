import React from 'react';
import { Card, Row, Col, Form, Input, Select, Upload, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { SizeType } from '../../api'; // Ensure SizeType is imported from the correct path
import { Option } from 'antd/es/mentions';
import TextArea from 'antd/es/input/TextArea';

const normFile = (e: any) => (Array.isArray(e) ? e : e && e.fileList ? e.fileList : []);

const ConsignItemCard = ({ key, name, restField, fileLists, handleFileChange, remove }: any) => (
    <Card
      title="Product Information"
      headStyle={{ backgroundColor: "black", color: "white" }}
      key={key}
      style={{
        marginBottom: "10px",
        position: "relative",
        padding: "10px",
        width: "450px",
        border: "1px solid #aeacac",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            {...restField}
            name={[name, "productName"]}
            rules={[{ required: true, message: "Missing product name" }]}
          >
            <Input placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, "picture"]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please upload at least one picture" }]}
          >
            <Upload
              className="upload-box"
              name="pictures"
              multiple
              listType="picture-card"
              onChange={(info) => handleFileChange(key, info)}
              beforeUpload={() => false}
            >
              <div>
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          
          
        </Col>
        <Col span={12}>
          <Form.Item
            {...restField}
            name={[name, "expectedPrice"]}
            rules={[
              { required: true, message: "Missing price" },
              { pattern: /^\d+(\.\d{1,2})?$/, message: "Invalid price" },
            ]}
          >
            <Input placeholder="Expected Price" />
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, "conditionPercentage"]}
            rules={[{ required: true, message: "Missing condition percentage" }]}
          >
            <Select placeholder="Condition Percentage" style={{ width: "100%" }}>
              <Option value="Never worn, with tag">Never worn, with tag</Option>
              <Option value="Never worn">Never worn</Option>
              <Option value="Very good">Very good</Option>
              <Option value="Good">Good</Option>
              <Option value="Fair">Fair</Option>
            </Select>
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, "gender"]}
            rules={[{ required: true, message: "Missing gender" }]}
          >
            <Select placeholder="Gender" style={{ width: "70%" }}>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, "size"]}
            rules={[{ required: true, message: "Missing size" }]}
          >
            <Select placeholder="Size" style={{ width: "50%" }}>
              {Object.values(SizeType).map((size) => (
                <Option key={size} value={size}>
                  {size}
                </Option>
              ))}
            </Select>
          </Form.Item>
         
          <Form.Item
            {...restField}
            name={[name, "color"]}
            rules={[{ required: true, message: "Missing color" }]}
          >
            <Input placeholder="Color" />
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, "brand"]}
            rules={[{ required: true, message: "Missing brand" }]}
          >
            <Input placeholder="Brand" />
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, "note"]}
            rules={[{ required: true, message: "Missing Note" }]}
          >
            <TextArea placeholder="Note" rows={4} />
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
  );

  export default ConsignItemCard;