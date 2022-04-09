import { ICareer } from "@api/UserApi/type";
import { IApiRequest, IApiResponse } from "@api/BaseApi/type";
import { IReferenceCorporate } from "@api/ReferenceApi/type";

export type TRequestStatus = "registered" | "agreed" | "closed";

export type TReceiverStatus = "received" | "verified" | "rejected" | "answered";

export const requestStatusMapper = {
  registered: "동의 대기",
  agreed: "답변 중",
  closed: "종료됨",
};

export interface IRequestCorporate {
  id: number;
  candidateName: string;
  deadline: string;
  paidAt: Date | null;
  referenceCount: number;
  status: TRequestStatus;
  createdAt: string;
}

export interface IRequestReceiver {
  id: number;
  corporateName: string;
  candidateName: string;
  deadline: string;
  status: TRequestStatus;
  receiverStatus: TReceiverStatus;
  createdAt: string;
}

export interface IRequestCandidate {
  id: number;
  corporateName: string;
  deadline: string;
  status: TRequestStatus;
  createdAt: string;
}

export interface IRequestAgree {
  career: ICareer;
  agreed: boolean;
  disagreeReason: string | null;
}

export interface IRequestRegisterRequest extends IApiRequest {
  candidateName: string;
  candidatePhone: string;
}

export interface IRequestRegisterResponse extends IApiResponse {}

export interface IRequestListCorporateRequest extends IApiRequest {}

export interface IRequestListCorporateResponse extends IApiResponse {
  requests: Array<IRequestCorporate>;
}

export interface IRequestListReceiverRequest extends IApiRequest {}

export interface IRequestListReceiverResponse extends IApiResponse {
  requests: Array<IRequestReceiver>;
}
export interface IRequestListCandidateRequest extends IApiRequest {}

export interface IRequestListCandidateResponse extends IApiResponse {
  requests: Array<IRequestCandidate>;
}

export interface IRequestDetailCorporateRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestDetailCorporateResponse extends IApiResponse {
  request: IRequestCorporate;
  nominationReferences: Array<IReferenceCorporate>;
  blindReferences: Array<IReferenceCorporate>;
}

export interface IRequestGetAgreeCorporateRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestGetAgreeCorporateResponse extends IApiResponse {
  candidateName: string;
  agrees: Array<IRequestAgree>;
}

export interface IRequestGetAgreeCandidateRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestGetAgreeCandidateResponse extends IApiResponse {
  corporateName: string;
  careers: Array<ICareer>;
}

export interface IRequestAgreeRequest extends IApiRequest {
  requestId: number;
  agrees: Array<IRequestAgree>;
}

export interface IRequestAgreeResponse extends IApiResponse {}

export interface IRequestPayRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestPayResponse extends IApiResponse {}

export interface IRequestCloseRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestCloseResponse extends IApiResponse {}
