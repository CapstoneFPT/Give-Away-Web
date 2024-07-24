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
export const TransactionType = {
    AuctionDeposit: 'AuctionDeposit',
    Withdraw: 'Withdraw',
    Purchase: 'Purchase',
    Refund: 'Refund',
    Recharge: 'Recharge'
} as const;
export type TransactionType = typeof TransactionType[keyof typeof TransactionType];


export function instanceOfTransactionType(value: any): boolean {
    for (const key in TransactionType) {
        if (Object.prototype.hasOwnProperty.call(TransactionType, key)) {
            if ((TransactionType as Record<string, TransactionType>)[key] === value) {
                return true;
            }
        }
    }
    return false;
}

export function TransactionTypeFromJSON(json: any): TransactionType {
    return TransactionTypeFromJSONTyped(json, false);
}

export function TransactionTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionType {
    return json as TransactionType;
}

export function TransactionTypeToJSON(value?: TransactionType | null): any {
    return value as any;
}

