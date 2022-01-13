import ApiClient from "@api/ApiClient";
import {
  ICorporateAddRequest,
  ICorporateAddResponse,
  ICorporateSearchRequest,
  ICorporateSearchResponse,
} from "@api/CorporateApi/type";

class CorporateApi {
  static search = async (
    data: ICorporateSearchRequest
  ): Promise<ICorporateSearchResponse> => {
    return (await ApiClient.post({
      url: "/corporate/search",
      data,
    })) as ICorporateSearchResponse;
  };

  static add = async (
    data: ICorporateAddRequest
  ): Promise<ICorporateAddResponse> => {
    return (await ApiClient.post({
      url: "/corporate/add",
      data,
    })) as ICorporateAddResponse;
  };
}

export default CorporateApi;
