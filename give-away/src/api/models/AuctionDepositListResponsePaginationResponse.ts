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
import type { AuctionDepositListResponse } from './AuctionDepositListResponse';
import {
    AuctionDepositListResponseFromJSON,
    AuctionDepositListResponseFromJSONTyped,
    AuctionDepositListResponseToJSON,
} from './AuctionDepositListResponse';

/**
 * 
 * @export
 * @interface AuctionDepositListResponsePaginationResponse
 */
export interface AuctionDepositListResponsePaginationResponse {
    /**
     * 
     * @type {number}
     * @memberof AuctionDepositListResponsePaginationResponse
     */
    pageNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof AuctionDepositListResponsePaginationResponse
     */
    pageSize?: number;
    /**
     * 
     * @type {string}
     * @memberof AuctionDepositListResponsePaginationResponse
     */
    searchTerm?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AuctionDepositListResponsePaginationResponse
     */
    filters?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof AuctionDepositListResponsePaginationResponse
     */
    orderBy?: string;
    /**
     * 
     * @type {number}
     * @memberof AuctionDepositListResponsePaginationResponse
     */
    totalCount?: number;
    /**
     * 
     * @type {number}
     * @memberof AuctionDepositListResponsePaginationResponse
     */
    readonly totalPages?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AuctionDepositListResponsePaginationResponse
     */
    readonly hasNext?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AuctionDepositListResponsePaginationResponse
     */
    readonly hasPrevious?: boolean;
    /**
     * 
     * @type {Array<AuctionDepositListResponse>}
     * @memberof AuctionDepositListResponsePaginationResponse
     */
    items?: Array<AuctionDepositListResponse>;
}

/**
 * Check if a given object implements the AuctionDepositListResponsePaginationResponse interface.
 */
export function instanceOfAuctionDepositListResponsePaginationResponse(value: object): value is AuctionDepositListResponsePaginationResponse {
    return true;
}

export function AuctionDepositListResponsePaginationResponseFromJSON(json: any): AuctionDepositListResponsePaginationResponse {
    return AuctionDepositListResponsePaginationResponseFromJSONTyped(json, false);
}

export function AuctionDepositListResponsePaginationResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuctionDepositListResponsePaginationResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'pageNumber': json['pageNumber'] == null ? undefined : json['pageNumber'],
        'pageSize': json['pageSize'] == null ? undefined : json['pageSize'],
        'searchTerm': json['searchTerm'] == null ? undefined : json['searchTerm'],
        'filters': json['filters'] == null ? undefined : json['filters'],
        'orderBy': json['orderBy'] == null ? undefined : json['orderBy'],
        'totalCount': json['totalCount'] == null ? undefined : json['totalCount'],
        'totalPages': json['totalPages'] == null ? undefined : json['totalPages'],
        'hasNext': json['hasNext'] == null ? undefined : json['hasNext'],
        'hasPrevious': json['hasPrevious'] == null ? undefined : json['hasPrevious'],
        'items': json['items'] == null ? undefined : ((json['items'] as Array<any>).map(AuctionDepositListResponseFromJSON)),
    };
}

export function AuctionDepositListResponsePaginationResponseToJSON(value?: Omit<AuctionDepositListResponsePaginationResponse, 'totalPages'|'hasNext'|'hasPrevious'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'pageNumber': value['pageNumber'],
        'pageSize': value['pageSize'],
        'searchTerm': value['searchTerm'],
        'filters': value['filters'],
        'orderBy': value['orderBy'],
        'totalCount': value['totalCount'],
        'items': value['items'] == null ? undefined : ((value['items'] as Array<any>).map(AuctionDepositListResponseToJSON)),
    };
}

