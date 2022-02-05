import { ICareer } from "@api/AuthApi/type";

export interface IUserEditPersonalFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
  careers: Array<ICareer>;
}
