import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Col, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import backgroundImageUrl from "../../components/Assets/—Pngtree—brightly lit interior showcasing empty_4846407.jpg";
import useProductsFetch from "../../hooks/useProductsFetch.tsx";
import ProductList from "../../components/commons/ProductList.tsx";

const BranchItems: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { shopId } = useParams<{ shopId: string }>();
    const location = useLocation();
    const { state } = location;
    const address = state?.address || "Address not available";
    const navigate = useNavigate();

    const pageSize = 12;

    const { products, totalCount, isLoading } = useProductsFetch({
        page: currentPage,
        pageSize,
        shopId: shopId
    });

    const goToListItemPage = (masterItemId: string) => {
        navigate(`/shopBranch/${shopId}/listItems/${masterItemId}`);
    };

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                backgroundColor: "rgba(255, 255, 255, 0)",
            }}
        >
            <Row gutter={[16, 16]}>
                <Col span={4}></Col>
                <Col span={20}>
                    <Layout
                        style={{
                            padding: "0 24px 24px",
                            backgroundColor: "rgba(255, 255, 255, 0)",
                        }}
                    >
                        <Content>
                            <div
                                style={{
                                    textAlign: "center",
                                    marginBottom: "15px",
                                    backgroundColor: "rgba(255, 255, 255, 0)",
                                }}
                            >
                                <h1 style={{ margin: "20px" }}>Branch: {address}</h1>
                            </div>
                            <ProductList
                                products={products}
                                isLoading={isLoading}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                totalCount={totalCount}
                                onPageChange={setCurrentPage}
                                isBranch={true}
                                onCardClick={goToListItemPage}
                            />
                        </Content>
                    </Layout>
                </Col>
            </Row>
        </div>
    );
};

export default BranchItems;