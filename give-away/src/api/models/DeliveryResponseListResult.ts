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
import type { DeliveryResponse } from './DeliveryResponse';
import {
    DeliveryResponseFromJSON,
    DeliveryResponseFromJSONTyped,
    DeliveryResponseToJSON,
} from './DeliveryResponse';

/**
 * 
 * @export
 * @interface DeliveryResponseListResult
 */
export interface DeliveryResponseListResult {
    /**
     * 
     * @type {Array<DeliveryResponse>}
     * @memberof DeliveryResponseListResult
     */
    data?: Array<DeliveryResponse>;
    /**
     * 
     * @type {ResultStatus}
     * @memberof DeliveryResponseListResult
     */
    resultStatus?: ResultStatus;
    /**
     * 
     * @type {Array<string>}
     * @memberof DeliveryResponseListResult
     */
    messages?: Array<string>;
}

/**
 * Check if a given object implements the DeliveryResponseListResult interface.
 */
export function instanceOfDeliveryResponseListResult(value: object): value is DeliveryResponseListResult {
    return true;
}

export function DeliveryResponseListResultFromJSON(json: any): DeliveryResponseListResult {
    return DeliveryResponseListResultFromJSONTyped(json, false);
}

export function DeliveryResponseListResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeliveryResponseListResult {
    if (json == null) {
        return json;
    }
    return {
        
        'data': json['data'] == null ? undefined : ((json['data'] as Array<any>).map(DeliveryResponseFromJSON)),
        'resultStatus': json['resultStatus'] == null ? undefined : ResultStatusFromJSON(json['resultStatus']),
        'messages': json['messages'] == null ? undefined : json['messages'],
    };
}

export function DeliveryResponseListResultToJSON(value?: DeliveryResponseListResult | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'data': value['data'] == null ? undefined : ((value['data'] as Array<any>).map(DeliveryResponseToJSON)),
        'resultStatus': ResultStatusToJSON(value['resultStatus']),
        'messages': value['messages'],
    };
}

