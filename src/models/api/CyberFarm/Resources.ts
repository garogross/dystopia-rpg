import { CyberFarmProductType } from "../../../types/CyberFarmProductType";

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
export interface GetStorageResponse {
  resources: {
    [key in CyberFarmProductType]?: number;
  };
  resource_ton_value: {
    [key in CyberFarmProductType]?: number;
  };
}
