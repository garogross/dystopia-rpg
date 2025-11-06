import { EChipProducts } from "../../constants/cyberfarm/EChipProducts";
import { EFarmSlotTypes } from "../../constants/cyberfarm/EFarmSlotTypes";
import { EModuleProducts } from "../../constants/cyberfarm/EModuleProducts";
import { IFarmSlot } from "./IFarmSlot";

export interface IWorkshopSlot extends Omit<IFarmSlot, "type" | "product"> {
  type: EFarmSlotTypes.WORKSHOP;
  product?: "chips" | EModuleProducts;
  workshop_output?: {
    [key in EChipProducts]: number;
  };
}
