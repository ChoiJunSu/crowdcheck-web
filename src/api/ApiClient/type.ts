import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export interface IGetRequest extends IApiRequest {
  url: string;
  params?: any;
  headers?: any;
}

export interface IGetResponse extends IApiResponse {}

export interface IPostRequest extends IApiRequest {
  url: string;
  data?: any;
  headers?: any;
}

export interface IPostResponse extends IApiResponse {}
