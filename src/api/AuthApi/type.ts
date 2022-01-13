import {
  IGetRequest,
  IGetResponse,
  IPostRequest,
  IPostResponse,
} from "@api/ApiClient/type";
import { IApiRequest, IApiResponse } from "@api/BaseApi/type";
import { TUserType } from "@api/UserApi/type";

export type TOauthProvider = "google" | "kakao";

export interface IAuthLoginRequest extends IPostRequest {
  email: string;
  password: string;
  type: TUserType;
}

export interface IAuthLoginResponse extends IPostResponse {
  authToken: string;
}

export interface IAuthLoginOauthRequest extends IApiRequest {
  provider: TOauthProvider;
  code: string;
  redirectUri: string;
}

export interface IAuthLoginOauthResponse extends IApiResponse {
  authToken: string;
}

export interface IAuthTokenRenewRequest extends IGetRequest {}

export interface IAuthTokenRenewResponse extends IGetResponse {
  authToken: string;
}

export interface ICareer {
  name: string;
  department?: string;
  startAt: Date;
  endAt?: Date | null;
}

export interface IAuthRegisterPersonalRequest extends IPostRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
  career: Array<ICareer>;
}

export interface IAuthRegisterPersonalResponse extends IPostResponse {}

export interface IAuthRegisterCorporateRequest extends IPostRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface IAuthRegisterCorporateResponse extends IPostResponse {}
