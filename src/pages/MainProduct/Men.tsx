import React, {useEffect, useState} from "react";
import {Card, Col, Layout, Menu, Row} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import {Content, Header} from "antd/es/layout/layout";
import {CategoryApi, CategoryTreeNode} from "../../api";
import backgroundImageUrl from "../../components/Assets/shutterstock_455310238.jpg";
import SubMenu from "antd/es/menu/SubMenu";
import useProductsFetch from "../../hooks/useProductsFetch.tsx";
import ProductList from "../../components/commons/ProductList.tsx";
import useNavigateToListProducts from "../../hooks/useNavigateToListProducts.tsx";

const Men: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState<CategoryTreeNode[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        "535d3b90-dc58-41e3-ad32-055e261bd6a7");

    const {goToListProducts} = useNavigateToListProducts()
    const pageSize = 12;

    const {
        products, totalCount, isLoading
    } = useProductsFetch({
        page: currentPage,
        pageSize,
        gender: "Male",
        categoryId: selectedCategoryId!
    })

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const categoryApi = new CategoryApi();
            const rootCategoryId = "535d3b90-dc58-41e3-ad32-055e261bd6a7";
            const responseCategory = await categoryApi.apiCategoriesTreeGet(
                null!,
                rootCategoryId
            );
            console.log(responseCategory.data.categories);

            if (responseCategory.data && responseCategory.data.categories) {
                setCategories(responseCategory.data.categories || []);
            } else {
                console.error("No categories found in the response:", responseCategory);
            }
        } catch (error) {
            console.error("There was an error fetching the categories!", error);
        }
    };

    const renderMenuItems = (categories: CategoryTreeNode[]): React.ReactNode => {
        return categories.map((category) => {
            if (category.children && category.children.length > 0) {
                return (
                    <SubMenu
                        key={category.categoryId}
                        icon={<AppstoreOutlined/>}
                        title={category.name}
                        onTitleClick={({key}) => handleMenuSelect({key: key as string})}
                    >
                        <Menu.Item key={category.categoryId}>All {category.name}</Menu.Item>
                        {renderMenuItems(category.children)}
                    </SubMenu>
                );
            }
            return (
                <Menu.Item key={category.categoryId} icon={<AppstoreOutlined/>}>
                    {category.name}
                </Menu.Item>
            );
        });
    };

    const handleMenuSelect = ({key}: { key: string }) => {
        if (key) {
            setSelectedCategoryId(key);
            setCurrentPage(1);
        }
    };

    // const formatBalance = (sellingPrice: any) => {
    //     return new Intl.NumberFormat("de-DE").format(sellingPrice);
    // };

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: "cover",
                minHeight: "100vh",
                backgroundColor: "rgba(255, 255, 255, 0)",
                overflow: "hidden",
            }}
        >
            <Row gutter={[16, 16]}>
                <Col span={4}>
                    <Card title='Category' style={{background: "#fff", marginTop: "20px"}}>

                        <Menu
                            mode="horizontal"
                            selectedKeys={[selectedCategoryId || ""]}
                            defaultOpenKeys={categories.map((cat) => cat.categoryId!)}
                            style={{height: "100%", borderRight: 0}}
                            onSelect={handleMenuSelect}
                        >
                            {renderMenuItems(categories)}
                        </Menu>
                    </Card>
                </Col>
                <Col span={20}>
                    <Layout style={{backgroundColor: "rgba(255, 255, 255, 0)"}}>
                        <Content style={{ padding: "20px", overflow: "hidden" }}>
                            <Header style={{ textAlign: "center", backgroundColor: "rgba(255, 255, 255, 0)" }}>
                                <h1>Men Collection</h1>
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

export default Men;
