import ApiClient from "@api/ApiClient";
import useLogin from "@hooks/useLogin";
import {
  IOauthLoginRequest,
  IOauthLoginResponse,
  IRenewAuthTokenResponse,
} from "@api/AuthApi/type";

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
    const { authToken } = useLogin();
    console.log("renew", authToken);
    return await ApiClient.get({
      url: "/auth/renewAuthToken",
      headers: { Authorization: `Bearer ${authToken}` },
    });
  };
}

export default AuthApi;
