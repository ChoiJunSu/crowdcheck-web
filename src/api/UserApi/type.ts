import { IApiRequest, IApiResponse } from "@api/BaseApi/type";
import { ICareer } from "@api/AuthApi/type";

export type TUserType = "personal" | "corporate" | "candidate" | "expert";

export interface IUser {
  email: string;
  name: string;
  phone: string;
}

export interface IUserGetPersonalRequest extends IApiRequest {}

export interface IUserGetPersonalResponse extends IApiResponse {
  user: IUser;
  careers: Array<ICareer>;
}

export interface IUserGetCorporateRequest extends IApiRequest {}

export interface IUserGetCorporateResponse extends IApiResponse {
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
