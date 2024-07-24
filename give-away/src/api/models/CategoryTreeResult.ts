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
import type { CategoryTreeNode } from './CategoryTreeNode';
import {
    CategoryTreeNodeFromJSON,
    CategoryTreeNodeFromJSONTyped,
    CategoryTreeNodeToJSON,
} from './CategoryTreeNode';

/**
 * 
 * @export
 * @interface CategoryTreeResult
 */
export interface CategoryTreeResult {
    /**
     * 
     * @type {string}
     * @memberof CategoryTreeResult
     */
    shopId?: string | null;
    /**
     * 
     * @type {Array<CategoryTreeNode>}
     * @memberof CategoryTreeResult
     */
    categories?: Array<CategoryTreeNode> | null;
}

/**
 * Check if a given object implements the CategoryTreeResult interface.
 */
export function instanceOfCategoryTreeResult(value: object): value is CategoryTreeResult {
    return true;
}

export function CategoryTreeResultFromJSON(json: any): CategoryTreeResult {
    return CategoryTreeResultFromJSONTyped(json, false);
}

export function CategoryTreeResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): CategoryTreeResult {
    if (json == null) {
        return json;
    }
    return {
        
        'shopId': json['shopId'] == null ? undefined : json['shopId'],
        'categories': json['categories'] == null ? undefined : ((json['categories'] as Array<any>).map(CategoryTreeNodeFromJSON)),
    };
}

export function CategoryTreeResultToJSON(value?: CategoryTreeResult | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'shopId': value['shopId'],
        'categories': value['categories'] == null ? undefined : ((value['categories'] as Array<any>).map(CategoryTreeNodeToJSON)),
    };
}

