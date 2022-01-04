import {
  IGetRequest,
  IGetResponse,
  IPostRequest,
  IPostResponse,
} from "@api/ApiClient/type";
import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export interface IOauthLoginRequest extends IApiRequest {
  provider: "google" | "kakao";
  code: string;
  redirectUri: string;
}

export interface IOauthLoginResponse extends IApiResponse {
  authToken: string;
}

export interface IRenewAuthTokenRequest extends IGetRequest {}

export interface IRenewAuthTokenResponse extends IGetResponse {
  authToken: string;
}

export interface ICorporateLoginRequest extends IPostRequest {
  email: string;
  password: string;
}

export interface ICorporateLoginResponse extends IPostResponse {}

export interface ICorporateRegisterRequest extends IPostRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface ICorporateRegisterResponse extends IPostResponse {}
