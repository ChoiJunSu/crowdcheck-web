import { ICareer } from "@api/AuthApi/type";
import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export type TRequestStatus = "registered" | "agreed" | "closed";

export type TRequestType = "reference" | "resume";

export type TReceiverStatus =
  | "arrived"
  | "verified"
  | "rejected"
  | "answered"
  | "closed";

export interface IAgree {
  corporateId: number;
  corporateName: string;
  agreed: boolean;
}

export interface IReceiver {
  id: number;
  status: TReceiverStatus;
}

export interface IAnswer {
  id: number;
  corporateName: string;
  status: TReceiverStatus;
  answer: string | null;
}

export interface IRequestReferenceRegisterRequest extends IApiRequest {
  name: string;
  phone: string;
  careers: Array<ICareer>;
  question: string;
  deadline: string | null;
}

export interface IRequestReferenceRegisterResponse extends IApiResponse {}

export interface IRequestReferenceCandidate {
  id: number;
  corporateName: string;
  status: TRequestStatus;
}

export interface IRequestReferenceCorporate {
  id: number;
  candidateName: string;
  status: TRequestStatus;
  receivers: Array<IReceiver>;
}

export interface IRequestReferenceReceiver {
  id: number;
  corporateName: string;
  candidateName: string;
  status: TReceiverStatus;
}

export interface IRequestReferenceGetReceiverRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestReferenceGetReceiverResponse extends IApiResponse {
  corporateName: string;
  candidateName: string;
  question: string;
}

export interface IRequestReferenceGetCorporateRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestReferenceGetCorporateResponse extends IApiResponse {
  candidateName: string;
  question: string;
  answers: Array<IAnswer>;
}

export interface IRequestReferenceGetCorporateAgreeRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestReferenceGetCorporateAgreeResponse
  extends IApiResponse {
  candidateName: string;
  agrees: Array<IAgree>;
  agreeDescription: string | null;
}

export interface IRequestReferenceGetCandidateRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestReferenceGetCandidateResponse extends IApiResponse {
  corporateName: string;
  careers: Array<ICareer>;
}

export interface IRequestReferenceListReceiverRequest extends IApiRequest {}

export interface IRequestReferenceListReceiverResponse extends IApiResponse {
  requests: Array<IRequestReferenceReceiver>;
}

export interface IRequestReferenceListCorporateRequest extends IApiRequest {}

export interface IRequestReferenceListCorporateResponse extends IApiResponse {
  requests: Array<IRequestReferenceCorporate>;
}

export interface IRequestReferenceListCandidateRequest extends IApiRequest {}

export interface IRequestReferenceListCandidateResponse extends IApiResponse {
  requests: Array<IRequestReferenceCandidate>;
}

export interface IRequestReferenceAgreeRequest extends IApiRequest {
  requestId: number;
  agrees: Array<IAgree>;
  agreeDescription: string | null;
}

export interface IRequestReferenceAgreeResponse extends IApiResponse {}

export interface IRequestReferenceVerifyRequest extends IApiRequest {
  requestId: number;
  candidatePhone: string;
}

export interface IRequestReferenceVerifyResponse extends IApiResponse {}

export interface IRequestReferenceAnswerRequest extends IApiRequest {
  requestId: number;
  answer: string;
}

export interface IRequestReferenceAnswerResponse extends IApiResponse {}

export interface IRequestReferenceRejectRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestReferenceRejectResponse extends IApiResponse {}

/*
  Resume
 */

export interface IRequestResumeCorporate {
  id: number;
  memo: string | null;
  status: TRequestStatus;
  receivers: Array<IReceiver>;
}

export interface IRequestResumeExpert {
  id: number;
  corporateName: string;
  deadline: Date | null;
  rewardNum: number;
  rewardPrice: number;
  receiverCount: number;
}

export type TExpertSpecialty = "개발" | "디자인" | "기획" | "마케팅";

export interface IRequestResumeRegisterRequest extends IApiRequest {
  formData: FormData;
}

export interface IRequestResumeRegisterResponse extends IApiResponse {}

export interface IRequestResumeListCorporateRequest extends IApiRequest {}

export interface IRequestResumeListCorporateResponse extends IApiResponse {
  requests: Array<IRequestResumeCorporate>;
}

export interface IRequestResumeListExpertRequest extends IApiRequest {}

export interface IRequestResumeListExpertResponse extends IApiResponse {
  requests: Array<IRequestResumeExpert>;
}

export interface IRequestResumeExploreRequest extends IApiRequest {
  page: number;
}

export interface IRequestResumeExploreResponse extends IApiResponse {
  requests: Array<IRequestResumeExpert>;
}
