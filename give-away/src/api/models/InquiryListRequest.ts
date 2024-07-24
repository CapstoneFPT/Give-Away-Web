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
 * @interface InquiryListRequest
 */
export interface InquiryListRequest {
    /**
     * 
     * @type {number}
     * @memberof InquiryListRequest
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof InquiryListRequest
     */
    pageSize?: number;
    /**
     * 
     * @type {string}
     * @memberof InquiryListRequest
     */
    fullname?: string | null;
}

/**
 * Check if a given object implements the InquiryListRequest interface.
 */
export function instanceOfInquiryListRequest(value: object): value is InquiryListRequest {
    return true;
}

export function InquiryListRequestFromJSON(json: any): InquiryListRequest {
    return InquiryListRequestFromJSONTyped(json, false);
}

export function InquiryListRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): InquiryListRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'page': json['page'] == null ? undefined : json['page'],
        'pageSize': json['pageSize'] == null ? undefined : json['pageSize'],
        'fullname': json['fullname'] == null ? undefined : json['fullname'],
    };
}

export function InquiryListRequestToJSON(value?: InquiryListRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'page': value['page'],
        'pageSize': value['pageSize'],
        'fullname': value['fullname'],
    };
}

