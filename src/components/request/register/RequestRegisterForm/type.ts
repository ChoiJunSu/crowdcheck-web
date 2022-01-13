import { ICareer } from "@api/AuthApi/type";

export interface IRequestRegisterFormData {
  name: string;
  phone: string;
  career: Array<ICareer>;
  question: string;
  deadline?: Date | null;
}
