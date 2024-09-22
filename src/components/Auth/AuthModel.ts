import { Roles } from "../../api";

export interface AuthModel {
  api_token: string;
  refreshToken?: string;
}

export interface CurrentUserModel {
  role: Roles;
  id: string;
  email: string;
}