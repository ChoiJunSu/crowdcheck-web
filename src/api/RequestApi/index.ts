import ApiClient from "@api/ApiClient";
import {
  IRequestListCandidateResponse,
  IRequestAgreeRequest,
  IRequestAgreeResponse,
  IRequestListReceiverResponse,
  IRequestListCorporateResponse,
  IRequestDetailCorporateRequest,
  IRequestDetailCorporateResponse,
  IRequestGetAgreeCorporateRequest,
  IRequestGetAgreeCorporateResponse,
  IRequestRegisterRequest,
  IRequestRegisterResponse,
  IRequestCloseRequest,
  IRequestCloseResponse,
  IRequestGetAgreeCandidateRequest,
  IRequestGetAgreeCandidateResponse,
  IRequestPayRequest,
  IRequestPayResponse,
} from "@api/RequestApi/type";

class RequestApi {
  static async register(
    data: IRequestRegisterRequest
  ): Promise<IRequestRegisterResponse> {
    return (await ApiClient.post({
      url: "/request/register",
      data,
    })) as IRequestRegisterResponse;
  }

  static async listCorporate(): Promise<IRequestListCorporateResponse> {
    return (await ApiClient.get({
      url: "/request/list/corporate",
    })) as IRequestListCorporateResponse;
  }

  static async listReceiver(): Promise<IRequestListReceiverResponse> {
    return (await ApiClient.get({
      url: "/request/list/receiver",
    })) as IRequestListReceiverResponse;
  }

  static async listCandidate(): Promise<IRequestListCandidateResponse> {
    return (await ApiClient.get({
      url: "/request/list/candidate",
    })) as IRequestListCandidateResponse;
  }

  static async detailCorporate(
    params: IRequestDetailCorporateRequest
  ): Promise<IRequestDetailCorporateResponse> {
    return (await ApiClient.get({
      url: "/request/detail/corporate",
      params,
    })) as IRequestDetailCorporateResponse;
  }

  static async getAgreeCorporate(
    params: IRequestGetAgreeCorporateRequest
  ): Promise<IRequestGetAgreeCorporateResponse> {
    return (await ApiClient.get({
      url: "/request/agree/corporate",
      params,
    })) as IRequestGetAgreeCorporateResponse;
  }

  static async getAgreeCandidate(
    params: IRequestGetAgreeCandidateRequest
  ): Promise<IRequestGetAgreeCandidateResponse> {
    return (await ApiClient.get({
      url: "/request/agree/candidate",
      params,
    })) as IRequestGetAgreeCandidateResponse;
  }

  static async agree(
    data: IRequestAgreeRequest
  ): Promise<IRequestAgreeResponse> {
    return (await ApiClient.post({
      url: "/request/agree",
      data,
    })) as IRequestAgreeResponse;
  }

  static async pay(params: IRequestPayRequest): Promise<IRequestPayResponse> {
    return (await ApiClient.get({
      url: "/request/pay",
      params,
    })) as IRequestPayResponse;
  }

  static async close(
    params: IRequestCloseRequest
  ): Promise<IRequestCloseResponse> {
    return (await ApiClient.get({
      url: "/request/close",
      params,
    })) as IRequestCloseResponse;
  }
}

export default RequestApi;
