import { EAdActionTypes } from "../../constants/EadActionTypes";
import { EadProviders } from "../../constants/EadProviders";
import { EMediationStatuses } from "../../constants/EMediationStatuses";

type AvailableStatusSettings = {
  status: EMediationStatuses.AdAvailable;
  provider: EadProviders;
  ad_type: EAdActionTypes;
  seconds_left?: number;
  settings: {
    amount: number;
    per_day: number;
    per_hour: number;
    pause_sec: number;
    cooldown_sec: number;
  };
};

type SlotCooldownStatusSettings = {
  status: EMediationStatuses.SlotCooldown;
  seconds_left: number;
};

type NoAdsStatusSettings = {
  status: EMediationStatuses.NoAds;
};

type InactiveStatusSettings = {
  status: EMediationStatuses.Inactive;
};

type AdLimitStatusSettings = {
  status: EMediationStatuses.AdLimit;
  views_hour: number;
  views_day: number;
  seconds_to_hour_limit: number;
  seconds_to_day_limit: number;
};

type OptionalReponceType =
  | AvailableStatusSettings
  | SlotCooldownStatusSettings
  | NoAdsStatusSettings
  | InactiveStatusSettings
  | AdLimitStatusSettings;

export type MediationType = {
  [slotId: string]: {
    message: string;
  } & OptionalReponceType;
};
