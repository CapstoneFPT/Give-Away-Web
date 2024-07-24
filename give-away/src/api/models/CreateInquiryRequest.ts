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
 * @interface CreateInquiryRequest
 */
export interface CreateInquiryRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateInquiryRequest
     */
    fullname?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateInquiryRequest
     */
    email?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateInquiryRequest
     */
    phone?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateInquiryRequest
     */
    message?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateInquiryRequest
     */
    shopId?: string;
}

/**
 * Check if a given object implements the CreateInquiryRequest interface.
 */
export function instanceOfCreateInquiryRequest(value: object): value is CreateInquiryRequest {
    return true;
}

export function CreateInquiryRequestFromJSON(json: any): CreateInquiryRequest {
    return CreateInquiryRequestFromJSONTyped(json, false);
}

export function CreateInquiryRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateInquiryRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'fullname': json['fullname'] == null ? undefined : json['fullname'],
        'email': json['email'] == null ? undefined : json['email'],
        'phone': json['phone'] == null ? undefined : json['phone'],
        'message': json['message'] == null ? undefined : json['message'],
        'shopId': json['shopId'] == null ? undefined : json['shopId'],
    };
}

export function CreateInquiryRequestToJSON(value?: CreateInquiryRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'fullname': value['fullname'],
        'email': value['email'],
        'phone': value['phone'],
        'message': value['message'],
        'shopId': value['shopId'],
    };
}

