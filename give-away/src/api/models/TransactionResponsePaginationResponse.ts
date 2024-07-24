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
import type { TransactionResponse } from './TransactionResponse';
import {
    TransactionResponseFromJSON,
    TransactionResponseFromJSONTyped,
    TransactionResponseToJSON,
} from './TransactionResponse';

/**
 * 
 * @export
 * @interface TransactionResponsePaginationResponse
 */
export interface TransactionResponsePaginationResponse {
    /**
     * 
     * @type {number}
     * @memberof TransactionResponsePaginationResponse
     */
    pageNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof TransactionResponsePaginationResponse
     */
    pageSize?: number;
    /**
     * 
     * @type {string}
     * @memberof TransactionResponsePaginationResponse
     */
    searchTerm?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof TransactionResponsePaginationResponse
     */
    filters?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof TransactionResponsePaginationResponse
     */
    orderBy?: string | null;
    /**
     * 
     * @type {number}
     * @memberof TransactionResponsePaginationResponse
     */
    totalCount?: number;
    /**
     * 
     * @type {number}
     * @memberof TransactionResponsePaginationResponse
     */
    readonly totalPages?: number;
    /**
     * 
     * @type {boolean}
     * @memberof TransactionResponsePaginationResponse
     */
    readonly hasNext?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof TransactionResponsePaginationResponse
     */
    readonly hasPrevious?: boolean;
    /**
     * 
     * @type {Array<TransactionResponse>}
     * @memberof TransactionResponsePaginationResponse
     */
    items?: Array<TransactionResponse> | null;
}

/**
 * Check if a given object implements the TransactionResponsePaginationResponse interface.
 */
export function instanceOfTransactionResponsePaginationResponse(value: object): value is TransactionResponsePaginationResponse {
    return true;
}

export function TransactionResponsePaginationResponseFromJSON(json: any): TransactionResponsePaginationResponse {
    return TransactionResponsePaginationResponseFromJSONTyped(json, false);
}

export function TransactionResponsePaginationResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionResponsePaginationResponse {
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
        'items': json['items'] == null ? undefined : ((json['items'] as Array<any>).map(TransactionResponseFromJSON)),
    };
}

export function TransactionResponsePaginationResponseToJSON(value?: Omit<TransactionResponsePaginationResponse, 'totalPages'|'hasNext'|'hasPrevious'> | null): any {
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
        'items': value['items'] == null ? undefined : ((value['items'] as Array<any>).map(TransactionResponseToJSON)),
    };
}

