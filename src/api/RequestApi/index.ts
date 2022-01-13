import ApiClient from "@api/ApiClient";
import {
  IRequestRegisterRequest,
  IRequestRegisterResponse,
} from "@api/RequestApi/type";

class RequestApi {
  static register = async (
    data: IRequestRegisterRequest
  ): Promise<IRequestRegisterResponse> => {
    return (await ApiClient.post({
      url: "/request/register",
      data,
    })) as IRequestRegisterResponse;
  };
}

export default RequestApi;
