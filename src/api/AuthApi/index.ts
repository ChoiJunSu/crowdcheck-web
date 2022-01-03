import ApiClient from "@api/ApiClient";
import {
  IOauthLoginRequest,
  IOauthLoginResponse,
  IRenewAuthTokenResponse,
} from "@api/AuthApi/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";

class AuthApi {
  static oauthLogin = async ({
    provider,
    code,
    redirectUri,
  }: IOauthLoginRequest): Promise<IOauthLoginResponse> => {
    return (await ApiClient.get({
      url: "/auth/oauthLogin",
      params: {
        provider,
        code,
        redirectUri,
      },
    })) as IOauthLoginResponse;
  };

  static renewAuthToken = async (): Promise<IRenewAuthTokenResponse> => {
    const authToken = localStorage.getItem(LOCAL_AUTH_TOKEN);

    return (await ApiClient.get({
      url: "/auth/renewAuthToken",
      headers: { Authorization: `Bearer ${authToken}` },
    })) as IRenewAuthTokenResponse;
  };
}

export default AuthApi;
