import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export interface IOauthLoginRequest extends IApiRequest {
  provider: "google" | "kakao";
  code: string;
  redirectUri: string;
}

export interface IOauthLoginResponse extends IApiResponse {
  authToken: string;
  email: string;
}
