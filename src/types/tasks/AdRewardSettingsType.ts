import { EadProviders } from "../../constants/EadProviders";
import { EAdActionTypes } from "../../constants/EadActionTypes";

type AmountCooldown = {
  amount: number;
  cooldown_sec: number;
};

type VideoSettings = {
  amount: number;
  per_day: number;
  per_hour: number;
  pause_sec: number;
  cooldown_sec: number;
};

export type AdRewardSettingsType = {
  [EadProviders.Tads]: {
    [EAdActionTypes.Task]: AmountCooldown;
  };
  [EadProviders.Taddy]: {
    [EAdActionTypes.Video]: VideoSettings;
    [EAdActionTypes.Exchange]: AmountCooldown;
  };
  [EadProviders.Barzha]: {
    [EAdActionTypes.Task]: AmountCooldown;
    [EAdActionTypes.Click]: AmountCooldown;
    [EAdActionTypes.Subscription]: AmountCooldown;
  };
  [EadProviders.Traffy]: {
    [EAdActionTypes.Boost]: AmountCooldown;
    [EAdActionTypes.Subscription]: AmountCooldown;
  };
  [EadProviders.Adsgram]: {
    [EAdActionTypes.Task]: AmountCooldown;
    [EAdActionTypes.Video]: VideoSettings;
    [EAdActionTypes.Interstitial]: VideoSettings;
  };
  [EadProviders.Gigapub]: {
    [EAdActionTypes.Video]: VideoSettings;
  };
  [EadProviders.Onclicka]: {
    [EAdActionTypes.Video]: VideoSettings;
  };
  [EadProviders.AdsController]: {
    [EAdActionTypes.Video]: VideoSettings;
  };
};
