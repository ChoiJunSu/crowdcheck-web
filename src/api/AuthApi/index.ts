import ApiClient from "@api/ApiClient";
import {
  IRegisterCorporateRequest,
  IRegisterCorporateResponse,
  ILoginOauthRequest,
  ILoginOauthResponse,
  ILoginRequest,
  ILoginResponse,
  ITokenRenewResponse,
  IRegisterPersonalRequest,
  IRegisterPersonalResponse,
} from "@api/AuthApi/type";

class AuthApi {
  static login = async (data: ILoginRequest): Promise<ILoginResponse> => {
    return (await ApiClient.post({
      url: "/auth/login",
      data,
    })) as ILoginResponse;
  };

  static loginOauth = async (
    params: ILoginOauthRequest
  ): Promise<ILoginOauthResponse> => {
    return (await ApiClient.get({
      url: "/auth/login/oauth",
      params,
    })) as ILoginOauthResponse;
  };

  static tokenRenew = async (): Promise<ITokenRenewResponse> => {
    return (await ApiClient.get({
      url: "/auth/token/renew",
    })) as ITokenRenewResponse;
  };

  static registerPersonal = async (
    data: IRegisterPersonalRequest
  ): Promise<IRegisterPersonalResponse> => {
    return (await ApiClient.post({
      url: "/auth/register/personal",
      data,
    })) as IRegisterPersonalResponse;
  };

  static registerCorporate = async (
    data: IRegisterCorporateRequest
  ): Promise<IRegisterCorporateResponse> => {
    return (await ApiClient.post({
      url: "/auth/register/corporate",
      data,
    })) as IRegisterCorporateResponse;
  };
}

export default AuthApi;
