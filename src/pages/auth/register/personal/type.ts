import { ICareer } from "@api/AuthApi/type";

export interface IRegisterPersonalFormData {
  name: string;
  phone: string;
  code: number;
  email: string;
  password: string;
  passwordConfirm: string;
  careers: Array<ICareer>;
}
