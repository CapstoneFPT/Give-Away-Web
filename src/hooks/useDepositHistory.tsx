import { useQuery } from '@tanstack/react-query';
import { AccountApi, AccountDepositsListResponsePaginationResponse } from '../api';

interface DepositHistoryParams {
  accountId: string;
  page?: number;
  pageSize?: number;
  depositCode?: string;
  auctionCode?: string;
}

const useDepositHistory = (params: DepositHistoryParams) => {
  const accountApi = new AccountApi();

  return useQuery<AccountDepositsListResponsePaginationResponse>({
    queryKey: ['depositHistory', params],
    queryFn: async () => {
      const response = await accountApi.apiAccountsAccountIdDepositsGet(
        params.accountId,
        params.page,
        params.pageSize,
        params.depositCode,
        params.auctionCode
      );
      return response.data;
    },
  });
};

export default useDepositHistory;