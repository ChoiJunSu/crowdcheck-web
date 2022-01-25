import { ICareer } from "@api/AuthApi/type";

export interface IRegisterPersonalFormData {
  name: string;
  phone: string;
  phoneVerify: string;
  email: string;
  password: string;
  careers: Array<ICareer>;
}
