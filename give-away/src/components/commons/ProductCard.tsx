import React from 'react';
import { Card, Button } from 'antd';
import { FashionItemDetailResponse } from '../../api';

interface ProductCardProps {
  product: FashionItemDetailResponse;
  formatBalance: (price: number) => string;
  onAddToCart: (product: FashionItemDetailResponse) => void;
  onCardClick: (itemId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, formatBalance, onAddToCart, onCardClick }) => {
  return (
    <Card
      style={{ width: "330px", boxShadow: '-moz-initial', textAlign: 'center' }}
      hoverable
      onClick={() => onCardClick(product.itemId!)}
      cover={
        <img
          alt={product.name ?? "N/A"}
          src={product.images?.[0] ?? "N/A"}
          style={{ height: "300px", objectFit: "cover" }}
        />
      }
    >
      <Card.Meta
        style={{ height: "60px", fontWeight: 'bold', color: 'black', fontSize: '18px' }}
        title={product.name}
        description={`${formatBalance(product.sellingPrice!)} VND`}
      />
      <div style={{ marginTop: "15px", textAlign: 'center' }}>
        <Button
          type="primary"
          style={{
            backgroundColor: "rgb(28, 26, 26, 0.95)",
            color: "white",
            width: "140px",
            height: "36px",
            border: "0.1px solid gray",
            borderRadius: "0px",
            fontSize: "16px",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;