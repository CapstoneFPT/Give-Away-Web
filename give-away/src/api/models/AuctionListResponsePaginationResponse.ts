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
import type { AuctionListResponse } from './AuctionListResponse';
import {
    AuctionListResponseFromJSON,
    AuctionListResponseFromJSONTyped,
    AuctionListResponseToJSON,
} from './AuctionListResponse';

/**
 * 
 * @export
 * @interface AuctionListResponsePaginationResponse
 */
export interface AuctionListResponsePaginationResponse {
    /**
     * 
     * @type {number}
     * @memberof AuctionListResponsePaginationResponse
     */
    pageNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof AuctionListResponsePaginationResponse
     */
    pageSize?: number;
    /**
     * 
     * @type {string}
     * @memberof AuctionListResponsePaginationResponse
     */
    searchTerm?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof AuctionListResponsePaginationResponse
     */
    filters?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof AuctionListResponsePaginationResponse
     */
    orderBy?: string | null;
    /**
     * 
     * @type {number}
     * @memberof AuctionListResponsePaginationResponse
     */
    totalCount?: number;
    /**
     * 
     * @type {number}
     * @memberof AuctionListResponsePaginationResponse
     */
    readonly totalPages?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AuctionListResponsePaginationResponse
     */
    readonly hasNext?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AuctionListResponsePaginationResponse
     */
    readonly hasPrevious?: boolean;
    /**
     * 
     * @type {Array<AuctionListResponse>}
     * @memberof AuctionListResponsePaginationResponse
     */
    items?: Array<AuctionListResponse> | null;
}

/**
 * Check if a given object implements the AuctionListResponsePaginationResponse interface.
 */
export function instanceOfAuctionListResponsePaginationResponse(value: object): value is AuctionListResponsePaginationResponse {
    return true;
}

export function AuctionListResponsePaginationResponseFromJSON(json: any): AuctionListResponsePaginationResponse {
    return AuctionListResponsePaginationResponseFromJSONTyped(json, false);
}

export function AuctionListResponsePaginationResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuctionListResponsePaginationResponse {
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
        'items': json['items'] == null ? undefined : ((json['items'] as Array<any>).map(AuctionListResponseFromJSON)),
    };
}

export function AuctionListResponsePaginationResponseToJSON(value?: Omit<AuctionListResponsePaginationResponse, 'totalPages'|'hasNext'|'hasPrevious'> | null): any {
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
        'items': value['items'] == null ? undefined : ((value['items'] as Array<any>).map(AuctionListResponseToJSON)),
    };
}

