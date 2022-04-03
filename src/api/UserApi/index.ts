import ApiClient from "@api/ApiClient";
import {
  IUserCareerVerifyRequest,
  IUserCareerVerifyResponse,
  IUserEditCorporateRequest,
  IUserEditCorporateResponse,
  IUserEditPersonalRequest,
  IUserEditPersonalResponse,
  IUserGetEditCorporateResponse,
  IUserGetEditPersonalResponse,
  IUserWithdrawResponse,
} from "@api/UserApi/type";

class UserApi {
  static async getEditPersonal(): Promise<IUserGetEditPersonalResponse> {
    return (await ApiClient.get({
      url: "/user/edit/personal",
    })) as IUserGetEditPersonalResponse;
  }

  static async getEditCorporate(): Promise<IUserGetEditCorporateResponse> {
    return (await ApiClient.get({
      url: "/user/edit/corporate",
    })) as IUserGetEditCorporateResponse;
  }

  static async editPersonal(
    data: IUserEditPersonalRequest
  ): Promise<IUserEditPersonalResponse> {
    return (await ApiClient.post({
      url: "/user/edit/personal",
      data,
    })) as IUserEditPersonalResponse;
  }

  static async editCorporate(
    data: IUserEditCorporateRequest
  ): Promise<IUserEditCorporateResponse> {
    return (await ApiClient.post({
      url: "/user/edit/corporate",
      data,
    })) as IUserEditCorporateResponse;
  }

  static async careerVerify(
    data: IUserCareerVerifyRequest
  ): Promise<IUserCareerVerifyResponse> {
    return (await ApiClient.post({
      url: "/user/career/verify",
      data: data.formData,
    })) as IUserCareerVerifyResponse;
  }

  static async withdraw(): Promise<IUserWithdrawResponse> {
    return (await ApiClient.get({
      url: "/user/withdraw",
    })) as IUserWithdrawResponse;
  }
}

export default UserApi;
