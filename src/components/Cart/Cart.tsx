import React from 'react';
import {Button, Checkbox, Image, Space, Table, Tag, Typography} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {FashionItemDetailResponse} from "../../api";
import {Product} from "../../pages/CartContext.tsx";

const {Text, Title, Paragraph} = Typography;

interface CartProps {
    cartItems: FashionItemDetailResponse[],
    selectedItems: string[],
    onSelect: (itemId: string) => void,
    onRemove: (itemId: Product) => void,
    onSelectAll: (checked: boolean) => void
}

const Cart: React.FC<CartProps> = ({cartItems, selectedItems, onSelect, onRemove, onSelectAll}: any) => {
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
                        <Paragraph>
                            <Text type="secondary">{record.itemCode}</Text>
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
                title: 'UnitPrice',
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
                title: 'Quantity',
                dataIndex:
                    'quantity',
                align:
                    'center',
                render:
                    (quantity: number = 1) => (
                        <Title level={4} style={{color: 'black', margin: 0}}>
                            {quantity}
                        </Title>
                    ),
            }
            ,
            // {
            //     title: 'Price',
            //     dataIndex:
            //         'sellingPrice',
            //     align:
            //         'center',
            //     render:
            //         (total: number, record: any) => (
            //             <Title level={4} style={{color: 'black', margin: 0}}>
            //                 {new Intl.NumberFormat('de-DE').format(record.sellingPrice * record.quantity)} VND
            //             </Title>
            //         ),
            // }
            // ,
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
        
            components={{
                header: {
                    cell: (props: any) => (
                        <th {...props} style={{ backgroundColor: "gray", color: "white", border:'none',  }} />
                    ),
                },
            }}
            columns={columns}
            dataSource={cartItems}
            rowKey="itemId"
            pagination={false}
            style={{ background: 'white', border: "1px solid #aeacac",borderRadius: "10px",    }}
        />
    );
};

export default Cart;