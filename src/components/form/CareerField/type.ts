import { ICareer } from "@api/UserApi/type";

export interface ICareerFieldProps {
  mode?: "edit" | "candidate";
  careers?: Array<ICareer>;
}
