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
import type { ResultStatus } from './ResultStatus';
import {
    ResultStatusFromJSON,
    ResultStatusFromJSONTyped,
    ResultStatusToJSON,
} from './ResultStatus';

/**
 * 
 * @export
 * @interface StringResult
 */
export interface StringResult {
    /**
     * 
     * @type {string}
     * @memberof StringResult
     */
    data?: string | null;
    /**
     * 
     * @type {ResultStatus}
     * @memberof StringResult
     */
    resultStatus?: ResultStatus;
    /**
     * 
     * @type {Array<string>}
     * @memberof StringResult
     */
    messages?: Array<string> | null;
}

/**
 * Check if a given object implements the StringResult interface.
 */
export function instanceOfStringResult(value: object): value is StringResult {
    return true;
}

export function StringResultFromJSON(json: any): StringResult {
    return StringResultFromJSONTyped(json, false);
}

export function StringResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): StringResult {
    if (json == null) {
        return json;
    }
    return {
        
        'data': json['data'] == null ? undefined : json['data'],
        'resultStatus': json['resultStatus'] == null ? undefined : ResultStatusFromJSON(json['resultStatus']),
        'messages': json['messages'] == null ? undefined : json['messages'],
    };
}

export function StringResultToJSON(value?: StringResult | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'data': value['data'],
        'resultStatus': ResultStatusToJSON(value['resultStatus']),
        'messages': value['messages'],
    };
}

