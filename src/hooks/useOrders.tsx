import { useQuery } from '@tanstack/react-query';
import { AccountApi, OrderStatus, PaymentMethod, PurchaseType, OrderListResponsePaginationResponse } from '../api';

interface OrderQueryParams {
  accountId: string;
  pageNumber?: number;
  pageSize?: number;
  shopId?: string;
  status?: OrderStatus;
  paymentMethod?: PaymentMethod;
  purchaseType?: PurchaseType;
  phone?: string;
  recipientName?: string;
  email?: string;
  customerName?: string;
  orderCode?: string;
  isFromAuction?: boolean;
}

const useOrders = (params: OrderQueryParams) => {
  const accountApi = new AccountApi();

  return useQuery<OrderListResponsePaginationResponse>({
    queryKey: ['orders', params],
    queryFn: async () => {
      const response = await accountApi.apiAccountsAccountIdOrdersGet(
        params.accountId,
        params.pageNumber,
        params.pageSize,
        params.shopId,
        params.status,
        params.paymentMethod,
        params.purchaseType,
        params.phone,
        params.recipientName,
        params.email,
        params.customerName,
        params.orderCode,
        params.isFromAuction
      );
      return response.data;
    },
    enabled: !!params.accountId,
  });
};

export default useOrders;