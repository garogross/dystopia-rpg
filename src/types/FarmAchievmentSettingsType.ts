import { EFarmAchievments } from "../constants/cyberfarm/EFarmAchievments";

export type FarmAchievmentSettingsType = {
  [key in EFarmAchievments]: {
    desc: string;
    levels: number[];
    reward_per_level_hours: number;
  };
};
