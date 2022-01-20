import { IApiRequest, IApiResponse } from "@api/BaseApi/type";
import { ICareer } from "@api/AuthApi/type";

export type TUserType = "personal" | "corporate" | "candidate";

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

export interface IUserEditPersonalRequest extends IApiRequest {
  name: string;
  password: string | null;
  careers: Array<ICareer>;
}

export interface IUserEditPersonalResponse extends IApiResponse {}
