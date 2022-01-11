import { ICareer } from "@api/AuthApi/type";

export interface IRegisterPersonalFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  career: Array<ICareer>;
}
