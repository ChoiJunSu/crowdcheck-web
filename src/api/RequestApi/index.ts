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

  static getCandidate = async (
    params: IRequestGetCandidateRequest
  ): Promise<IRequestGetCandidateResponse> => {
    return (await ApiClient.get({
      url: "/request/candidate",
      params,
    })) as IRequestGetCandidateResponse;
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
}

export default RequestApi;
