import React, { useEffect, useState } from 'react';
import { Table, Spin, Card, Row, Col, Input, Select, Button, Modal, Typography, Image, TableColumnsType } from 'antd';
import { FashionItemApi, FashionItemList, MasterItemDetailResponse, SizeType } from '../../api';
import { useParams, useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Text, Title } = Typography;

const formatBalance = (balance: any) => {
  return new Intl.NumberFormat('de-DE').format(balance);
};

const ChildItems: React.FC = () => {
  const [dataSource, setDataSource] = useState<FashionItemList[]>([]);
  const [dataMaster, setDataMaster] = useState<MasterItemDetailResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [filterSize, setFilterSize] = useState<SizeType | undefined>(undefined);
  const [filterColor, setFilterColor] = useState<string | undefined>(undefined);
  const [filterCondition, setFilterCondition] = useState<string | undefined>(undefined);
  const [itemCodeFilter, setItemCodeFilter] = useState<string | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { masterItemCode } = useParams<{ masterItemCode: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fashionItemApi = new FashionItemApi();
        const masterResponse = await fashionItemApi.apiFashionitemsMasterItemsFindGet(masterItemCode!);
        setDataMaster(masterResponse.data);

        const itemResponse = await fashionItemApi.apiFashionitemsGet(
          itemCodeFilter, // itemCode filter
          null!, // memberId (not used here)
          null!, // gender (not used here)
          filterColor, // color filter
          filterSize, // size filter
          filterCondition, // condition filter
          null!, // minPrice (not used here)
          null!, // maxPrice (not used here)
          null!, // status (not used here)
          null!, // type (not used here)
          null!, // sortBy (not used here)
          null!, // sortDescending (not used here)
          null!, // pageNumber (not used here)
          null!, // pageSize (not used here)
          null!, // name (not used here)
          null!, // categoryId (not used here)
          null!, // shopId (not used here)
          null!, // masterItemId (not used here)
          masterItemCode // masterItemCode
        );
        
        setDataSource(itemResponse.data.items!);
      } catch (error) {
        console.error("Error fetching item variants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [masterItemCode, itemCodeFilter, filterSize, filterColor, filterCondition]);

  const showConditionGuide = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const sizeOptions = Object.values(SizeType).map(size => (
    <Option key={size} value={size}>
      {size}
    </Option>
  ));

  const columns: TableColumnsType<FashionItemList> = [
    {
      title: 'Product',
      key: 'product',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={record.image!}
            alt={record.itemCode!}
            width={50}
            height={50}
            style={{ marginRight: '10px', objectFit: 'cover' }}
          />
          <span style={{ margin: '5px' }}>{record.itemCode}</span>
        </div>
      ),
    },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Color', dataIndex: 'color', key: 'color' },
    { title: 'Size', dataIndex: 'size', key: 'size' },
    {
      title: 'Price',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
      render: (sellingPrice: number) => <strong>{formatBalance(sellingPrice)} VND</strong>,
    },
    { title: 'Condition', dataIndex: 'condition', key: 'condition' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          style={{ backgroundColor: 'black', color: 'white' }}
          type="primary"
          onClick={() => navigate(`/itemDetail/${record.itemId}`)}
        >
          Detail
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>List Products</h1>
      <div style={{ marginBottom: '16px', marginTop: '40px' }}>
        <Input
          placeholder="Search by Product Code"
          onChange={e => setItemCodeFilter(e.target.value)}
          style={{ width: '200px', marginRight: '8px', marginLeft: '15px' }}
        />
        <Select
          placeholder="Size"
          onChange={value => setFilterSize(value)}
          style={{ width: '70px', marginRight: '8px' }}
        >
          {sizeOptions}
        </Select>
        <Select
          placeholder="Color"
          onChange={value => setFilterColor(value)}
          style={{ width: '90px', marginRight: '8px' }}
        >
          <Option value="Red">Red</Option>
          <Option value="Blue">Blue</Option>
          <Option value="Green">Green</Option>
        </Select>
        <Select
          placeholder="Condition"
          onChange={value => setFilterCondition(value)}
          style={{ width: '180px', marginRight: '8px' }}
        >
          <Option value="Never worn, with tag">Never worn, with tag</Option>
          <Option value="Never worn">Never worn</Option>
          <Option value="Very good">Very good</Option>
          <Option value="Good">Good</Option>
          <Option value="Fair">Fair</Option>
        </Select>
        <Button
          type="link"
          onClick={showConditionGuide}
          style={{ marginLeft: '255px', color: 'black', textDecoration: 'underline' }}
        >
          <strong>Condition Guide</strong>
        </Button>
      </div>
      {isLoading ? (
        <Spin style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} size="large" />
      ) : (
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <Table dataSource={dataSource} columns={columns} rowKey="variationId" />
            </Col>
            <Col span={6}>
              {dataMaster && (
                <Card title="Master Product Details">
                  <Title level={5}><strong>Item Code:</strong> {dataMaster.masterItemCode}</Title>
                  <Typography><strong>Name:</strong> {dataMaster.name}</Typography><br />
                  <Typography><strong>Brand:</strong> {dataMaster.brand}</Typography><br />
                  <Typography><strong>Category:</strong> {dataMaster.categoryName}</Typography><br />
                  <Typography><strong>Gender:</strong> {dataMaster.gender}</Typography><br />
                  <Typography><strong>Description:</strong> {dataMaster.description}</Typography><br />
                </Card>
              )}
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
        <p><strong>Never worn, with tag</strong> - A never-worn item with tag is an item which has never been worn and still has the original purchase hangtags on it (include a photo of the tag).</p>
        <p><strong>Never worn</strong> - A never-worn item without a tag is an item which has never been worn and shows no defects or alterations.</p>
        <p><strong>Very good</strong> - An item in very good condition is a second-hand item which has been only lightly used and extremely well maintained, which can show slight defects from usage. These must be mentioned in the description and visible on the photos.</p>
        <p><strong>Good</strong> - An item in good condition is a second-hand item which has been worn and well maintained. If the item has defects, they must be mentioned in the description and visible in the photos.</p>
        <p><strong>Fair</strong> - An item in fair condition is a second-hand item which has been worn frequently and shows defects (these are mentioned in the description and visible in photos).</p>
      </Modal>
    </div>
  );
};

export default ChildItems;
