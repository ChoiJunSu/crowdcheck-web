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
  static getPersonal = async (
    params: IUserGetPersonalRequest
  ): Promise<IUserGetPersonalResponse> => {
    return (await ApiClient.get({
      url: "/user/get/personal",
      params,
    })) as IUserGetPersonalResponse;
  };

  static getCorporate = async (
    params: IUserGetCorporateRequest
  ): Promise<IUserGetCorporateResponse> => {
    return (await ApiClient.get({
      url: "/user/get/corporate",
      params,
    })) as IUserGetCorporateResponse;
  };

  static editPersonal = async (
    data: IUserEditPersonalRequest
  ): Promise<IUserEditPersonalResponse> => {
    return (await ApiClient.post({
      url: "/user/edit/personal",
      data,
    })) as IUserEditPersonalResponse;
  };

  static editCorporate = async (
    data: IUserEditCorporateRequest
  ): Promise<IUserEditCorporateResponse> => {
    return (await ApiClient.post({
      url: "/user/edit/corporate",
      data,
    })) as IUserEditCorporateResponse;
  };
}

export default UserApi;
