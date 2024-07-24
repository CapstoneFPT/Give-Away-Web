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
  AccountResponsePaginationResponse,
  AccountResponseResult,
  AccountStatus,
  CartRequest,
  ConsignSaleResponsePaginationResponseResult,
  ConsignSaleResponseResult,
  ConsignSaleStatus,
  CreateConsignSaleRequest,
  CreateInquiryRequest,
  CreateInquiryResponse,
  CreateWithdrawRequest,
  CreateWithdrawResponse,
  DeliveryRequest,
  DeliveryResponseListResult,
  DeliveryResponseResult,
  GetTransactionsResponse,
  GetWithdrawsResponsePaginationResponse,
  OrderResponsePaginationResponseResult,
  OrderResponseResult,
  OrderStatus,
  StringResult,
  TransactionType,
  UpdateAccountRequest,
  WithdrawStatus,
} from '../models/index';
import {
    AccountResponsePaginationResponseFromJSON,
    AccountResponsePaginationResponseToJSON,
    AccountResponseResultFromJSON,
    AccountResponseResultToJSON,
    AccountStatusFromJSON,
    AccountStatusToJSON,
    CartRequestFromJSON,
    CartRequestToJSON,
    ConsignSaleResponsePaginationResponseResultFromJSON,
    ConsignSaleResponsePaginationResponseResultToJSON,
    ConsignSaleResponseResultFromJSON,
    ConsignSaleResponseResultToJSON,
    ConsignSaleStatusFromJSON,
    ConsignSaleStatusToJSON,
    CreateConsignSaleRequestFromJSON,
    CreateConsignSaleRequestToJSON,
    CreateInquiryRequestFromJSON,
    CreateInquiryRequestToJSON,
    CreateInquiryResponseFromJSON,
    CreateInquiryResponseToJSON,
    CreateWithdrawRequestFromJSON,
    CreateWithdrawRequestToJSON,
    CreateWithdrawResponseFromJSON,
    CreateWithdrawResponseToJSON,
    DeliveryRequestFromJSON,
    DeliveryRequestToJSON,
    DeliveryResponseListResultFromJSON,
    DeliveryResponseListResultToJSON,
    DeliveryResponseResultFromJSON,
    DeliveryResponseResultToJSON,
    GetTransactionsResponseFromJSON,
    GetTransactionsResponseToJSON,
    GetWithdrawsResponsePaginationResponseFromJSON,
    GetWithdrawsResponsePaginationResponseToJSON,
    OrderResponsePaginationResponseResultFromJSON,
    OrderResponsePaginationResponseResultToJSON,
    OrderResponseResultFromJSON,
    OrderResponseResultToJSON,
    OrderStatusFromJSON,
    OrderStatusToJSON,
    StringResultFromJSON,
    StringResultToJSON,
    TransactionTypeFromJSON,
    TransactionTypeToJSON,
    UpdateAccountRequestFromJSON,
    UpdateAccountRequestToJSON,
    WithdrawStatusFromJSON,
    WithdrawStatusToJSON,
} from '../models/index';

export interface ApiAccountsAccountIdConsignsalesGetRequest {
    accountId: string;
    pageNumber?: number;
    pageSize?: number;
    shopId?: string;
    consignSaleCode?: string;
    status?: ConsignSaleStatus;
}

export interface ApiAccountsAccountIdConsignsalesPostRequest {
    accountId: string;
    createConsignSaleRequest?: CreateConsignSaleRequest;
}

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

export interface ApiAccountsAccountIdInquiriesPostRequest {
    accountId: string;
    createInquiryRequest?: CreateInquiryRequest;
}

export interface ApiAccountsAccountIdOrdersGetRequest {
    accountId: string;
    pageNumber?: number;
    pageSize?: number;
    status?: OrderStatus;
    orderCode?: string;
}

export interface ApiAccountsAccountIdOrdersPostRequest {
    accountId: string;
    cartRequest?: CartRequest;
}

export interface ApiAccountsAccountIdPutRequest {
    accountId: string;
    updateAccountRequest?: UpdateAccountRequest;
}

export interface ApiAccountsAccountIdTransactionsGetRequest {
    accountId: string;
    page?: number;
    pageSize?: number;
    type?: TransactionType;
}

export interface ApiAccountsAccountIdWithdrawsGetRequest {
    accountId: string;
    page?: number;
    pageSize?: number;
    status?: WithdrawStatus;
}

export interface ApiAccountsAccountIdWithdrawsPostRequest {
    accountId: string;
    createWithdrawRequest?: CreateWithdrawRequest;
}

