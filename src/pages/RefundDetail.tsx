import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Col, Row, Typography, Tag, Image, Button, Modal, Input, notification, Spin, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RefundApi, RefundResponse } from '../api';
import { getRefundStatus } from '../utils/types';
import TextArea from 'antd/es/input/TextArea';

const RefundDetail = () => {
  const { refundId } = useParams();
  const [selectedRefund, setSelectedRefund] = useState<RefundResponse | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const [refundImages, setRefundImages] = useState<any[]>([]); // Adjusted to handle image objects
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRefundDetails = async () => {
      setLoading(true);
      const Refund = new RefundApi();
      try {
        const response = await Refund.apiRefundsRefundIdGet(refundId!);
        if (response.data) {
          setSelectedRefund(response.data);
        } else {
          console.error("No data found for the provided refund ID");
        }
      } catch (error) {
        console.error("Error fetching refund details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRefundDetails();
  }, [refundId]);

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("de-DE").format(balance);
  };

  const handleUpdate = async () => {
    if (refundId) {
      setLoading(true);
      const Refund = new RefundApi();
      try {
        const updateRequest = {
          description,
          refundImages: refundImages.map((file) => file.url), // Ensure only URLs are sent
        };
        await Refund.apiRefundsRefundIdUpdatePut(refundId, updateRequest);
        notification.success({
          message: 'Update Successful',
          description: 'Refund details have been updated successfully.',
        });
        setIsModalVisible(false);
        navigate(0); // Reload the page
      } catch (error) {
        console.error("Error updating refund:", error);
        notification.error({
          message: 'Update Failed',
          description: 'There was an error updating the refund details. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = async () => {
    if (refundId) {
      setLoading(true);
      const Refund = new RefundApi();
      try {
        await Refund.apiRefundsRefundIdCancelPut(refundId);
        notification.success({
          message: 'Cancel Successful',
          description: 'Refund has been canceled successfully.',
        });
      } catch (error) {
        console.error("Error canceling refund:", error);
        notification.error({
          message: 'Cancel Failed',
          description: 'There was an error canceling the refund. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUploadChange = (info: any) => {
    if (info.fileList) {
      setRefundImages(info.fileList.map((file: any) => file.response?.url || file.url));
    }
  };

  const uploadProps = {
    
    listType: 'picture',
    multiple: true,
    beforeUpload(file: any) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement('img');
          img.src = reader.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = 'red';
            ctx.textBaseline = 'middle';
            ctx.font = '33px Arial';
            ctx.fillText('Give Away', 20, 20);
            canvas.toBlob((result) => {
              if (result) {
                resolve(result as Blob);
              } else {
                reject(new Error('Failed to process the image.'));
              }
            });
          };
        };
        reader.onerror = () => reject(new Error('Failed to read the file.'));
      });
    },
    onChange: handleUploadChange,
  };

  return (
    <Card>
      <Button style={{ backgroundColor: "black", color: "white" }} onClick={() => navigate(-1)}>
        Back
      </Button>
      {loading ? (
        <Spin tip="Loading..." size="large" />
      ) : (
        selectedRefund && (
          <>
            <Card>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Typography>
                    <strong>Order Code:</strong> {selectedRefund.orderCode}
                  </Typography>
                  <Typography>
                    <strong>Item Code:</strong> {selectedRefund.itemCode}
                  </Typography>
                  <Typography>
                    <strong>Item Name:</strong> {selectedRefund.itemName}
                  </Typography>
                  <Typography>
                    <strong>Amount:</strong> {formatBalance(selectedRefund.unitPrice!)} VND
                  </Typography>
                  <Typography>
                    <strong>Refund Amount:</strong> {selectedRefund.refundAmount || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Refund Percentage: </strong>
                    {selectedRefund.refundPercentage || "N/A"}%
                  </Typography>
                  <Typography>
                    <strong>Response From Shop:</strong>
                    <TextArea
                      value={selectedRefund.responseFromShop || "N/A"}
                      readOnly
                      rows={3}
                    />
                  </Typography>
                </Col>
                <Col span={12}>
                  <Typography>
                    <strong>Customer Name:</strong> {selectedRefund.customerName}
                  </Typography>
                  <Typography>
                    <strong>Customer Phone:</strong> {selectedRefund.customerPhone}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {selectedRefund.customerEmail}
                  </Typography>
                  <Typography>
                    <strong>Refund Date:</strong> {new Date(selectedRefund.createdDate!).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    <strong>Status: </strong>
                    <Tag color={getRefundStatus(selectedRefund.refundStatus!)}>
                      {selectedRefund.refundStatus!}
                    </Tag>
                  </Typography>
                  <Typography style={{ marginTop: "20px" }}>
                    <strong>Response From Customer:</strong>
                    <TextArea
                      value={selectedRefund.description || "N/A"}
                      readOnly
                      rows={3}
                    />
                  </Typography>
                </Col>
              </Row>

              <Row style={{ marginTop: "20px" }} gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="Product Images">
                    <div>
                      {selectedRefund.itemImages?.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt={`refund-image-${index}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            marginRight: "5px",
                          }}
                        />
                      ))}
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Image Customer Response">
                    <div>
                      {selectedRefund.imagesForCustomer?.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt={`refund-image-${index}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            marginRight: "5px",
                          }}
                        />
                      ))}
                    </div>
                  </Card>
                </Col>
              </Row>
              <div style={{ margin: "20px" }}>
                {(selectedRefund.refundStatus === "Pending") && (
                  <Button style={{ backgroundColor: "black", color: "white" }} onClick={() => setIsModalVisible(true)}>
                    Update Refund
                  </Button>
                )}
                {(selectedRefund.refundStatus === "Approved" || selectedRefund.refundStatus === "Pending") && (
                  <Button style={{ backgroundColor: "red", color: "white" }} onClick={handleCancel}>
                    Cancel
                  </Button>
                )}
              </div>
            </Card>

            <Modal
              title="Update Refund"
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              onOk={handleUpdate}
              width={700}
            >
              <div>
                <Input.TextArea
                  placeholder="Update Your Response"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
                <div style={{ marginTop: "20px" }}>
                  <strong>Upload Images:</strong>
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </div>
              </div>
            </Modal>
          </>
        )
      )}
    </Card>
  );
};

export default RefundDetail;
