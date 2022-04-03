import { IRequestAgree } from "@api/RequestApi/type";

export interface IRequestAgreeFormDate {
  agrees: Array<IRequestAgree>;
  agreeDescription: string | null;
}
