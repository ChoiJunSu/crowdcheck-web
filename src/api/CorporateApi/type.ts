import { IPostRequest, IPostResponse } from "@api/ApiClient/type";

export interface ICorporate {
  id: number;
  name: string;
}

export interface ICorporateSearchRequest extends IPostRequest {
  word: string;
}

export interface ICorporateSearchResponse extends IPostResponse {
  corporates: Array<ICorporate>;
}

export interface ICorporateAddRequest extends IPostRequest {
  name: string;
}

export interface ICorporateAddResponse extends IPostResponse {}
