import React, { useState } from "react";
import { Layout, Menu, Row, Col, Card } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { CategoryApi, MasterItemApi, MasterItemListResponsePaginationResponse } from "../../api";
import backgroundImageUrl from "../../components/Assets/freepik_3858429.jpg";
import ProductList from "../../components/commons/ProductList.tsx";
import useNavigateToListProducts from "../../hooks/useNavigateToListProducts.tsx";
import useMenuItems from "../../hooks/useMenuItems.tsx";
import { useQuery } from "@tanstack/react-query";

const Women: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("550e8400-e29b-41d4-a716-446655440001");
    const { goToListProducts } = useNavigateToListProducts();

    const pageSize = 12;

    const { data: categoriesData } = useQuery({
        queryKey: ['categories', 'women'],
        queryFn: async () => {
            const categoryApi = new CategoryApi();
            const rootCategoryId = "550e8400-e29b-41d4-a716-446655440001";
            const response = await categoryApi.apiCategoriesTreeGet(null!, rootCategoryId);
            return response.data.categories || [];
        },
    });

    const { data: productsData, isLoading } = useQuery<MasterItemListResponsePaginationResponse>({
        queryKey: ['products', 'women', currentPage, pageSize, selectedCategoryId],
        queryFn: async () => {
            const masterItemApi = new MasterItemApi();
            const response = await masterItemApi.apiMasterItemsFrontpageGet(
                null!,
                selectedCategoryId,
                'Female',
                currentPage,
                pageSize,
                true
            );
            return response.data;
        },
    });

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        setCurrentPage(1);
    };

    const menuItems = useMenuItems(categoriesData || [], handleCategorySelect);

    return (
        <div style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0)",
            overflow: "hidden",
        }}>
            <Row gutter={[16, 16]}>
                <Col span={4}>
                    <Card title="Category" style={{ background: "#fff", marginTop: "20px" }}>
                        <Menu
                            mode="horizontal"
                            selectedKeys={[selectedCategoryId]}
                            defaultOpenKeys={categoriesData?.map((cat) => cat.categoryId!) || []}
                            style={{ height: "100%", borderRight: 0 }}
                        >
                            {menuItems}
                        </Menu>
                    </Card>
                </Col>
                <Col span={20}>
                    <Layout style={{ padding: "0 24px 24px", backgroundColor: "rgba(255, 255, 255, 0)", overflow: "hidden" }}>
                        <Content style={{ overflow: "hidden" }}>
                            <Header style={{ textAlign: "center", backgroundColor: "rgba(255, 255, 255, 0)" }}>
                                <h1>Women Collection</h1>
                            </Header>
                            <ProductList
                                products={productsData?.items || []}
                                isLoading={isLoading}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                totalCount={productsData?.totalCount || 0}
                                onPageChange={setCurrentPage}
                                onCardClick={goToListProducts}
                            />
                        </Content>
                    </Layout>
                </Col>
            </Row>
        </div>
    );
};

export default Women;