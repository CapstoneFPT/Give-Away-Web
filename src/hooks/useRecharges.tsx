import { useQuery } from '@tanstack/react-query';
import { AccountApi, RechargeListResponsePaginationResponse, RechargeStatus } from '../api';

interface RechargeQueryParams {
  accountId: string;
  page?: number;
  pageSize?: number;
  rechargeCode?: string;
  rechargeStatus?: RechargeStatus;
}

const useRecharges = (params: RechargeQueryParams) => {
  const accountApi = new AccountApi();

  return useQuery<RechargeListResponsePaginationResponse>({
    queryKey: ['recharges', params],
    queryFn: async () => {
      const response = await accountApi.apiAccountsAccountIdRechargesGet(
        params.accountId,
        params.page,
        params.pageSize,
        params.rechargeCode,
        params.rechargeStatus
      );
      return response.data;
    },
  });
};

export default useRecharges;