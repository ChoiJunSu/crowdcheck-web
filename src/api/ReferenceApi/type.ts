import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export type TReferenceType = "nomination" | "blind";

export interface IReferenceDetail {
  question: string;
  score: number | null;
  answer: string;
}

export interface IReferenceCorporate {
  corporateName: string;
  type: TReferenceType;
  relationship: string;
  createdAt: string;
  details: Array<IReferenceDetail>;
}

export interface IReferenceCandidate {
  writerName: string;
  corporateName: string;
  createdAt: string;
}

export interface IReferenceListCandidateRequest extends IApiRequest {}

export interface IReferenceListCandidateResponse extends IApiResponse {
  references: Array<IReferenceCandidate>;
}
