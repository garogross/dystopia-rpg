import { EAdTypes } from "./EAdTypes";

export const AD_LIMITS = {
  [EAdTypes.GIGA_V]: {
    MAX_PER_HOUR: 10,
    MAX_PER_DAY: 100,
    MIN_PAUSE_MS: 60 * 1000, // 60 секунд
  },
};
