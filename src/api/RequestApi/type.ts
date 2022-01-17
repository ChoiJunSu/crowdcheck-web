import { ICareer } from "@api/AuthApi/type";
import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export type TRequestStatus = "registered" | "agreed" | "closed";

export type TReceiverStatus =
  | "arrived"
  | "verified"
  | "rejected"
  | "answered"
  | "paid"
  | "closed";

export interface IAgree {
  corporateId: number;
  agreed: boolean;
}

export interface IRequestRegisterRequest extends IApiRequest {
  name: string;
  phone: string;
  career: Array<ICareer>;
  question: string;
  deadline?: Date | null;
}

export interface IRequestRegisterResponse extends IApiResponse {
  code: string;
}

export interface ICandidateRequest {
  id: number;
  corporateName: string;
  status: TRequestStatus;
}

export interface IReceiverRequest {
  id: number;
  corporateName: string;
  candidateName: string;
  status: TReceiverStatus;
}

export interface IRequestGetReceiverRequest extends IApiRequest {
  requestId: string;
}

export interface IRequestGetReceiverResponse extends IApiResponse {
  corporateName: string;
  candidateName: string;
  question: string;
}

export interface IRequestGetCandidateRequest extends IApiRequest {
  requestId: string;
}

export interface IRequestGetCandidateResponse extends IApiResponse {
  corporateName: string;
  career: Array<ICareer>;
}

export interface IRequestListReceiverRequest extends IApiRequest {}

export interface IRequestListReceiverResponse extends IApiResponse {
  request: Array<IReceiverRequest>;
}

export interface IRequestListCandidateRequest extends IApiRequest {}

export interface IRequestListCandidateResponse extends IApiResponse {
  request: Array<ICandidateRequest>;
}

export interface IRequestAgreeRequest extends IApiRequest {
  requestId: number;
  agree: Array<IAgree>;
  agreeDescription?: string;
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
