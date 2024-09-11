import { AuctionStatus, FashionItemStatus, OrderStatus, RefundStatus } from "../api";

export type Test = {
  name: string
};
export const  getStatusColor = (status: string) => {
  switch (status) {
    case FashionItemStatus.Available:
      return "green";
    case FashionItemStatus.Unavailable:
      return "red";
    case FashionItemStatus.OnDelivery:
      return "blue";
    case FashionItemStatus.Sold:
      return "success";
    case FashionItemStatus.UnSold:
      return "grey";
    case FashionItemStatus.Reserved:
      return "purple";
    case FashionItemStatus.Refundable:
      return "cyan";
    case FashionItemStatus.Draft:
      return "volcano";
    case FashionItemStatus.PendingForConsignSale:
      return "gold";
    case FashionItemStatus.PendingAuction:
      return "lime";
    case FashionItemStatus.PendingForRefund:
      return "magenta";
    case FashionItemStatus.PendingForOrder:
      return "geekblue";
    case FashionItemStatus.AwaitingAuction:
      return "processing";
    case FashionItemStatus.Bidding:
      return "blue";
    case FashionItemStatus.Rejected:
      return "red";
    case FashionItemStatus.Returned:
      return "orange";
    case FashionItemStatus.Won:
      return "green";
    default:
      return "default";
  }
};

export const getOrderStatus = (status: string) => {
  switch (status) {
    case OrderStatus.AwaitingPayment:
      return "yellow";
      case OrderStatus.Cancelled:
      return "red";
      case OrderStatus.Completed:
      return "green";
      case OrderStatus.OnDelivery:
      return "blue";
      case OrderStatus.Pending:
      return "orange";
    default:
      return "default";
  }

}
export const getRefundStatus = (status: string) => {
  switch (status) {
    case RefundStatus.Approved:
      return "yellow";
      case RefundStatus.Completed:
      return "green";
      case RefundStatus.Pending:
      return "blue";
      case RefundStatus.Rejected:
      return "red";
      case RefundStatus.Cancelled:
      return "orange";

    default:
      return "default";
  }

}
export const getAuctionStatus = (status: string) => {
  switch (status) {
    case AuctionStatus.Approved:
      return "purple";
      case AuctionStatus.Finished:
      return "green";
      case AuctionStatus.OnGoing:
      return "blue";
      case AuctionStatus.Pending:
      return "orange";
      case RefundStatus.Rejected:
      return "red";

    default:
      return "default";
  }

}

