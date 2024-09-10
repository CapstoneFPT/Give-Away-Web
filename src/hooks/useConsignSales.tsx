import { useQuery } from '@tanstack/react-query';
import { AccountApi, ConsignSaleListResponsePaginationResponse, ConsignSaleStatus, ConsignSaleType } from '../api';

interface ConsignSaleQueryParams {
  accountId: string;
  pageNumber?: number;
  pageSize?: number;
  shopId?: string;
  consignSaleCode?: string;
  status?: ConsignSaleStatus;
  type?: ConsignSaleType;
  startDate?: string;
  endDate?: string;
}

const useConsignSales = (params: ConsignSaleQueryParams) => {
  const accountApi = new AccountApi();

  return useQuery<ConsignSaleListResponsePaginationResponse>({
    queryKey: ['consignSales', params],
    queryFn: async () => {
      const response = await accountApi.apiAccountsAccountIdConsignsalesGet(
        params.accountId,
        params.pageNumber,
        params.pageSize,
        params.shopId,
        params.consignSaleCode,
        params.status,
        params.type,
        params.startDate ? new Date(params.startDate).toISOString() : undefined,
        params.endDate ? new Date(params.endDate).toISOString() : undefined
      );
      return response.data;
    },
  });
};

export default useConsignSales;