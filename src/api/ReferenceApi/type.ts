import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export type TReferenceType = "nomination" | "blind";

export interface IReferenceDetail {
  id: number;
  question: string;
  score: number | null;
  answer: string;
}

export interface IReferenceCorporate {
  id: number;
  corporateName: string;
  type: TReferenceType;
  relationship: string;
  createdAt: string;
  details: Array<IReferenceDetail>;
}

export interface IReferenceCandidate {
  id: number;
  writerName: string;
  corporateName: string;
  createdAt: string;
}

export interface IReferenceListCandidateRequest extends IApiRequest {}

export interface IReferenceListCandidateResponse extends IApiResponse {
  references: Array<IReferenceCandidate>;
}

export interface IReferenceRemoveRequest extends IApiRequest {
  referenceId: number;
}

export interface IReferenceRemoveResponse extends IApiResponse {}
