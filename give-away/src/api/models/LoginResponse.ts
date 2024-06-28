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
import type { Roles } from './Roles';
import {
    RolesFromJSON,
    RolesFromJSONTyped,
    RolesToJSON,
} from './Roles';

/**
 * 
 * @export
 * @interface LoginResponse
 */
export interface LoginResponse {
    /**
     * 
     * @type {string}
     * @memberof LoginResponse
     */
    accessToken?: string;
    /**
     * 
     * @type {Roles}
     * @memberof LoginResponse
     */
    role?: Roles;
    /**
     * 
     * @type {string}
     * @memberof LoginResponse
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof LoginResponse
     */
    email?: string;
}

/**
 * Check if a given object implements the LoginResponse interface.
 */
export function instanceOfLoginResponse(value: object): value is LoginResponse {
    return true;
}

export function LoginResponseFromJSON(json: any): LoginResponse {
    return LoginResponseFromJSONTyped(json, false);
}

export function LoginResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'accessToken': json['accessToken'] == null ? undefined : json['accessToken'],
        'role': json['role'] == null ? undefined : RolesFromJSON(json['role']),
        'id': json['id'] == null ? undefined : json['id'],
        'email': json['email'] == null ? undefined : json['email'],
    };
}

export function LoginResponseToJSON(value?: LoginResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'accessToken': value['accessToken'],
        'role': RolesToJSON(value['role']),
        'id': value['id'],
        'email': value['email'],
    };
}

