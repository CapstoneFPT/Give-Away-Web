/* tslint:disable */
/* eslint-disable */
/**
 * Give Away API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Order } from './Order';
import {
    OrderFromJSON,
    OrderFromJSONTyped,
    OrderToJSON,
} from './Order';
import type { Auction } from './Auction';
import {
    AuctionFromJSON,
    AuctionFromJSONTyped,
    AuctionToJSON,
} from './Auction';
import type { Member } from './Member';
import {
    MemberFromJSON,
    MemberFromJSONTyped,
    MemberToJSON,
} from './Member';

/**
 * 
 * @export
 * @interface Bid
 */
export interface Bid {
    /**
     * 
     * @type {string}
     * @memberof Bid
     */
    bidId?: string;
    /**
     * 
     * @type {number}
     * @memberof Bid
     */
    amount?: number;
    /**
     * 
     * @type {Date}
     * @memberof Bid
     */
    createdDate?: Date;
    /**
     * 
     * @type {Auction}
     * @memberof Bid
     */
    auction?: Auction;
    /**
     * 
     * @type {string}
     * @memberof Bid
     */
    auctionId?: string;
    /**
     * 
     * @type {Member}
     * @memberof Bid
     */
    member?: Member;
    /**
     * 
     * @type {Order}
     * @memberof Bid
     */
    order?: Order;
    /**
     * 
     * @type {string}
     * @memberof Bid
     */
    memberId?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Bid
     */
    isWinning?: boolean;
}

/**
 * Check if a given object implements the Bid interface.
 */
export function instanceOfBid(value: object): value is Bid {
    return true;
}

export function BidFromJSON(json: any): Bid {
    return BidFromJSONTyped(json, false);
}

export function BidFromJSONTyped(json: any, ignoreDiscriminator: boolean): Bid {
    if (json == null) {
        return json;
    }
    return {
        
        'bidId': json['bidId'] == null ? undefined : json['bidId'],
        'amount': json['amount'] == null ? undefined : json['amount'],
        'createdDate': json['createdDate'] == null ? undefined : (new Date(json['createdDate'])),
        'auction': json['auction'] == null ? undefined : AuctionFromJSON(json['auction']),
        'auctionId': json['auctionId'] == null ? undefined : json['auctionId'],
        'member': json['member'] == null ? undefined : MemberFromJSON(json['member']),
        'order': json['order'] == null ? undefined : OrderFromJSON(json['order']),
        'memberId': json['memberId'] == null ? undefined : json['memberId'],
        'isWinning': json['isWinning'] == null ? undefined : json['isWinning'],
    };
}

export function BidToJSON(value?: Bid | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'bidId': value['bidId'],
        'amount': value['amount'],
        'createdDate': value['createdDate'] == null ? undefined : ((value['createdDate']).toISOString()),
        'auction': AuctionToJSON(value['auction']),
        'auctionId': value['auctionId'],
        'member': MemberToJSON(value['member']),
        'order': OrderToJSON(value['order']),
        'memberId': value['memberId'],
        'isWinning': value['isWinning'],
    };
}

