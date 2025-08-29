import { CyberFarmProductType } from "./CyberFarmProductType";

export type FarmProductsSettingsType = {
  [key in CyberFarmProductType]: {
    buy_coef: number;
    max_price: number;
    sell_coef: number;
    base_price: number;
    requirements: {
      [key in CyberFarmProductType]: number;
    };
    base_production: number;
  };
};
