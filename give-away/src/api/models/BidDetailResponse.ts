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
/**
 * 
 * @export
 * @interface BidDetailResponse
 */
export interface BidDetailResponse {
    /**
     * 
     * @type {string}
     * @memberof BidDetailResponse
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof BidDetailResponse
     */
    auctionId?: string;
    /**
     * 
     * @type {string}
     * @memberof BidDetailResponse
     */
    memberId?: string;
    /**
     * 
     * @type {number}
     * @memberof BidDetailResponse
     */
    amount?: number;
    /**
     * 
     * @type {Date}
     * @memberof BidDetailResponse
     */
    createdDate?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof BidDetailResponse
     */
    isWinning?: boolean;
    /**
     * 
     * @type {number}
     * @memberof BidDetailResponse
     */
    nextAmount?: number;
}

/**
 * Check if a given object implements the BidDetailResponse interface.
 */
export function instanceOfBidDetailResponse(value: object): value is BidDetailResponse {
    return true;
}

export function BidDetailResponseFromJSON(json: any): BidDetailResponse {
    return BidDetailResponseFromJSONTyped(json, false);
}

export function BidDetailResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): BidDetailResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'auctionId': json['auctionId'] == null ? undefined : json['auctionId'],
        'memberId': json['memberId'] == null ? undefined : json['memberId'],
        'amount': json['amount'] == null ? undefined : json['amount'],
        'createdDate': json['createdDate'] == null ? undefined : (new Date(json['createdDate'])),
        'isWinning': json['isWinning'] == null ? undefined : json['isWinning'],
        'nextAmount': json['nextAmount'] == null ? undefined : json['nextAmount'],
    };
}

export function BidDetailResponseToJSON(value?: BidDetailResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'auctionId': value['auctionId'],
        'memberId': value['memberId'],
        'amount': value['amount'],
        'createdDate': value['createdDate'] == null ? undefined : ((value['createdDate']).toISOString()),
        'isWinning': value['isWinning'],
        'nextAmount': value['nextAmount'],
    };
}

