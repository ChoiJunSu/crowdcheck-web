import { TExpertSpecialty } from "@api/RequestApi/type";

export interface IRequestResumeRegisterFormData {
  memo: string | null;
  resume: File;
  portfolio: File;
  specialty: TExpertSpecialty;
  question: string;
  deadline: string | null;
  rewardNum: number;
  rewardPrice: number;
}
