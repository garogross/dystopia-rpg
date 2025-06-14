import { EFarmSlotTypes } from "../../constants/cyberfarm/EFarmSlotTypes";
import { AppGameMode } from "../../types/AppGameMode";
import { CyberFarmProductType } from "../../types/CyberFarmProductType";
import { FarmResourceDeficitType } from "../../types/FarmResourceDeficitType";
import { FarmSlotCostsType } from "../../types/FarmSlotCostsType";

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
        last_claim_ts: null;
        reward_available: boolean;
        day_number: null;
      };
    };
    resources: Partial<Record<CyberFarmProductType, number>>;
    ton: number;
  };
  game_settings?: {
    base_costs: Record<string, number>;
    slot_costs: FarmSlotCostsType;
  };
  resource_deficit?: FarmResourceDeficitType;
}
