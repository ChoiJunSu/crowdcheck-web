import { IPostRequest, IPostResponse } from "@api/ApiClient/type";

export interface ICorporate {
  id: number;
  name: string;
}

export interface ISearchRequest extends IPostRequest {
  word: string;
}

export interface ISearchResponse extends IPostResponse {
  corporates: Array<ICorporate>;
}

export interface IAddRequest extends IPostRequest {
  name: string;
}

export interface IAddResponse extends IPostResponse {}
