import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export interface IOauthLoginRequest extends IApiRequest {
  provider: string;
  code: string;
  redirectUri: string;
}

export interface IOauthLoginResponse extends IApiResponse {
  token: string;
  email: string;
}
