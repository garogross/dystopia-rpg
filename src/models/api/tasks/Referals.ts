import { IRefference } from "../../IRefference";

export interface ConverReferalsResponse {
  status: string;
  converted: number;
  ref_cash_point_left: number;
  cash_point: number;
}
export interface GetReferalsResponse {
  referals: IRefference[];
  ref_cash_point?: number;
}
