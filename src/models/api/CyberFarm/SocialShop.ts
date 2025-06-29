import { CPOrProductType } from "../../../types/CPOrProductType";

export interface ExchangeResponse {
  status: string;
  operation_id: string;
  reward: { [key in CPOrProductType]: number };
  cactus_left: number;
}

export interface UpdateTimersResponse {
  timers: {
    social_shop: {
      last_purchase_ts: number;
      cooldown_until_ts: number;
    };
  };
}
