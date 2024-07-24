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
import type { WithdrawStatus } from './WithdrawStatus';
import {
    WithdrawStatusFromJSON,
    WithdrawStatusFromJSONTyped,
    WithdrawStatusToJSON,
} from './WithdrawStatus';

/**
 * 
 * @export
 * @interface GetWithdrawsResponse
 */
export interface GetWithdrawsResponse {
    /**
     * 
     * @type {string}
     * @memberof GetWithdrawsResponse
     */
    withdrawId?: string;
    /**
     * 
     * @type {number}
     * @memberof GetWithdrawsResponse
     */
    amount?: number;
    /**
     * 
     * @type {string}
     * @memberof GetWithdrawsResponse
     */
    memberId?: string;
    /**
     * 
     * @type {WithdrawStatus}
     * @memberof GetWithdrawsResponse
     */
    status?: WithdrawStatus;
    /**
     * 
     * @type {Date}
     * @memberof GetWithdrawsResponse
     */
    createdDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof GetWithdrawsResponse
     */
    bank?: string | null;
    /**
     * 
     * @type {string}
     * @memberof GetWithdrawsResponse
     */
    bankAccountName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof GetWithdrawsResponse
     */
    bankAccountNumber?: string | null;
}

/**
 * Check if a given object implements the GetWithdrawsResponse interface.
 */
export function instanceOfGetWithdrawsResponse(value: object): value is GetWithdrawsResponse {
    return true;
}

export function GetWithdrawsResponseFromJSON(json: any): GetWithdrawsResponse {
    return GetWithdrawsResponseFromJSONTyped(json, false);
}

export function GetWithdrawsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetWithdrawsResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'withdrawId': json['withdrawId'] == null ? undefined : json['withdrawId'],
        'amount': json['amount'] == null ? undefined : json['amount'],
        'memberId': json['memberId'] == null ? undefined : json['memberId'],
        'status': json['status'] == null ? undefined : WithdrawStatusFromJSON(json['status']),
        'createdDate': json['createdDate'] == null ? undefined : (new Date(json['createdDate'])),
        'bank': json['bank'] == null ? undefined : json['bank'],
        'bankAccountName': json['bankAccountName'] == null ? undefined : json['bankAccountName'],
        'bankAccountNumber': json['bankAccountNumber'] == null ? undefined : json['bankAccountNumber'],
    };
}

export function GetWithdrawsResponseToJSON(value?: GetWithdrawsResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'withdrawId': value['withdrawId'],
        'amount': value['amount'],
        'memberId': value['memberId'],
        'status': WithdrawStatusToJSON(value['status']),
        'createdDate': value['createdDate'] == null ? undefined : ((value['createdDate']).toISOString()),
        'bank': value['bank'],
        'bankAccountName': value['bankAccountName'],
        'bankAccountNumber': value['bankAccountNumber'],
    };
}

