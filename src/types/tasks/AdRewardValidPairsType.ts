import { AdRewardSettingsType } from "./AdRewardSettingsType";

export type AdRewardValidPairsType = {
  [P in keyof AdRewardSettingsType]: {
    provider: P;
    ad_type: keyof AdRewardSettingsType[P];
  };
}[keyof AdRewardSettingsType];
