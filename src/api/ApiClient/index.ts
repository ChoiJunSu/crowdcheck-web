import axios, { AxiosError } from "axios";
import {
  IGetRequest,
  IGetResponse,
  IPostRequest,
  IPostResponse,
} from "@api/ApiClient/type";
import { API_URL } from "@constants/url";

class ApiClient {
  static get = async ({
    url,
    params = {},
    headers = {},
  }: IGetRequest): Promise<IGetResponse> => {
    const response: IGetResponse = {
      ok: false,
      error: "",
    };
    try {
      const axiosGetResponse = await axios.get(API_URL + url, {
        params,
        headers,
      });

      return axiosGetResponse.data;
    } catch (e: any) {
      const { status, data } = e.response;
      if (status === 401) {
        alert("로그인이 필요합니다.");
        location.href = "/login";
      } else {
        response.error = data.error || "";
      }

      return response;
    }
  };

  static post = async ({
    url,
    data = {},
    headers = {},
  }: IPostRequest): Promise<IPostResponse> => {
    const response: IPostResponse = {
      ok: false,
      error: "",
    };
    const axiosPostResponse = await axios.post(API_URL + url, {
      data,
      headers,
    });
    if (axiosPostResponse.status !== 200) {
      response.error = axiosPostResponse.statusText;
      return response;
    }

    return axiosPostResponse.data;
  };
}

export default ApiClient;
