import { EAdActionTypes } from "../../constants/EadActionTypes";
import { AdRewardSettingsType } from "../../types/tasks/AdRewardSettingsType";

const MAX_PER_HOUR = 10;
const MAX_PER_DAY = 100;
const MIN_PAUSE_MS = 60;

export function getVideoAdSettings<P extends keyof AdRewardSettingsType>(
  settings: AdRewardSettingsType | null,
  provider: P,
  isIntersetial?: boolean
) {
  const type = isIntersetial
    ? EAdActionTypes.Interstitial
    : EAdActionTypes.Video;

  if (settings && settings[provider] && type in settings[provider]) {
    return settings[provider][type as keyof (typeof settings)[P]];
  }

  return {
    amount: 0,
    per_day: MAX_PER_DAY,
    per_hour: MAX_PER_HOUR,
    pause_sec: MIN_PAUSE_MS,
    cooldown_sec: 0,
  };
}
