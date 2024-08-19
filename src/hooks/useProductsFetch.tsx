import {FashionItemApi, GenderType, MasterItemListResponse} from "../api";
import {useEffect, useState} from "react";

interface UseProductsFetchProps {
    page: number;
    pageSize: number;
    gender?: GenderType;
    categoryId?: string;
    searchTerm?: string;
    shopId?: string;
}

const useProductsFetch = ({
                              page,
                              pageSize,
                              categoryId,
                              searchTerm,
                              gender,
                              shopId
                          }: UseProductsFetchProps) => {
    const [products, setProducts] = useState<MasterItemListResponse[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
            const fetchProducts = async () => {
                setIsLoading(true);
                try {
                    const fashionItemApi = new FashionItemApi();
                    let response;

                    if (searchTerm) {
                        response = await fashionItemApi.apiFashionitemsMasterItemsFrontpageGet(
                            searchTerm,
                            categoryId,
                            null!,
                            page,
                            pageSize
                        );
                    } else if (gender) {
                        response = await fashionItemApi.apiFashionitemsMasterItemsFrontpageGet(
                            null!,
                            categoryId,
                            gender,
                            page,
                            pageSize)
                    } else if (shopId) {
                        response = await fashionItemApi.apiFashionitemsMasterItemsGet(
                            null!,
                            null!,
                            page,
                            pageSize,
                            categoryId,
                            shopId,
                            null!
                        )
                    } else {
                        response = await fashionItemApi.apiFashionitemsMasterItemsFrontpageGet(
                            null!,
                            null!,
                            null!,
                            page,
                            pageSize
                        );
                    }

                    setProducts(response.data.items || [])
                    setTotalCount(response.data.totalCount || 0)
                } catch
                    (error) {
                    console.error("There was an error fetching the products!", error);
                } finally {
                    setIsLoading(false);
                }
            }

            fetchProducts()
        }, [page, pageSize, gender, categoryId, searchTerm]
    )
    ;

    return {products, totalCount, isLoading};

}

export default useProductsFetch