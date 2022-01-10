import { TUserType } from "@api/UserApi/type";

export interface ILoginFormProps {
  type: TUserType;
}

export interface ILoginFormData {
  email: string;
  password: string;
  type: TUserType;
}
