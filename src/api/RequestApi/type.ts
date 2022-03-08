import { ICareer } from "@api/AuthApi/type";
import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export type TRequestStatus = "registered" | "agreed" | "closed" | "rewarded";

export type TRequestType = "reference" | "resume";

export type TReceiverStatus = "received" | "verified" | "rejected" | "answered";

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
  deadline: Date | null;
  rewardNum: number;
  rewardAmount: number;
  receiverCount: number;
  status: TRequestStatus;
  createdAt: Date;
}

export interface IRequestReferenceDetailCorporate {
  id: number;
  candidateName: string;
  question: string;
  deadline: Date | null;
  rewardNum: number;
  rewardAmount: number;
  receiverCount: number;
  status: TRequestStatus;
  createdAt: Date;
}

export interface IRequestReferenceAnswerCorporate {
  receiverId: number;
  corporateName: string;
  status: TReceiverStatus;
  answer: string | null;
  answeredAt: Date | null;
}

export interface IRequestReferenceReceiver {
  id: number;
  corporateName: string;
  candidateName: string;
  deadline: Date | null;
  rewardNum: number;
  rewardAmount: number;
  receiverCount: number;
  status: TRequestStatus;
  createdAt: Date;
}

export interface IRequestReferenceDetailReceiver {
  id: number;
  corporateName: string;
  candidateName: string;
  question: string;
  deadline: Date | null;
  rewardNum: number;
  rewardAmount: number;
  receiverCount: number;
  status: TRequestStatus;
  createdAt: Date;
}

export interface IRequestReferenceDetailReceiverRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestReferenceDetailReceiverResponse extends IApiResponse {
  request: IRequestReferenceDetailReceiver;
  receiverStatus: TReceiverStatus;
}

export interface IRequestReferenceDetailCorporateRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestReferenceDetailCorporateResponse extends IApiResponse {
  request: IRequestReferenceDetailCorporate;
  answers: Array<IRequestReferenceAnswerCorporate>;
}

export interface IRequestReferenceGetAgreeCorporateRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestReferenceGetAgreeCorporateResponse
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

export interface IRequestReferenceCloseRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestReferenceCloseResponse extends IApiResponse {}

export interface IRequestReferenceRewardRequest extends IApiRequest {
  requestId: number;
  receivers: Array<{ id: number }>;
}

export interface IRequestReferenceRewardResponse extends IApiResponse {}

/*
  Resume
 */

export interface IRequestResumeCorporate {
  id: number;
  memo: string | null;
  deadline: Date | null;
  rewardNum: number;
  rewardAmount: number;
  receiverCount: number;
  status: TRequestStatus;
  createdAt: Date;
}

export interface IRequestResumeAnswerCorporate {
  receiverId: number;
  receiverName: string;
  answeredAt: Date | null;
  workExperience: number;
  workExperienceDescription: string;
  roleFit: number;
  roleFitDescription: string;
  collaborationAbility: number;
  collaborationAbilityDescription: string;
  hardWorking: number;
  hardWorkingDescription: string;
  recommendedSalary: string;
}

export interface IRequestResumeExpert {
  id: number;
  corporateName: string;
  deadline: Date | null;
  rewardNum: number;
  rewardAmount: number;
  receiverCount: number;
  status: TRequestStatus;
  createdAt: Date;
}

export interface IRequestResumeDetailCorporate {
  id: number;
  memo: string;
  question: string;
  deadline: Date | null;
  rewardNum: number;
  rewardAmount: number;
  receiverCount: number;
  status: TRequestStatus;
  createdAt: Date;
}

export interface IRequestResumeDetailExpert {
  id: number;
  corporateName: string;
  question: string;
  deadline: Date | null;
  rewardNum: number;
  rewardAmount: number;
  receiverCount: number;
  status: TRequestStatus;
  createdAt: Date;
}

export interface IRequestResumeGetAnswerExpert {
  id: number;
  corporateName: string;
  question: string;
  resumeUrl: string;
  portfolioUrl: string | null;
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

export interface IRequestResumeDetailCorporateRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestResumeDetailCorporateResponse extends IApiResponse {
  request: IRequestResumeDetailCorporate;
  answers: Array<IRequestResumeAnswerCorporate>;
}

export interface IRequestResumeDetailExpertRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestResumeDetailExpertResponse extends IApiResponse {
  request: IRequestResumeDetailExpert;
  answered: boolean;
}

export interface IRequestResumeGetAnswerExpertRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestResumeGetAnswerExpertResponse extends IApiResponse {
  request: IRequestResumeGetAnswerExpert;
}

export interface IRequestResumeAnswerRequest extends IApiRequest {
  requestId: number;
  workExperience: number;
  workExperienceDescription: string;
  roleFit: number;
  roleFitDescription: string;
  collaborationAbility: number;
  collaborationAbilityDescription: string;
  hardWorking: number;
  hardWorkingDescription: string;
  recommendedSalary: string;
}

export interface IRequestResumeAnswerResponse extends IApiResponse {}

export interface IRequestResumeCloseRequest extends IApiRequest {
  requestId: number;
}

export interface IRequestResumeCloseResponse extends IApiResponse {}

export interface IRequestResumeRewardRequest extends IApiRequest {
  requestId: number;
  receivers: Array<{ id: number }>;
}

export interface IRequestResumeRewardResponse extends IApiResponse {}
