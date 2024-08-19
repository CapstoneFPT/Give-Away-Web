import React from 'react';
import {Card, Typography} from 'antd';
import {MasterItemListResponse} from '../../api';

interface ProductCardProps {
    product: MasterItemListResponse;
    onCardClick: (masterItemId: string) => void;
}

const {Text} = Typography;

interface ProductCardProps {
    isBranch?: unknown
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     product,
                                                     onCardClick,
                                                     isBranch
                                                 }) => {
    const {
        masterItemId,
        name,
        images,
        brand,
        gender,
        itemCode,
        stockCount
    } = product;

    const handleClick = () => {
        if (!isBranch) {
            onCardClick(itemCode!)
        } else {
            onCardClick(masterItemId!);
        }
    };

    return (
        <Card
            hoverable
            onClick={handleClick}
            cover={
                <img
                    alt={name || "Product"}
                    src={images?.[0] || "/placeholder-image.jpg"}
                    style={{height: 300, objectFit: "cover"}}
                />
            }
            style={{
                width: 300,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}
        >
            <Card.Meta
                title={name}
                style={{
                    height: 60,
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 18
                }}
            />

            <div style={{textAlign: 'left', marginTop: 10}}>
                <ProductDetail label="Brand" value={brand!}/>
                <br/>
                <ProductDetail label="Gender" value={gender}/>
                <br/>
                <ProductDetail label="Code" value={itemCode!}></ProductDetail>
                <br/>
                <ProductDetail label="Total" value={stockCount?.toString()}/>
            </div>
        </Card>
    );
};

const ProductDetail: React.FC<{ label: string; value?: string | number }> = ({label, value}) => (
    <Text>
        <Text strong>{label}:</Text> {value || 'N/A'}
    </Text>
);

export default ProductCard;