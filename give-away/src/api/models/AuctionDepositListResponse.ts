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
 * @interface AuctionDepositListResponse
 */
export interface AuctionDepositListResponse {
    /**
     * 
     * @type {string}
     * @memberof AuctionDepositListResponse
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof AuctionDepositListResponse
     */
    auctionId?: string;
    /**
     * 
     * @type {Date}
     * @memberof AuctionDepositListResponse
     */
    depositDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof AuctionDepositListResponse
     */
    amount?: number;
    /**
     * 
     * @type {string}
     * @memberof AuctionDepositListResponse
     */
    memberId?: string;
}

/**
 * Check if a given object implements the AuctionDepositListResponse interface.
 */
export function instanceOfAuctionDepositListResponse(value: object): value is AuctionDepositListResponse {
    return true;
}

export function AuctionDepositListResponseFromJSON(json: any): AuctionDepositListResponse {
    return AuctionDepositListResponseFromJSONTyped(json, false);
}

export function AuctionDepositListResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuctionDepositListResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'auctionId': json['auctionId'] == null ? undefined : json['auctionId'],
        'depositDate': json['depositDate'] == null ? undefined : (new Date(json['depositDate'])),
        'amount': json['amount'] == null ? undefined : json['amount'],
        'memberId': json['memberId'] == null ? undefined : json['memberId'],
    };
}

export function AuctionDepositListResponseToJSON(value?: AuctionDepositListResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'auctionId': value['auctionId'],
        'depositDate': value['depositDate'] == null ? undefined : ((value['depositDate']).toISOString()),
        'amount': value['amount'],
        'memberId': value['memberId'],
    };
}

