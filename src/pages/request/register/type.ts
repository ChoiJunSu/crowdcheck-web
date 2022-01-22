import { ICareer } from "@api/AuthApi/type";

export interface IRequestRegisterFormData {
  name: string;
  phone: string;
  careers: Array<ICareer>;
  question: string;
  deadline: string | null;
}
