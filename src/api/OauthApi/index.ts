import ApiClient from "@api/ApiClient";
import { IOauthLoginRequest, IOauthLoginResponse } from "@api/OauthApi/type";

class OauthApi {
  static oauthLogin = async ({
    provider,
    code,
    redirectUri,
  }: IOauthLoginRequest): Promise<IOauthLoginResponse> => {
    return (await ApiClient.get({
      url: "/oauth/login",
      params: {
        provider,
        code,
        redirectUri,
      },
    })) as IOauthLoginResponse;
  };
}

export default OauthApi;
