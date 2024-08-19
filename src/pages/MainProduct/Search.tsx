import React, {  useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Layout,
} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import backgroundImageUrl from "../../components/Assets/719789-apparel-hanger-top-shirt-t-shirt-fashion-rack.jpg";
import ProductList from "../../components/commons/ProductList.tsx";
import useProductsFetch from "../../hooks/useProductsFetch.tsx";
const Search: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pageSize = 12;
  const searchQuery = searchParams.get("q");

  const { products, totalCount, isLoading } = useProductsFetch({
    page: currentPage,
    pageSize,
    searchTerm: searchQuery || undefined,
  });

  // const formatBalance = (balance: number) => new Intl.NumberFormat("de-DE").format(balance);

  const goToDetailPage = (itemId: string) => navigate(`/itemDetail/${itemId}`);

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
                onCardClick={goToDetailPage}
            />
          </Content>
        </Layout>
      </div>
  );
};

export default Search;
