import React from 'react';
import {Col, Pagination, Row, Spin} from 'antd';
import {MasterItemListResponse} from '../../api';
import ProductCard from './ProductCard';
import {useNavigate} from "react-router-dom";

interface ProductListProps {
    products: MasterItemListResponse[];
    isLoading: boolean;
    currentPage: number;
    pageSize: number;
    totalCount: number;
    onPageChange: (page: number) => void;
    onCardClick: (product: string) => void;
    isBranch?: boolean;
    shopId?: string;
}

const ProductList: React.FC<ProductListProps> = ({
                                                     products,
                                                     isLoading,
                                                     currentPage,
                                                     pageSize,
                                                     totalCount,
                                                     onPageChange,
                                                     isBranch,
                                                     shopId,
                                                     onCardClick
                                                 }) => {




    return (
        <>
            {isLoading && <Spin size="large" style={{display: 'block', margin: '20px auto'}}/>}
            <Row gutter={[16, 16]}>
                {products.map((product) => (
                    <Col key={product.masterItemId} xs={22} sm={12} md={8} lg={6}>
                        <ProductCard
                            product={product}
                            onCardClick={onCardClick}
                            isBranch={isBranch}
                        />
                    </Col>
                ))}
            </Row>
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalCount}
                onChange={onPageChange}
                style={{
                    justifyContent: "center",
                    display: "flex",
                    marginTop: "50px",
                }}
                showSizeChanger={false}
            />
        </>
    );
};

export default ProductList;