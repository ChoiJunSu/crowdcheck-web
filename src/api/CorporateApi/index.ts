import ApiClient from "@api/ApiClient";
import {
  ICorporateAddRequest,
  ICorporateAddResponse,
  ICorporateSearchRequest,
  ICorporateSearchResponse,
  ICorporateVerifyRequest,
  ICorporateVerifyResponse,
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

  static async add(data: ICorporateAddRequest): Promise<ICorporateAddResponse> {
    return (await ApiClient.post({
      url: "/corporate/add",
      data,
    })) as ICorporateAddResponse;
  }

  static async verify(
    data: ICorporateVerifyRequest
  ): Promise<ICorporateVerifyResponse> {
    return await ApiClient.post({
      url: "/corporate/verify",
      data: data.formData,
    });
  }
}

export default CorporateApi;
