import ApiClient from "@api/ApiClient";
import {
  IReferenceListCandidateResponse,
  IReferenceRemoveRequest,
  IReferenceRemoveResponse,
} from "@api/ReferenceApi/type";

class ReferenceApi {
  static async listCandidate(): Promise<IReferenceListCandidateResponse> {
    return (await ApiClient.get({
      url: "/reference/list/candidate",
    })) as IReferenceListCandidateResponse;
  }

  static async remove(
    params: IReferenceRemoveRequest
  ): Promise<IReferenceRemoveResponse> {
    return (await ApiClient.get({
      url: "/reference/remove",
      params,
    })) as IReferenceRemoveResponse;
  }
}

export default ReferenceApi;
