import { EAdActionTypes } from "../../constants/EadActionTypes";
import { AdRewardSettingsType } from "../../types/tasks/AdRewardSettingsType";

const MAX_PER_HOUR = 10;
const MAX_PER_DAY = 100;
const MIN_PAUSE_MS = 60;

export function getVideoAdSettings<P extends keyof AdRewardSettingsType>(
  settings: AdRewardSettingsType | null,
  provider: P
) {
  return settings && EAdActionTypes.Video in settings[provider]
    ? settings[provider][EAdActionTypes.Video]
    : {
        amount: 0,
        per_day: MAX_PER_DAY,
        per_hour: MAX_PER_HOUR,
        pause_sec: MIN_PAUSE_MS,
        cooldown_sec: 0,
      };
}
