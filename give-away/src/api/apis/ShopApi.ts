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
  ConsignSaleResponsePaginationResponseResult,
  ConsignSaleResponseResult,
  ConsignSaleStatus,
  CreateConsignSaleByShopRequest,
  CreateFeedbackRequest,
  CreateOrderRequest,
  FashionItemDetailRequest,
  FashionItemDetailResponseResult,
  InquiryListRequest,
  InquiryListResponsePaginationResponse,
  OrderResponsePaginationResponseResult,
  OrderResponseResult,
  OrderStatus,
  PayOrderWithCashRequest,
  PayOrderWithCashResponse,
  RefundResponsePaginationResponseResult,
  RefundStatus,
  ShopDetailResponseListResult,
  ShopDetailResponseResult,
  TransactionRequest,
  TransactionResponsePaginationResponse,
} from '../models/index';
import {
    ConsignSaleResponsePaginationResponseResultFromJSON,
    ConsignSaleResponsePaginationResponseResultToJSON,
    ConsignSaleResponseResultFromJSON,
    ConsignSaleResponseResultToJSON,
    ConsignSaleStatusFromJSON,
    ConsignSaleStatusToJSON,
    CreateConsignSaleByShopRequestFromJSON,
    CreateConsignSaleByShopRequestToJSON,
    CreateFeedbackRequestFromJSON,
    CreateFeedbackRequestToJSON,
    CreateOrderRequestFromJSON,
    CreateOrderRequestToJSON,
    FashionItemDetailRequestFromJSON,
    FashionItemDetailRequestToJSON,
    FashionItemDetailResponseResultFromJSON,
    FashionItemDetailResponseResultToJSON,
    InquiryListRequestFromJSON,
    InquiryListRequestToJSON,
    InquiryListResponsePaginationResponseFromJSON,
    InquiryListResponsePaginationResponseToJSON,
    OrderResponsePaginationResponseResultFromJSON,
    OrderResponsePaginationResponseResultToJSON,
    OrderResponseResultFromJSON,
    OrderResponseResultToJSON,
    OrderStatusFromJSON,
    OrderStatusToJSON,
    PayOrderWithCashRequestFromJSON,
    PayOrderWithCashRequestToJSON,
    PayOrderWithCashResponseFromJSON,
    PayOrderWithCashResponseToJSON,
    RefundResponsePaginationResponseResultFromJSON,
    RefundResponsePaginationResponseResultToJSON,
    RefundStatusFromJSON,
    RefundStatusToJSON,
    ShopDetailResponseListResultFromJSON,
    ShopDetailResponseListResultToJSON,
    ShopDetailResponseResultFromJSON,
    ShopDetailResponseResultToJSON,
    TransactionRequestFromJSON,
    TransactionRequestToJSON,
    TransactionResponsePaginationResponseFromJSON,
    TransactionResponsePaginationResponseToJSON,
} from '../models/index';

export interface ApiShopsShopIdConsignsalesGetRequest {
    shopId: string;
    status?: ConsignSaleStatus;
    pageNumber?: number;
    pageSize?: number;
    consignSaleCode?: string;
}

export interface ApiShopsShopIdConsignsalesPostRequest {
    shopId: string;
    createConsignSaleByShopRequest?: CreateConsignSaleByShopRequest;
}

export interface ApiShopsShopIdFashionitemsPostRequest {
    shopId: string;
    fashionItemDetailRequest?: FashionItemDetailRequest;
}

export interface ApiShopsShopIdFeedbacksPostRequest {
    shopId: string;
    createFeedbackRequest?: CreateFeedbackRequest;
}

export interface ApiShopsShopIdGetRequest {
    shopId: string;
}

export interface ApiShopsShopIdInquiriesGetRequest {
    shopId: string;
    inquiryListRequest?: InquiryListRequest;
}

export interface ApiShopsShopIdOfflineTransactionsGetRequest {
    shopId: string;
    transactionRequest?: TransactionRequest;
}

export interface ApiShopsShopIdOrdersGetRequest {
    shopId: string;
    pageNumber?: number;
    pageSize?: number;
    status?: OrderStatus;
    orderCode?: string;
}

export interface ApiShopsShopIdOrdersOrderIdPayWithCashPostRequest {
    shopId: string;
    orderId: string;
    payOrderWithCashRequest?: PayOrderWithCashRequest;
}

export interface ApiShopsShopIdOrdersPostRequest {
    shopId: string;
    createOrderRequest?: CreateOrderRequest;
}

export interface ApiShopsShopIdRefundsGetRequest {
    shopId: string;
    pageNumber?: number;
    pageSize?: number;
    status?: Array<RefundStatus>;
    previousTime?: Date;
}

/**
 * 
 */
export class ShopApi extends runtime.BaseAPI {

