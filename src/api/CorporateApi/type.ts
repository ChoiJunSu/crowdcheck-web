import { IApiRequest, IApiResponse } from "@api/BaseApi/type";

export interface ICorporate {
  id: number;
  name: string;
}

export interface ICorporateSearchRequest extends IApiRequest {
  word: string;
}

export interface ICorporateSearchResponse extends IApiResponse {
  corporates: Array<ICorporate>;
}
