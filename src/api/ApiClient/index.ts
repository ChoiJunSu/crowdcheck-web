import axios from "axios";
import {
  IGetRequest,
  IGetResponse,
  IPostRequest,
  IPostResponse,
} from "@api/ApiClient/type";
import { API_URL } from "@constants/url";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";

class ApiClient {
  static getHeaders = (headers: any): any => {
    const authToken = localStorage.getItem(LOCAL_AUTH_TOKEN);

    return {
      ...headers,
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    };
  };

  static handleAxiosError = (e: any): string => {
    if (e.response) {
      const { status, data } = e.response;
      if (status === 401) {
        alert("로그인이 필요합니다.");
        location.href = "/login";
      } else if (data.error) {
        return data.error || "";
      }
    }

    return "서버 오류입니다.";
  };

  static get = async ({
    url,
    params,
    headers,
  }: IGetRequest): Promise<IGetResponse> => {
    const response: IGetResponse = {
      ok: false,
      error: "",
      data: null,
    };
    try {
      const axiosGetResponse = await axios.get(API_URL + url, {
        params: params || {},
        headers: ApiClient.getHeaders(headers || {}),
      });
      const { ok, error } = axiosGetResponse.data;
      response.ok = ok;
      response.error = error;
      response.data = axiosGetResponse.data;
    } catch (e: any) {
      response.error = ApiClient.handleAxiosError(e);
    }

    return response;
  };

  static post = async ({
    url,
    data,
    headers,
  }: IPostRequest): Promise<IPostResponse> => {
    const response: IPostResponse = {
      ok: false,
      error: "",
      data: null,
    };
    try {
      const axiosPostResponse = await axios.post(
        API_URL + url,
        data || {},
        ApiClient.getHeaders(headers || {})
      );
      const { ok, error } = axiosPostResponse.data;
      response.ok = ok;
      response.error = error;
      response.data = axiosPostResponse.data;
    } catch (e: any) {
      response.error = ApiClient.handleAxiosError(e);
    }

    return response;
  };
}

export default ApiClient;
