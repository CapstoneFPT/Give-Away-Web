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
import type { FashionItem } from './FashionItem';
import {
    FashionItemFromJSON,
    FashionItemFromJSONTyped,
    FashionItemToJSON,
} from './FashionItem';
import type { CategoryStatus } from './CategoryStatus';
import {
    CategoryStatusFromJSON,
    CategoryStatusFromJSONTyped,
    CategoryStatusToJSON,
} from './CategoryStatus';

/**
 * 
 * @export
 * @interface Category
 */
export interface Category {
    /**
     * 
     * @type {string}
     * @memberof Category
     */
    categoryId?: string;
    /**
     * 
     * @type {string}
     * @memberof Category
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Category
     */
    parentId?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Category
     */
    level?: number;
    /**
     * 
     * @type {Category}
     * @memberof Category
     */
    parent?: Category;
    /**
     * 
     * @type {Array<FashionItem>}
     * @memberof Category
     */
    fashionItems?: Array<FashionItem> | null;
    /**
     * 
     * @type {CategoryStatus}
     * @memberof Category
     */
    status?: CategoryStatus;
}

/**
 * Check if a given object implements the Category interface.
 */
export function instanceOfCategory(value: object): value is Category {
    return true;
}

export function CategoryFromJSON(json: any): Category {
    return CategoryFromJSONTyped(json, false);
}

export function CategoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): Category {
    if (json == null) {
        return json;
    }
    return {
        
        'categoryId': json['categoryId'] == null ? undefined : json['categoryId'],
        'name': json['name'] == null ? undefined : json['name'],
        'parentId': json['parentId'] == null ? undefined : json['parentId'],
        'level': json['level'] == null ? undefined : json['level'],
        'parent': json['parent'] == null ? undefined : CategoryFromJSON(json['parent']),
        'fashionItems': json['fashionItems'] == null ? undefined : ((json['fashionItems'] as Array<any>).map(FashionItemFromJSON)),
        'status': json['status'] == null ? undefined : CategoryStatusFromJSON(json['status']),
    };
}

export function CategoryToJSON(value?: Category | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'categoryId': value['categoryId'],
        'name': value['name'],
        'parentId': value['parentId'],
        'level': value['level'],
        'parent': CategoryToJSON(value['parent']),
        'fashionItems': value['fashionItems'] == null ? undefined : ((value['fashionItems'] as Array<any>).map(FashionItemToJSON)),
        'status': CategoryStatusToJSON(value['status']),
    };
}

