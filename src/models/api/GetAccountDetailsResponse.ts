import { EFarmSlotTypes } from "../../constants/cyberfarm/EFarmSlotTypes";
import { AppGameMode } from "../../types/AppGameMode";
import { CyberFarmProductType } from "../../types/CyberFarmProductType";
import { FarmResourceDeficitType } from "../../types/FarmResourceDeficitType";
import { FarmSlotCostsType } from "../../types/FarmSlotCostsType";
import { SocialShopType } from "../../types/SocialShopType";

export interface GetAccountDetailsResponse {
  mode: AppGameMode;
  user?: {
    id_tgrm: string;
    name: string;
    profile: {
      cash_point: number;
    };
    dataset: {
      start_choice: AppGameMode;
    };
  };
  ton_cyber_farm?: {
    slots: Record<string, { type: EFarmSlotTypes }>;
    timers: {
      daily_login_claimed: {
        last_claim_ts: null | number;
        reward_available: boolean;
        day_number: null;
      };
      social_shop?: {
        last_purchase_ts: number;
        cooldown_until_ts: number;
      };
    };
    resources: Partial<Record<CyberFarmProductType, number>>;
    ton: number;
  };
  game_settings?: {
    base_costs: Record<string, number>;
    slot_costs: FarmSlotCostsType;
    production_settings: {
      [key in EFarmSlotTypes]: {
        products: CyberFarmProductType[];
        speedup_bonus: number;
        production_time_hours: number;
      };
    };
  };
  resource_deficit?: FarmResourceDeficitType;
  claim_daily_login: {
    next_reward: number;
    day_number: number;
    reward_available: boolean;
    rewards_by_day: Record<string, number>; // {"1": 1}
  };
  social_shop: SocialShopType;
}
