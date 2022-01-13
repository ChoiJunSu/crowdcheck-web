import { IPostRequest, IPostResponse } from "@api/ApiClient/type";
import { ICareer } from "@api/AuthApi/type";

export interface IRequestRegisterRequest extends IPostRequest {
  name: string;
  phone: string;
  career: Array<ICareer>;
  question: string;
  deadline?: Date | null;
}

export interface IRequestRegisterResponse extends IPostResponse {}
