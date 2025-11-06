import { CyberFarmProductType } from "../types/CyberFarmProductType";

export interface IWarehouseProduct {
  id: string;
  product: CyberFarmProductType;
  type: "plant" | "factory" | "chips" | "modules";
  count: number;
}
