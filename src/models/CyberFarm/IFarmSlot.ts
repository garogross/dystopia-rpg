import { EFarmSlotTypes } from "../../constants/cyberfarm/EFarmSlotTypes";
import { CyberFarmProductType } from "../../types/CyberFarmProductType";

export interface IFarmSlot {
  type: EFarmSlotTypes;
  product?: CyberFarmProductType;
  start_time?: number;
  finish_time?: number;
}
