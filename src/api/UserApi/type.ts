import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export type TUserType = "personal" | "corporate";

export interface IUser {
  email: string;
  name: string;
  phone: string;
}

export interface ICareer {
  id: number;
  corporateId: number;
  corporateName: string;
  department: string | null;
  startAt: string;
  endAt: string | null;
  verifiedAt: string | null;
}

export interface IUserGetEditPersonalRequest extends IApiRequest {}

export interface IUserGetEditPersonalResponse extends IApiResponse {
  user: IUser;
  careers: Array<ICareer>;
}

export interface IUserGetEditCorporateRequest extends IApiRequest {}

export interface IUserGetEditCorporateResponse extends IApiResponse {
  user: IUser;
}

export interface IUserEditPersonalRequest extends IApiRequest {
  password: string | null;
  careers: Array<ICareer>;
}

export interface IUserEditPersonalResponse extends IApiResponse {}

export interface IUserEditCorporateRequest extends IApiRequest {
  password: string | null;
}

export interface IUserEditCorporateResponse extends IApiResponse {}

export interface IUserCareerVerifyRequest extends IApiRequest {
  formData: FormData;
}

export interface IUserCareerVerifyResponse extends IApiResponse {}

export interface IUserWithdrawRequest extends IApiRequest {}

export interface IUserWithdrawResponse extends IApiResponse {}
