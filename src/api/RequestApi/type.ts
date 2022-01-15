import { ICareer } from "@api/AuthApi/type";
import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export type TRequestStatus = "registered" | "arrived" | "closed";

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

export interface IRequestGetCandidateRequest extends IApiRequest {
  requestId: string;
}

export interface IRequestGetCandidateResponse extends IApiResponse {
  career: Array<ICareer>;
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
