import { apiRequestDto, apiResponseDto } from "@api/BaseApi/type";

export interface oauthLoginRequestDto extends apiRequestDto {
  provider: string;
  code: string;
  redirectUri: string;
}

export interface oauthLoginResponseDto extends apiResponseDto {}