    /**
     */
    async apiShopsGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ShopDetailResponseListResult>> {
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
            path: `/api/shops`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ShopDetailResponseListResultFromJSON(jsonValue));
    }

    /**
     */
    async apiShopsGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ShopDetailResponseListResult> {
        const response = await this.apiShopsGetRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async apiShopsShopIdConsignsalesGetRaw(requestParameters: ApiShopsShopIdConsignsalesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConsignSaleResponsePaginationResponseResult>> {
        if (requestParameters['shopId'] == null) {
            throw new runtime.RequiredError(
                'shopId',
                'Required parameter "shopId" was null or undefined when calling apiShopsShopIdConsignsalesGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['status'] != null) {
            queryParameters['Status'] = requestParameters['status'];
        }

        if (requestParameters['pageNumber'] != null) {
            queryParameters['PageNumber'] = requestParameters['pageNumber'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['PageSize'] = requestParameters['pageSize'];
        }

        if (requestParameters['consignSaleCode'] != null) {
            queryParameters['ConsignSaleCode'] = requestParameters['consignSaleCode'];
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
            path: `/api/shops/{shopId}/consignsales`.replace(`{${"shopId"}}`, encodeURIComponent(String(requestParameters['shopId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConsignSaleResponsePaginationResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiShopsShopIdConsignsalesGet(requestParameters: ApiShopsShopIdConsignsalesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConsignSaleResponsePaginationResponseResult> {
        const response = await this.apiShopsShopIdConsignsalesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiShopsShopIdConsignsalesPostRaw(requestParameters: ApiShopsShopIdConsignsalesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConsignSaleResponseResult>> {
        if (requestParameters['shopId'] == null) {
            throw new runtime.RequiredError(
                'shopId',
                'Required parameter "shopId" was null or undefined when calling apiShopsShopIdConsignsalesPost().'
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
            path: `/api/shops/{shopId}/consignsales`.replace(`{${"shopId"}}`, encodeURIComponent(String(requestParameters['shopId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateConsignSaleByShopRequestToJSON(requestParameters['createConsignSaleByShopRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConsignSaleResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiShopsShopIdConsignsalesPost(requestParameters: ApiShopsShopIdConsignsalesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConsignSaleResponseResult> {
        const response = await this.apiShopsShopIdConsignsalesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiShopsShopIdFashionitemsPostRaw(requestParameters: ApiShopsShopIdFashionitemsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FashionItemDetailResponseResult>> {
        if (requestParameters['shopId'] == null) {
            throw new runtime.RequiredError(
                'shopId',
                'Required parameter "shopId" was null or undefined when calling apiShopsShopIdFashionitemsPost().'
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
            path: `/api/shops/{shopId}/fashionitems`.replace(`{${"shopId"}}`, encodeURIComponent(String(requestParameters['shopId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: FashionItemDetailRequestToJSON(requestParameters['fashionItemDetailRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FashionItemDetailResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiShopsShopIdFashionitemsPost(requestParameters: ApiShopsShopIdFashionitemsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FashionItemDetailResponseResult> {
        const response = await this.apiShopsShopIdFashionitemsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiShopsShopIdFeedbacksPostRaw(requestParameters: ApiShopsShopIdFeedbacksPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        if (requestParameters['shopId'] == null) {
            throw new runtime.RequiredError(
                'shopId',
                'Required parameter "shopId" was null or undefined when calling apiShopsShopIdFeedbacksPost().'
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
            path: `/api/shops/{shopId}/feedbacks`.replace(`{${"shopId"}}`, encodeURIComponent(String(requestParameters['shopId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateFeedbackRequestToJSON(requestParameters['createFeedbackRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async apiShopsShopIdFeedbacksPost(requestParameters: ApiShopsShopIdFeedbacksPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.apiShopsShopIdFeedbacksPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiShopsShopIdGetRaw(requestParameters: ApiShopsShopIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ShopDetailResponseResult>> {
        if (requestParameters['shopId'] == null) {
            throw new runtime.RequiredError(
                'shopId',
                'Required parameter "shopId" was null or undefined when calling apiShopsShopIdGet().'
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
            path: `/api/shops/{shopId}`.replace(`{${"shopId"}}`, encodeURIComponent(String(requestParameters['shopId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ShopDetailResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiShopsShopIdGet(requestParameters: ApiShopsShopIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ShopDetailResponseResult> {
        const response = await this.apiShopsShopIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiShopsShopIdInquiriesGetRaw(requestParameters: ApiShopsShopIdInquiriesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<InquiryListResponsePaginationResponse>> {
        if (requestParameters['shopId'] == null) {
            throw new runtime.RequiredError(
                'shopId',
                'Required parameter "shopId" was null or undefined when calling apiShopsShopIdInquiriesGet().'
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
            path: `/api/shops/{shopId}/inquiries`.replace(`{${"shopId"}}`, encodeURIComponent(String(requestParameters['shopId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
            body: InquiryListRequestToJSON(requestParameters['inquiryListRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InquiryListResponsePaginationResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiShopsShopIdInquiriesGet(requestParameters: ApiShopsShopIdInquiriesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<InquiryListResponsePaginationResponse> {
        const response = await this.apiShopsShopIdInquiriesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiShopsShopIdOfflineTransactionsGetRaw(requestParameters: ApiShopsShopIdOfflineTransactionsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TransactionResponsePaginationResponse>> {
        if (requestParameters['shopId'] == null) {
            throw new runtime.RequiredError(
                'shopId',
                'Required parameter "shopId" was null or undefined when calling apiShopsShopIdOfflineTransactionsGet().'
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
            path: `/api/shops/{shopId}/offline-transactions`.replace(`{${"shopId"}}`, encodeURIComponent(String(requestParameters['shopId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
            body: TransactionRequestToJSON(requestParameters['transactionRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionResponsePaginationResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiShopsShopIdOfflineTransactionsGet(requestParameters: ApiShopsShopIdOfflineTransactionsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TransactionResponsePaginationResponse> {
        const response = await this.apiShopsShopIdOfflineTransactionsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiShopsShopIdOrdersGetRaw(requestParameters: ApiShopsShopIdOrdersGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrderResponsePaginationResponseResult>> {
        if (requestParameters['shopId'] == null) {
            throw new runtime.RequiredError(
                'shopId',
                'Required parameter "shopId" was null or undefined when calling apiShopsShopIdOrdersGet().'
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
            path: `/api/shops/{shopId}/orders`.replace(`{${"shopId"}}`, encodeURIComponent(String(requestParameters['shopId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderResponsePaginationResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiShopsShopIdOrdersGet(requestParameters: ApiShopsShopIdOrdersGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrderResponsePaginationResponseResult> {
        const response = await this.apiShopsShopIdOrdersGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiShopsShopIdOrdersOrderIdPayWithCashPostRaw(requestParameters: ApiShopsShopIdOrdersOrderIdPayWithCashPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PayOrderWithCashResponse>> {
        if (requestParameters['shopId'] == null) {
            throw new runtime.RequiredError(
                'shopId',
                'Required parameter "shopId" was null or undefined when calling apiShopsShopIdOrdersOrderIdPayWithCashPost().'
            );
        }

        if (requestParameters['orderId'] == null) {
            throw new runtime.RequiredError(
                'orderId',
                'Required parameter "orderId" was null or undefined when calling apiShopsShopIdOrdersOrderIdPayWithCashPost().'
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
            path: `/api/shops/{shopId}/orders/{orderId}/pay-with-cash`.replace(`{${"shopId"}}`, encodeURIComponent(String(requestParameters['shopId']))).replace(`{${"orderId"}}`, encodeURIComponent(String(requestParameters['orderId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PayOrderWithCashRequestToJSON(requestParameters['payOrderWithCashRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PayOrderWithCashResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiShopsShopIdOrdersOrderIdPayWithCashPost(requestParameters: ApiShopsShopIdOrdersOrderIdPayWithCashPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PayOrderWithCashResponse> {
        const response = await this.apiShopsShopIdOrdersOrderIdPayWithCashPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiShopsShopIdOrdersPostRaw(requestParameters: ApiShopsShopIdOrdersPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrderResponseResult>> {
        if (requestParameters['shopId'] == null) {
            throw new runtime.RequiredError(
                'shopId',
                'Required parameter "shopId" was null or undefined when calling apiShopsShopIdOrdersPost().'
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
            path: `/api/shops/{shopId}/orders`.replace(`{${"shopId"}}`, encodeURIComponent(String(requestParameters['shopId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateOrderRequestToJSON(requestParameters['createOrderRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiShopsShopIdOrdersPost(requestParameters: ApiShopsShopIdOrdersPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrderResponseResult> {
        const response = await this.apiShopsShopIdOrdersPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiShopsShopIdRefundsGetRaw(requestParameters: ApiShopsShopIdRefundsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RefundResponsePaginationResponseResult>> {
        if (requestParameters['shopId'] == null) {
            throw new runtime.RequiredError(
                'shopId',
                'Required parameter "shopId" was null or undefined when calling apiShopsShopIdRefundsGet().'
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

        if (requestParameters['previousTime'] != null) {
            queryParameters['PreviousTime'] = (requestParameters['previousTime'] as any).toISOString();
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
            path: `/api/shops/{shopId}/refunds`.replace(`{${"shopId"}}`, encodeURIComponent(String(requestParameters['shopId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RefundResponsePaginationResponseResultFromJSON(jsonValue));
    }

    /**
     */
    async apiShopsShopIdRefundsGet(requestParameters: ApiShopsShopIdRefundsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RefundResponsePaginationResponseResult> {
        const response = await this.apiShopsShopIdRefundsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
