import { TExpertSpecialty } from "@api/RequestApi/type";

export interface IRequestResumeRegisterFormData {
  memo: string | null;
  resume: File;
  specialty: TExpertSpecialty;
  question: string;
  deadline: string | null;
}
