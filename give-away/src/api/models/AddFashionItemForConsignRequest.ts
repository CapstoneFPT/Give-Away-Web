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
import type { GenderType } from './GenderType';
import {
    GenderTypeFromJSON,
    GenderTypeFromJSONTyped,
    GenderTypeToJSON,
} from './GenderType';
import type { SizeType } from './SizeType';
import {
    SizeTypeFromJSON,
    SizeTypeFromJSONTyped,
    SizeTypeToJSON,
} from './SizeType';

/**
 * 
 * @export
 * @interface AddFashionItemForConsignRequest
 */
export interface AddFashionItemForConsignRequest {
    /**
     * 
     * @type {string}
     * @memberof AddFashionItemForConsignRequest
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AddFashionItemForConsignRequest
     */
    note?: string | null;
    /**
     * 
     * @type {number}
     * @memberof AddFashionItemForConsignRequest
     */
    dealPrice?: number;
    /**
     * 
     * @type {number}
     * @memberof AddFashionItemForConsignRequest
     */
    confirmedPrice?: number;
    /**
     * 
     * @type {number}
     * @memberof AddFashionItemForConsignRequest
     */
    condition?: number;
    /**
     * 
     * @type {string}
     * @memberof AddFashionItemForConsignRequest
     */
    categoryId?: string;
    /**
     * 
     * @type {SizeType}
     * @memberof AddFashionItemForConsignRequest
     */
    size?: SizeType;
    /**
     * 
     * @type {string}
     * @memberof AddFashionItemForConsignRequest
     */
    color?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AddFashionItemForConsignRequest
     */
    brand?: string | null;
    /**
     * 
     * @type {GenderType}
     * @memberof AddFashionItemForConsignRequest
     */
    gender?: GenderType;
    /**
     * 
     * @type {Array<string>}
     * @memberof AddFashionItemForConsignRequest
     */
    image?: Array<string> | null;
}

/**
 * Check if a given object implements the AddFashionItemForConsignRequest interface.
 */
export function instanceOfAddFashionItemForConsignRequest(value: object): value is AddFashionItemForConsignRequest {
    return true;
}

export function AddFashionItemForConsignRequestFromJSON(json: any): AddFashionItemForConsignRequest {
    return AddFashionItemForConsignRequestFromJSONTyped(json, false);
}

export function AddFashionItemForConsignRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddFashionItemForConsignRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'] == null ? undefined : json['name'],
        'note': json['note'] == null ? undefined : json['note'],
        'dealPrice': json['dealPrice'] == null ? undefined : json['dealPrice'],
        'confirmedPrice': json['confirmedPrice'] == null ? undefined : json['confirmedPrice'],
        'condition': json['condition'] == null ? undefined : json['condition'],
        'categoryId': json['categoryId'] == null ? undefined : json['categoryId'],
        'size': json['size'] == null ? undefined : SizeTypeFromJSON(json['size']),
        'color': json['color'] == null ? undefined : json['color'],
        'brand': json['brand'] == null ? undefined : json['brand'],
        'gender': json['gender'] == null ? undefined : GenderTypeFromJSON(json['gender']),
        'image': json['image'] == null ? undefined : json['image'],
    };
}

export function AddFashionItemForConsignRequestToJSON(value?: AddFashionItemForConsignRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'name': value['name'],
        'note': value['note'],
        'dealPrice': value['dealPrice'],
        'confirmedPrice': value['confirmedPrice'],
        'condition': value['condition'],
        'categoryId': value['categoryId'],
        'size': SizeTypeToJSON(value['size']),
        'color': value['color'],
        'brand': value['brand'],
        'gender': GenderTypeToJSON(value['gender']),
        'image': value['image'],
    };
}

