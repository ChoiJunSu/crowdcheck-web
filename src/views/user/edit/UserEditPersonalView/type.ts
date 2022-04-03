import { ICareer } from "@api/UserApi/type";

export interface IUserEditPersonalFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
  careers: Array<ICareer>;
}
