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
 * @interface PurchasePointPackageRequest
 */
export interface PurchasePointPackageRequest {
    /**
     * 
     * @type {string}
     * @memberof PurchasePointPackageRequest
     */
    memberId?: string;
}

/**
 * Check if a given object implements the PurchasePointPackageRequest interface.
 */
export function instanceOfPurchasePointPackageRequest(value: object): value is PurchasePointPackageRequest {
    return true;
}

export function PurchasePointPackageRequestFromJSON(json: any): PurchasePointPackageRequest {
    return PurchasePointPackageRequestFromJSONTyped(json, false);
}

export function PurchasePointPackageRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PurchasePointPackageRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'memberId': json['memberId'] == null ? undefined : json['memberId'],
    };
}

export function PurchasePointPackageRequestToJSON(value?: PurchasePointPackageRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'memberId': value['memberId'],
    };
}

