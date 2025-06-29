import { CyberFarmProductType } from "../../../types/CyberFarmProductType";
import { FarmResourceDeficitType } from "../../../types/FarmResourceDeficitType";

export interface BuyProductResponse {
  status: "ok";
  product: CyberFarmProductType;
  amount: number;
  total_price: number;
  cash_point_left: number;
}

export interface SellProductResponse {
  status: string;
  resource: CyberFarmProductType;
  amount_exchanged: number;
  ton_received: number;
  ton_total: number;
  resources_left: number;
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
