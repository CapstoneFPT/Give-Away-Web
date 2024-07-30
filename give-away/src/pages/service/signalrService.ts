import * as signalR from "@microsoft/signalr";
import { BidDetailResponse, CreateBidRequest } from "../../api";

class SignalRService {
  private connection: signalR.HubConnection;
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://giveawayproject.jettonetto.org:8443/auctionHub")
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  public async startConnection(): Promise<void> {
    try {
      await this.connection.start();
      console.log("SignalR Connected");
    } catch (err) {
      console.log("SignalR Error: " + err);
    }
  }

  public async stopConnection(): Promise<void> {
    try {
      await this.connection.stop();
      console.log("SignalR Disconnected");
    } catch (err) {
      console.log("SignalR Error: " + err);
    }
  }

  public onReceiveBidUpdate(callback: (bid: BidDetailResponse) => void): void {
    this.connection.on("ReceiveBidUpdate", callback);
  }

  public onAuctionEnded(callback: (auctionId: string) => void): void {
    this.connection.on("AuctionEnded", callback);
  }

  public async placeBid(
    auctionId: string,
    bidRequest: CreateBidRequest
  ): Promise<void> {
    this.connection.invoke("PlaceBid", auctionId, bidRequest);
  }

  public async joinAuctionGroup(auctionId: string) {
    await this.connection.invoke("JoinAuctionGroup", auctionId);
  }

  public async leaveAuctionGroup(auctionId: string) {
    await this.connection.invoke("LeaveAuctionGroup", auctionId);
  }
}

export default new SignalRService();
