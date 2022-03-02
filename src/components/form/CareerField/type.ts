import { ICareer } from "@api/AuthApi/type";

export interface ICareerFieldProps {
  mode?: "edit" | "candidate";
  careers?: Array<ICareer>;
}
