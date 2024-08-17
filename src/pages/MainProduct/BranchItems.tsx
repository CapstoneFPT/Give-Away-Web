import React, {useEffect, useState} from "react";
import {FashionItemApi, FashionItemDetailResponse, MasterItemListResponse} from "../../api";
import {useLocation, useNavigate, useParams, useSearchParams,} from "react-router-dom";
import {useCart} from "../CartContext";
import {Col, Layout, notification, Pagination, Row, Spin} from "antd";
import {Content} from "antd/es/layout/layout";
import backgroundImageUrl from "../../components/Assets/—Pngtree—brightly lit interior showcasing empty_4846407.jpg";
import ProductCard from "../../components/commons/ProductCard";

const BranchItems = () => {
    const {dispatch, isItemInCart} = useCart();
    const [products, setProducts] = useState<MasterItemListResponse[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const {shopId} = useParams<{ shopId: string }>();
    const location = useLocation();
    const {state} = location;
    const address = state?.address || "Address not available";

    const navigate = useNavigate();

    const pageSize = 12;

    useEffect(() => {
        if (shopId) {
            console.log("Fetched shopId:", shopId);
            fetchProducts(currentPage, searchParams.get("q"));
        } else {
            console.error("shopId is undefined");
        }
    }, [currentPage, searchParams, shopId]);

    const fetchProducts = async (
        page: number,
        searchParam: string | null,
        categoryId?: string
    ) => {
        setIsLoading(true);
        try {
            const fashionItemApi = new FashionItemApi();
            const response = await fashionItemApi.apiFashionitemsMasterItemsGet(null!, null!, page, 12, categoryId, shopId)

            console.log(response);
            const data = response.data;
            if (data && data?.items && Array.isArray(data.items)) {
                setProducts(data.items);
                setTotalCount(data.totalCount!);
            } else {
                console.error("Data is not in expected format:", data);
            }
        } catch (error) {
            console.error("There was an error fetching the products!", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatBalance = (sellingPrice: number) => {
        return new Intl.NumberFormat("de-DE").format(sellingPrice);
    };

    const handleAddToCart = (product: FashionItemDetailResponse) => {
        if (product.isOrderedYet) {
            notification.error({
                message: "Already Ordered",
                description: `The item "${product.name}" has already been ordered.`,
            });
        } else if (isItemInCart(product.itemId)) {
            notification.warning({
                message: "Already in Cart",
                description: `The item "${product.name}" is already in your cart.`,
            });
        } else {
            dispatch({type: "ADD_TO_CART", payload: {...product}});
            notification.success({
                message: "Added to Cart",
                description: `The item "${product.name}" has been added to your cart.`,
            });
            console.log("Adding item to cart with itemId:", product.itemId);
        }
    };

    const goToListItemPage = (shopId: string, masterItemId: string) => {
        console.log("Navigating to itemDetail with itemId:", masterItemId);
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
                                <h1 style={{margin: "20px"}}>Branch: {address}</h1>
                                {isLoading && (
                                    <Spin style={{textAlign: "center"}} size="large"/>
                                )}
                            </div>
                            <Row gutter={[16, 16]}>
                                {products.map((product) => (
                                    <Col key={product.masterItemId} xs={22} sm={12} md={8} lg={6}>
                                        <ProductCard
                                            product={product}
                                            onAddToCart={handleAddToCart}
                                            formatBalance={formatBalance}
                                            onCardClick={() => goToListItemPage(shopId!, product.masterItemId!)}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            <Pagination
                                onChange={(page) => {
                                    setCurrentPage(page);
                                    fetchProducts(page, searchParams.get("q"));
                                }}
                                current={currentPage}
                                style={{
                                    justifyContent: "center",
                                    display: "flex",
                                    marginTop: "50px",
                                }}
                                pageSize={pageSize}
                                total={totalCount}
                                showSizeChanger={false}
                            />
                        </Content>
                    </Layout>
                </Col>
            </Row>
        </div>
    );
};

export default BranchItems;
