import { useQuery } from '@tanstack/react-query';
import { AccountApi, GetWithdrawsResponsePaginationResponse, WithdrawStatus } from '../api';

interface WithdrawHistoryParams {
  accountId: string;
  page?: number;
  pageSize?: number;
  status?: WithdrawStatus;
  withdrawCode?: string;
}

const useWithdrawHistory = (params: WithdrawHistoryParams) => {
  const accountApi = new AccountApi();

  return useQuery<GetWithdrawsResponsePaginationResponse>({
    queryKey: ['withdrawHistory', params],
    queryFn: async () => {
      const response = await accountApi.apiAccountsAccountIdWithdrawsGet(
        params.accountId,
        params.page,
        params.pageSize,
        params.status,
        params.withdrawCode
      );
      return response.data;
    },
  });
};

export default useWithdrawHistory;