import ApiClient from "@api/ApiClient";
import {
  IRequestRegisterRequest,
  IRequestRegisterResponse,
  IRequestGetCandidateRequest,
  IRequestGetCandidateResponse,
  IRequestListCandidateRequest,
  IRequestListCandidateResponse,
  IRequestAgreeRequest,
  IRequestAgreeResponse,
  IRequestListReceiverRequest,
  IRequestListReceiverResponse,
  IRequestVerifyRequest,
  IRequestVerifyResponse,
  IRequestGetReceiverRequest,
  IRequestGetReceiverResponse,
  IRequestAnswerRequest,
  IRequestAnswerResponse,
  IRequestListCorporateRequest,
  IRequestListCorporateResponse,
  IRequestGetCorporateRequest,
  IRequestGetCorporateResponse,
  IRequestRejectRequest,
  IRequestRejectResponse,
  IRequestGetCorporateAgreeRequest,
  IRequestGetCorporateAgreeResponse,
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

  static async getReceiver(
    params: IRequestGetReceiverRequest
  ): Promise<IRequestGetReceiverResponse> {
    return (await ApiClient.get({
      url: "/request/get/receiver",
      params,
    })) as IRequestGetReceiverResponse;
  }

  static async getCorporate(
    params: IRequestGetCorporateRequest
  ): Promise<IRequestGetCorporateResponse> {
    return (await ApiClient.get({
      url: "/request/get/corporate",
      params,
    })) as IRequestGetCorporateResponse;
  }

  static async getCorporateAgree(
    params: IRequestGetCorporateAgreeRequest
  ): Promise<IRequestGetCorporateAgreeResponse> {
    return (await ApiClient.get({
      url: "/request/get/corporate/agree",
      params,
    })) as IRequestGetCorporateAgreeResponse;
  }

  static async getCandidate(
    params: IRequestGetCandidateRequest
  ): Promise<IRequestGetCandidateResponse> {
    return (await ApiClient.get({
      url: "/request/get/candidate",
      params,
    })) as IRequestGetCandidateResponse;
  }

  static async listReceiver({}: IRequestListReceiverRequest): Promise<IRequestListReceiverResponse> {
    return (await ApiClient.get({
      url: "/request/list/receiver",
    })) as IRequestListReceiverResponse;
  }

  static async listCorporate({}: IRequestListCorporateRequest): Promise<IRequestListCorporateResponse> {
    return (await ApiClient.get({
      url: "/request/list/corporate",
    })) as IRequestListCorporateResponse;
  }

  static async listCandidate({}: IRequestListCandidateRequest): Promise<IRequestListCandidateResponse> {
    return (await ApiClient.get({
      url: "/request/list/candidate",
    })) as IRequestListCandidateResponse;
  }

  static async agree(
    data: IRequestAgreeRequest
  ): Promise<IRequestAgreeResponse> {
    return (await ApiClient.post({
      url: "/request/agree",
      data,
    })) as IRequestAgreeResponse;
  }

  static async verify(
    data: IRequestVerifyRequest
  ): Promise<IRequestVerifyResponse> {
    return (await ApiClient.post({
      url: "/request/verify",
      data,
    })) as IRequestVerifyResponse;
  }

  static async answer(
    data: IRequestAnswerRequest
  ): Promise<IRequestAnswerResponse> {
    return (await ApiClient.post({
      url: "/request/answer",
      data,
    })) as IRequestAnswerResponse;
  }

  static async reject(
    params: IRequestRejectRequest
  ): Promise<IRequestRejectResponse> {
    return (await ApiClient.get({
      url: "/request/reject",
      params,
    })) as IRequestRejectResponse;
  }
}

export default RequestApi;
