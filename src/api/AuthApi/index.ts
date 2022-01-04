import ApiClient from "@api/ApiClient";
import {
  ICorporateLoginRequest,
  ICorporateLoginResponse,
  ICorporateRegisterRequest,
  ICorporateRegisterResponse,
  IOauthLoginRequest,
  IOauthLoginResponse,
  IRenewAuthTokenResponse,
} from "@api/AuthApi/type";

class AuthApi {
  static oauthLogin = async (
    params: IOauthLoginRequest
  ): Promise<IOauthLoginResponse> => {
    return (await ApiClient.get({
      url: "/auth/oauthLogin",
      params,
    })) as IOauthLoginResponse;
  };

  static renewAuthToken = async (): Promise<IRenewAuthTokenResponse> => {
    return (await ApiClient.get({
      url: "/auth/renewAuthToken",
    })) as IRenewAuthTokenResponse;
  };

  static corporateLogin = async (
    data: ICorporateLoginRequest
  ): Promise<ICorporateLoginResponse> => {
    return (await ApiClient.post({
      url: "/auth/corporateLogin",
      data,
    })) as ICorporateLoginResponse;
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
