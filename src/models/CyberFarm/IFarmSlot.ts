import { EFarmSlotTypes } from "../../constants/cyberfarm/EFarmSlotTypes";
import { products } from "../../constants/cyberfarm/products";

export interface IFarmSlot {
  type: EFarmSlotTypes;
  product: keyof typeof products;
  start_time: number;
  finish_time: number;
}
