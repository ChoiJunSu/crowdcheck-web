import { IApiRequest, IApiResponse } from "@api/BaseApi/type";
import { IReferenceDetail, TReferenceType } from "@api/ReferenceApi/type";
import { IRequestReceiver } from "@api/RequestApi/type";
import { ICareer } from "@api/UserApi/type";

export interface IReceiverGetVerifyRequest extends IApiRequest {
  requestId: number;
}

export interface IReceiverGetVerifyResponse extends IApiResponse {
  candidateName: string;
  career: ICareer;
}

export interface IReceiverVerifyRequest extends IApiRequest {
  requestId: number;
  candidatePhone: string;
}

export interface IReceiverVerifyResponse extends IApiResponse {}

export interface IReceiverGetAnswerRequest extends IApiRequest {
  requestId: number;
}

export interface IReceiverGetAnswerResponse extends IApiResponse {
  request: IRequestReceiver;
}

export interface IReceiverAnswerRequest extends IApiRequest {
  requestId: number;
  type: TReferenceType;
  relationship: string;
  details: Array<IReferenceDetail>;
}

export interface IReceiverAnswerResponse extends IApiResponse {}

export interface IReceiverRejectRequest extends IApiRequest {
  requestId: number;
}

export interface IReceiverRejectResponse extends IApiResponse {}
