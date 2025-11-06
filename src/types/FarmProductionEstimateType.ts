import { EFarmSlotTypes } from "../constants/cyberfarm/EFarmSlotTypes";
import { CyberFarmProductType } from "./CyberFarmProductType";

export type FarmProductionEstimateType = {
  [key in CyberFarmProductType | "chips_rework"]: {
    [key in EFarmSlotTypes]: {
      base_production: number;
      pool_bonus: number;
      upgrade_bonus: 20;
      final_production: number;
      pool_take: number;
      upgrade_pool_take: number;
      has_upgrade: boolean;
      current: {
        final_production: number;
        time_hours: number;
        time_hours_with_achievements: number;
      };
      next_level: {
        final_production: number | null;
        time_hours: number | null;
        time_hours_with_achievements: number | null;
        upgrade_price: number | null;
      };
    };
  };
};
