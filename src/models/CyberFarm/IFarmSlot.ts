import { EFarmSlotModules } from "../../constants/cyberfarm/EFarmSlotModules";
import { EFarmSlotTypes } from "../../constants/cyberfarm/EFarmSlotTypes";
import { CyberFarmProductType } from "../../types/CyberFarmProductType";

export interface IFarmSlot {
  type: EFarmSlotTypes;
  product?: CyberFarmProductType;
  start_time?: number;
  finish_time?: number;
  updated_at: number;
  ad_production_bonus_received?: boolean;
  final_production?: number;
  level?: number;
  modules?: {
    [EFarmSlotModules.speed]: number;
    [EFarmSlotModules.automation]: boolean;
    [EFarmSlotModules.production]: number;
  };
}
