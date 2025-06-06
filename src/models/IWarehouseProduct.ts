import { productImages } from "../constants/cyberfarm/productImages";

export interface IWarehouseProduct {
  id: string;
  product: keyof typeof productImages;
  type: "plant" | "factory";
  count: number;
}
