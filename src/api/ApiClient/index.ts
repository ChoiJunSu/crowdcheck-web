import axios, { AxiosRequestHeaders } from "axios";
import {
  IGetRequest,
  IGetResponse,
  IPostRequest,
  IPostResponse,
} from "@api/ApiClient/type";
import { LOCAL_AUTH_TOKEN } from "@constants/localStorage";

class ApiClient {
  static getHeaders(headers: AxiosRequestHeaders): AxiosRequestHeaders {
    const authToken = localStorage.getItem(LOCAL_AUTH_TOKEN);
    if (headers["Content-Type"]) {
      return {
        ...headers,
        Authorization: `Bearer ${authToken}`,
      };
    } else {
      return {
        ...headers,
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      };
    }
  }

  static handleAxiosError(e: any): string {
    if (e.response) return "서버 오류입니다.";
    const { status, data } = e.response;
    if (status === 401) {
      alert("로그인이 필요합니다.");
      location.href = "/login";
    } else if (status === 403) {
      alert("권한이 없습니다.");
      location.href = "/";
    } else if (data.error) {
      return data.error || "";
    }

    return "서버 오류입니다.";
  }

  static async get({
    url,
    params,
    headers,
  }: IGetRequest): Promise<IGetResponse> {
    let response: IGetResponse = {
      ok: false,
      error: "",
    };
    try {
      const axiosGetResponse = await axios.get(
        process.env.REACT_APP_SERVER_URL + url,
        {
          params: params || {},
          headers: ApiClient.getHeaders(headers || {}),
        }
      );
      response = axiosGetResponse.data;
    } catch (e: any) {
      response.error = ApiClient.handleAxiosError(e);
    }

    return response;
  }

  static async post({
    url,
    data,
    headers,
  }: IPostRequest): Promise<IPostResponse> {
    let response: IPostResponse = {
      ok: false,
      error: "",
    };
    try {
      const axiosPostResponse = await axios.post(
        process.env.REACT_APP_SERVER_URL + url,
        data || {},
        {
          headers: ApiClient.getHeaders(headers || {}),
        }
      );
      response = axiosPostResponse.data;
    } catch (e: any) {
      response.error = ApiClient.handleAxiosError(e);
    }

    return response;
  }
}

export default ApiClient;
