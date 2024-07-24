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

import * as runtime from "../runtime";
import type {
  FashionItemDetailResponsePaginationResponseResult,
  FashionItemDetailResponseResult,
  FashionItemStatus,
  FashionItemType,
  GenderType,
  UpdateFashionItemRequest,
} from "../models/index";
import {
  FashionItemDetailResponsePaginationResponseResultFromJSON,
  FashionItemDetailResponsePaginationResponseResultToJSON,
  FashionItemDetailResponseResultFromJSON,
  FashionItemDetailResponseResultToJSON,
  FashionItemStatusFromJSON,
  FashionItemStatusToJSON,
  FashionItemTypeFromJSON,
  FashionItemTypeToJSON,
  GenderTypeFromJSON,
  GenderTypeToJSON,
  UpdateFashionItemRequestFromJSON,
  UpdateFashionItemRequestToJSON,
} from "../models/index";

export interface ApiFashionitemsGetRequest {
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
  memberId?: string;
  status?: Array<FashionItemStatus>;
  type?: Array<FashionItemType>;
  shopId?: string;
  genderType?: GenderType;
}

export interface ApiFashionitemsIdGetRequest {
  id: string;
}

export interface ApiFashionitemsItemIdPutRequest {
  itemId: string;
  updateFashionItemRequest?: UpdateFashionItemRequest;
}

export interface ApiFashionitemsItemidCheckAvailabilityPutRequest {
  itemid: string;
}

/**
 *
 */
export class FashionItemApi extends runtime.BaseAPI {
  /**
   */
  async apiFashionitemsGetRaw(
    requestParameters: ApiFashionitemsGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<
    runtime.ApiResponse<FashionItemDetailResponsePaginationResponseResult>
  > {
    const queryParameters: any = {};

    if (requestParameters["searchTerm"] != null) {
      queryParameters["SearchTerm"] = requestParameters["searchTerm"];
    }

    if (requestParameters["pageNumber"] != null) {
      queryParameters["PageNumber"] = requestParameters["pageNumber"];
    }

    if (requestParameters["pageSize"] != null) {
      queryParameters["PageSize"] = requestParameters["pageSize"];
    }

    if (requestParameters["memberId"] != null) {
      queryParameters["MemberId"] = requestParameters["memberId"];
    }

    if (requestParameters["status"] != null) {
      queryParameters["Status"] = requestParameters["status"];
    }

    if (requestParameters["type"] != null) {
      queryParameters["Type"] = requestParameters["type"];
    }

    if (requestParameters["shopId"] != null) {
      queryParameters["ShopId"] = requestParameters["shopId"];
    }

    if (requestParameters["genderType"] != null) {
      queryParameters["GenderType"] = requestParameters["genderType"];
    }

    const headerParameters: runtime.HTTPHeaders = {
    };

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("Bearer", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/api/fashionitems`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      FashionItemDetailResponsePaginationResponseResultFromJSON(jsonValue)
    );
  }

  /**
   */
  async apiFashionitemsGet(
    requestParameters: ApiFashionitemsGetRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<FashionItemDetailResponsePaginationResponseResult> {
    const response = await this.apiFashionitemsGetRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   */
  async apiFashionitemsIdGetRaw(
    requestParameters: ApiFashionitemsIdGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<FashionItemDetailResponseResult>> {
    if (requestParameters["id"] == null) {
      throw new runtime.RequiredError(
        "id",
        'Required parameter "id" was null or undefined when calling apiFashionitemsIdGet().'
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
    const response = await this.request(
      {
        path: `/api/fashionitems/{id}`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters["id"]))
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      FashionItemDetailResponseResultFromJSON(jsonValue)
    );
  }

  /**
   */
  async apiFashionitemsIdGet(
    requestParameters: ApiFashionitemsIdGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<FashionItemDetailResponseResult> {
    const response = await this.apiFashionitemsIdGetRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   */
  async apiFashionitemsItemIdPutRaw(
    requestParameters: ApiFashionitemsItemIdPutRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<FashionItemDetailResponseResult>> {
    if (requestParameters["itemId"] == null) {
      throw new runtime.RequiredError(
        "itemId",
        'Required parameter "itemId" was null or undefined when calling apiFashionitemsItemIdPut().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("Bearer", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/api/fashionitems/{itemId}`.replace(
          `{${"itemId"}}`,
          encodeURIComponent(String(requestParameters["itemId"]))
        ),
        method: "PUT",
        headers: headerParameters,
        query: queryParameters,
        body: UpdateFashionItemRequestToJSON(
          requestParameters["updateFashionItemRequest"]
        ),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      FashionItemDetailResponseResultFromJSON(jsonValue)
    );
  }

  /**
   */
  async apiFashionitemsItemIdPut(
    requestParameters: ApiFashionitemsItemIdPutRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<FashionItemDetailResponseResult> {
    const response = await this.apiFashionitemsItemIdPutRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   */
  async apiFashionitemsItemidCheckAvailabilityPutRaw(
    requestParameters: ApiFashionitemsItemidCheckAvailabilityPutRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<FashionItemDetailResponseResult>> {
    if (requestParameters["itemid"] == null) {
      throw new runtime.RequiredError(
        "itemid",
        'Required parameter "itemid" was null or undefined when calling apiFashionitemsItemidCheckAvailabilityPut().'
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
    const response = await this.request(
      {
        path: `/api/fashionitems/{itemid}/check-availability`.replace(
          `{${"itemid"}}`,
          encodeURIComponent(String(requestParameters["itemid"]))
        ),
        method: "PUT",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      FashionItemDetailResponseResultFromJSON(jsonValue)
    );
  }

  /**
   */
  async apiFashionitemsItemidCheckAvailabilityPut(
    requestParameters: ApiFashionitemsItemidCheckAvailabilityPutRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<FashionItemDetailResponseResult> {
    const response = await this.apiFashionitemsItemidCheckAvailabilityPutRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}
