import ApiClient from "@api/ApiClient";
import {
  IRequestReferenceGetCandidateRequest,
  IRequestReferenceGetCandidateResponse,
  IRequestReferenceListCandidateRequest,
  IRequestReferenceListCandidateResponse,
  IRequestReferenceAgreeRequest,
  IRequestReferenceAgreeResponse,
  IRequestReferenceListReceiverRequest,
  IRequestReferenceListReceiverResponse,
  IRequestReferenceVerifyRequest,
  IRequestReferenceVerifyResponse,
  IRequestReferenceGetReceiverRequest,
  IRequestReferenceGetReceiverResponse,
  IRequestReferenceAnswerRequest,
  IRequestReferenceAnswerResponse,
  IRequestReferenceListCorporateRequest,
  IRequestReferenceListCorporateResponse,
  IRequestReferenceGetCorporateRequest,
  IRequestReferenceGetCorporateResponse,
  IRequestReferenceRejectRequest,
  IRequestReferenceRejectResponse,
  IRequestReferenceGetCorporateAgreeRequest,
  IRequestReferenceGetCorporateAgreeResponse,
  IRequestReferenceRegisterRequest,
  IRequestReferenceRegisterResponse,
  IRequestResumeRegisterRequest,
  IRequestResumeRegisterResponse,
  IRequestResumeListCorporateRequest,
  IRequestResumeListCorporateResponse,
  IRequestResumeListExpertRequest,
  IRequestResumeListExpertResponse,
  IRequestResumeExploreRequest,
  IRequestResumeExploreResponse,
  IRequestResumeDetailExpertRequest,
  IRequestResumeDetailExpertResponse,
  IRequestResumeGetAnswerExpertRequest,
  IRequestResumeGetAnswerExpertResponse,
  IRequestResumeAnswerRequest,
  IRequestResumeAnswerResponse,
} from "@api/RequestApi/type";

class RequestApi {
  static async referenceRegister(
    data: IRequestReferenceRegisterRequest
  ): Promise<IRequestReferenceRegisterResponse> {
    return (await ApiClient.post({
      url: "/request/reference/register",
      data,
    })) as IRequestReferenceRegisterResponse;
  }

  static async referenceGetReceiver(
    params: IRequestReferenceGetReceiverRequest
  ): Promise<IRequestReferenceGetReceiverResponse> {
    return (await ApiClient.get({
      url: "/request/reference/get/receiver",
      params,
    })) as IRequestReferenceGetReceiverResponse;
  }

  static async referenceGetCorporate(
    params: IRequestReferenceGetCorporateRequest
  ): Promise<IRequestReferenceGetCorporateResponse> {
    return (await ApiClient.get({
      url: "/request/reference/get/corporate",
      params,
    })) as IRequestReferenceGetCorporateResponse;
  }

  static async referenceGetCorporateAgree(
    params: IRequestReferenceGetCorporateAgreeRequest
  ): Promise<IRequestReferenceGetCorporateAgreeResponse> {
    return (await ApiClient.get({
      url: "/request/reference/get/corporate/agree",
      params,
    })) as IRequestReferenceGetCorporateAgreeResponse;
  }

  static async referenceGetCandidate(
    params: IRequestReferenceGetCandidateRequest
  ): Promise<IRequestReferenceGetCandidateResponse> {
    return (await ApiClient.get({
      url: "/request/reference/get/candidate",
      params,
    })) as IRequestReferenceGetCandidateResponse;
  }

  static async referenceListReceiver({}: IRequestReferenceListReceiverRequest): Promise<IRequestReferenceListReceiverResponse> {
    return (await ApiClient.get({
      url: "/request/reference/list/receiver",
    })) as IRequestReferenceListReceiverResponse;
  }

  static async referenceListCorporate({}: IRequestReferenceListCorporateRequest): Promise<IRequestReferenceListCorporateResponse> {
    return (await ApiClient.get({
      url: "/request/reference/list/corporate",
    })) as IRequestReferenceListCorporateResponse;
  }

  static async referenceListCandidate({}: IRequestReferenceListCandidateRequest): Promise<IRequestReferenceListCandidateResponse> {
    return (await ApiClient.get({
      url: "/request/reference/list/candidate",
    })) as IRequestReferenceListCandidateResponse;
  }

  static async referenceAgree(
    data: IRequestReferenceAgreeRequest
  ): Promise<IRequestReferenceAgreeResponse> {
    return (await ApiClient.post({
      url: "/request/reference/agree",
      data,
    })) as IRequestReferenceAgreeResponse;
  }

  static async referenceVerify(
    data: IRequestReferenceVerifyRequest
  ): Promise<IRequestReferenceVerifyResponse> {
    return (await ApiClient.post({
      url: "/request/reference/verify",
      data,
    })) as IRequestReferenceVerifyResponse;
  }

  static async referenceAnswer(
    data: IRequestReferenceAnswerRequest
  ): Promise<IRequestReferenceAnswerResponse> {
    return (await ApiClient.post({
      url: "/request/reference/answer",
      data,
    })) as IRequestReferenceAnswerResponse;
  }

  static async referenceReject(
    params: IRequestReferenceRejectRequest
  ): Promise<IRequestReferenceRejectResponse> {
    return (await ApiClient.get({
      url: "/request/reference/reject",
      params,
    })) as IRequestReferenceRejectResponse;
  }

  /*
    resume
   */

  static async resumeRegister(
    data: IRequestResumeRegisterRequest
  ): Promise<IRequestResumeRegisterResponse> {
    return (await ApiClient.post({
      url: "/request/resume/register",
      data: data.formData,
    })) as IRequestResumeRegisterResponse;
  }

  static async resumeListCorporate({}: IRequestResumeListCorporateRequest): Promise<IRequestResumeListCorporateResponse> {
    return (await ApiClient.get({
      url: "/request/resume/list/corporate",
    })) as IRequestResumeListCorporateResponse;
  }

  static async resumeListExpert({}: IRequestResumeListExpertRequest): Promise<IRequestResumeListExpertResponse> {
    return (await ApiClient.get({
      url: "/request/resume/list/expert",
    })) as IRequestResumeListExpertResponse;
  }

  static async resumeExplore(
    params: IRequestResumeExploreRequest
  ): Promise<IRequestResumeExploreResponse> {
    return (await ApiClient.get({
      url: "/request/resume/explore",
      params,
    })) as IRequestResumeExploreResponse;
  }

  static async resumeDetailExpert(
    params: IRequestResumeDetailExpertRequest
  ): Promise<IRequestResumeDetailExpertResponse> {
    return (await ApiClient.get({
      url: "/request/resume/detail/expert",
      params,
    })) as IRequestResumeDetailExpertResponse;
  }

  static async resumeGetAnswerExpert(
    params: IRequestResumeGetAnswerExpertRequest
  ): Promise<IRequestResumeGetAnswerExpertResponse> {
    return (await ApiClient.get({
      url: "/request/resume/get/answer/expert",
      params,
    })) as IRequestResumeGetAnswerExpertResponse;
  }

  static async resumeAnswer(
    data: IRequestResumeAnswerRequest
  ): Promise<IRequestResumeAnswerResponse> {
    return (await ApiClient.post({
      url: "/request/resume/answer",
      data,
    })) as IRequestResumeAnswerResponse;
  }
}

export default RequestApi;
