import ApiClient from "@api/ApiClient";
import {
  IAddRequest,
  IAddResponse,
  ISearchRequest,
  ISearchResponse,
} from "@api/CorporateApi/type";

class CorporateApi {
  static search = async (data: ISearchRequest): Promise<ISearchResponse> => {
    return (await ApiClient.post({
      url: "/corporate/search",
      data,
    })) as ISearchResponse;
  };

  static add = async (data: IAddRequest): Promise<IAddResponse> => {
    return (await ApiClient.post({
      url: "/corporate/add",
      data,
    })) as IAddResponse;
  };
}

export default CorporateApi;
