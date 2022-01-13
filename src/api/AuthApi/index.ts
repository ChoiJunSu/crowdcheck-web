import ApiClient from "@api/ApiClient";
import {
  IAuthRegisterCorporateRequest,
  IAuthRegisterCorporateResponse,
  IAuthLoginOauthRequest,
  IAuthLoginOauthResponse,
  IAuthLoginRequest,
  IAuthLoginResponse,
  IAuthTokenRenewResponse,
  IAuthRegisterPersonalRequest,
  IAuthRegisterPersonalResponse,
} from "@api/AuthApi/type";

class AuthApi {
  static login = async (
    data: IAuthLoginRequest
  ): Promise<IAuthLoginResponse> => {
    return (await ApiClient.post({
      url: "/auth/login",
      data,
    })) as IAuthLoginResponse;
  };

  static loginOauth = async (
    params: IAuthLoginOauthRequest
  ): Promise<IAuthLoginOauthResponse> => {
    return (await ApiClient.get({
      url: "/auth/login/oauth",
      params,
    })) as IAuthLoginOauthResponse;
  };

  static tokenRenew = async (): Promise<IAuthTokenRenewResponse> => {
    return (await ApiClient.get({
      url: "/auth/token/renew",
    })) as IAuthTokenRenewResponse;
  };

  static registerPersonal = async (
    data: IAuthRegisterPersonalRequest
  ): Promise<IAuthRegisterPersonalResponse> => {
    return (await ApiClient.post({
      url: "/auth/register/personal",
      data,
    })) as IAuthRegisterPersonalResponse;
  };

  static registerCorporate = async (
    data: IAuthRegisterCorporateRequest
  ): Promise<IAuthRegisterCorporateResponse> => {
    return (await ApiClient.post({
      url: "/auth/register/corporate",
      data,
    })) as IAuthRegisterCorporateResponse;
  };
}

export default AuthApi;
