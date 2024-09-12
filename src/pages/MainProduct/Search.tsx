import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import backgroundImageUrl from "../../components/Assets/719789-apparel-hanger-top-shirt-t-shirt-fashion-rack.jpg";
import ProductList from "../../components/commons/ProductList.tsx";
import useNavigateToListProducts from "../../hooks/useNavigateToListProducts.tsx";
import { useQuery } from "@tanstack/react-query";
import { MasterItemApi, MasterItemListResponsePaginationResponse } from "../../api";

const Search: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const { goToListProducts } = useNavigateToListProducts();

  const pageSize = 12;
  const searchQuery = searchParams.get("q");

  const { data, isLoading } = useQuery<MasterItemListResponsePaginationResponse>({
    queryKey: ['searchProducts', searchQuery, currentPage, pageSize],
    queryFn: async () => {
      const masterItemApi = new MasterItemApi();
      const response = await masterItemApi.apiMasterItemsFrontpageGet(
        searchQuery || null!,
        null!,
        null!,
        currentPage,
        pageSize,
        true
      );
      return response.data;
    },
    enabled: !!searchQuery,
  });

  const products = data?.items || [];
  const totalCount = data?.totalCount || 0;

  return (
    <div style={{
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      backgroundColor: "rgba(255, 255, 255, 0)",
    }}>
      <Layout style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>
        <Content style={{ padding: "20px" }}>
          <Header style={{ textAlign: "center", backgroundColor: "rgba(255, 255, 255, 0)" }}>
            <h1>Search Results for "{searchQuery}"</h1>
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
    </div>
  );
};

export default Search;
