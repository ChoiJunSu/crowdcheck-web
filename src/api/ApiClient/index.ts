import axios from "axios";
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
    const axiosGetResponse = await axios.get(API_URL + url, {
      params,
      headers,
    });
    if (axiosGetResponse.status !== 200) {
      response.error = axiosGetResponse.statusText;
      return response;
    }

    return axiosGetResponse.data;
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
