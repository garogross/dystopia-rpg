import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";
import { FarmResourceDeficitType } from "../../../types/FarmResourceDeficitType";

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
  };
  resource_ton_value: {
    [key in CyberFarmProductType]?: number;
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
  production_estimate: {
    [key in CyberFarmProductType]: {
      [key in EFarmSlotTypes]: {
        base_production: number;
        pool_bonus: number;
        final_production: number;
        pool_take: number;
      };
    };
  };
}
