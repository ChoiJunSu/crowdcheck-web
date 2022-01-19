import { IAgree } from "@api/RequestApi/type";

export interface IRequestAgreeFormDate {
  agrees: Array<IAgree>;
  agreeDescription?: string | null;
}
