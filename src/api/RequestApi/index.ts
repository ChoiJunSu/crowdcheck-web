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

  static getReceiver = async (
    params: IRequestGetReceiverRequest
  ): Promise<IRequestGetReceiverResponse> => {
    return (await ApiClient.get({
      url: "/request/get/receiver",
      params,
    })) as IRequestGetReceiverResponse;
  };

  static getCorporate = async (
    params: IRequestGetCorporateRequest
  ): Promise<IRequestGetCorporateResponse> => {
    return (await ApiClient.get({
      url: "/request/get/corporate",
      params,
    })) as IRequestGetCorporateResponse;
  };

  static getCandidate = async (
    params: IRequestGetCandidateRequest
  ): Promise<IRequestGetCandidateResponse> => {
    return (await ApiClient.get({
      url: "/request/get/candidate",
      params,
    })) as IRequestGetCandidateResponse;
  };

  static listReceiver =
    async ({}: IRequestListReceiverRequest): Promise<IRequestListReceiverResponse> => {
      return (await ApiClient.get({
        url: "/request/list/receiver",
      })) as IRequestListReceiverResponse;
    };

  static listCorporate =
    async ({}: IRequestListCorporateRequest): Promise<IRequestListCorporateResponse> => {
      return (await ApiClient.get({
        url: "/request/list/corporate",
      })) as IRequestListCorporateResponse;
    };

  static listCandidate =
    async ({}: IRequestListCandidateRequest): Promise<IRequestListCandidateResponse> => {
      return (await ApiClient.get({
        url: "/request/list/candidate",
      })) as IRequestListCandidateResponse;
    };

  static agree = async (
    data: IRequestAgreeRequest
  ): Promise<IRequestAgreeResponse> => {
    return (await ApiClient.post({
      url: "/request/agree",
      data,
    })) as IRequestAgreeResponse;
  };

  static verify = async (
    data: IRequestVerifyRequest
  ): Promise<IRequestVerifyResponse> => {
    return (await ApiClient.post({
      url: "/request/verify",
      data,
    })) as IRequestVerifyResponse;
  };

  static answer = async (
    data: IRequestAnswerRequest
  ): Promise<IRequestAnswerResponse> => {
    return (await ApiClient.post({
      url: "/request/answer",
      data,
    })) as IRequestAnswerResponse;
  };

  static reject = async (
    params: IRequestRejectRequest
  ): Promise<IRequestRejectResponse> => {
    return (await ApiClient.get({
      url: "/request/reject",
      params,
    })) as IRequestRejectResponse;
  };
}

export default RequestApi;
