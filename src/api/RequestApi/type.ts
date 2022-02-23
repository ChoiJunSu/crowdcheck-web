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

export interface IRequestRegisterReferenceRequest extends IApiRequest {
  name: string;
  phone: string;
  careers: Array<ICareer>;
  question: string;
  deadline: string | null;
}

export interface IRequestRegisterReferenceResponse extends IApiResponse {
  code: string;
}

export interface ICandidateRequest {
  id: number;
  corporateName: string;
  status: TRequestStatus;
}

export interface ICorporateRequest {
  id: number;
  candidateName: string;
  status: TRequestStatus;
  receivers: Array<IReceiver>;
}

export interface IReceiverRequest {
  id: number;
  corporateName: string;
  candidateName: string;
  status: TReceiverStatus;
}

export interface IRequestGetReceiverRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestGetReceiverResponse extends IApiResponse {
  corporateName: string;
  candidateName: string;
  question: string;
}

export interface IRequestGetCorporateRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestGetCorporateResponse extends IApiResponse {
  candidateName: string;
  question: string;
  answers: Array<IAnswer>;
}

export interface IRequestGetCorporateAgreeRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestGetCorporateAgreeResponse extends IApiResponse {
  candidateName: string;
  agrees: Array<IAgree>;
  agreeDescription: string | null;
}

export interface IRequestGetCandidateRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestGetCandidateResponse extends IApiResponse {
  corporateName: string;
  careers: Array<ICareer>;
}

export interface IRequestListReceiverRequest extends IApiRequest {}

export interface IRequestListReceiverResponse extends IApiResponse {
  requests: Array<IReceiverRequest>;
}

export interface IRequestListCorporateRequest extends IApiRequest {}

export interface IRequestListCorporateResponse extends IApiResponse {
  requests: Array<ICorporateRequest>;
}

export interface IRequestListCandidateRequest extends IApiRequest {}

export interface IRequestListCandidateResponse extends IApiResponse {
  requests: Array<ICandidateRequest>;
}

export interface IRequestAgreeRequest extends IApiRequest {
  requestId: number;
  agrees: Array<IAgree>;
  agreeDescription: string | null;
}

export interface IRequestAgreeResponse extends IApiResponse {}

export interface IRequestVerifyRequest extends IApiRequest {
  requestId: number;
  candidatePhone: string;
}

export interface IRequestVerifyResponse extends IApiResponse {}

export interface IRequestAnswerRequest extends IApiRequest {
  requestId: number;
  answer: string;
}

export interface IRequestAnswerResponse extends IApiResponse {}

export interface IRequestRejectRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestRejectResponse extends IApiResponse {}
