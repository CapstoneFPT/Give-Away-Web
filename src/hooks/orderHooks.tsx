import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderApi } from '../api';

export const useCheckoutOrder = (userId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (orderId: string) => {
      const orderApi = new OrderApi();
      const response = await orderApi.apiOrdersOrderIdPayPointsPost(orderId, { memberId: userId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useCheckoutVnpay = (userId: string) => {
  return useMutation({
    mutationFn: async (orderId: string) => {
      const orderApi = new OrderApi();
      const response = await orderApi.apiOrdersOrderIdPayVnpayPost(orderId, { memberId: userId });
      return response.data;
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (orderId: string) => {
      const orderApi = new OrderApi();
      await orderApi.apiOrdersOrderIdCancelPut(orderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};