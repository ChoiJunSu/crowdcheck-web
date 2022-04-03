import ApiClient from "@api/ApiClient";
import {
  IReferenceListCandidateRequest,
  IReferenceListCandidateResponse,
} from "@api/ReferenceApi/type";

class ReferenceApi {
  static async listCandidate(
    params: IReferenceListCandidateRequest
  ): Promise<IReferenceListCandidateResponse> {
    return (await ApiClient.get({
      url: "/reference/list/candidate",
      params,
    })) as IReferenceListCandidateResponse;
  }
}

export default ReferenceApi;
