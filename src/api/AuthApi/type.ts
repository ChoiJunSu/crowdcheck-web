import { ICareer, TUserType } from "@api/UserApi/type";
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
  type: TUserType;
}

export interface IAuthLoginOauthResponse extends IApiResponse {
  authToken: string;
  registerToken: string;
}

export interface IAuthTokenRenewRequest extends IApiRequest {}

export interface IAuthTokenRenewResponse extends IApiResponse {
  authToken: string;
}

export interface IAuthRegisterPersonalRequest extends IApiRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
  careers: Array<ICareer>;
  recommenderCode?: string;
}

export interface IAuthRegisterPersonalResponse extends IApiResponse {}

export interface IAuthRegisterOauthPersonalRequest extends IApiRequest {
  name: string;
  phone: string;
  careers: Array<ICareer>;
  recommenderCode?: string;
  registerToken: string;
}

export interface IAuthRegisterOauthPersonalResponse extends IApiResponse {}

export interface IAuthRegisterCorporateRequest extends IApiRequest {
  formData: FormData;
}

export interface IAuthRegisterCorporateResponse extends IApiResponse {}

export interface IAuthPhoneSendRequest extends IApiRequest {
  phone: string;
}

export interface IAuthPhoneSendResponse extends IApiResponse {}

export interface IAuthPhoneVerifyRequest extends IApiRequest {
  phone: string;
  code: number;
}

export interface IAuthPhoneVerifyResponse extends IApiResponse {}

export interface IAuthEmailSendRequest extends IApiRequest {
  email: string;
}

export interface IAuthEmailSendResponse extends IApiResponse {}

export interface IAuthPasswordResetRequest extends IApiRequest {
  resetToken: string;
  password: string;
}

export interface IAuthPasswordResetResponse extends IApiResponse {}
