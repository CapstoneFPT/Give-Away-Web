import { NavigateFunction } from "react-router-dom";
import { BidDetailResponse } from "../api";
import { useEffect } from "react";
import signalrService from "../pages/service/signalrService";

export const useSignalRSetup = (auctionId: string, addBid: (bid: BidDetailResponse) => void, navigate: NavigateFunction, onFinish: () => void) => {
  useEffect(() => {
    const setupSignalR = async () => {
      try {
        await signalrService.startConnection();
        signalrService.joinAuctionGroup(auctionId);
        signalrService.onReceiveBidUpdate(addBid);
        signalrService.onAuctionEnded((id: string) => {
          if (id === auctionId) {
            onFinish();
          }
        });
      } catch (error) {
        console.error("SignalR Error: ", error);
      }
    };

    setupSignalR();

    return () => {
      signalrService.leaveAuctionGroup(auctionId);
    };
  }, [auctionId, addBid, navigate, onFinish]);
};