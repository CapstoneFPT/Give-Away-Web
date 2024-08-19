import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Row,
  Col,
  Card,
} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {
  CategoryApi,
  CategoryTreeNode,
} from "../../api";
import backgroundImageUrl from "../../components/Assets/freepik_3858429.jpg";
import useProductsFetch from "../../hooks/useProductsFetch.tsx";
import ProductList from "../../components/commons/ProductList.tsx";
import useNavigateToListProducts from "../../hooks/useNavigateToListProducts.tsx";
import useMenuItems from "../../hooks/useMenuItems.tsx";

const Women: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState<CategoryTreeNode[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("3e4c6370-a72b-44e3-a5eb-8f459764158f");
    const {goToListProducts} = useNavigateToListProducts();

    const pageSize = 12;

    const { products, totalCount, isLoading } = useProductsFetch({
        page: currentPage,
        pageSize,
        gender: 'Female',
        categoryId: selectedCategoryId
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const categoryApi = new CategoryApi();
            const rootCategoryId = "3e4c6370-a72b-44e3-a5eb-8f459764158f";
            const response = await categoryApi.apiCategoriesTreeGet(null!, rootCategoryId);
            setCategories(response.data.categories || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    // const formatBalance = (balance: number) => new Intl.NumberFormat("de-DE").format(balance);


    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        setCurrentPage(1);
    };

    const menuItems = useMenuItems(categories, handleCategorySelect);
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
                            defaultOpenKeys={categories.map((cat) => cat.categoryId!)}
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
                                products={products}
                                isLoading={isLoading}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                totalCount={totalCount}
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