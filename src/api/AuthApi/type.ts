import { TUserType } from "@api/UserApi/type";
import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export type TOauthProvider = "google" | "kakao";

export interface IAuthLoginRequest extends IApiRequest {
  email: string;
  password: string;
  type: TUserType;
}

export interface IAuthLoginResponse extends IApiResponse {
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

export interface IAuthLoginCandidateRequest extends IApiRequest {
  name: string;
  phone: string;
  code: string;
}

export interface IAuthLoginCandidateResponse extends IApiResponse {
  authToken: string;
}

export interface IAuthTokenRenewRequest extends IApiRequest {}

export interface IAuthTokenRenewResponse extends IApiResponse {
  authToken: string;
}

export interface ICareer {
  corporateId: number;
  corporateName: string;
  department?: string;
  startAt: Date;
  endAt?: Date | null;
}

export interface IAuthRegisterPersonalRequest extends IApiRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
  careers: Array<ICareer>;
}

export interface IAuthRegisterPersonalResponse extends IApiResponse {}

export interface IAuthRegisterCorporateRequest extends IApiRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface IAuthRegisterCorporateResponse extends IApiResponse {}
