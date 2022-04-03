import ApiClient from "@api/ApiClient";
import {
  ICorporateSearchRequest,
  ICorporateSearchResponse,
} from "@api/CorporateApi/type";

class CorporateApi {
  static async search(
    data: ICorporateSearchRequest
  ): Promise<ICorporateSearchResponse> {
    return (await ApiClient.post({
      url: "/corporate/search",
      data,
    })) as ICorporateSearchResponse;
  }
}

export default CorporateApi;
