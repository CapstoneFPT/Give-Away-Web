import { useQuery } from '@tanstack/react-query';
import { AccountApi, AccountTransactionsListResponse, AccountTransactionsListResponsePaginationResponse, TransactionType } from '../api';

interface TransactionQueryParams {
  accountId: string;
  page?: number;
  pageSize?: number;
  types?: TransactionType[];
  orderCode?: string;
  consignSaleCode?: string;
  rechargeCode?: string;
  depositCode?: string;
  transactionCode?: string;
}

const useTransactions = (params: TransactionQueryParams) => {
  const accountApi = new AccountApi();

  return useQuery<AccountTransactionsListResponsePaginationResponse>({
    queryKey: ['transactions', params],
    queryFn: async () => {
      const response = await accountApi.apiAccountsAccountIdTransactionsGet(
        params.accountId,
        params.page,
        params.pageSize,
        params.types,
        params.transactionCode,
        params.orderCode,
        params.consignSaleCode,
        params.rechargeCode,
        params.depositCode
      );
      return response.data;
    },
  });
};

export default useTransactions;