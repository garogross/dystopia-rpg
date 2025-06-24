import { EFarmAchievments } from "../constants/cyberfarm/EFarmAchievments";

export type FarmAchievmentsType = {
  [key in EFarmAchievments]?: {
    count: number;
    level: number;
  };
};
