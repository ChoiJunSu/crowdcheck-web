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
  IAuthRegisterOauthPersonalRequest,
  IAuthRegisterOauthPersonalResponse,
  IAuthPhoneSendRequest,
  IAuthPhoneSendResponse,
  IAuthPhoneVerifyRequest,
  IAuthPhoneVerifyResponse,
  IAuthEmailSendRequest,
  IAuthEmailSendResponse,
  IAuthPasswordResetRequest,
  IAuthPasswordResetResponse,
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

  static async registerOauthPersonal(
    data: IAuthRegisterOauthPersonalRequest
  ): Promise<IAuthRegisterOauthPersonalResponse> {
    return (await ApiClient.post({
      url: "/auth/register/oauth/personal",
      data,
    })) as IAuthRegisterOauthPersonalResponse;
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

  static async emailSend(
    data: IAuthEmailSendRequest
  ): Promise<IAuthEmailSendResponse> {
    return (await ApiClient.post({
      url: "/auth/email/send",
      data,
    })) as IAuthEmailSendResponse;
  }

  static async passwordReset(
    data: IAuthPasswordResetRequest
  ): Promise<IAuthPasswordResetResponse> {
    return (await ApiClient.post({
      url: "/auth/password/reset",
      data,
    })) as IAuthPasswordResetResponse;
  }
}

export default AuthApi;
