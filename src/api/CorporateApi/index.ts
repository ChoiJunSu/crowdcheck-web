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

  static verify = async (
    data: ICorporateVerifyRequest
  ): Promise<ICorporateVerifyResponse> => {
    return await ApiClient.post({
      url: "/corporate/verify",
      data: data.formData,
    });
  };
}

export default CorporateApi;
