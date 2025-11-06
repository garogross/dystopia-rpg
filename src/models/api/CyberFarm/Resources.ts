import { EChipProducts } from "../../../constants/cyberfarm/EChipProducts";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";
import { FarmProductionEstimateType } from "../../../types/FarmProductionEstimateType";
import { FarmResourceDeficitType } from "../../../types/FarmResourceDeficitType";
import { FarmSlotsUpgradeLevelType } from "../../../types/FarmSlotsUpgradeLevelType";

export interface ExchangeResponse {
  status: "ok";
  operation: "buy" | "sell";
  product: CyberFarmProductType;
  amount_sold?: number;
  amount?: number;
  price_per_unit?: number;
  total_price: number;
  cash_point_left: number;
  pool_left: number;
}

export interface BuyResourceDeflictResponse {
  status: string;
  bought: {
    [key in CyberFarmProductType]: number;
  };
  total_price: number;
  cash_point_left: number;
}

export interface GetStorageResponse {
  resources: {
    [key in CyberFarmProductType]?: number;
  } & {
    workshop_products?: {
      [key in EChipProducts]: number;
    };
  };

  estimated_cost: {
    resources_cost: number;
    slots_cost: number;
    production_cost: number;
    total: number;
    total_in_ton: number;
  };
}

export interface GetResourcesDeflictResponse {
  resource_deficit: FarmResourceDeficitType;
}

export interface GetProductPricesResponse {
  status: string;
  prices: {
    [key in CyberFarmProductType]: {
      price_buy: number;
      price_sell: number;
    };
  };
}

export interface GetProductionEstimateResponse {
  status: string;
  final_production_per_upgrade_level: {
    [key in CyberFarmProductType | "chips_rework"]: FarmSlotsUpgradeLevelType;
  };
  production_estimate: FarmProductionEstimateType;
}
