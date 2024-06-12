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
export const ResultStatus = {
    Success: 'Success',
    NotFound: 'NotFound',
    Duplicated: 'Duplicated',
    Error: 'Error'
} as const;
export type ResultStatus = typeof ResultStatus[keyof typeof ResultStatus];


// export function instanceOfResultStatus(value: any): boolean {
//     for (const key in ResultStatus) {
//         if (Object.prototype.hasOwnProperty.call(ResultStatus, key)) {
//             if (ResultStatus[key] === value) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }

export function ResultStatusFromJSON(json: any): ResultStatus {
    return ResultStatusFromJSONTyped(json, false);
}

export function ResultStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResultStatus {
    return json as ResultStatus;
}

export function ResultStatusToJSON(value?: ResultStatus | null): any {
    return value as any;
}

