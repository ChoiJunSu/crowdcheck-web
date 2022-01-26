import ApiClient from "@api/ApiClient";
import {
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

  static async getCorporate(
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
}

export default UserApi;
