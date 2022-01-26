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
  IAuthLoginCandidateRequest,
  IAuthLoginCandidateResponse,
  IAuthRegisterOauthRequest,
  IAuthRegisterOauthResponse,
  IAuthPhoneSendRequest,
  IAuthPhoneSendResponse,
  IAuthPhoneVerifyRequest,
  IAuthPhoneVerifyResponse,
} from "@api/AuthApi/type";

class AuthApi {
  static async login(data: IAuthLoginRequest): Promise<IAuthLoginResponse> {
    return (await ApiClient.post({
      url: "/auth/login",
      data,
    })) as IAuthLoginResponse;
  }

  static async loginOauth(
    params: IAuthLoginOauthRequest
  ): Promise<IAuthLoginOauthResponse> {
    return (await ApiClient.get({
      url: "/auth/login/oauth",
      params,
    })) as IAuthLoginOauthResponse;
  }

  static async loginCandidate(
    data: IAuthLoginCandidateRequest
  ): Promise<IAuthLoginCandidateResponse> {
    return (await ApiClient.post({
      url: "/auth/login/candidate",
      data,
    })) as IAuthLoginCandidateResponse;
  }

  static async tokenRenew(): Promise<IAuthTokenRenewResponse> {
    return (await ApiClient.get({
      url: "/auth/token/renew",
    })) as IAuthTokenRenewResponse;
  }

  static async registerPersonal(
    data: IAuthRegisterPersonalRequest
  ): Promise<IAuthRegisterPersonalResponse> {
    return (await ApiClient.post({
      url: "/auth/register/personal",
      data,
    })) as IAuthRegisterPersonalResponse;
  }

  static async registerOauth(
    data: IAuthRegisterOauthRequest
  ): Promise<IAuthRegisterOauthResponse> {
    return (await ApiClient.post({
      url: "/auth/register/oauth",
      data,
    })) as IAuthRegisterOauthResponse;
  }

  static async registerCorporate(
    data: IAuthRegisterCorporateRequest
  ): Promise<IAuthRegisterCorporateResponse> {
    return (await ApiClient.post({
      url: "/auth/register/corporate",
      data: data.formData,
    })) as IAuthRegisterCorporateResponse;
  }

  static async phoneSend(
    data: IAuthPhoneSendRequest
  ): Promise<IAuthPhoneSendResponse> {
    return (await ApiClient.post({
      url: "/auth/phone/send",
      data,
    })) as IAuthPhoneSendResponse;
  }

  static async phoneVerify(
    data: IAuthPhoneVerifyRequest
  ): Promise<IAuthPhoneVerifyResponse> {
    return (await ApiClient.post({
      url: "/auth/phone/verify",
      data,
    })) as IAuthPhoneVerifyResponse;
  }
}

export default AuthApi;
