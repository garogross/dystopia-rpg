import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { EAdActionTypes } from "../../../constants/EadActionTypes";
import { EadProviders } from "../../../constants/EadProviders";
import { AdRewardSettingsType } from "../../../types/tasks/AdRewardSettingsType";

export interface ClaimAdRewardResponse {
  status: string;
  provider: EadProviders;
  ad_type: EAdActionTypes;
  identifier: null | string;
  reward: number;
  slot_id?: string;
  bonus_distribution?: {
    ref_amount: number;
    production_amount: number;
    global_amount: number;
    ad_bonus_production: number;
    slot_type: EFarmSlotTypes;
    farm_slot: string;
    ad_production_bonus_received: boolean;
  };
}

export interface GetAdRewardSettingsResponse {
  reward_ad: AdRewardSettingsType;
}
