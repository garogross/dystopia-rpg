import { products } from "../constants/cyberfarm/products";

export interface IWarehouseProduct {
  id: string;
  product: keyof typeof products;
  type: "plant" | "factory";
  count: number;
}
