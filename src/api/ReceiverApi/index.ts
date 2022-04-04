import ApiClient from "@api/ApiClient";
import {
  IReceiverAnswerRequest,
  IReceiverAnswerResponse,
  IReceiverGetAnswerRequest,
  IReceiverGetAnswerResponse,
  IReceiverGetVerifyRequest,
  IReceiverGetVerifyResponse,
  IReceiverRejectRequest,
  IReceiverRejectResponse,
  IReceiverVerifyRequest,
  IReceiverVerifyResponse,
} from "@api/ReceiverApi/type";

class ReceiverApi {
  static async getVerify(
    params: IReceiverGetVerifyRequest
  ): Promise<IReceiverGetVerifyResponse> {
    return (await ApiClient.get({
      url: "/receiver/verify",
      params,
    })) as IReceiverGetVerifyResponse;
  }

  static async verify(
    data: IReceiverVerifyRequest
  ): Promise<IReceiverVerifyResponse> {
    return (await ApiClient.post({
      url: "/receiver/verify",
      data,
    })) as IReceiverVerifyResponse;
  }

  static async getAnswer(
    params: IReceiverGetAnswerRequest
  ): Promise<IReceiverGetAnswerResponse> {
    return (await ApiClient.get({
      url: "/receiver/answer",
      params,
    })) as IReceiverGetAnswerResponse;
  }

  static async answer(
    data: IReceiverAnswerRequest
  ): Promise<IReceiverAnswerResponse> {
    return (await ApiClient.post({
      url: "/receiver/answer",
      data,
    })) as IReceiverAnswerResponse;
  }

  static async reject(
    params: IReceiverRejectRequest
  ): Promise<IReceiverRejectResponse> {
    return (await ApiClient.get({
      url: "/receiver/reject",
      params,
    })) as IReceiverRejectResponse;
  }
}

export default ReceiverApi;
