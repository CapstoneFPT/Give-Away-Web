import React, { useState } from "react";
import { Card, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import backgroundImageUrl from "../Assets/freepik_5229782.jpg";
import ProductList from "../commons/ProductList.tsx";
import useNavigateToListProducts from "../../hooks/useNavigateToListProducts.tsx";
import { useQuery } from "@tanstack/react-query";
import { MasterItemApi, MasterItemListResponsePaginationResponse } from "../../api";

const ItemDisplayHome: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { goToListProducts } = useNavigateToListProducts();
    const pageSize = 24;

    const { data, isLoading } = useQuery<MasterItemListResponsePaginationResponse>({
        queryKey: ['homeProducts', currentPage, pageSize],
        queryFn: async () => {
            const masterItemApi = new MasterItemApi();
            const response = await masterItemApi.apiMasterItemsFrontpageGet(
                null!,
                null!,
                null!,
                currentPage,
                pageSize
            );
            return response.data;
        },
    });

    const products = data?.items || [];
    const totalCount = data?.totalCount || 0;

    return (
        <Card
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
            }}
        >
            <Layout
                style={{
                    padding: "0 24px 24px",
                    backgroundColor: "rgba(225, 225, 225, 0.1)",
                }}
            >
                <Content>
                    <Header style={{textAlign: "center", backgroundColor: "transparent"}}>
                        <h1>Collection</h1>
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
        </Card>
    );
};

export default ItemDisplayHome;