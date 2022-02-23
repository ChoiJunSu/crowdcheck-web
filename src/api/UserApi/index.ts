import ApiClient from "@api/ApiClient";
import {
  IUserCareerVerifyRequest,
  IUserCareerVerifyResponse,
  IUserEditCorporateRequest,
  IUserEditCorporateResponse,
  IUserEditPersonalRequest,
  IUserEditPersonalResponse,
  IUserGetCorporateRequest,
  IUserGetCorporateResponse,
  IUserGetPersonalRequest,
  IUserGetPersonalResponse,
} from "@api/UserApi/type";

class UserApi {
  static async getPersonal(
    params: IUserGetPersonalRequest
  ): Promise<IUserGetPersonalResponse> {
    return (await ApiClient.get({
      url: "/user/get/personal",
      params,
    })) as IUserGetPersonalResponse;
  }

  static async referenceGetCorporate(
    params: IUserGetCorporateRequest
  ): Promise<IUserGetCorporateResponse> {
    return (await ApiClient.get({
      url: "/user/get/corporate",
      params,
    })) as IUserGetCorporateResponse;
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
}

export default UserApi;
