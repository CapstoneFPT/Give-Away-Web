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


/**
 * 
 * @export
 */
export const SizeType = {
    Xs: 'XS',
    S: 'S',
    M: 'M',
    L: 'L',
    Xl: 'XL'
} as const;
export type SizeType = typeof SizeType[keyof typeof SizeType];




export function SizeTypeFromJSON(json: any): SizeType {
    return SizeTypeFromJSONTyped(json, false);
}

export function SizeTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): SizeType {
    return json as SizeType;
}

export function SizeTypeToJSON(value?: SizeType | null): any {
    return value as any;
}

