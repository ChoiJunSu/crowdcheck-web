import ApiClient from "@api/ApiClient";
import {
  oauthLoginRequestDto,
  oauthLoginResponseDto,
} from "@api/OauthApi/type";

class OauthApi {
  static oauthLogin = async ({
    provider,
    code,
    redirectUri,
  }: oauthLoginRequestDto): Promise<oauthLoginResponseDto> => {
    return await ApiClient.get({
      url: "/oauth/login",
      params: {
        provider,
        code,
        redirectUri,
      },
    });
  };
}

export default OauthApi;
