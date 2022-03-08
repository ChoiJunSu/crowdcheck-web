import { ICareer } from "@api/AuthApi/type";

export interface IRequestReferenceRegisterFormData {
  name: string;
  phone: string;
  careers: Array<ICareer>;
  question: string;
  deadline: string | null;
  rewardNum: number;
  rewardAmount: number;
}
