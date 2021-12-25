import axios from "axios";
import {
  getRequestDto,
  getResponseDto,
  postRequestDto,
  postResponseDto,
} from "@api/ApiClient/type";

const API_URI = "http://localhost:4000";

class ApiClient {
  static get = async ({
    url,
    params = {},
  }: getRequestDto): Promise<getResponseDto> => {
    const response: getResponseDto = {
      ok: false,
      error: "",
    };
    const axiosGetResponse = await axios.get(API_URI + url, {
      params,
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
  }: postRequestDto): Promise<postResponseDto> => {
    const response: postResponseDto = {
      ok: false,
      error: "",
    };
    const axiosPostResponse = await axios.post(API_URI + url, {
      data,
    });
    if (axiosPostResponse.status !== 200) {
      response.error = axiosPostResponse.statusText;
      return response;
    }

    return axiosPostResponse.data;
  };
}

export default ApiClient;