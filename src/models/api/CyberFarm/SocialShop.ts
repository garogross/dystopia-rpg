import { CPOrProductType } from "../../../types/CPOrProductType";

export interface ExchangeResponse {
  status: string;
  operation_id: string;
  reward: { [key in CPOrProductType]: number };
  cactus_left: number;
}
