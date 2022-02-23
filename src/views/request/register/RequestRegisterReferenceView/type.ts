import { ICareer } from "@api/AuthApi/type";

export interface IRequestRegisterReferenceFormData {
  name: string;
  phone: string;
  careers: Array<ICareer>;
  question: string;
  deadline: string | null;
}
