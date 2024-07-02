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
import type { Account } from './Account';
import {
    AccountFromJSON,
    AccountFromJSONTyped,
    AccountToJSON,
} from './Account';
import type { Shop } from './Shop';
import {
    ShopFromJSON,
    ShopFromJSONTyped,
    ShopToJSON,
} from './Shop';
import type { ConsignSaleType } from './ConsignSaleType';
import {
    ConsignSaleTypeFromJSON,
    ConsignSaleTypeFromJSONTyped,
    ConsignSaleTypeToJSON,
} from './ConsignSaleType';
import type { ConsignSaleStatus } from './ConsignSaleStatus';
import {
    ConsignSaleStatusFromJSON,
    ConsignSaleStatusFromJSONTyped,
    ConsignSaleStatusToJSON,
} from './ConsignSaleStatus';
import type { ConsignSaleDetail } from './ConsignSaleDetail';
import {
    ConsignSaleDetailFromJSON,
    ConsignSaleDetailFromJSONTyped,
    ConsignSaleDetailToJSON,
} from './ConsignSaleDetail';

/**
 * 
 * @export
 * @interface ConsignSale
 */
export interface ConsignSale {
    /**
     * 
     * @type {string}
     * @memberof ConsignSale
     */
    consignSaleId?: string;
    /**
     * 
     * @type {ConsignSaleType}
     * @memberof ConsignSale
     */
    type?: ConsignSaleType;
    /**
     * 
     * @type {string}
     * @memberof ConsignSale
     */
    consignSaleCode?: string;
    /**
     * 
     * @type {Date}
     * @memberof ConsignSale
     */
    createdDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof ConsignSale
     */
    consignDuration?: number;
    /**
     * 
     * @type {Date}
     * @memberof ConsignSale
     */
    startDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof ConsignSale
     */
    endDate?: Date;
    /**
     * 
     * @type {Shop}
     * @memberof ConsignSale
     */
    shop?: Shop;
    /**
     * 
     * @type {string}
     * @memberof ConsignSale
     */
    shopId?: string;
    /**
     * 
     * @type {Account}
     * @memberof ConsignSale
     */
    member?: Account;
    /**
     * 
     * @type {string}
     * @memberof ConsignSale
     */
    memberId?: string;
    /**
     * 
     * @type {ConsignSaleStatus}
     * @memberof ConsignSale
     */
    status?: ConsignSaleStatus;
    /**
     * 
     * @type {number}
     * @memberof ConsignSale
     */
    totalPrice?: number;
    /**
     * 
     * @type {number}
     * @memberof ConsignSale
     */
    soldPrice?: number;
    /**
     * 
     * @type {number}
     * @memberof ConsignSale
     */
    memberReceivedAmount?: number;
    /**
     * 
     * @type {Array<ConsignSaleDetail>}
     * @memberof ConsignSale
     */
    consignSaleDetails?: Array<ConsignSaleDetail>;
}

/**
 * Check if a given object implements the ConsignSale interface.
 */
export function instanceOfConsignSale(value: object): value is ConsignSale {
    return true;
}

export function ConsignSaleFromJSON(json: any): ConsignSale {
    return ConsignSaleFromJSONTyped(json, false);
}

export function ConsignSaleFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConsignSale {
    if (json == null) {
        return json;
    }
    return {
        
        'consignSaleId': json['consignSaleId'] == null ? undefined : json['consignSaleId'],
        'type': json['type'] == null ? undefined : ConsignSaleTypeFromJSON(json['type']),
        'consignSaleCode': json['consignSaleCode'] == null ? undefined : json['consignSaleCode'],
        'createdDate': json['createdDate'] == null ? undefined : (new Date(json['createdDate'])),
        'consignDuration': json['consignDuration'] == null ? undefined : json['consignDuration'],
        'startDate': json['startDate'] == null ? undefined : (new Date(json['startDate'])),
        'endDate': json['endDate'] == null ? undefined : (new Date(json['endDate'])),
        'shop': json['shop'] == null ? undefined : ShopFromJSON(json['shop']),
        'shopId': json['shopId'] == null ? undefined : json['shopId'],
        'member': json['member'] == null ? undefined : AccountFromJSON(json['member']),
        'memberId': json['memberId'] == null ? undefined : json['memberId'],
        'status': json['status'] == null ? undefined : ConsignSaleStatusFromJSON(json['status']),
        'totalPrice': json['totalPrice'] == null ? undefined : json['totalPrice'],
        'soldPrice': json['soldPrice'] == null ? undefined : json['soldPrice'],
        'memberReceivedAmount': json['memberReceivedAmount'] == null ? undefined : json['memberReceivedAmount'],
        'consignSaleDetails': json['consignSaleDetails'] == null ? undefined : ((json['consignSaleDetails'] as Array<any>).map(ConsignSaleDetailFromJSON)),
    };
}

export function ConsignSaleToJSON(value?: ConsignSale | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'consignSaleId': value['consignSaleId'],
        'type': ConsignSaleTypeToJSON(value['type']),
        'consignSaleCode': value['consignSaleCode'],
        'createdDate': value['createdDate'] == null ? undefined : ((value['createdDate']).toISOString()),
        'consignDuration': value['consignDuration'],
        'startDate': value['startDate'] == null ? undefined : ((value['startDate'] as any).toISOString()),
        'endDate': value['endDate'] == null ? undefined : ((value['endDate'] as any).toISOString()),
        'shop': ShopToJSON(value['shop']),
        'shopId': value['shopId'],
        'member': AccountToJSON(value['member']),
        'memberId': value['memberId'],
        'status': ConsignSaleStatusToJSON(value['status']),
        'totalPrice': value['totalPrice'],
        'soldPrice': value['soldPrice'],
        'memberReceivedAmount': value['memberReceivedAmount'],
        'consignSaleDetails': value['consignSaleDetails'] == null ? undefined : ((value['consignSaleDetails'] as Array<any>).map(ConsignSaleDetailToJSON)),
    };
}

