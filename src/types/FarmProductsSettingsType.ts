import { EFarmSlotTypes } from "../constants/cyberfarm/EFarmSlotTypes";
import { CyberFarmProductType } from "./CyberFarmProductType";

export type FarmProductsSettingsType = {
  [key in CyberFarmProductType]: {
    buy_coef: number;
    max_price: number;
    sell_coef: number;
    base_price: number;
    production: {
      [key in EFarmSlotTypes]: {
        requirements: {
          [key in CyberFarmProductType]: number;
        };
      };
    };
    base_production: number;
  };
} & {
  chips_rework: {
    production: {
      workshop: {
        requirements: Record<CyberFarmProductType, number>;
        base_production: number;
        production_time_hours: number;
        output_random_distribution: {
          chip_1: number;
          chip_2: number;
          chip_3: number;
        };
      };
    };
  };
};
