import { EAdActionTypes } from "../../../constants/EadActionTypes";
import { EadProviders } from "../../../constants/EadProviders";

export interface ClaimAdRewardResponse {
  status: string;
  provider: EadProviders;
  ad_type: EAdActionTypes;
  identifier: null | string;
  reward: number;
}
