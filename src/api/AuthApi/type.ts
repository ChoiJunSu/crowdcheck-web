import {
  IGetRequest,
  IGetResponse,
  IPostRequest,
  IPostResponse,
} from "@api/ApiClient/type";
import { IApiRequest, IApiResponse } from "@api/BaseApi/type";
import { TUserType } from "@api/UserApi/type";

export type TOauthProvider = "google" | "kakao";

export interface ILoginRequest extends IPostRequest {
  email: string;
  password: string;
  type: TUserType;
}

export interface ILoginResponse extends IPostResponse {
  authToken: string;
}

export interface ILoginOauthRequest extends IApiRequest {
  provider: TOauthProvider;
  code: string;
  redirectUri: string;
}

export interface ILoginOauthResponse extends IApiResponse {
  authToken: string;
}

export interface ITokenRenewRequest extends IGetRequest {}

export interface ITokenRenewResponse extends IGetResponse {
  authToken: string;
}

export interface ICorporateRegisterRequest extends IPostRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface ICorporateRegisterResponse extends IPostResponse {}
