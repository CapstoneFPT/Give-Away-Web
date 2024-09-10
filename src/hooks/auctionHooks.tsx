import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuctionApi, CreateBidRequest } from '../api';
import signalrService from '../pages/service/signalrService';
export const useAuctionData = (auctionId: string, itemId: string) => {
  const auctionDetailApi = new AuctionApi();
  
  return useQuery({
    queryKey: ['auction', auctionId],
    queryFn: async () => {
      const auctionDetailResponse = await auctionDetailApi.apiAuctionsIdGet(auctionId);
      const fetchedProduct = await auctionDetailApi.apiAuctionsIdAuctionItemGet(auctionId);
      const latestBidResponse = await auctionDetailApi.apiAuctionsIdBidsLatestGet(auctionId);
      const serverTimeResponse = await auctionDetailApi.apiAuctionsCurrentTimeGet();


      return {
        auctionDetail: auctionDetailResponse.data,
        product: fetchedProduct.data,
        latestBid: latestBidResponse.data,
        serverTime: serverTimeResponse.data,
      };
    },
  });
};

export const usePlaceBid = (auctionId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bidRequest: CreateBidRequest) => 
      signalrService.placeBid(auctionId, bidRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auction', auctionId] });
    },
  });
};