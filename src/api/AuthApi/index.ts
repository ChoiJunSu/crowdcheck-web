import ApiClient from "@api/ApiClient";
import {
  ICorporateRegisterRequest,
  ICorporateRegisterResponse,
  ILoginOauthRequest,
  ILoginOauthResponse,
  ILoginRequest,
  ILoginResponse,
  ITokenRenewResponse,
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

  static corporateRegister = async (
    data: ICorporateRegisterRequest
  ): Promise<ICorporateRegisterResponse> => {
    return (await ApiClient.post({
      url: "/auth/corporateRegister",
      data,
    })) as ICorporateRegisterResponse;
  };
}

export default AuthApi;
