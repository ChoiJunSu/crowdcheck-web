import { IAgree } from "@api/RequestApi/type";

export interface IRequestReferenceAgreeFormDate {
  agrees: Array<IAgree>;
  agreeDescription: string | null;
}
