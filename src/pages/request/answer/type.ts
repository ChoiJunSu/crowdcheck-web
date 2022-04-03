import { IReferenceDetail, TReferenceType } from "@api/ReferenceApi/type";

export interface IRequestAnswerFormData {
  type: TReferenceType;
  relationship: string;
  details: Array<IReferenceDetail>;
}
