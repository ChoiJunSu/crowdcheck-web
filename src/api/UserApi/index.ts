import ApiClient from "@api/ApiClient";
import {
  IUserEditPersonalRequest,
  IUserEditPersonalResponse,
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

  static editPersonal = async (
    data: IUserEditPersonalRequest
  ): Promise<IUserEditPersonalResponse> => {
    return (await ApiClient.post({
      url: "/user/edit/personal",
      data,
    })) as IUserEditPersonalResponse;
  };
}

export default UserApi;
