import React, { useEffect, useState } from 'react';
import { Table, Spin, notification, Card, Row, Col, Input, Select, Button, Modal, TableColumnsType } from 'antd'; // Thêm Button và Modal
import { FashionItemApi, FashionItemList, ItemVariationResponse } from '../../api';

interface ChildItemsProps {
  masterItemsId: string;
}

const columns : TableColumnsType<FashionItemList> = [
  { title: 'Product Code', dataIndex: 'itemCode', key: 'itemCode' },
  { title: 'Brand', dataIndex: 'brand', key: 'brand' },
  { title: 'Color', dataIndex: 'color', key: 'color' },
  { title: 'Size', dataIndex: 'size', key: 'size' },
  {title:'Note', dataIndex: '', key:'note'},
  { title: 'Action', dataIndex: 'size', key: 'size' },
];

const { Option } = Select; // Khai báo Option từ Select

const ChildItems: React.FC<ChildItemsProps> = ({ masterItemsId }) => {
  const [dataSource, setDataSource] = useState<FashionItemList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterSize, setFilterSize] = useState<string | undefined>(undefined); // State cho filter size
  const [filterColor, setFilterColor] = useState<string | undefined>(undefined); // State cho filter color
  const [isModalVisible, setIsModalVisible] = useState(false); // State cho Modal

  useEffect(() => {
    const fetchItemVariants = async () => {
      setIsLoading(true);
      try {
        const fashionItemApi = new FashionItemApi();
        const response = await fashionItemApi.apiFashionitemsGet(
          null!,
          null!,
          null!,
          null!,
          null!,
          null!,
          null!,
          null!,
          null!,
          null!,
          null!,
          null!,
          null!,
          null!,
          null!,
          null!,
          null!,
          masterItemsId,
          null!
        );
        setDataSource(response.data.items!);
        console.log(response);
      
      } catch (error) {
        console.error("Error fetching item variants:", error);
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemVariants();
  }, [masterItemsId]);

  // Hàm lọc dữ liệu
  const filteredData = dataSource.filter(item => {
    return (!filterSize || item.size === filterSize) && (!filterColor || item.color === filterColor);
  });

  const showConditionGuide = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>List Products</h1>
      <div style={{ marginBottom: '16px', marginTop:'40px' }}>
        <Input
          placeholder="Search by Product Code"
          onChange={e => setFilterSize(e.target.value)} // Cập nhật filter size
          style={{ width: '200px', marginRight: '8px', marginLeft:'15px' }}
        />
        <Select
          placeholder="Size"
          onChange={value => setFilterSize(value)} // Cập nhật filter size
          style={{ width: '70px', marginRight: '8px' }}
        >
          {/* Thêm các tùy chọn size */}
          <Option value="S">S</Option>
          <Option value="M">M</Option>
          <Option value="L">L</Option>
          <Option value="XL">XL</Option>
        </Select>
        <Select
          placeholder="Color"
          onChange={value => setFilterColor(value)} // Cập nhật filter color
          style={{ width: '90px', marginRight: '8px' }}
        >
      
          <Option value="Red">Red</Option>
          <Option value="Blue">Blue</Option>
          <Option value="Green">Green</Option>
        </Select>
        <Select
          placeholder="Condition"
          onChange={value => setFilterColor(value)} // Cập nhật filter color
          style={{ width: '180px', marginRight: '8px' }}
        >
      
          <Option value="Never worn, with tag"> Never worn, with tag</Option>
          <Option value="Never worn">Never worn</Option>
          <Option value="Very good">Very good</Option>
          <Option value="Good">Good</Option>
          <Option value="Fair">Fair</Option>
          
        </Select>
        <Button 
          type='link' 
          onClick={showConditionGuide} 
          style={{ marginLeft: '255px', color: 'black', textDecoration: 'underline' }} // Thêm gạch chân cho button
        >
         <strong>Condition Guide</strong>
        </Button> 
      </div>
      {isLoading ? (
        <Spin style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} size="large" />
      ) : (
        <Card>
          <Row gutter={[16,16]}>
            <Col span={16}>
              <Table dataSource={filteredData} columns={columns} rowKey="variationId" /> 
            </Col>
            <Col span={8}>
              <Card title='Master'>
              </Card>
            </Col>
          </Row>
        </Card>
      )}
      <Modal
        title="Condition Guide"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <p> <strong>
        Never worn, with tag</strong> - A never-worn item with tag is an item which has never been worn and still has the original purchase hangtags on it (include a photo of the tag).</p>
        <p> <strong>Never worn</strong> - A never-worn item without a tag is an item which has never been worn and shows no defects or alterations.</p>
        <p><strong>Very good</strong> - An item in very good condition is a second-hand item which has been only lightly used and extremely well maintained, which can show slight defects from usage. These must be mentioned in the description and visible on the photos.</p>
        <p> <strong>Good</strong> - An item in good condition is a second-hand item which has been worn and well maintained. If the item has defects, they must be mentioned in the description and visible in the photos.</p>
        <p> <strong>Fair</strong> - An item in fair condition is a second-hand item which has been worn frequently and shows defects (these are mentioned in the description and visible in photos).</p>
      </Modal>
    </div>
  );
}

export default ChildItems;