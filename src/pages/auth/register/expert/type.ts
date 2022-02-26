import { TExpertSpecialty } from "@api/RequestApi/type";

export interface IRegisterExpertFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
  specialty: TExpertSpecialty;
  certificate: File;
}
