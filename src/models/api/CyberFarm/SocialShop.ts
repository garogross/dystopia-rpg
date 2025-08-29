import { CyberFarmProductType } from "../../../types/CyberFarmProductType";

export interface UpdateTimersResponse {
  timers: {
    social_shop: {
      last_purchase_ts: number;
      cooldown_until_ts: number;
    };
  };
}
