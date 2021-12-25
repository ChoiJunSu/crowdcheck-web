import { apiRequestDto, apiResponseDto } from "@api/BaseApi/type";

export interface getRequestDto extends apiRequestDto {
  url: string;
  params: any;
}

export interface getResponseDto extends apiResponseDto {}

export interface postRequestDto extends apiRequestDto {
  url: string;
  data: any;
}

export interface postResponseDto extends apiResponseDto {}
