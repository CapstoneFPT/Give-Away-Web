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


import * as runtime from '../runtime';
import type {
  AccountResponse,
  AccountResponseResult,
  DeliveryRequest,
  DeliveryResponseListResult,
  DeliveryResponseResult,
  StringResult,
  UpdateAccountRequest,
  UpdateWalletRequest,
  WalletResponseResult,
} from '../models/index';
import {
    AccountResponseFromJSON,
    AccountResponseToJSON,
    AccountResponseResultFromJSON,
    AccountResponseResultToJSON,
    DeliveryRequestFromJSON,
    DeliveryRequestToJSON,
    DeliveryResponseListResultFromJSON,
    DeliveryResponseListResultToJSON,
    DeliveryResponseResultFromJSON,
    DeliveryResponseResultToJSON,
    StringResultFromJSON,
    StringResultToJSON,
    UpdateAccountRequestFromJSON,
    UpdateAccountRequestToJSON,
    UpdateWalletRequestFromJSON,
    UpdateWalletRequestToJSON,
    WalletResponseResultFromJSON,
    WalletResponseResultToJSON,
} from '../models/index';

export interface ApiAccountsAccountIdDeliveriesDeliveryIdDeleteRequest {
    deliveryId: string;
    accountId: string;
}

export interface ApiAccountsAccountIdDeliveriesDeliveryIdPutRequest {
    deliveryId: string;
    accountId: string;
    deliveryRequest?: DeliveryRequest;
}

export interface ApiAccountsAccountIdDeliveriesGetRequest {
    accountId: string;
}

export interface ApiAccountsAccountIdDeliveriesPostRequest {
    accountId: string;
    deliveryRequest?: DeliveryRequest;
}

export interface ApiAccountsAccountIdPutRequest {
    accountId: string;
    updateAccountRequest?: UpdateAccountRequest;
}

export interface ApiAccountsAccountIdWalletsGetRequest {
    accountId: string;
}

export interface ApiAccountsAccountIdWalletsPutRequest {
    accountId: string;
    updateWalletRequest?: UpdateWalletRequest;
}

export interface ApiAccountsIdBanPutRequest {
    id: string;
}

export interface ApiAccountsIdGetRequest {
    id: string;
}

/**
 * 
 */
export class AccountApi extends runtime.BaseAPI {

    /**
     */
    async apiAccountsAccountIdDeliveriesDeliveryIdDeleteRaw(requestParameters: ApiAccountsAccountIdDeliveriesDeliveryIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StringResult>> {
        if (requestParameters['deliveryId'] == null) {
            throw new runtime.RequiredError(
                'deliveryId',
                'Required parameter "deliveryId" was null or undefined when calling apiAccountsAccountIdDeliveriesDeliveryIdDelete().'
            );
        }

        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdDeliveriesDeliveryIdDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts/{accountId}/deliveries/{deliveryId}`.replace(`{${"deliveryId"}}`, encodeURIComponent(String(requestParameters['deliveryId']))).replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StringResultFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdDeliveriesDeliveryIdDelete(requestParameters: ApiAccountsAccountIdDeliveriesDeliveryIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StringResult> {
        const response = await this.apiAccountsAccountIdDeliveriesDeliveryIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsAccountIdDeliveriesDeliveryIdPutRaw(requestParameters: ApiAccountsAccountIdDeliveriesDeliveryIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DeliveryResponseResult>> {
        if (requestParameters['deliveryId'] == null) {
            throw new runtime.RequiredError(
                'deliveryId',
                'Required parameter "deliveryId" was null or undefined when calling apiAccountsAccountIdDeliveriesDeliveryIdPut().'
            );
        }

        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdDeliveriesDeliveryIdPut().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts/{accountId}/deliveries/{deliveryId}`.replace(`{${"deliveryId"}}`, encodeURIComponent(String(requestParameters['deliveryId']))).replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: DeliveryRequestToJSON(requestParameters['deliveryRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DeliveryResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdDeliveriesDeliveryIdPut(requestParameters: ApiAccountsAccountIdDeliveriesDeliveryIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DeliveryResponseResult> {
        const response = await this.apiAccountsAccountIdDeliveriesDeliveryIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsAccountIdDeliveriesGetRaw(requestParameters: ApiAccountsAccountIdDeliveriesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DeliveryResponseListResult>> {
        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdDeliveriesGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts/{accountId}/deliveries`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DeliveryResponseListResultFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdDeliveriesGet(requestParameters: ApiAccountsAccountIdDeliveriesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DeliveryResponseListResult> {
        const response = await this.apiAccountsAccountIdDeliveriesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsAccountIdDeliveriesPostRaw(requestParameters: ApiAccountsAccountIdDeliveriesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DeliveryResponseResult>> {
        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdDeliveriesPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts/{accountId}/deliveries`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: DeliveryRequestToJSON(requestParameters['deliveryRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DeliveryResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdDeliveriesPost(requestParameters: ApiAccountsAccountIdDeliveriesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DeliveryResponseResult> {
        const response = await this.apiAccountsAccountIdDeliveriesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsAccountIdPutRaw(requestParameters: ApiAccountsAccountIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountResponseResult>> {
        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdPut().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts/{accountId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateAccountRequestToJSON(requestParameters['updateAccountRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdPut(requestParameters: ApiAccountsAccountIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountResponseResult> {
        const response = await this.apiAccountsAccountIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsAccountIdWalletsGetRaw(requestParameters: ApiAccountsAccountIdWalletsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WalletResponseResult>> {
        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdWalletsGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts/{accountId}/wallets`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WalletResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdWalletsGet(requestParameters: ApiAccountsAccountIdWalletsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WalletResponseResult> {
        const response = await this.apiAccountsAccountIdWalletsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsAccountIdWalletsPutRaw(requestParameters: ApiAccountsAccountIdWalletsPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WalletResponseResult>> {
        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdWalletsPut().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts/{accountId}/wallets`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateWalletRequestToJSON(requestParameters['updateWalletRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WalletResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdWalletsPut(requestParameters: ApiAccountsAccountIdWalletsPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WalletResponseResult> {
        const response = await this.apiAccountsAccountIdWalletsPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<AccountResponse>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AccountResponseFromJSON));
    }

    /**
     */
    async apiAccountsGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<AccountResponse>> {
        const response = await this.apiAccountsGetRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsIdBanPutRaw(requestParameters: ApiAccountsIdBanPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountResponseResult>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiAccountsIdBanPut().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts/{id}/ban`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsIdBanPut(requestParameters: ApiAccountsIdBanPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountResponseResult> {
        const response = await this.apiAccountsIdBanPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsIdGetRaw(requestParameters: ApiAccountsIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountResponseResult>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiAccountsIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsIdGet(requestParameters: ApiAccountsIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountResponseResult> {
        const response = await this.apiAccountsIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
