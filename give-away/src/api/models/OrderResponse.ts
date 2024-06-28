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
import type { OrderStatus } from './OrderStatus';
import {
    OrderStatusFromJSON,
    OrderStatusFromJSONTyped,
    OrderStatusToJSON,
} from './OrderStatus';
import type { PaymentMethod } from './PaymentMethod';
import {
    PaymentMethodFromJSON,
    PaymentMethodFromJSONTyped,
    PaymentMethodToJSON,
} from './PaymentMethod';

/**
 * 
 * @export
 * @interface OrderResponse
 */
export interface OrderResponse {
    /**
     * 
     * @type {string}
     * @memberof OrderResponse
     */
    orderId?: string;
    /**
     * 
     * @type {number}
     * @memberof OrderResponse
     */
    quantity?: number;
    /**
     * 
     * @type {number}
     * @memberof OrderResponse
     */
    totalPrice?: number;
    /**
     * 
     * @type {Date}
     * @memberof OrderResponse
     */
    createdDate?: Date;
    /**
     * 
     * @type {PaymentMethod}
     * @memberof OrderResponse
     */
    paymentMethod?: PaymentMethod;
    /**
     * 
     * @type {Date}
     * @memberof OrderResponse
     */
    paymentDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof OrderResponse
     */
    customerName?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderResponse
     */
    recipientName?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderResponse
     */
    contactNumber?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderResponse
     */
    address?: string;
    /**
     * 
     * @type {OrderStatus}
     * @memberof OrderResponse
     */
    status?: OrderStatus;
}

/**
 * Check if a given object implements the OrderResponse interface.
 */
export function instanceOfOrderResponse(value: object): value is OrderResponse {
    return true;
}

export function OrderResponseFromJSON(json: any): OrderResponse {
    return OrderResponseFromJSONTyped(json, false);
}

export function OrderResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'orderId': json['orderId'] == null ? undefined : json['orderId'],
        'quantity': json['quantity'] == null ? undefined : json['quantity'],
        'totalPrice': json['totalPrice'] == null ? undefined : json['totalPrice'],
        'createdDate': json['createdDate'] == null ? undefined : (new Date(json['createdDate'])),
        'paymentMethod': json['paymentMethod'] == null ? undefined : PaymentMethodFromJSON(json['paymentMethod']),
        'paymentDate': json['paymentDate'] == null ? undefined : (new Date(json['paymentDate'])),
        'customerName': json['customerName'] == null ? undefined : json['customerName'],
        'recipientName': json['recipientName'] == null ? undefined : json['recipientName'],
        'contactNumber': json['contactNumber'] == null ? undefined : json['contactNumber'],
        'address': json['address'] == null ? undefined : json['address'],
        'status': json['status'] == null ? undefined : OrderStatusFromJSON(json['status']),
    };
}

export function OrderResponseToJSON(value?: OrderResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'orderId': value['orderId'],
        'quantity': value['quantity'],
        'totalPrice': value['totalPrice'],
        'createdDate': value['createdDate'] == null ? undefined : ((value['createdDate']).toISOString()),
        'paymentMethod': PaymentMethodToJSON(value['paymentMethod']),
        'paymentDate': value['paymentDate'] == null ? undefined : ((value['paymentDate']).toISOString()),
        'customerName': value['customerName'],
        'recipientName': value['recipientName'],
        'contactNumber': value['contactNumber'],
        'address': value['address'],
        'status': OrderStatusToJSON(value['status']),
    };
}

