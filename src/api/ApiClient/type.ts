import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export interface getRequestDto extends IApiRequest {
  url: string;
  params: any;
}

export interface getResponseDto extends IApiResponse {}

export interface postRequestDto extends IApiRequest {
  url: string;
  data: any;
}

export interface postResponseDto extends IApiResponse {}
