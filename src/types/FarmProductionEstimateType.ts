import { EFarmSlotTypes } from "../constants/cyberfarm/EFarmSlotTypes";
import { CyberFarmProductType } from "./CyberFarmProductType";

export type FarmProductionEstimateType = {
  [key in CyberFarmProductType]: {
    [key in EFarmSlotTypes]: {
      base_production: number;
      pool_bonus: number;
      final_production: number;
      pool_take: number;
    };
  };
};
