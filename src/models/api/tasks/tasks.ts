import { EAdActionTypes } from "../../../constants/EadActionTypes";
import { EadProviders } from "../../../constants/EadProviders";
import { AdRewardSettingsType } from "../../../types/tasks/AdRewardSettingsType";

export interface ClaimAdRewardResponse {
  status: string;
  provider: EadProviders;
  ad_type: EAdActionTypes;
  identifier: null | string;
  reward: number;
}

export interface GetAdRewardSettingsResponse {
  reward_ad: AdRewardSettingsType;
}
