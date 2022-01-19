import { ICareer } from "@api/AuthApi/type";

export interface IUserEditPersonalFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  careers: Array<ICareer>;
}
