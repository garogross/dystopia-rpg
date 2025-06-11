import { CyberFarmProductType } from "../../../types/CyberFarmProductType";

export interface BuyProductResponse {
  status: "ok";
  product: CyberFarmProductType;
  amount: number;
  total_price: number;
  cash_point_left: number;
}
