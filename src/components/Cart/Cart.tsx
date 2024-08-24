import React from 'react';
import {Button, Checkbox, Image, Space, Table, Tag, Typography} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';

const {Text, Title, Paragraph} = Typography;

const Cart = ({cartItems, selectedItems, onSelect, onRemove, onSelectAll}: any) => {
    const columns: any = [
            {
                title: () => (
                    <Checkbox
                        checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                        indeterminate={selectedItems.length > 0 && selectedItems.length < cartItems.length}
                        onChange={(e) => onSelectAll(e.target.checked)}
                    />
                ),
                dataIndex: 'select',
                width: 50,
                render: (_: any, record: any) => (
                    <Checkbox
                        checked={selectedItems.includes(record.itemId)}
                        onChange={() => onSelect(record.itemId)}
                    />
                ),
            },
            {
                title: 'Product',
                dataIndex: 'images',
                align: 'center',
                width: 250,
                render: (images: any[], record: any) => (
                    <>
                        <Paragraph>
                            <Text strong style={{
                                fontSize: '16px',
                            }}>{record.name}</Text>
                        </Paragraph>
                        <Image
                            src={images[0]}
                            alt="Product"
                            width={100}
                            height={100}
                            style={{objectFit: 'cover'}}
                        />

                    </>
                ),
            },
            {
                title: 'Product Details',
                align: 'center',
                dataIndex: 'name',
                render: (_: any, record: any) => (
                    <Space direction="vertical" size={8} align="start">
                        <div>
                            <Typography><strong>Brand: </strong> <Tag color="black">{record.brand}</Tag></Typography>
                        </div>
                        <div>
                            <Typography><strong>Size: </strong><Tag color="black">{record.size}</Tag></Typography>
                        </div>
                        <div>
                            <Typography><strong>Gender: </strong>{record.gender}</Typography>
                        </div>
                        <div>
                            <Typography><strong>Color: </strong>{record.color}</Typography>
                        </div>
                    </Space>
                ),
            },
            {
                title: 'Condition',
                dataIndex:
                    'condition',
                align:
                    'center',
                render:
                    (condition: string) => (
                        <Tag color="black" style={{
                            fontSize: '16px',
                        }}>{condition}</Tag>
                    ),
            }
            ,
            {
                title: 'Price',
                dataIndex:
                    'sellingPrice',
                align:
                    'center',
                render:
                    (price: number) => (
                        <Title level={4} style={{color: 'black', margin: 0}}>
                            {new Intl.NumberFormat('de-DE').format(price)} VND
                        </Title>
                    ),
            }
            ,
            {
                title: 'Action',
                key:
                    'action',
                align:
                    'center',
                width:
                    100,
                render:
                    (_: any, record: any) => (
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined/>}
                            onClick={() => onRemove(record)}
                        >
                            Remove
                        </Button>
                    ),
            }
            ,
        ]
    ;

    return (
        <Table
            columns={columns}
            dataSource={cartItems}
            rowKey="itemId"
            pagination={false}
            style={{background: 'white'}}
        />
    );
};

export default Cart;