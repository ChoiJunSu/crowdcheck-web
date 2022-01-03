import { IGetRequest, IGetResponse } from "@api/ApiClient/type";
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