export interface ApiAccountsGetRequest {
    page?: number;
    pageSize?: number;
    searchTerm?: string;
    phone?: string;
    status?: Array<AccountStatus>;
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
    async apiAccountsAccountIdConsignsalesGetRaw(requestParameters: ApiAccountsAccountIdConsignsalesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConsignSaleResponsePaginationResponseResult>> {
        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdConsignsalesGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['pageNumber'] != null) {
            queryParameters['PageNumber'] = requestParameters['pageNumber'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['PageSize'] = requestParameters['pageSize'];
        }

        if (requestParameters['shopId'] != null) {
            queryParameters['ShopId'] = requestParameters['shopId'];
        }

        if (requestParameters['consignSaleCode'] != null) {
            queryParameters['ConsignSaleCode'] = requestParameters['consignSaleCode'];
        }

        if (requestParameters['status'] != null) {
            queryParameters['Status'] = requestParameters['status'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts/{accountId}/consignsales`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConsignSaleResponsePaginationResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdConsignsalesGet(requestParameters: ApiAccountsAccountIdConsignsalesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConsignSaleResponsePaginationResponseResult> {
        const response = await this.apiAccountsAccountIdConsignsalesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsAccountIdConsignsalesPostRaw(requestParameters: ApiAccountsAccountIdConsignsalesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConsignSaleResponseResult>> {
        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdConsignsalesPost().'
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
            path: `/api/accounts/{accountId}/consignsales`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateConsignSaleRequestToJSON(requestParameters['createConsignSaleRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConsignSaleResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdConsignsalesPost(requestParameters: ApiAccountsAccountIdConsignsalesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConsignSaleResponseResult> {
        const response = await this.apiAccountsAccountIdConsignsalesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

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
    async apiAccountsAccountIdInquiriesPostRaw(requestParameters: ApiAccountsAccountIdInquiriesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateInquiryResponse>> {
        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdInquiriesPost().'
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
            path: `/api/accounts/{accountId}/inquiries`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateInquiryRequestToJSON(requestParameters['createInquiryRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateInquiryResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdInquiriesPost(requestParameters: ApiAccountsAccountIdInquiriesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateInquiryResponse> {
        const response = await this.apiAccountsAccountIdInquiriesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsAccountIdOrdersGetRaw(requestParameters: ApiAccountsAccountIdOrdersGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrderResponsePaginationResponseResult>> {
        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdOrdersGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['pageNumber'] != null) {
            queryParameters['PageNumber'] = requestParameters['pageNumber'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['PageSize'] = requestParameters['pageSize'];
        }

        if (requestParameters['status'] != null) {
            queryParameters['Status'] = requestParameters['status'];
        }

        if (requestParameters['orderCode'] != null) {
            queryParameters['OrderCode'] = requestParameters['orderCode'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts/{accountId}/orders`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderResponsePaginationResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdOrdersGet(requestParameters: ApiAccountsAccountIdOrdersGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrderResponsePaginationResponseResult> {
        const response = await this.apiAccountsAccountIdOrdersGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsAccountIdOrdersPostRaw(requestParameters: ApiAccountsAccountIdOrdersPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrderResponseResult>> {
        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdOrdersPost().'
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
            path: `/api/accounts/{accountId}/orders`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CartRequestToJSON(requestParameters['cartRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdOrdersPost(requestParameters: ApiAccountsAccountIdOrdersPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrderResponseResult> {
        const response = await this.apiAccountsAccountIdOrdersPostRaw(requestParameters, initOverrides);
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
    async apiAccountsAccountIdTransactionsGetRaw(requestParameters: ApiAccountsAccountIdTransactionsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetTransactionsResponse>> {
        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdTransactionsGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['page'] != null) {
            queryParameters['Page'] = requestParameters['page'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['PageSize'] = requestParameters['pageSize'];
        }

        if (requestParameters['type'] != null) {
            queryParameters['Type'] = requestParameters['type'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts/{accountId}/transactions`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetTransactionsResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdTransactionsGet(requestParameters: ApiAccountsAccountIdTransactionsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetTransactionsResponse> {
        const response = await this.apiAccountsAccountIdTransactionsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsAccountIdWithdrawsGetRaw(requestParameters: ApiAccountsAccountIdWithdrawsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetWithdrawsResponsePaginationResponse>> {
        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdWithdrawsGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['page'] != null) {
            queryParameters['Page'] = requestParameters['page'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['PageSize'] = requestParameters['pageSize'];
        }

        if (requestParameters['status'] != null) {
            queryParameters['Status'] = requestParameters['status'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/accounts/{accountId}/withdraws`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetWithdrawsResponsePaginationResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdWithdrawsGet(requestParameters: ApiAccountsAccountIdWithdrawsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetWithdrawsResponsePaginationResponse> {
        const response = await this.apiAccountsAccountIdWithdrawsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsAccountIdWithdrawsPostRaw(requestParameters: ApiAccountsAccountIdWithdrawsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateWithdrawResponse>> {
        if (requestParameters['accountId'] == null) {
            throw new runtime.RequiredError(
                'accountId',
                'Required parameter "accountId" was null or undefined when calling apiAccountsAccountIdWithdrawsPost().'
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
            path: `/api/accounts/{accountId}/withdraws`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters['accountId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateWithdrawRequestToJSON(requestParameters['createWithdrawRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateWithdrawResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsAccountIdWithdrawsPost(requestParameters: ApiAccountsAccountIdWithdrawsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateWithdrawResponse> {
        const response = await this.apiAccountsAccountIdWithdrawsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAccountsGetRaw(requestParameters: ApiAccountsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountResponsePaginationResponse>> {
        const queryParameters: any = {};

        if (requestParameters['page'] != null) {
            queryParameters['Page'] = requestParameters['page'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['PageSize'] = requestParameters['pageSize'];
        }

        if (requestParameters['searchTerm'] != null) {
            queryParameters['SearchTerm'] = requestParameters['searchTerm'];
        }

        if (requestParameters['phone'] != null) {
            queryParameters['Phone'] = requestParameters['phone'];
        }

        if (requestParameters['status'] != null) {
            queryParameters['Status'] = requestParameters['status'];
        }

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

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountResponsePaginationResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAccountsGet(requestParameters: ApiAccountsGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountResponsePaginationResponse> {
        const response = await this.apiAccountsGetRaw(requestParameters, initOverrides);
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
