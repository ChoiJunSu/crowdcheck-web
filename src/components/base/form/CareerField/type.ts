import { ICareer } from "@api/AuthApi/type";

export interface ICareerFieldProps {
  mode?: "edit";
  careers?: Array<ICareer>;
}
