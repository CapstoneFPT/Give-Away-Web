import React from 'react';
import { Card, Row, Col, Image, Typography, Checkbox, Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const CartItem = ({ item, onSelect, onRemove, isSelected } : any) => {
    const { itemId, name, sellingPrice, size, color, brand, gender, condition, images } = item;

    return (
        <Card
            hoverable
            className="mb-4"
            bodyStyle={{ padding: 16 }}
        >
            <Row gutter={16} align="middle">
                <Col>
                    <Checkbox
                        checked={isSelected}
                        onChange={() => onSelect(itemId)}
                    />
                </Col>
                <Col>
                    <Image
                        src={images[0]}
                        alt={name}
                        width={120}
                        height={120}
                        style={{ objectFit: 'cover' }}
                    />
                </Col>
                <Col flex="1">
                    <Space direction="vertical" size={0} style={{ width: '100%' }}>
                        <Title level={4} style={{ marginBottom: 8 }}>{name}</Title>
                        <Row gutter={[16, 4]}>
                            <Col span={12}><Text type="secondary">Size: {size}</Text></Col>
                            <Col span={12}><Text type="secondary">Color: {color}</Text></Col>
                            <Col span={12}><Text type="secondary">Brand: {brand}</Text></Col>
                            <Col span={12}><Text type="secondary">Gender: {gender}</Text></Col>
                        </Row>
                        <Text type="secondary">Condition: {condition}</Text>
                    </Space>
                </Col>
                <Col>
                    <Space direction="vertical" align="end">
                        <Title level={3} style={{ color: '#52c41a', margin: 0 }}>
                            {new Intl.NumberFormat('de-DE').format(sellingPrice)} VND
                        </Title>
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => onRemove(item)}
                        >
                            Remove
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

export default CartItem;