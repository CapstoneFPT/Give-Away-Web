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
import type { AuctionStatus } from './AuctionStatus';
import {
    AuctionStatusFromJSON,
    AuctionStatusFromJSONTyped,
    AuctionStatusToJSON,
} from './AuctionStatus';

/**
 * 
 * @export
 * @interface UpdateAuctionRequest
 */
export interface UpdateAuctionRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateAuctionRequest
     */
    title?: string;
    /**
     * 
     * @type {Date}
     * @memberof UpdateAuctionRequest
     */
    startDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof UpdateAuctionRequest
     */
    endDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof UpdateAuctionRequest
     */
    shopId?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateAuctionRequest
     */
    auctionItemId?: string;
    /**
     * 
     * @type {Date}
     * @memberof UpdateAuctionRequest
     */
    scheduleDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof UpdateAuctionRequest
     */
    timeslotId?: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateAuctionRequest
     */
    depositFee?: number;
    /**
     * 
     * @type {AuctionStatus}
     * @memberof UpdateAuctionRequest
     */
    status?: AuctionStatus;
}

/**
 * Check if a given object implements the UpdateAuctionRequest interface.
 */
export function instanceOfUpdateAuctionRequest(value: object): value is UpdateAuctionRequest {
    return true;
}

export function UpdateAuctionRequestFromJSON(json: any): UpdateAuctionRequest {
    return UpdateAuctionRequestFromJSONTyped(json, false);
}

export function UpdateAuctionRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateAuctionRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'] == null ? undefined : json['title'],
        'startDate': json['startDate'] == null ? undefined : (new Date(json['startDate'])),
        'endDate': json['endDate'] == null ? undefined : (new Date(json['endDate'])),
        'shopId': json['shopId'] == null ? undefined : json['shopId'],
        'auctionItemId': json['auctionItemId'] == null ? undefined : json['auctionItemId'],
        'scheduleDate': json['scheduleDate'] == null ? undefined : (new Date(json['scheduleDate'])),
        'timeslotId': json['timeslotId'] == null ? undefined : json['timeslotId'],
        'depositFee': json['depositFee'] == null ? undefined : json['depositFee'],
        'status': json['status'] == null ? undefined : AuctionStatusFromJSON(json['status']),
    };
}

export function UpdateAuctionRequestToJSON(value?: UpdateAuctionRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'title': value['title'],
        'startDate': value['startDate'] == null ? undefined : ((value['startDate'] as any).toISOString()),
        'endDate': value['endDate'] == null ? undefined : ((value['endDate'] as any).toISOString()),
        'shopId': value['shopId'],
        'auctionItemId': value['auctionItemId'],
        'scheduleDate': value['scheduleDate'] == null ? undefined : ((value['scheduleDate'] as any).toISOString().substring(0,10)),
        'timeslotId': value['timeslotId'],
        'depositFee': value['depositFee'],
        'status': AuctionStatusToJSON(value['status']),
    };
}

